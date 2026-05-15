/* ═══════════════════════════════════════════════════════════════════════
 * SALCOMP FORM IMAGE UPLOAD WIDGET
 *
 * Drop-in image attachment for shift reports, scout checklists, and PM
 * reports. Loaded with: <script src="form_image_upload.js?v=1"></script>
 *
 * HOW IT WORKS:
 *  - On DOMContentLoaded, injects an "📷 Attach Photos" widget just above
 *    the form's submit button (looks for #subBtn / .btn-primary).
 *  - Techs pick/drag images. Thumbnails preview instantly (local object URLs).
 *  - Images are NOT uploaded until the form is submitted — the form calls
 *    window.uploadPendingImages() which pushes them to Supabase Storage and
 *    returns an array of public URLs.
 *  - The form's collectData() should call window.getPendingImageCount() to
 *    know if there are images, and the submit handler awaits
 *    window.uploadPendingImages() then includes the URLs in the payload as
 *    `photos` (a JSONB array column).
 *
 * GRACEFUL DEGRADATION:
 *  - If the Storage bucket 'report-photos' doesn't exist yet, uploads fail
 *    softly: the form still submits, just without photos, and a toast warns.
 *
 * REQUIRES (from the host page):
 *  - SB_URL and a Supabase key reachable as window.SB_KEY or SUPABASE_KEY or
 *    the page's own sbHeaders(). We try several names.
 * ═══════════════════════════════════════════════════════════════════════ */

(function(){
  'use strict';

  const BUCKET = 'report-photos';
  const MAX_BYTES = 10 * 1024 * 1024;   // 10 MB per image
  const MAX_IMAGES = 8;
  const ACCEPTED = ['image/jpeg','image/png','image/webp','image/heic','image/heif','image/gif'];

  // pendingImages: [{file, localUrl, id}]
  let pendingImages = [];
  let _idCounter = 0;

  // ── Resolve Supabase credentials from whatever the host page exposes ──
  function getSupabaseUrl(){
    if(typeof SB_URL !== 'undefined') return SB_URL;
    if(window.SB_URL) return window.SB_URL;
    return null;
  }
  function getSupabaseKey(){
    if(typeof SB_KEY !== 'undefined') return SB_KEY;
    if(window.SB_KEY) return window.SB_KEY;
    if(typeof SUPABASE_KEY !== 'undefined') return SUPABASE_KEY;
    if(window.SUPABASE_KEY) return window.SUPABASE_KEY;
    // Last resort: the known anon key for this project
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpneGtsd3F0bmp1aHdtaWdiZGtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2NTcwMjUsImV4cCI6MjA5MjIzMzAyNX0.EHTVKXKr0PRoutgLnpHMAFHElvjkiBlDH1ZNXdyoxIM';
  }

  // ── WIDGET MARKUP ─────────────────────────────────────────────────────
  function buildWidget(){
    const wrap = document.createElement('div');
    wrap.className = 'img-upload-widget';
    wrap.innerHTML = `
      <div class="img-upload-head">📷 Attach Photos <span class="img-upload-opt">(optional)</span></div>
      <div class="img-upload-dropzone" id="imgDropzone">
        <div class="img-upload-dz-icon">🖼️</div>
        <div class="img-upload-dz-text">Tap to add photos, or drag &amp; drop</div>
        <div class="img-upload-dz-hint">JPG / PNG / HEIC — up to ${MAX_IMAGES} images, 10 MB each</div>
      </div>
      <input type="file" id="imgFileInput" accept="image/*" multiple style="display:none;">
      <div class="img-upload-grid" id="imgPreviewGrid"></div>
    `;
    return wrap;
  }

  // ── STYLES ────────────────────────────────────────────────────────────
  function injectStyles(){
    if(document.getElementById('imgUploadStyles')) return;
    const css = document.createElement('style');
    css.id = 'imgUploadStyles';
    css.textContent = `
      .img-upload-widget{
        background:var(--sur, #161b22);
        border:1px solid var(--bdr, #21262d);
        border-radius:10px;
        padding:16px 18px;
        margin:18px 0;
      }
      .img-upload-head{
        font-family:'IBM Plex Mono', monospace;
        font-size:12px;
        font-weight:600;
        text-transform:uppercase;
        letter-spacing:.08em;
        color:var(--mut, #d0d7de);
        margin-bottom:12px;
      }
      .img-upload-opt{
        color:var(--mut2, #b1bac4);
        font-weight:400;
        text-transform:none;
        letter-spacing:0;
      }
      .img-upload-dropzone{
        border:2px dashed var(--bdr2, #30363d);
        border-radius:8px;
        padding:22px 16px;
        text-align:center;
        cursor:pointer;
        transition:all .15s;
        background:var(--bg, #0d1117);
      }
      .img-upload-dropzone:hover,
      .img-upload-dropzone.drag{
        border-color:var(--amb, #f0a500);
        background:rgba(var(--amb-rgb,240,165,0), .04);
      }
      .img-upload-dz-icon{font-size:26px;margin-bottom:6px;}
      .img-upload-dz-text{font-size:13px;color:var(--mut, #d0d7de);}
      .img-upload-dz-hint{
        font-size:10.5px;
        color:var(--mut2, #b1bac4);
        margin-top:4px;
        font-family:'IBM Plex Mono', monospace;
      }
      .img-upload-grid{
        display:grid;
        grid-template-columns:repeat(auto-fill, minmax(92px, 1fr));
        gap:8px;
        margin-top:12px;
      }
      .img-upload-thumb{
        position:relative;
        aspect-ratio:1;
        border-radius:7px;
        overflow:hidden;
        border:1px solid var(--bdr2, #30363d);
        background:var(--bg, #0d1117);
      }
      .img-upload-thumb img{
        width:100%;
        height:100%;
        object-fit:cover;
        display:block;
      }
      .img-upload-thumb-remove{
        position:absolute;
        top:3px;right:3px;
        width:22px;height:22px;
        border-radius:50%;
        border:none;
        background:rgba(0,0,0,.7);
        color:#fff;
        font-size:13px;
        line-height:1;
        cursor:pointer;
        display:flex;
        align-items:center;
        justify-content:center;
        transition:background .15s;
      }
      .img-upload-thumb-remove:hover{background:var(--red, #f85149);}
      .img-upload-thumb-status{
        position:absolute;
        bottom:0;left:0;right:0;
        font-family:'IBM Plex Mono', monospace;
        font-size:8.5px;
        text-align:center;
        padding:2px;
        background:rgba(0,0,0,.7);
        color:#fff;
      }
      .img-upload-thumb-status.uploading{background:rgba(240,165,0,.85);color:#000;}
      .img-upload-thumb-status.done{background:rgba(63,185,80,.85);color:#000;}
      .img-upload-thumb-status.failed{background:rgba(248,81,73,.85);color:#fff;}
    `;
    document.head.appendChild(css);
  }

  // ── PREVIEW RENDER ────────────────────────────────────────────────────
  function renderPreviews(){
    const grid = document.getElementById('imgPreviewGrid');
    if(!grid) return;
    grid.innerHTML = pendingImages.map(img => `
      <div class="img-upload-thumb" data-img-id="${img.id}">
        <img src="${img.localUrl}" alt="attachment preview">
        <button type="button" class="img-upload-thumb-remove" data-remove="${img.id}" title="Remove">✕</button>
        ${img.status ? `<div class="img-upload-thumb-status ${img.status}">${img.statusText||img.status}</div>` : ''}
      </div>
    `).join('');
    // Wire remove buttons
    grid.querySelectorAll('[data-remove]').forEach(btn => {
      btn.addEventListener('click', () => removeImage(parseInt(btn.dataset.remove)));
    });
  }

  function removeImage(id){
    const idx = pendingImages.findIndex(i => i.id === id);
    if(idx >= 0){
      try { URL.revokeObjectURL(pendingImages[idx].localUrl); } catch(e){}
      pendingImages.splice(idx, 1);
      renderPreviews();
    }
  }

  // ── FILE HANDLING ─────────────────────────────────────────────────────
  function handleFiles(fileList){
    const files = Array.from(fileList);
    for(const file of files){
      if(pendingImages.length >= MAX_IMAGES){
        notify(`Maximum ${MAX_IMAGES} photos.`, true);
        break;
      }
      // Accept anything that looks like an image (some HEIC files have empty type)
      const looksImage = file.type.startsWith('image/') ||
                         /\.(jpe?g|png|webp|heic|heif|gif)$/i.test(file.name);
      if(!looksImage){
        notify(`Skipped ${file.name} — not an image.`, true);
        continue;
      }
      if(file.size > MAX_BYTES){
        notify(`Skipped ${file.name} — over 10 MB.`, true);
        continue;
      }
      pendingImages.push({
        file,
        localUrl: URL.createObjectURL(file),
        id: ++_idCounter,
        status: null,
        statusText: null,
      });
    }
    renderPreviews();
  }

  // ── UPLOAD (called by the form's submit handler) ──────────────────────
  // Returns a Promise resolving to an array of public URL strings.
  // On any failure, resolves with whatever succeeded (form still submits).
  window.uploadPendingImages = async function(){
    if(pendingImages.length === 0) return [];
    const sbUrl = getSupabaseUrl();
    const sbKey = getSupabaseKey();
    if(!sbUrl || !sbKey){
      notify('Image upload unavailable — missing Supabase config.', true);
      return [];
    }
    const urls = [];
    for(const img of pendingImages){
      // Skip ones already uploaded (in case submit is retried)
      if(img.status === 'done' && img.publicUrl){
        urls.push(img.publicUrl);
        continue;
      }
      img.status = 'uploading';
      img.statusText = '…';
      renderPreviews();
      try {
        const safeName = img.file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        const path = `${Date.now()}_${img.id}_${safeName}`;
        const res = await fetch(`${sbUrl}/storage/v1/object/${BUCKET}/${path}`, {
          method: 'POST',
          headers: {
            'apikey': sbKey,
            'Authorization': 'Bearer ' + sbKey,
            'Content-Type': img.file.type || 'application/octet-stream',
            'x-upsert': 'false',
          },
          body: img.file,
        });
        if(!res.ok){
          throw new Error('HTTP ' + res.status);
        }
        const publicUrl = `${sbUrl}/storage/v1/object/public/${BUCKET}/${path}`;
        img.status = 'done';
        img.statusText = '✓';
        img.publicUrl = publicUrl;
        urls.push(publicUrl);
      } catch(e){
        img.status = 'failed';
        img.statusText = 'failed';
        // Don't throw — let the form submit without this image
        console.warn('Image upload failed:', e);
      }
      renderPreviews();
    }
    const failed = pendingImages.filter(i => i.status === 'failed').length;
    if(failed > 0){
      notify(`${failed} photo${failed>1?'s':''} failed to upload — report saved without ${failed>1?'them':'it'}. (Is the 'report-photos' Storage bucket set up?)`, true);
    }
    return urls;
  };

  // How many images are queued (form can check before submit)
  window.getPendingImageCount = function(){ return pendingImages.length; };

  // Clear after a successful submit (so "submit another" starts fresh)
  window.clearPendingImages = function(){
    pendingImages.forEach(i => { try { URL.revokeObjectURL(i.localUrl); } catch(e){} });
    pendingImages = [];
    renderPreviews();
  };

  // For edit-mode: pre-load existing photo URLs as already-done thumbnails
  window.loadExistingImages = function(urlArray){
    if(!Array.isArray(urlArray)) return;
    urlArray.forEach(url => {
      if(!url) return;
      pendingImages.push({
        file: null,
        localUrl: url,
        id: ++_idCounter,
        status: 'done',
        statusText: '✓',
        publicUrl: url,
      });
    });
    renderPreviews();
  };

  // ── TOAST (reuse the page's if it has one) ────────────────────────────
  function notify(msg, isError){
    if(typeof window.showToast === 'function'){
      window.showToast(msg, isError ? 't-err' : 't-ok');
    } else {
      // Minimal fallback
      console[isError ? 'warn' : 'log']('[image-upload] ' + msg);
    }
  }

  // ── INIT ──────────────────────────────────────────────────────────────
  function init(){
    injectStyles();
    // Find the submit button to anchor the widget above it
    const submitBtn = document.getElementById('subBtn') ||
                      document.querySelector('.btn-primary') ||
                      document.querySelector('button[onclick*="submit" i]');
    if(!submitBtn){
      console.warn('[image-upload] no submit button found — widget not injected');
      return;
    }
    // The widget goes right before the submit button's container
    const widget = buildWidget();
    // Try to insert before the button's parent block if it's a standalone wrapper,
    // else just before the button itself.
    const anchor = submitBtn.closest('.form-actions, .submit-row, .actions') || submitBtn;
    anchor.parentNode.insertBefore(widget, anchor);

    // Wire events
    const dz = document.getElementById('imgDropzone');
    const input = document.getElementById('imgFileInput');
    dz.addEventListener('click', () => input.click());
    input.addEventListener('change', e => {
      handleFiles(e.target.files);
      input.value = '';  // allow re-selecting the same file
    });
    ['dragover','dragenter'].forEach(ev => dz.addEventListener(ev, e => {
      e.preventDefault(); dz.classList.add('drag');
    }));
    ['dragleave','drop'].forEach(ev => dz.addEventListener(ev, e => {
      e.preventDefault(); dz.classList.remove('drag');
    }));
    dz.addEventListener('drop', e => {
      if(e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 80));
  } else {
    setTimeout(init, 80);
  }
})();

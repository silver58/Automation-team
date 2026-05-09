/* ═══════════════════════════════════════════════════════════════════════
 * SALCOMP SHIFT REPORT SPEED-UPS
 *
 * Loaded by every shift report after techs.js. Adds:
 *   1. Auto-detect shift A/B/C from current time
 *   2. Per-tech memory (line/machine/model) remembered between submissions
 *   3. Numeric keyboard hints on all number fields (iOS Safari fix)
 *
 * The shift forms already have their own autosave (from earlier work) so we
 * don't duplicate it here.
 *
 * Each shift report only needs <script src="shift_form_speedup.js?v=2"></script>
 * Everything below is auto-wired via DOMContentLoaded.
 * ═══════════════════════════════════════════════════════════════════════ */

(function(){
  'use strict';

  // ──────────────────────────────────────────────────────────────────────
  // 1. AUTO-DETECT SHIFT
  // ──────────────────────────────────────────────────────────────────────
  // Maps current local time → A/B/C shift letter
  // A: 6am – 2pm   B: 2pm – 10pm   C: 10pm – 6am
  function detectShift(){
    const h = new Date().getHours();
    if(h >= 6  && h < 14) return 'A';
    if(h >= 14 && h < 22) return 'B';
    return 'C';
  }

  function autoFillShiftIfEmpty(){
    const shiftEl = document.getElementById('fShift');
    if(!shiftEl) return;
    // Only auto-fill if empty (don't override edits or edit-mode loads)
    if(shiftEl.value && shiftEl.value.trim() !== '') return;
    const detected = detectShift();
    if(shiftEl.tagName === 'SELECT'){
      const match = Array.from(shiftEl.options).find(o => o.value === detected || o.value.toUpperCase() === detected);
      if(match) shiftEl.value = match.value;
    } else {
      shiftEl.value = detected;
    }
    // Mark with a subtle visual cue so techs know it was auto-set
    shiftEl.dataset.autofilled = 'true';
    shiftEl.style.borderLeft = '3px solid var(--amb)';
    shiftEl.addEventListener('change', () => {
      shiftEl.style.borderLeft = '';
      delete shiftEl.dataset.autofilled;
    }, {once: true});
  }

  // ──────────────────────────────────────────────────────────────────────
  // 2. PER-TECH MEMORY — remember last line/machine/model, pre-fill next time
  // ──────────────────────────────────────────────────────────────────────
  // Storage key includes the form filename so memory is per-area
  const MEMORY_KEY = 'salcomp_shift_form_memory_' + (location.pathname.split('/').pop() || 'default');
  // Fields remembered between submissions. Note: fMachine is NOT included
  // because each shift form pre-fills its machine name in HTML now (Carousel,
  // Potting, Wave 3, Battery, IQ9). Persisting it in memory would let one tech's
  // override stick around forever.
  const MEMORY_FIELDS = ['fLine', 'fModel'];

  function loadMemory(){
    try {
      const raw = localStorage.getItem(MEMORY_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch(e){ return {}; }
  }
  function saveMemory(data){
    try { localStorage.setItem(MEMORY_KEY, JSON.stringify(data)); } catch(e){}
  }

  function applyMemory(){
    const mem = loadMemory();
    if(!mem || Object.keys(mem).length === 0) return;
    MEMORY_FIELDS.forEach(id => {
      const el = document.getElementById(id);
      if(!el) return;
      // Don't override existing values (e.g. edit mode, autosave restore, etc.)
      if(el.value && el.value.trim() !== '') return;
      const val = mem[id];
      if(val == null) return;
      el.value = val;
      // Visual cue so techs see it was pre-filled
      el.dataset.prefilled = 'true';
      el.style.borderLeft = '3px solid var(--amb)';
      el.addEventListener('input', () => {
        el.style.borderLeft = '';
        delete el.dataset.prefilled;
      }, {once: true});
    });
  }

  function captureMemory(){
    const mem = {};
    MEMORY_FIELDS.forEach(id => {
      const el = document.getElementById(id);
      if(el && el.value && el.value.trim() !== ''){
        mem[id] = el.value;
      }
    });
    if(Object.keys(mem).length > 0) saveMemory(mem);
  }

  // Hook into the submit button so memory is captured on every submission attempt.
  function hookMemoryCapture(){
    const submitBtn = document.getElementById('subBtn');
    if(submitBtn) submitBtn.addEventListener('click', captureMemory);
  }

  // ──────────────────────────────────────────────────────────────────────
  // 3. NUMERIC KEYBOARD HINTS
  // ──────────────────────────────────────────────────────────────────────
  // For every <input type="text"> whose name suggests a number, force
  // inputmode so iOS Safari shows the number-pad. Decimal-allowing fields
  // get inputmode="decimal" instead.
  function fixNumericKeyboards(){
    const decimalIds = new Set([
      'fHoursOverTarget',  // can be 0.5, 1.5
    ]);
    document.querySelectorAll('input[type="text"]').forEach(el => {
      if(el.hasAttribute('inputmode')) return;
      const id = el.id || '';
      const placeholder = (el.placeholder || '').toLowerCase();
      const isQty = placeholder.includes('qty') || placeholder === '0' ||
                    /qty|quantity|min|sec|hour|count|total/i.test(id);
      if(decimalIds.has(id)){
        el.setAttribute('inputmode', 'decimal');
      } else if(isQty){
        el.setAttribute('inputmode', 'numeric');
      }
    });
    document.querySelectorAll('input[type="number"]').forEach(el => {
      if(!el.hasAttribute('inputmode')) el.setAttribute('inputmode', 'numeric');
    });
  }

  // ──────────────────────────────────────────────────────────────────────
  // INIT — run after DOM is ready (and after techs.js replaces some inputs)
  // ──────────────────────────────────────────────────────────────────────
  function init(){
    fixNumericKeyboards();
    autoFillShiftIfEmpty();
    applyMemory();
    hookMemoryCapture();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 60));
  } else {
    setTimeout(init, 60);
  }
})();


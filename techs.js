/* ═══════════════════════════════════════════════════════════════════════
 * SALCOMP TECH ROSTER + LINE LIST
 *
 * Used by every form's Tech Name + Line dropdowns. Centralized here so
 * adding/removing a technician means editing one file instead of 10+.
 *
 * Tech list is grouped into A Shift / B Shift / C Shift / Engineers.
 * Selecting "Unknown technician" reveals a free-text input.
 * ═══════════════════════════════════════════════════════════════════════ */

window.SALCOMP_TECHS = {
  'A Shift': [
    'Joseph Vu', 'Nicki Vu', 'Sang Ngo', 'Ethan Burgess', 'Joel Gallegos',
    'Demond Wells', 'Tay Vong', 'Yessica', 'Minh Nguyen', 'Trinh',
    'David Le', 'Arllian',
  ],
  'B Shift': [
    'Evin Graterol', 'Phi Pham', 'Ernesto Estrada', 'Truong Bui',
    'Howard Brooks', 'Miguel Manzo', 'Mak Dieu Merci', 'Robert Phan',
    'Jesus Carrillo', 'Juan Gonzalez', 'Anjanidevi Arumilli', 'Joseph Mendoza',
  ],
  'C Shift': [
    'Jason Howard', 'Jesmarg Carrillo', 'Jose Aguilar', 'Bryan Martinez',
    'Dariel Bustamante', 'Daniel Avelino', 'Marcus Thompson', 'Alex Phong',
    'Kito Hill', 'Edgar Garcia', 'Pancho', 'David Harell',
  ],
  'Engineers': [
    'Sentilkumar', 'Rolando Muniz', 'Manuel Hernandez', 'Erick Barrera',
    'Krishna', 'John',
  ],
};

window.SALCOMP_LINES = ['1', '2', '3', '6', '7'];

const UNKNOWN_TECH = '__unknown__';

/**
 * Convert <input id="techName"> on the page into a <select> populated
 * with shift-grouped technicians. Preserves existing value if it matches
 * a roster entry (so edit-mode populates correctly).
 *
 * Selecting "Unknown technician" reveals a free-text input below the
 * dropdown so the user can type a name not on the roster.
 */
window.populateTechDropdown = function(){
  const input = document.getElementById('techName');
  if(!input || input.tagName === 'SELECT') return;

  const select = document.createElement('select');
  select.id = 'techName';
  select.className = input.className;

  // Blank placeholder option (forces user to choose something)
  const blank = document.createElement('option');
  blank.value = '';
  blank.textContent = '— select technician —';
  blank.disabled = true;
  blank.selected = true;
  select.appendChild(blank);

  // Build shift-grouped optgroups
  Object.entries(window.SALCOMP_TECHS).forEach(([shift, names]) => {
    const og = document.createElement('optgroup');
    og.label = shift;
    names.forEach(n => {
      const opt = document.createElement('option');
      opt.value = n;
      opt.textContent = n;
      og.appendChild(opt);
    });
    select.appendChild(og);
  });

  // Unknown — free-text fallback for guests / contractors / new hires
  const ogUnknown = document.createElement('optgroup');
  ogUnknown.label = 'Other';
  const unknownOpt = document.createElement('option');
  unknownOpt.value = UNKNOWN_TECH;
  unknownOpt.textContent = 'Unknown technician (type name)…';
  ogUnknown.appendChild(unknownOpt);
  select.appendChild(ogUnknown);

  // Preserve any existing value (edit-mode)
  let prefilledOther = '';
  if(input.value){
    const inRoster = Array.from(select.querySelectorAll('option'))
      .some(o => o.value === input.value && o.value !== UNKNOWN_TECH);
    if(inRoster){
      select.value = input.value;
    } else {
      select.value = UNKNOWN_TECH;
      prefilledOther = input.value;
    }
  }

  input.parentNode.replaceChild(select, input);

  // Free-text input shown only when Unknown is selected
  const freeInput = document.createElement('input');
  freeInput.type = 'text';
  freeInput.id = 'techNameOther';
  freeInput.placeholder = 'Type technician name';
  freeInput.value = prefilledOther;
  freeInput.style.cssText = 'margin-top:6px;width:100%;background:var(--bg);border:1px solid var(--bdr2);border-radius:6px;padding:7px 10px;color:var(--txt);font-size:14px;font-family:\'IBM Plex Sans\',sans-serif;outline:none;';
  freeInput.style.display = (select.value === UNKNOWN_TECH) ? '' : 'none';
  select.parentNode.appendChild(freeInput);

  // Toggle visibility on change
  select.addEventListener('change', () => {
    if(select.value === UNKNOWN_TECH){
      freeInput.style.display = '';
      freeInput.focus();
    } else {
      freeInput.style.display = 'none';
      freeInput.value = '';
    }
  });
};

/** Read the tech name regardless of which input is active. */
window.getTechName = function(){
  const sel = document.getElementById('techName');
  if(!sel) return '';
  if(sel.tagName === 'SELECT'){
    if(sel.value === UNKNOWN_TECH){
      return (document.getElementById('techNameOther')?.value || '').trim();
    }
    return sel.value || '';
  }
  return (sel.value || '').trim();
};

/** Set the tech name (used in edit-mode populator + reset). */
window.setTechName = function(name){
  const sel = document.getElementById('techName');
  if(!sel) return;
  if(sel.tagName === 'SELECT'){
    const inRoster = Array.from(sel.querySelectorAll('option'))
      .some(o => o.value === name && o.value !== UNKNOWN_TECH);
    const freeInput = document.getElementById('techNameOther');
    if(inRoster){
      sel.value = name;
      if(freeInput){ freeInput.style.display = 'none'; freeInput.value = ''; }
    } else if(name){
      sel.value = UNKNOWN_TECH;
      if(freeInput){ freeInput.value = name; freeInput.style.display = ''; }
    } else {
      sel.value = '';
      if(freeInput){ freeInput.style.display = 'none'; freeInput.value = ''; }
    }
  } else {
    sel.value = name || '';
  }
};

/**
 * Convert <input id="fLine"> into a <select> with lines 1, 2, 3, 6, 7.
 * Preserves any inline event handler (like oninput="onLineChange()") so
 * downstream form logic still fires.
 */
window.populateLineDropdown = function(){
  const input = document.getElementById('fLine');
  if(!input || input.tagName === 'SELECT') return;

  const select = document.createElement('select');
  select.id = 'fLine';
  select.className = input.className;
  // Preserve change handler if the original input had one
  // (handles cases like the PM forms which do oninput="onLineChange()")
  const onInput = input.getAttribute('oninput');
  if(onInput) select.setAttribute('onchange', onInput);

  const blank = document.createElement('option');
  blank.value = '';
  blank.textContent = '— select line —';
  blank.disabled = true;
  blank.selected = true;
  select.appendChild(blank);

  window.SALCOMP_LINES.forEach(n => {
    const opt = document.createElement('option');
    opt.value = n;
    opt.textContent = 'Line ' + n;
    select.appendChild(opt);
  });

  // Preserve existing value (edit-mode)
  if(input.value && window.SALCOMP_LINES.includes(String(input.value))){
    select.value = String(input.value);
  }

  input.parentNode.replaceChild(select, input);
};

/** Init both dropdowns on DOMContentLoaded. */
function initSalcompDropdowns(){
  if(document.getElementById('techName')) window.populateTechDropdown();
  if(document.getElementById('fLine'))    window.populateLineDropdown();
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', initSalcompDropdowns);
} else {
  initSalcompDropdowns();
}

/* ═══════════════════════════════════════════════════════════════════════
 * SALCOMP TRANSLATIONS — central English/Spanish dictionary
 * Last updated: full coverage for all 8 forms
 * ═══════════════════════════════════════════════════════════════════════ */

window.SALCOMP_I18N = {

  // ── DASHBOARD ──────────────────────────────────────────────────────────
  'app.title':             { en: 'Automation', es: 'Automatización' },
  'app.title.suffix':      { en: 'Team',       es: 'Equipo' },
  'app.subtitle':          { en: 'Select a form to get started', es: 'Seleccione un formulario para comenzar' },
  'app.col.scout':         { en: 'Scout Checks',   es: 'Chequeos Scout' },
  'app.col.shift':         { en: 'Shift Reports',  es: 'Reportes de Turno' },

  'card.carousel.scout.label':  { en: 'Carousel',  es: 'Carrusel' },
  'card.carousel.scout.title':  { en: 'Carousel Scout Check Sheet', es: 'Hoja de Inspección Carrusel' },
  'card.carousel.scout.desc':   { en: '26 stations · 251 check points', es: '26 estaciones · 251 puntos de chequeo' },
  'card.wave3.scout.label':     { en: 'Wave-3', es: 'Wave-3' },
  'card.wave3.scout.title':     { en: 'Wave-3 Scout Check Sheet', es: 'Hoja de Inspección Wave-3' },
  'card.wave3.scout.desc':      { en: '11 stations · 97 check points', es: '11 estaciones · 97 puntos de chequeo' },
  'card.potting.scout.label':   { en: 'Potting', es: 'Encapsulado' },
  'card.potting.scout.title':   { en: 'Potting Scout Check Sheet', es: 'Hoja de Inspección Encapsulado' },
  'card.potting.scout.desc':    { en: 'Automation + Plumbing · 94 check points', es: 'Automatización + Plomería · 94 puntos de chequeo' },

  'card.potting.shift.label':   { en: 'Potting', es: 'Encapsulado' },
  'card.potting.shift.title':   { en: 'Potting Tech Shift Report', es: 'Reporte de Turno Encapsulado' },
  'card.potting.shift.desc':    { en: 'Hr by hr · Downtime · NG parts · Sign off', es: 'Hora a hora · Tiempo muerto · Piezas NG · Firma' },
  'card.wave3.shift.label':     { en: 'Wave-3', es: 'Wave-3' },
  'card.wave3.shift.title':     { en: 'Wave-3 Tech Shift Report', es: 'Reporte de Turno Wave-3' },
  'card.wave3.shift.desc':      { en: 'GT production · Material C/O · 5S · NG parts', es: 'Producción GT · Cambio Material · 5S · Piezas NG' },
  'card.carousel.shift.label':  { en: 'Carousel', es: 'Carrusel' },
  'card.carousel.shift.title':  { en: 'Carousel Tech Shift Report', es: 'Reporte de Turno Carrusel' },
  'card.carousel.shift.desc':   { en: 'FT production · 8 C/O items · Scrap by type', es: 'Producción FT · 8 ítems C/O · Desperdicio por tipo' },

  'card.analytics.label':       { en: 'Live Data', es: 'Datos en Vivo' },
  'card.analytics.title':       { en: 'Analytics Dashboard', es: 'Panel de Analítica' },
  'card.analytics.desc':        { en: 'Production trends · Downtime · Scout flags · Recent activity across all reports',
                                  es: 'Tendencias de producción · Tiempo muerto · Banderas Scout · Actividad reciente de todos los reportes' },

  // ── COMMON UI ──────────────────────────────────────────────────────────
  'common.back':           { en: '← Back', es: '← Atrás' },
  'common.submit':         { en: 'Submit Report →', es: 'Enviar Reporte →' },
  'common.submitted':      { en: '✓ Report Submitted', es: '✓ Reporte Enviado' },
  'common.saving':         { en: 'Saving…', es: 'Guardando…' },
  'common.reset':          { en: '↺ Reset', es: '↺ Reiniciar' },
  'common.print':          { en: '🖨 Print', es: '🖨 Imprimir' },
  'common.refresh':        { en: '↻ Refresh', es: '↻ Actualizar' },
  'common.cancel':         { en: 'Cancel', es: 'Cancelar' },
  'common.unlock':         { en: 'Unlock', es: 'Desbloquear' },
  'common.delete':         { en: 'Delete', es: 'Eliminar' },
  'common.search':         { en: 'Search', es: 'Buscar' },
  'common.loading':        { en: 'Loading…', es: 'Cargando…' },
  'common.yes':            { en: 'Yes', es: 'Sí' },
  'common.no':             { en: 'No', es: 'No' },
  'common.add_row':        { en: '+ Add Row', es: '+ Agregar Fila' },
  'common.notes':          { en: 'Notes', es: 'Notas' },
  'common.signature':      { en: 'Signature', es: 'Firma' },
  'common.submit_another': { en: '+ Submit Another', es: '+ Enviar Otro' },

  // ── TOASTS ─────────────────────────────────────────────────────────────
  'toast.saved':           { en: '✓ Report saved & locked', es: '✓ Reporte guardado y bloqueado' },
  'toast.fillFields':      { en: 'Please fill in: ', es: 'Por favor complete: ' },
  'toast.couldNotSave':    { en: 'Could not save — ', es: 'No se pudo guardar — ' },
  'toast.checkConnection': { en: 'check your connection', es: 'verifique su conexión' },
  'toast.deleted':         { en: 'Report deleted', es: 'Reporte eliminado' },
  'toast.couldNotDelete':  { en: 'Could not delete — check connection', es: 'No se pudo eliminar — verifique conexión' },

  // ── PASSWORD MODAL ─────────────────────────────────────────────────────
  'pw.heading':            { en: 'Enter password', es: 'Ingrese contraseña' },
  'pw.prompt':             { en: 'This report is password protected.', es: 'Este reporte está protegido con contraseña.' },
  'pw.error.empty':        { en: 'Enter password', es: 'Ingrese la contraseña' },
  'pw.error.wrong':        { en: 'Wrong password', es: 'Contraseña incorrecta' },
  'pw.error.notFound':     { en: 'Report not found', es: 'Reporte no encontrado' },

  // ── SHIFT/COMMON FORM FIELDS ───────────────────────────────────────────
  'field.date':            { en: 'Date', es: 'Fecha' },
  'field.shift':           { en: 'Shift', es: 'Turno' },
  'field.line':            { en: 'Line', es: 'Línea' },
  'field.machine':         { en: 'Machine', es: 'Máquina' },
  'field.running_model':   { en: 'Running Model', es: 'Modelo en Producción' },
  'field.model_num':       { en: 'Model #', es: 'Modelo #' },
  'field.change_over':     { en: 'Change Over?', es: '¿Cambio?' },
  'field.tech':            { en: 'Tech Name', es: 'Nombre del Técnico' },
  'field.signature':       { en: 'Signature', es: 'Firma' },

  // ── SHIFT/COMMON SECTIONS ──────────────────────────────────────────────
  'shift.tab.form':        { en: 'Shift Report', es: 'Reporte de Turno' },
  'shift.tab.reports':     { en: 'Reports', es: 'Reportes' },
  'shift.section.info':    { en: 'Shift Information', es: 'Información del Turno' },
  'shift.section.production': { en: 'Hr by Hr Production (Qty)', es: 'Producción Hora a Hora (Cant.)' },
  'shift.section.production.gt': { en: 'Hr by Hr Production (Qty) — GT Production',
                                   es: 'Producción Hora a Hora (Cant.) — Producción GT' },
  'shift.section.production.ft': { en: 'Hr by Hr Production (Qty) — FT Production',
                                   es: 'Producción Hora a Hora (Cant.) — Producción FT' },
  'shift.section.downtime': { en: 'Down Time (mins) — If no WIP write NW',
                              es: 'Tiempo Muerto (min) — Si no hay WIP escriba NW' },
  'shift.section.wip':      { en: 'WIP / Scrap', es: 'WIP / Desperdicio' },
  'shift.section.wip.valves':{ en: 'WIP / Scrap / Valves', es: 'WIP / Desperdicio / Válvulas' },
  'shift.section.material_co': { en: 'Material Change Over (Yes / No)', es: 'Cambio de Material (Sí / No)' },
  'shift.section.change_over': { en: 'Is any Change Over (Yes / No)', es: '¿Hay algún Cambio (Sí / No)?' },
  'shift.section.5s':       { en: '5S — Previous Shift', es: '5S — Turno Anterior' },
  'shift.section.ng_prev':  { en: 'NG Parts Left by Previous Shift (Qty)', es: 'Piezas NG dejadas por el Turno Anterior (Cant.)' },
  'shift.section.ng_this':  { en: 'NG Parts Left This Shift (Qty)', es: 'Piezas NG dejadas Este Turno (Cant.)' },
  'shift.section.major_dt': { en: 'Major Downtime >20 mins (Machine DT only)', es: 'Tiempo Muerto Mayor >20 min (Solo TM de máquina)' },
  'shift.section.signoff':  { en: 'Sign Off', es: 'Firma' },
  'shift.hours_over':       { en: '# Hours Over Target', es: '# Horas sobre Meta' },

  // ── WIP TIMELINE ───────────────────────────────────────────────────────
  'wip.timeline.cart':     { en: 'WIP Remaining (24hr · Cart ct)', es: 'WIP Restante (24hr · cuenta de carros)' },
  'wip.timeline.trolley':  { en: 'WIP Remaining (24hr · Trolley ct)', es: 'WIP Restante (24hr · cuenta de trolleys)' },
  'wip.timeline.am':       { en: 'AM · 00–11', es: 'AM · 00–11' },
  'wip.timeline.pm':       { en: 'PM · 12–23', es: 'PM · 12–23' },

  // ── SCRAP ──────────────────────────────────────────────────────────────
  'scrap.qty':             { en: 'Scrap Qty', es: 'Cant. Desperdicio' },
  'scrap.qty.label':       { en: 'Qty', es: 'Cant.' },
  'scrap.units':           { en: 'Units', es: 'Unidades' },
  'scrap.source':          { en: 'Source', es: 'Origen' },
  'scrap.base':            { en: 'Base', es: 'Base' },
  'scrap.lid':             { en: 'Lid', es: 'Tapa' },
  'scrap.spreader':        { en: 'Ac/Dc Spreader', es: 'Disipador AC/DC' },
  'scrap.unit':            { en: 'Unit', es: 'Unidad' },

  // ── MATERIAL CHANGE-OVER ITEMS ─────────────────────────────────────────
  'mco.main_label':        { en: 'Main label', es: 'Etiqueta principal' },
  'mco.1d_label':          { en: '1D label', es: 'Etiqueta 1D' },
  'mco.sealant':           { en: 'Sealant', es: 'Sellador' },

  // ── CAROUSEL CHANGE-OVER ITEMS ─────────────────────────────────────────
  'co.tim_a':              { en: 'TIM A', es: 'TIM A' },
  'co.tim_b':              { en: 'TIM B', es: 'TIM B' },
  'co.pv804':              { en: 'Pv 804', es: 'Pv 804' },
  'co.bh1':                { en: 'BH', es: 'BH' },
  'co.bh2':                { en: 'BH', es: 'BH' },
  'co.mainl':              { en: 'MainL', es: 'MainL' },
  'co.1d_label':           { en: '1D label', es: 'Etiqueta 1D' },
  'co.1d_ribbon':          { en: '1D ribbon', es: 'Cinta 1D' },

  // ── 5S CHECKS ──────────────────────────────────────────────────────────
  '5s.ng_found':           { en: 'NG parts found on line', es: 'Piezas NG encontradas en línea' },
  '5s.trash':              { en: 'Trash on line', es: 'Basura en línea' },
  '5s.main_label_trash':   { en: 'Main label trash', es: 'Basura de etiqueta principal' },
  '5s.spillage':           { en: 'Spillage of glue', es: 'Derrame de pegamento' },
  '5s.parts_inside':       { en: 'Parts inside machine', es: 'Piezas dentro de la máquina' },

  // ── NG PARTS CATEGORIES ────────────────────────────────────────────────
  'ng.mainl':              { en: 'MainL', es: 'MainL' },
  'ng.bs':                 { en: 'B/S', es: 'B/S' },
  'ng.1d_label':           { en: '1D Label', es: 'Etiqueta 1D' },
  'ng.mes':                { en: 'MES', es: 'MES' },
  'ng.other':              { en: 'Other', es: 'Otro' },

  // ── DOWNTIME TABLE ─────────────────────────────────────────────────────
  'dt.from':               { en: 'From', es: 'Desde' },
  'dt.to':                 { en: 'To', es: 'Hasta' },
  'dt.downtime':           { en: 'Downtime', es: 'Tiempo Muerto' },
  'dt.problem':            { en: 'Problem', es: 'Problema' },
  'dt.action':             { en: 'Action Taken', es: 'Acción Tomada' },

  // ── WIP START/END ──────────────────────────────────────────────────────
  'wip.at_starting':       { en: 'At Starting', es: 'Al Iniciar' },
  'wip.at_end':            { en: 'At End', es: 'Al Final' },

  // ── HOUR LABELS (used in tables) ───────────────────────────────────────
  'hour.total':            { en: 'Total', es: 'Total' },

  // ── SCOUT CHECK SHEETS ─────────────────────────────────────────────────
  'scout.tab.checklist':   { en: 'Checklist', es: 'Lista de Chequeo' },
  'scout.tab.reports':     { en: 'Reports', es: 'Reportes' },
  'scout.title.carousel':  { en: 'Carousel — Preventive Maintenance Check Sheet', es: 'Carrusel — Hoja de Mantenimiento Preventivo' },
  'scout.title.wave3':     { en: 'Wave-3 — Preventive Maintenance Check Sheet', es: 'Wave-3 — Hoja de Mantenimiento Preventivo' },
  'scout.title.potting':   { en: 'Potting — Preventive Maintenance Check Sheet', es: 'Encapsulado — Hoja de Mantenimiento Preventivo' },
  'scout.subtitle.carousel': { en: '26 stations · 251 check points · Visual inspection & functional checks · Complete before any hands-on PM work',
                               es: '26 estaciones · 251 puntos · Inspección visual y chequeos funcionales · Complete antes de cualquier trabajo de MP' },
  'scout.subtitle.wave3':  { en: '11 stations · 97 check points · Visual inspection & functional checks · Complete before any hands-on PM work',
                             es: '11 estaciones · 97 puntos · Inspección visual y chequeos funcionales · Complete antes de cualquier trabajo de MP' },
  'scout.subtitle.potting': { en: '11 subsections · 94 check points · Automation + Plumbing · Visual & functional inspection',
                              es: '11 subsecciones · 94 puntos · Automatización + Plomería · Inspección visual y funcional' },

  'scout.legend.ok':       { en: 'OK', es: 'OK' },
  'scout.legend.attn':     { en: 'Needs Attention', es: 'Requiere Atención' },
  'scout.legend.na':       { en: 'N/A', es: 'N/A' },
  'scout.filter.all':      { en: 'All Stations', es: 'Todas las Estaciones' },
  'scout.filter.all.subs': { en: 'All Subsections', es: 'Todas las Subsecciones' },
  'scout.filter.attn':     { en: '⚠ Attention Only', es: '⚠ Solo Atención' },
  'scout.filter.auto':     { en: 'Automation', es: 'Automatización' },
  'scout.filter.plumb':    { en: 'Plumbing', es: 'Plomería' },
  'scout.section.notes':   { en: 'Section Notes (optional)', es: 'Notas de Sección (opcional)' },
  'scout.section.notes.placeholder': { en: 'Anything else worth noting for this section…', es: 'Cualquier otra cosa importante para esta sección…' },
  'scout.station.station': { en: 'Station', es: 'Estación' },
  'scout.station.complete': { en: 'complete', es: 'completo' },
  'scout.item.note.placeholder': { en: 'What needs attention?', es: '¿Qué requiere atención?' },
  'scout.progress.items':  { en: 'items', es: 'ítems' },
  'scout.summary.title':   { en: 'Items Needing Attention', es: 'Ítems que Requieren Atención' },
  'scout.summary.count':   { en: 'flagged', es: 'marcados' },
  'scout.summary.empty':   { en: '✓ All checks passed', es: '✓ Todos los chequeos pasaron' },

  // ── REPORTS TAB ────────────────────────────────────────────────────────
  'reports.title':         { en: 'Submitted Reports', es: 'Reportes Enviados' },
  'reports.title.shift':   { en: 'Submitted Shift Reports', es: 'Reportes de Turno Enviados' },
  'reports.subtitle':      { en: 'All saved reports — click any row to view details',
                             es: 'Todos los reportes guardados — haga clic en cualquier fila para ver detalles' },
  'reports.search.placeholder': { en: 'Search by tech, date, line, shift…', es: 'Buscar por técnico, fecha, línea, turno…' },
  'reports.delete.button': { en: 'Delete this report', es: 'Eliminar este reporte' },

  // ── ANALYTICS DASHBOARD ────────────────────────────────────────────────
  'analytics.title':       { en: 'Operations Overview', es: 'Resumen de Operaciones' },
  'analytics.subtitle':    { en: 'Live data from all check sheets and shift reports — auto-pulls from Supabase on load.',
                             es: 'Datos en vivo de todas las hojas y reportes de turno — se actualizan automáticamente al cargar.' },
  'analytics.range.7':     { en: '7 day', es: '7 días' },
  'analytics.range.30':    { en: '30 day', es: '30 días' },
  'analytics.range.90':    { en: '90 day', es: '90 días' },
  'analytics.range.all':   { en: 'All time', es: 'Todo el tiempo' },
  'analytics.kpi.reports': { en: 'Reports Submitted', es: 'Reportes Enviados' },
  'analytics.kpi.production': { en: 'Production (units)', es: 'Producción (unidades)' },
  'analytics.kpi.downtime': { en: 'Downtime (mins)', es: 'Tiempo Muerto (min)' },
  'analytics.kpi.flags':   { en: 'Scout Flags', es: 'Banderas Scout' },

  'analytics.panel.production': { en: 'Production Trend — Units per Day', es: 'Tendencia de Producción — Unidades por Día' },
  'analytics.panel.downtime':   { en: 'Downtime — Minutes per Day & Top Causes', es: 'Tiempo Muerto — Minutos por Día y Causas Principales' },
  'analytics.panel.wip':        { en: 'WIP Remaining — Hourly Heatmap', es: 'WIP Restante — Mapa de Calor por Hora' },
  'analytics.panel.scout':      { en: 'Scout Flags by Sheet', es: 'Banderas Scout por Hoja' },
  'analytics.panel.techs':      { en: 'Reports by Technician', es: 'Reportes por Técnico' },
  'analytics.panel.feed':       { en: 'Recent Submissions', es: 'Envíos Recientes' },
  'analytics.panel.uph':        { en: '24-Hour Production by Line (UPH)',
                                  es: 'Producción 24 Horas por Línea (UPH)' },
  'analytics.uph.subtitle':     { en: 'units per hour, mapped from shift production reports',
                                  es: 'unidades por hora, calculado de reportes de turno' },
  'analytics.uph.line':         { en: 'Line', es: 'Línea' },
  'analytics.uph.unknown_line': { en: 'Unknown Line', es: 'Línea Desconocida' },
  'analytics.uph.reports_short': { en: 'rpts', es: 'rpts' },
  'analytics.empty.uph':        { en: 'No production data with hourly breakdown in this range.',
                                  es: 'No hay datos de producción con desglose horario en este rango.' },

  // ── SCOUT FLAGS REVIEW PAGE ────────────────────────────────────────────
  'flags.title':                { en: 'Scout Flags Review',
                                  es: 'Revisión de Banderas Scout' },
  'flags.subtitle':             { en: 'All flagged items needing attention, grouped by sheet and production line.',
                                  es: 'Todos los ítems marcados que requieren atención, agrupados por hoja y línea de producción.' },
  'flags.show':                 { en: 'Show:', es: 'Mostrar:' },
  'flags.all':                  { en: 'All Sheets', es: 'Todas las Hojas' },
  'flags.car':                  { en: 'Carousel', es: 'Carrusel' },
  'flags.pott':                 { en: 'Potting', es: 'Encapsulado' },
  'flags.wav':                  { en: 'Wave-3', es: 'Wave-3' },
  'flags.scout':                { en: 'Scout', es: 'Scout' },
  'flags.sheet.car':            { en: 'Carousel', es: 'Carrusel' },
  'flags.sheet.pott':           { en: 'Potting', es: 'Encapsulado' },
  'flags.sheet.wav':            { en: 'Wave-3', es: 'Wave-3' },
  'flags.line':                 { en: 'Line', es: 'Línea' },
  'flags.unknown_line':         { en: 'Unknown Line', es: 'Línea Desconocida' },
  'flags.flagged_items':        { en: 'flagged items', es: 'ítems marcados' },
  'flags.empty.all':            { en: 'No flagged items in this range. Everything looks clean.',
                                  es: 'No hay ítems marcados en este rango. Todo se ve limpio.' },
  'flags.empty.sheet':          { en: 'No flagged items for this sheet in this range.',
                                  es: 'No hay ítems marcados para esta hoja en este rango.' },

  // Analytics dashboard "Open Flags Review" button
  'analytics.flags.button':     { en: 'Open full review →',
                                  es: 'Abrir revisión completa →' },

  // ── LANGUAGE TOGGLE ────────────────────────────────────────────────────
  'lang.label':            { en: 'EN', es: 'EN' },
  'lang.label.es':         { en: 'ES', es: 'ES' },
};

// ═══════════════════════════════════════════════════════════════════════
// HELPER LIBRARY
// ═══════════════════════════════════════════════════════════════════════

window.SALCOMP_LANG = (() => {
  try {
    const saved = localStorage.getItem('salcomp_lang');
    return saved === 'es' ? 'es' : 'en';
  } catch(e) { return 'en'; }
})();

window.t = function(key, fallback) {
  const entry = window.SALCOMP_I18N[key];
  if (!entry) return fallback || key;
  return entry[window.SALCOMP_LANG] || entry.en || fallback || key;
};

window.applyTranslations = function() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const txt = window.t(key);
    if (el.children.length === 0) {
      el.textContent = txt;
    } else {
      for (const node of el.childNodes) {
        if (node.nodeType === 3 && node.textContent.trim()) {
          node.textContent = txt;
          return;
        }
      }
      el.insertBefore(document.createTextNode(txt), el.firstChild);
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = window.t(el.getAttribute('data-i18n-placeholder'));
  });
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    el.title = window.t(el.getAttribute('data-i18n-title'));
  });
};

function syncToggleVisuals() {
  document.querySelectorAll('.lang-toggle').forEach(btn => {
    btn.querySelector('.lang-en')?.classList.toggle('active', window.SALCOMP_LANG === 'en');
    btn.querySelector('.lang-es')?.classList.toggle('active', window.SALCOMP_LANG === 'es');
  });
}

window.toggleLanguage = function() {
  window.SALCOMP_LANG = window.SALCOMP_LANG === 'en' ? 'es' : 'en';
  try { localStorage.setItem('salcomp_lang', window.SALCOMP_LANG); } catch(e) {}
  syncToggleVisuals();
  window.applyTranslations();
  if (typeof window.onLangChange === 'function') window.onLangChange();
  document.documentElement.lang = window.SALCOMP_LANG;
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.applyTranslations();
    syncToggleVisuals();
  });
} else {
  window.applyTranslations();
  syncToggleVisuals();
}
document.documentElement.lang = window.SALCOMP_LANG;

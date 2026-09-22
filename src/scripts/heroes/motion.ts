const root = document.documentElement;
const toggle = document.querySelector<HTMLButtonElement>('[data-motion-toggle]');
const label = document.querySelector<HTMLElement>('[data-motion-label]');
const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
let requestedPause = root.dataset.motion === 'paused';
function updateMotion() {
  const paused = requestedPause || preference.matches;
  root.dataset.motion = paused ? 'paused' : 'running';
  toggle?.setAttribute('aria-pressed', String(paused));
  toggle?.setAttribute('aria-label', preference.matches ? 'Animasi dijeda mengikuti pengaturan perangkat' : paused ? 'Putar animasi' : 'Jeda animasi');
  if (toggle) toggle.disabled = preference.matches;
  if (label) label.textContent = preference.matches ? 'Gerak dikurangi' : paused ? 'Putar animasi' : 'Jeda animasi';
  document.dispatchEvent(new CustomEvent('bkc:motion', { detail: { paused } }));
}
toggle?.addEventListener('click', () => {
  requestedPause = !requestedPause;
  try { sessionStorage.setItem('bkc-hero-paused', String(requestedPause)); } catch { /* Storage is optional. */ }
  updateMotion();
});
preference.addEventListener('change', updateMotion);
updateMotion();

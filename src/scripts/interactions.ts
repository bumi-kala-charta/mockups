const $all = <T extends Element = HTMLElement>(selector: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(selector));

const mobileToggle = document.querySelector<HTMLButtonElement>('.mobile-toggle');
function closeMobileMenu() {
  mobileToggle?.setAttribute('aria-expanded', 'false');
  mobileToggle?.setAttribute('aria-label', 'Buka menu');
  document.querySelector('.site-header')?.classList.remove('menu-open');
}
mobileToggle?.addEventListener('click', () => {
  const expanded = mobileToggle.getAttribute('aria-expanded') !== 'true';
  mobileToggle.setAttribute('aria-expanded', String(expanded));
  mobileToggle.setAttribute('aria-label', expanded ? 'Tutup menu' : 'Buka menu');
  document.querySelector('.site-header')?.classList.toggle('menu-open', expanded);
});
$all<HTMLAnchorElement>('.primary-nav a').forEach(link => link.addEventListener('click', closeMobileMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && mobileToggle?.getAttribute('aria-expanded') === 'true' && !document.querySelector('dialog[open]')) {
    closeMobileMenu();
    mobileToggle.focus();
  }
});

let dialogTrigger: HTMLElement | null = null;
function closeDialogs() {
  $all<HTMLDialogElement>('dialog[open]').forEach(dialog => dialog.close());
}
function openDialog(id: string, trigger: HTMLElement) {
  const dialog = document.getElementById(id) as HTMLDialogElement | null;
  if (!dialog) return;
  const wasOpen = !!document.querySelector('dialog[open]');
  if (!wasOpen) dialogTrigger = trigger;
  closeDialogs();
  dialog.showModal();
  document.body.classList.add('dialog-active');
}
$all<HTMLButtonElement>('[data-open]').forEach(button => button.addEventListener('click', () => openDialog(button.dataset.open!, button)));
$all<HTMLDialogElement>('dialog').forEach(dialog => {
  dialog.querySelector('[data-close]')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => {
    if (e.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    if (!document.querySelector('dialog[open]')) {
      document.body.classList.remove('dialog-active');
      dialogTrigger?.focus({ preventScroll: true });
    }
  });
});

$all<HTMLElement>('[data-project-gallery]').forEach(gallery => {
  const apply = (kind: string) => {
    $all<HTMLButtonElement>('[data-project-filter]', gallery).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.projectFilter === kind)));
    let count = 0;
    $all<HTMLElement>('[data-project-card]', gallery).forEach(card => {card.hidden = kind !== 'Semua' && card.dataset.kind !== kind; if (!card.hidden) count++;});
    const counter = gallery.querySelector('.result-count');
    if (counter) counter.textContent = `${count} pekerjaan contoh`;
  };
  $all<HTMLButtonElement>('[data-project-filter]', gallery).forEach(button => button.addEventListener('click', () => apply(button.dataset.projectFilter!)));
  $all<HTMLElement>('[data-project-filter-jump]').forEach(link => link.addEventListener('click', () => apply(link.dataset.projectFilterJump!)));
});

$all<HTMLElement>('[data-explorer]').forEach(explorer => {
  let selected = 'pesisir';
  let zoom = 1;
  const select = (id: string) => {
    selected = id;
    $all<HTMLButtonElement>('[data-map-project], [data-map-select]', explorer).forEach(b => b.setAttribute('aria-pressed', String((b.dataset.mapProject || b.dataset.mapSelect) === selected)));
    $all<HTMLElement>('[data-map-detail]', explorer).forEach(d => d.hidden = d.dataset.mapDetail !== selected);
  };
  const filter = (kind: string) => {
    $all<HTMLButtonElement>('[data-map-filter]', explorer).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.mapFilter === kind)));
    $all<HTMLElement>('[data-kind]', explorer).forEach(item => item.hidden = kind !== 'Semua' && item.dataset.kind !== kind);
    const visible = $all<HTMLButtonElement>('[data-map-select]', explorer).filter(b => !b.hidden);
    const counter = explorer.querySelector('.map-count');
    if (counter) counter.textContent = `${visible.length} lokasi contoh`;
    if (!visible.some(b => b.dataset.mapSelect === selected) && visible[0]) select(visible[0].dataset.mapSelect!);
  };
  $all<HTMLButtonElement>('[data-map-project], [data-map-select]', explorer).forEach(button => button.addEventListener('click', () => select((button.dataset.mapProject || button.dataset.mapSelect)!)));
  $all<HTMLButtonElement>('[data-map-filter]', explorer).forEach(button => button.addEventListener('click', () => filter(button.dataset.mapFilter!)));
  $all<HTMLButtonElement>('[data-zoom]', explorer).forEach(button => button.addEventListener('click', () => {
    zoom = button.dataset.zoom === 'reset' ? 1 : Math.min(2, Math.max(1, zoom + (button.dataset.zoom === 'in' ? .25 : -.25)));
    const world = explorer.querySelector<HTMLElement>('.map-world');
    if (world) world.style.transform = `scale(${zoom})`;
    const scale = explorer.querySelector('.map-scale small');
    if (scale) scale.textContent = `${Math.round(500 / zoom)} km · skala indikatif`;
    explorer.querySelector<HTMLButtonElement>('[data-zoom="out"]')!.disabled = zoom === 1;
    explorer.querySelector<HTMLButtonElement>('[data-zoom="in"]')!.disabled = zoom === 2;
  }));
  explorer.querySelector<HTMLButtonElement>('[data-zoom="out"]')!.disabled = true;
  const jump = (id: string) => {filter('Semua');select(id);document.getElementById('peta')?.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});};
  $all<HTMLElement>('[data-map-jump]').forEach(a => a.addEventListener('click', () => jump(a.dataset.mapJump!)));
  $all<HTMLElement>('[data-dialog-map]').forEach(b => b.addEventListener('click', () => {closeDialogs();jump(b.dataset.dialogMap!);setTimeout(() => explorer.querySelector<HTMLButtonElement>(`[data-map-select="${b.dataset.dialogMap}"]`)?.focus({preventScroll:true}), 0);}));
});

const guidance = [
  ['Siapkan gambaran wilayahnya.', 'Ceritakan lokasi, tujuan pemetaan, keluaran yang diperlukan, serta perkiraan waktu pengerjaan.'],
  ['Mulai dari pertanyaan riset.', 'Ceritakan pertanyaan, konteks wilayah, sumber data yang tersedia, serta bentuk kerja sama yang dibayangkan.'],
  ['Kenali kebutuhan belajarnya.', 'Ceritakan topik, latar belakang peserta, format kegiatan, serta pengalaman yang ingin dipelajari bersama.'],
];
$all<HTMLButtonElement>('[data-collab-topic]').forEach(button => button.addEventListener('click', () => {
  $all<HTMLButtonElement>('[data-collab-topic]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
  const [title, description] = guidance[Number(button.dataset.collabTopic)];
  document.querySelector('.collab-guidance h3')!.textContent = title;
  document.querySelector('.collab-guidance p')!.textContent = description;
}));

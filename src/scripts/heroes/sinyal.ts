/** Natural Earth land-mask ASCII renderer. Geometry is sampled once, never per frame. */
interface EarthMask { width:number; height:number; mask:string; }

async function startSinyal() {
  const host = document.querySelector<HTMLElement>('[data-sinyal-globe]');
  const canvas = host?.querySelector<HTMLCanvasElement>('canvas');
  const context = canvas?.getContext('2d', { alpha:true });
  if (!host || !canvas || !context) return;
  const status = document.querySelector<HTMLElement>('[data-sinyal-status]');
  const response = await fetch('/heroes/sinyal-data.json');
  if (!response.ok) return;
  const earth:EarthMask = await response.json();
  const binary = atob(earth.mask);
  const mask = Uint8Array.from(binary, character => character.charCodeAt(0));
  await document.fonts.ready;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = document.documentElement.dataset.motion === 'paused' || reduced.matches;
  let visible = true;
  let request = 0;
  let last = 0;
  let rotation = 110 * Math.PI / 180;
  let frame = 0;
  let size = 0;
  const columns = 112;
  const rows = 56;
  const tilt = 16 * Math.PI / 180;
  const cosTilt = Math.cos(tilt);
  const sinTilt = Math.sin(tilt);
  const style = getComputedStyle(host);
  const colour = (token:string) => style.getPropertyValue(token).trim();
  const sea = colour('--green-700');
  const landColours = [colour('--green-500'), colour('--green-400'), colour('--green-300'), colour('--green-200')];
  const cells:{column:number;row:number;latitude:number;longitude:number;z:number}[] = [];
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const x = (column - (columns - 1) / 2) / (columns / 2 - 2);
      const y = ((rows - 1) / 2 - row) / (rows / 2 - 1);
      const radius = x*x + y*y;
      if (radius > 1) continue;
      const z = Math.sqrt(1-radius);
      cells.push({column,row,z,
        latitude:Math.asin(y*cosTilt+z*sinTilt)*180/Math.PI,
        longitude:Math.atan2(x,z*cosTilt-y*sinTilt)
      });
    }
  }

  function draw() {
    if (!context || !canvas || !host || size === 0) return;
    context.clearRect(0, 0, size, size);
    context.font = `400 ${size/(columns*.601)}px "IBM Plex Mono", monospace`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    const cellWidth = size/columns;
    const cellHeight = size/rows;
    for (const cell of cells) {
      const longitude = (cell.longitude+rotation)*180/Math.PI;
      const u = Math.floor((longitude+540)%360);
      const v = Math.min(179,Math.max(0,Math.floor(90-cell.latitude)));
      const index = v*earth.width+u;
      const land = Boolean(mask[index>>3] & (1<<(index%8)));
      const depth = cell.z;
      context.fillStyle = land ? landColours[Math.min(3,Math.floor(depth*3.8))]! : sea;
      const glyph = land ? (depth>.72 ? '#' : depth>.35 ? '+' : ':') : '.';
      context.fillText(glyph,(cell.column+.5)*cellWidth,(cell.row+.5)*cellHeight);
    }
    host.dataset.ready = 'true';
    host.dataset.frame = String(++frame);
  }

  function tick(time:number) {
    if (paused || document.hidden || !visible) { request = 0; return; }
    if (!last) last = time;
    const delta = time-last;
    if (delta >= 1000/24) {
      rotation = (rotation + Math.min(delta,100)*.000055) % (Math.PI*2);
      last = time;
      draw();
    }
    request = requestAnimationFrame(tick);
  }

  function sync() {
    if (!host) return;
    const active = !paused && !document.hidden && visible;
    host.dataset.motionState = active ? 'running' : 'paused';
    if (status) status.textContent = active ? 'Perspektif berputar' : 'Perspektif dijeda';
    if (active && !request) { last=0; request=requestAnimationFrame(tick); }
    else if (!active && request) { cancelAnimationFrame(request); request=0; }
  }

  const resize = new ResizeObserver(() => {
    size = host.getBoundingClientRect().width;
    const dpr = Math.min(window.devicePixelRatio || 1,2);
    canvas.width = Math.round(size*dpr);
    canvas.height = Math.round(size*dpr);
    context.setTransform(dpr,0,0,dpr,0,0);
    draw();
  });
  resize.observe(host);
  const observer = new IntersectionObserver(entries => {
    visible = Boolean(entries[0]?.isIntersecting);
    sync();
  });
  observer.observe(host);
  document.addEventListener('visibilitychange',sync);
  document.addEventListener('bkc:motion',event => {
    paused = (event as CustomEvent<{paused:boolean}>).detail.paused;
    sync();
  });
  reduced.addEventListener('change',() => {
    paused = reduced.matches || document.documentElement.dataset.motion === 'paused';
    sync();
  });
  window.addEventListener('pagehide',event => {
    cancelAnimationFrame(request);
    request = 0;
    if (!event.persisted) {
      resize.disconnect();
      observer.disconnect();
    }
  });
  window.addEventListener('pageshow',event => {
    if (event.persisted) sync();
  });
  sync();
}

startSinyal().catch(() => {
  const status = document.querySelector<HTMLElement>('[data-sinyal-status]');
  if (status) status.textContent = 'Perspektif statis';
});

(function(){
  const monthLabel = document.getElementById('monthLabel');
  const daysGrid = document.getElementById('daysGrid');
  const dayNames = document.getElementById('dayNames');
  const prevBtn = document.getElementById('prevMonth');
  const nextBtn = document.getElementById('nextMonth');
  const DAYS = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
  let current = new Date();

  function renderDayNames(){
    dayNames.innerHTML = '';
    for(const d of DAYS){
      const el = document.createElement('div'); el.className='day-name'; el.textContent = d; dayNames.appendChild(el);
    }
  }

  function render(){
    const year = current.getFullYear();
    const month = current.getMonth();
    const first = new Date(year, month, 1);
    const last = new Date(year, month+1, 0);
    monthLabel.textContent = current.toLocaleString('es-ES', {month:'long', year:'numeric'});

    daysGrid.innerHTML = '';

    // JS getDay: 0 Sun, 1 Mon ... we want Monday-first, so compute offset
    const startOffset = (first.getDay() + 6) % 7; // 0..6, 0=Monday
    for(let i=0;i<startOffset;i++){
      const empty = document.createElement('div'); empty.className='day disabled'; empty.setAttribute('aria-hidden','true'); daysGrid.appendChild(empty);
    }

    const today = new Date();
    for(let d=1; d<= last.getDate(); d++){
      const el = document.createElement('div'); el.className='day'; el.textContent = d;
      if(today.getDate()===d && today.getMonth()===month && today.getFullYear()===year){ el.classList.add('today'); }
      daysGrid.appendChild(el);
    }
  }

  prevBtn && prevBtn.addEventListener('click', ()=>{ current.setMonth(current.getMonth()-1); render(); });
  nextBtn && nextBtn.addEventListener('click', ()=>{ current.setMonth(current.getMonth()+1); render(); });

  if(monthLabel && daysGrid && dayNames){ renderDayNames(); render(); }
  // Responsive: construir vista de tarjetas por día cuando sea móvil
  function renderDayCards(){
    const container = document.getElementById('dayCards');
    if(!container) return;
    const mobile = window.matchMedia('(max-width:480px)').matches;
    if(!mobile){ container.hidden = true; return; }
    container.hidden = false;

    const dayBuckets = {2:[],3:[],4:[],5:[],6:[]};
    const blocks = document.querySelectorAll('.schedule .class-block');
    blocks.forEach(b=>{
      const cs = window.getComputedStyle(b);
      let col = parseInt(cs.gridColumnStart,10);
      if(!col){ col = parseInt(b.style.gridColumn,10) || null; }
      if(col>=2 && col<=6){ dayBuckets[col].push(b); }
    });

    const names = ['Lunes','Martes','Miércoles','Jueves','Viernes'];
    container.innerHTML = '';
    for(let i=2;i<=6;i++){
      const dayWrap = document.createElement('section'); dayWrap.className='day-card';
      const h = document.createElement('h3'); h.textContent = names[i-2]; dayWrap.appendChild(h);
      const list = document.createElement('div'); list.className='day-card-list';
      if(dayBuckets[i].length===0){
        const empty = document.createElement('div'); empty.className='day-card-empty'; empty.textContent = '— Sin actividades —';
        list.appendChild(empty);
      } else {
        dayBuckets[i].forEach(b=>{
          const item = document.createElement('article'); item.className='day-card-item';
          // copy subject class for color
          b.classList.forEach(cn=>{ if(cn.startsWith('sub-')) item.classList.add(cn); });
          const statusEl = b.querySelector('.status');
          const title = b.querySelector('.class-title')?.textContent || '';
          const meta = b.querySelector('.class-meta')?.textContent || '';
          const statusText = statusEl?.textContent || '';
          const statusClass = statusEl?.classList.contains('cancelled') ? 'cancelled' : statusEl?.classList.contains('virtual') ? 'virtual' : 'active';
          item.innerHTML = `<div class="status ${statusClass}">${statusText}</div><div class="day-card-title">${title}</div><div class="day-card-meta">${meta}</div>`;
          list.appendChild(item);
        });
      }
      dayWrap.appendChild(list);
      container.appendChild(dayWrap);
    }
  }

  function debounce(fn, wait=150){ let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a), wait); }; }
  const debRender = debounce(renderDayCards, 200);
  window.addEventListener('resize', debRender);
  document.addEventListener('DOMContentLoaded', ()=>{ renderDayCards(); });
  // initial call
  renderDayCards();
})();

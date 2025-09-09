 
    const entries = [
      // Noroeste
      { name: 'Baja California', type: 'Estado', timeZone: 'America/Tijuana', note: 'Con horario de verano (sincroniza con California, EE. UU.)' },
      // Pacífico (UTC-7, sin DST)
      { name: 'Baja California Sur', type: 'Estado', timeZone: 'America/Mazatlan' },
      { name: 'Sinaloa', type: 'Estado', timeZone: 'America/Mazatlan' },
      { name: 'Nayarit (excepto Bahía de Banderas)', type: 'Estado', timeZone: 'America/Mazatlan' },
      // Sonora propio (UTC-7, sin DST)
      { name: 'Sonora', type: 'Estado', timeZone: 'America/Hermosillo', note: 'Sin horario de verano' },
      // Chihuahua variantes
      { name: 'Chihuahua (mayoría del estado)', type: 'Estado', timeZone: 'America/Chihuahua', note: 'Sin horario de verano' },
      { name: 'Ciudad Juárez (Chihuahua)', type: 'Municipio', timeZone: 'America/Ciudad_Juarez', note: 'Con horario de verano (sincroniza con El Paso, EE. UU.)' },
      { name: 'Ojinaga (Chihuahua)', type: 'Municipio', timeZone: 'America/Ojinaga', note: 'Con horario de verano (sincroniza con Presidio, EE. UU.)' },
      // Noreste (UTC-6, sin DST; zona específica IANA)
      { name: 'Coahuila (la mayor parte)', type: 'Estado', timeZone: 'America/Monterrey' },
      { name: 'Nuevo León', type: 'Estado', timeZone: 'America/Monterrey' },
      { name: 'Tamaulipas (la mayor parte)', type: 'Estado', timeZone: 'America/Monterrey' },
      { name: 'Durango', type: 'Estado', timeZone: 'America/Monterrey' },
      // Centro (UTC-6, sin DST)
      { name: 'Aguascalientes', type: 'Estado', timeZone: 'America/Mexico_City' },
      { name: 'Colima', type: 'Estado', timeZone: 'America/Mexico_City' },
      { name: 'Chiapas', type: 'Estado', timeZone: 'America/Mexico_City' },
      { name: 'Ciudad de México', type: 'Entidad', timeZone: 'America/Mexico_City' },
      { name: 'Guanajuato', type: 'Estado', timeZone: 'America/Mexico_City' },
      { name: 'Guerrero', type: 'Estado', timeZone: 'America/Mexico_City' },
      { name: 'Hidalgo', type: 'Estado', timeZone: 'America/Mexico_City' },
      { name: 'Jalisco', type: 'Estado', timeZone: 'America/Mexico_City' },
      { name: 'Estado de México', type: 'Estado', timeZone: 'America/Mexico_City' },
      { name: 'Michoacán', type: 'Estado', timeZone: 'America/Mexico_City' },
      { name: 'Morelos', type: 'Estado', timeZone: 'America/Mexico_City' },
      { name: 'Oaxaca', type: 'Estado', timeZone: 'America/Mexico_City' },
      { name: 'Puebla', type: 'Estado', timeZone: 'America/Mexico_City' },
      { name: 'Querétaro', type: 'Estado', timeZone: 'America/Mexico_City' },
      { name: 'San Luis Potosí', type: 'Estado', timeZone: 'America/Mexico_City' },
      { name: 'Tabasco', type: 'Estado', timeZone: 'America/Mexico_City' },
      { name: 'Tlaxcala', type: 'Estado', timeZone: 'America/Mexico_City' },
      { name: 'Veracruz', type: 'Estado', timeZone: 'America/Mexico_City' },
      { name: 'Zacatecas', type: 'Estado', timeZone: 'America/Mexico_City' },
      // Península de Yucatán (UTC-6)
      { name: 'Campeche', type: 'Estado', timeZone: 'America/Merida' },
      { name: 'Yucatán', type: 'Estado', timeZone: 'America/Merida' },
      // Sureste (UTC-5)
      { name: 'Quintana Roo', type: 'Estado', timeZone: 'America/Cancun', note: 'Sin horario de verano (UTC−05 todo el año)' },
      // Nayarit excepción (zona dedicada)
      { name: 'Bahía de Banderas (Nayarit)', type: 'Municipio', timeZone: 'America/Bahia_Banderas', note: 'Alineado con Puerto Vallarta, Jalisco' },
    ];

    // === Render ===
    const grid = document.getElementById('grid');

    function formatTime(tz, date = new Date()) {
      return new Intl.DateTimeFormat('es-MX', {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: true, timeZone: tz,
         
      }).format(date);
       

      
    }
    function formatDate(tz, date = new Date()) {
      return new Intl.DateTimeFormat('es-MX', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        timeZone: tz
      }).format(date);
    }

    function zoneLabel(tz) {
      const map = {
        'America/Tijuana': 'Noroeste (Baja California) — DST',
        'America/Mazatlan': 'Pacífico (UTC−07) — sin DST',
        'America/Hermosillo': 'Sonora (UTC−07) — sin DST',
        'America/Ciudad_Juarez': 'Juárez (frontera) — con DST',
        'America/Ojinaga': 'Ojinaga (frontera) — con DST',
        'America/Chihuahua': 'Chihuahua (UTC−06) — sin DST',
        'America/Monterrey': 'Noreste (UTC−06)',
        'America/Mexico_City': 'Centro (UTC−06)',
        'America/Merida': 'Península de Yucatán (UTC−06)',
        'America/Cancun': 'Quintana Roo (UTC−05)',
        'America/Bahia_Banderas': 'Bahía de Banderas (UTC−06)'
      };
      return map[tz] || tz;
    }

    function createCard(entry) {
      const card = document.createElement('article');
      card.className = 'card p-4 flex flex-col gap-2';
      card.dataset.tz = entry.timeZone;
      card.dataset.name = entry.name.toLowerCase();

      card.innerHTML = `
        <div class="flex items-start justify-between gap-2">
          <div>
            <h3 class="text-lg font-semibold">${entry.name}</h3>
            <div class="text-xs text-slate-500">${entry.type} • <span class="chip">${zoneLabel(entry.timeZone)}</span></div>
          </div>
          <div class="text-right">
            <div class="text-2xl font-bold leading-none tabular-nums" data-role="clock">--:--:--</div>
            <div class="text-xs text-slate-500" data-role="date">—</div>
          </div>
        </div>
        ${entry.note ? `<p class="text-sm text-slate-600">${entry.note}</p>` : ''}
      `;

      return card;
    }

    // Render inicial
    entries.forEach(e => grid.appendChild(createCard(e)));

    // Actualización de relojes
    function tick() {
      const now = new Date();
      document.querySelectorAll('[data-role="clock"]').forEach((el) => {
        const tz = el.closest('article').dataset.tz;
        el.textContent = formatTime(tz, now);
      });
      document.querySelectorAll('[data-role="date"]').forEach((el) => {
        const tz = el.closest('article').dataset.tz;
        el.textContent = formatDate(tz, now);
      });
    }
    tick();
    setInterval(tick, 1000);

    // Búsqueda y filtro por zona
    const search = document.getElementById('search');
    const filterZone = document.getElementById('filterZone');

    function applyFilters() {
      const q = search.value.trim().toLowerCase();
      const z = filterZone.value;
      document.querySelectorAll('#grid article').forEach(card => {
        const matchText = !q || card.dataset.name.includes(q);
        const matchZone = !z || card.dataset.tz === z;
        card.style.display = (matchText && matchZone) ? '' : 'none';
      });
    }
    search.addEventListener('input', applyFilters);
    filterZone.addEventListener('change', applyFilters);

    let usa = new Date().getFullYear();
    document.getElementById('ono').textContent = usa;

     function tiempo(){
    let tiempo = new Date();
    let hora = tiempo.getHours();
    let minutos = tiempo.getMinutes();
    let segundos = tiempo.getSeconds();
    const ampm = hora >= 12 ? "PM" : "AM";
    
    minutos = minutos.toString().padStart(2, '0');
    segundos = segundos.toString().padStart(2, '0');
    hora = hora % 12 || 12;
    document.getElementById('tiempos').textContent = `${hora}:${minutos}:${segundos} ${ampm}`;
     }
tiempo();
setInterval(tiempo, 1000);

  /* ============================================================
     DATA JADWAL
     Tambah/edit entri di sini. Kolom:
       name     : nama mata kuliah
       time     : jam mulai–selesai
       dosen    : singkatan dosen (opsional, null jika kosong)
       isPraktik: true jika sesi praktikum
  ============================================================ */
  const JADWAL = [
    {
      hari: 'Senin', dayKey: 'senin',
      sesi: [
        { name: 'Algoritma Pemrograman',         time: '08.00 – 09.30', dosen: null,  isPraktik: false },
        { name: 'Praktik Algoritma Pemrograman', time: '09.45 – 11.15', dosen: 'AMP', isPraktik: true  },
        { name: 'Praktik Pemrograman Web',       time: '11.30 – 13.00', dosen: null,  isPraktik: true  },
        { name: 'Pemrograman Web',               time: '13.15 – 14.45', dosen: 'SSY', isPraktik: false },
      ]
    },
    {
      hari: 'Selasa', dayKey: 'selasa',
      sesi: [
        { name: 'Matematika Diskrit', time: '08.00 – 10.30', dosen: 'HMS', isPraktik: false },
      ]
    },
    {
      hari: 'Rabu', dayKey: 'rabu',
      sesi: [
        { name: 'Perancangan Basis Data', time: '13.15 – 16.30', dosen: 'YMT', isPraktik: false },
      ]
    },
    {
      hari: 'Kamis', dayKey: 'kamis',
      sesi: [
        { name: 'Praktik Jaringan Komputer', time: '08.00 – 09.30', dosen: null,  isPraktik: true  },
        { name: 'Jaringan Komputer',         time: '09.45 – 11.15', dosen: 'HUK', isPraktik: false },
        { name: 'Konsep Sistem Informasi',   time: '11.30 – 14.00', dosen: 'MPU', isPraktik: false },
      ]
    },
    {
      hari: 'Jumat', dayKey: 'libur',
      sesi: []
    },
  ];

  /* Hari aktif berdasarkan tanggal lokal */
  const HARI_MAP = ['libur','senin','selasa','rabu','kamis','jumat','libur']; // 0=Minggu
  const todayIdx = new Date().getDay();
  const todayKey = HARI_MAP[todayIdx];

  /* Update today pill */
  const todayEntry = JADWAL.find(d => d.dayKey === todayKey);
  const todayPill  = document.getElementById('todayPill');
  const todayText  = document.getElementById('todayText');
  if (todayEntry && todayEntry.sesi.length > 0) {
    todayText.textContent = `Hari ini: ${todayEntry.hari} · ${todayEntry.sesi.length} sesi`;
  } else if (todayKey === 'libur') {
    todayText.textContent = 'Hari ini tidak ada kuliah 🎉';
    todayPill.style.background = 'rgba(167,139,250,0.12)';
    todayPill.style.borderColor = 'rgba(167,139,250,0.25)';
    todayPill.querySelector('.today-dot').style.background = 'var(--accent-1)';
    todayText.style.color = 'var(--accent-1)';
  } else {
    todayText.textContent = 'Hari ini tidak ada kuliah';
  }

  /* Clock icon SVG */
  const clockSVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;

  /* Render */
  const grid = document.getElementById('scheduleGrid');

  JADWAL.forEach((day, i) => {
    const isToday  = day.dayKey === todayKey && day.sesi.length > 0;
    const isLibur  = day.sesi.length === 0;

    const card = document.createElement('div');
    card.className = `day-card day-${day.dayKey}${isToday ? ' today' : ''}${isLibur ? ' libur' : ''}`;
    card.style.animationDelay = `${i * 0.07}s`;

    const countLabel = isToday
      ? `<span class="today-tag">Hari Ini</span>`
      : `<span class="day-count">${day.sesi.length} sesi</span>`;

    const sesHtml = isLibur
      ? `<div class="libur-text">😴 Tidak ada kuliah</div>`
      : day.sesi.map(s => `
          <div class="session">
            <div class="session-dot"></div>
            <div class="session-body">
              <div class="session-name">${s.name}</div>
              <div class="session-meta">
                <span class="session-time">${clockSVG} ${s.time}</span>
                ${s.dosen    ? `<span class="session-dosen">${s.dosen}</span>` : ''}
                ${s.isPraktik ? `<span class="session-praktik">Praktik</span>` : ''}
              </div>
            </div>
          </div>`).join('');

    card.innerHTML = `
      <div class="day-header">
        <span class="day-name">${day.hari}</span>
        ${countLabel}
      </div>
      ${sesHtml}`;

    grid.appendChild(card);
  });

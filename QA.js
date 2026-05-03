 /* ============================================================
     ✏️  DATA LINK — edit di sini

     FEATURED (3 link utama — tampil besar):
       url      : URL tujuan ('https://...')
       title    : Nama link
       desc     : Deskripsi singkat
       icon     : Emoji ikon
       label    : Kategori label (teks kecil)
       type     : 'portal' | 'lms' | 'drive'  ← untuk warna aksen

     LINKS (link tambahan — tampil kecil):
       url, name, sub, icon
  ============================================================ */
  const FEATURED = [
    {
      url:   'https://sia.kaputama.ac.id/index.php',        // 👈 Ganti URL portal akademik
      title: 'Portal Akademik',
      desc:  'Cek nilai, KRS, jadwal, dan informasi akademik resmi kampus.',
      icon:  '🏫',
      label: 'Portal Kampus',
      type:  'portal',
    },
    {
      url:   'https://e-learning.kaputama.ac.id/login/index.php?testsession=1369',      // 👈 Ganti URL E-Learning / LMS
      title: 'E-Learning / LMS',
      desc:  'Akses materi kuliah, submit tugas.',
      icon:  '💻',
      label: 'LMS',
      type:  'lms',
    },
    {
      url:   'https://drive.google.com/drive/folders/1RpgWOcEv6nVEVa4vTkWi1cqB6k1ogasZ?hl=ID', // 👈 Ganti link Google Drive kelas
      title: 'Google Drive Kelas',
      desc:  'Folder bersama untuk kumpul tugas kelompok dan berbagi file.',
      icon:  '📁',
      label: 'Google Drive',
      type:  'drive',
    },
  ];

  const LINKS = [
    { url: 'https://classroom.google.com',  name: 'Google Classroom', sub: 'Tugas & materi',     icon: '🎓' },
    { url: 'https://zoom.us/id/signin#/login',       name: 'Zoom meeting',      sub: 'Zoom kelas',   icon: '📹' },
    { url: 'https://kaputama.ac.id/halaman/download',       name: 'File Kampus',     sub: 'File pengumuman',        icon: '📧' },
    { url: 'https://calendar.google.com',   name: 'Google Calendar',  sub: 'Jadwal & reminder',  icon: '📅' },
    { url: 'https://docs.google.com',       name: 'Google Docs',      sub: 'Dokumen bersama',    icon: '📝' },
    { url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ8Aw8fVaNSKOVoAXxdoiV1AIzxwN217YceVHzf2IwKIQCcOm78-KVWNTVEqcMRZlgqAcUNg3I_gJ20/pubhtml',     name: 'Google Sheets',    sub: 'Spreadsheet kelas',  icon: '📊' },
    { url: 'https://www.instagram.com/suck__lyn/',  name: 'IG Komting', sub: 'Follow IG Suclyn',    icon: '📸' }, // 👈 Ganti nomor
    { url: 'https://www.w3schools.com/',      name: 'W3Schools',         sub: 'Belajar coding',    icon: '💻' },
  ];

  /* ── Render featured cards ── */
  const featuredGrid = document.getElementById('featuredGrid');
  const arrowSVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7v10"/></svg>`;

  FEATURED.forEach((item, i) => {
    const a = document.createElement('a');
    a.href = item.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.className = `featured-card card-${item.type}`;
    a.style.animationDelay = `${i * 0.09}s`;
    a.innerHTML = `
      <div class="featured-body">
        <div class="featured-icon-row">
          <div class="featured-icon icon-${item.type}">${item.icon}</div>
          <div class="featured-arrow">${arrowSVG}</div>
        </div>
        <span class="featured-label label-${item.type}">${item.label}</span>
        <div class="featured-title">${item.title}</div>
        <div class="featured-desc">${item.desc}</div>
        <div class="featured-url">${item.url}</div>
      </div>`;
    featuredGrid.appendChild(a);
  });

  /* ── Render small link cards ── */
  const linksGrid = document.getElementById('linksGrid');
  LINKS.forEach((item, i) => {
    const a = document.createElement('a');
    a.href = item.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.className = 'link-card';
    a.style.animationDelay = `${(FEATURED.length * 0.09) + i * 0.055}s`;
    a.innerHTML = `
      <div class="link-card-icon">${item.icon}</div>
      <div class="link-card-body">
        <div class="link-card-name">${item.name}</div>
        <div class="link-card-sub">${item.sub}</div>
      </div>
      <div class="link-card-arr">${arrowSVG}</div>`;
    linksGrid.appendChild(a);
  });

  /* ── Toast helper ── */
  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2600);
  }

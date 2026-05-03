 /* ============================================================
     ⚙️  KONFIGURASI SUPABASE
     Ganti nilai di bawah dengan URL dan API Key project Supabase kamu.
     Bisa ditemukan di: Supabase Dashboard → Settings → API
  ============================================================ */
  const SUPABASE_URL = 'https://cmlpwrmlpgdbdericybh.supabase.co'; // ✅ Sudah dikonfigurasi
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtbHB3cm1scGdkYmRlcmljeWJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2OTAwMDMsImV4cCI6MjA5MzI2NjAwM30.aX03eg1bIFLLSAZfRqB5YZODfv7xHf33zwK_Cp7oj2M'; // ✅ Sudah dikonfigurasi
 
  /* ============================================================
     📋 NAMA TABEL & KOLOM DI SUPABASE
     Sesuaikan dengan struktur tabel yang kamu buat.
 
     Contoh SQL untuk membuat tabel:
     -----------------------------------------------------------
     CREATE TABLE resources (
       id          BIGSERIAL PRIMARY KEY,
       judul       TEXT NOT NULL,
       mata_kuliah TEXT NOT NULL,
       kategori    TEXT CHECK (kategori IN ('materi','tugas')) NOT NULL,
       deskripsi   TEXT,
       link_url    TEXT,
       tanggal     DATE DEFAULT now(),
       icon        TEXT DEFAULT '📄'
     );
     -- Aktifkan Row Level Security (RLS) lalu buat policy SELECT public:
     ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
     CREATE POLICY "Public read" ON resources FOR SELECT USING (true);
     -----------------------------------------------------------
  ============================================================ */
  const TABLE_NAME = 'resources'; // 👈 Sesuaikan nama tabel
 
  /* ============================================================
     🗄️  DATA FALLBACK (DEMO)
     Ditampilkan HANYA jika Supabase gagal / tabel masih kosong.
     Update sesuai data awal kamu, atau kosongkan array-nya.
  ============================================================ */
  const DEMO_DATA = [
    {
      id: 1, judul: 'Database Control', mata_kuliah: 'Basis Data',
      kategori: 'materi', deskripsi: 'Database Control',
      link_url: 'https://drive.google.com/file/d/1WLV19-p5vguEL42_rA-AnfMeuYf2WbbC/view?usp=sharing',
      tanggal: '2026-05-02', icon: '🗄️'
    },
  ];
 
  /* ============================================================
     STATE APLIKASI
  ============================================================ */
  let allResources = [];      // seluruh data dari Supabase (atau demo)
  let filteredResources = []; // hasil filter + search aktif
  let activeFilter = 'semua'; // filter kategori aktif
  let searchQuery = '';       // kata kunci search aktif
 
  /* ============================================================
     📡 FETCH DATA DARI SUPABASE
     Menggunakan Supabase REST API secara langsung (tanpa library).
     Endpoint: GET /rest/v1/{TABLE_NAME}?select=*&order=tanggal.desc
  ============================================================ */
  async function fetchResources() {
    const url = `${SUPABASE_URL}/rest/v1/${TABLE_NAME}?select=*&order=tanggal.desc`;
 
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
        }
      });
 
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || `HTTP ${response.status}: Gagal mengambil data dari Supabase.`);
      }
 
      const data = await response.json();
 
      // Jika tabel masih kosong, tampilkan data fallback
      if (!Array.isArray(data) || data.length === 0) {
        console.info('ℹ️  Tabel kosong — menampilkan data fallback.');
        return DEMO_DATA;
      }
 
      return data;
 
    } catch (err) {
      // Jika fetch gagal (jaringan/CORS/dll), tampilkan data fallback + log error
      console.error('⚠️  Supabase fetch gagal:', err.message, '— menampilkan data fallback.');
      throw err; // Lempar ulang agar error box muncul
    }
  }
 
  /* ============================================================
     🔍 FILTER & SEARCH (CLIENT-SIDE)
     Dipanggil setiap kali search query atau filter berubah.
  ============================================================ */
  function applyFilters() {
    filteredResources = allResources.filter(item => {
      // Filter berdasarkan kategori
      const matchCategory =
        activeFilter === 'semua' ||
        item.kategori.toLowerCase() === activeFilter;
 
      // Filter berdasarkan search query (nama mata kuliah atau judul)
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        item.judul.toLowerCase().includes(q) ||
        item.mata_kuliah.toLowerCase().includes(q) ||
        (item.deskripsi && item.deskripsi.toLowerCase().includes(q));
 
      return matchCategory && matchSearch;
    });
 
    renderCards();
  }
 
  /* ============================================================
     🃏 RENDER KARTU
  ============================================================ */
  function renderCards() {
    const grid = document.getElementById('cardsGrid');
    grid.innerHTML = '';
    grid.style.display = 'grid';
    document.getElementById('statusMsg').style.display = 'none';
 
    if (filteredResources.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z"/>
          </svg>
          <p>Tidak ada resource ditemukan.</p>
          <small>Coba kata kunci atau filter yang berbeda.</small>
        </div>`;
      return;
    }
 
    filteredResources.forEach((item, idx) => {
      const card = buildCard(item, idx);
      grid.appendChild(card);
    });
  }
 
  /* ============================================================
     🏗️  BUILD CARD ELEMENT
  ============================================================ */
  function buildCard(item, idx) {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.animationDelay = `${idx * 0.06}s`;
 
    const kategori = (item.kategori || 'materi').toLowerCase();
    const icon = item.icon || (kategori === 'tugas' ? '📝' : '📄');
    const tanggal = item.tanggal
      ? new Date(item.tanggal).toLocaleDateString('id-ID', { day:'2-digit', month:'short', year:'numeric' })
      : '—';
 
    card.innerHTML = `
      <div class="card-top">
        <div class="card-icon ${kategori}">${icon}</div>
        <span class="badge ${kategori}">${kategori}</span>
      </div>
      <div>
        <div class="card-subject">${escHtml(item.mata_kuliah)}</div>
        <div class="card-title">${escHtml(item.judul)}</div>
      </div>
      <div class="card-desc">${escHtml(item.deskripsi || 'Tidak ada deskripsi.')}</div>
      <div class="card-meta">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          ${tanggal}
        </span>
      </div>
      <div class="card-actions">
        ${item.link_url
          ? `<a href="${escHtml(item.link_url)}" target="_blank" rel="noopener" class="btn btn-primary">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
               </svg>
               Buka
             </a>`
          : `<button class="btn btn-primary" disabled style="opacity:0.4;cursor:not-allowed;">Tidak Ada Link</button>`
        }
        <button class="btn btn-secondary" onclick="copyLink('${escHtml(item.link_url || '')}')">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
          </svg>
          Salin
        </button>
      </div>`;
    return card;
  }
 
  /* ============================================================
     📊 UPDATE STATISTIK
  ============================================================ */
  function updateStats(data) {
    document.getElementById('statTotal').textContent = data.length;
    document.getElementById('statMateri').textContent = data.filter(d => d.kategori === 'materi').length;
    document.getElementById('statTugas').textContent  = data.filter(d => d.kategori === 'tugas').length;
  }
 
  /* ============================================================
     🔔 TOAST NOTIFICATION
  ============================================================ */
  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2800);
  }
 
  /* ============================================================
     📋 SALIN LINK KE CLIPBOARD
  ============================================================ */
  function copyLink(url) {
    if (!url || url === '#') { showToast('❌ Tidak ada link untuk disalin.'); return; }
    navigator.clipboard.writeText(url)
      .then(() => showToast('✅ Link berhasil disalin!'))
      .catch(() => showToast('❌ Gagal menyalin link.'));
  }
 
  /* ============================================================
     🛡️  ESCAPE HTML (MENCEGAH XSS)
  ============================================================ */
  function escHtml(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
 
  /* ============================================================
     🎯 EVENT LISTENERS
  ============================================================ */
 
  // Search bar — debounce 300ms agar tidak terlalu sering filter
  let searchDebounce;
  document.getElementById('searchInput').addEventListener('input', e => {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      searchQuery = e.target.value.trim();
      applyFilters();
    }, 300);
  });
 
  // Filter tabs
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      applyFilters();
    });
  });
 
  /* ============================================================
     🚀 INIT — Jalankan saat halaman pertama kali dimuat
  ============================================================ */
  async function init() {
    const statusMsg = document.getElementById('statusMsg');
    const errorBox  = document.getElementById('errorBox');
 
    try {
      statusMsg.style.display = 'block';
      errorBox.classList.remove('visible');
 
      allResources = await fetchResources();
      filteredResources = [...allResources];
 
      updateStats(allResources);
      renderCards();
 
    } catch (err) {
      console.error('Supabase fetch error:', err);
      statusMsg.style.display = 'none';
      document.getElementById('cardsGrid').style.display = 'none';
      errorBox.textContent = `⚠️  Gagal memuat data: ${err.message}`;
      errorBox.classList.add('visible');
    }
  }
 
  init();



  
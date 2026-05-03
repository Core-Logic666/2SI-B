/* ============================================================
     DATA ANGGOTA KELAS 2SI/B
     ✏️  Edit nama, NIM, dan jabatan di sini.
     jabatan: 'komting' | 'wakil' | 'sekretaris' | 'bendahara' | 'anggota'
  ============================================================ */
  document.addEventListener('DOMContentLoaded', function() {
  const ANGGOTA = [
    /* ── PENGURUS INTI (urutan 1–4) ── */
    { no: 1,  nama: 'Suclyn Agus Tirta',    npm: '25441060', jabatan: 'komting',    emoji: '👑' },
    { no: 2,  nama: 'Albern Bryan',      npm: '25441065', jabatan: 'wakil',      emoji: '🎖️' },
    { no: 3,  nama: 'Nama Sekretaris', npm: '00000003', jabatan: 'sekretaris', emoji: '📋' },
    { no: 4,  nama: 'Nama Bendahara',  npm: '00000004', jabatan: 'bendahara',  emoji: '💰' },

    /* ── ANGGOTA (urutan 5–32) ── */
    { no: 5,  nama: 'Anggota 5',  npm: '00000005', jabatan: 'Mahasiswa', emoji: '👤' },
    { no: 6,  nama: 'Anggota 6',  npm: '00000006', jabatan: 'Mahasiswa', emoji: '👤' },
    { no: 7,  nama: 'Anggota 7',  npm: '00000007', jabatan: 'Mahasiswa', emoji: '👤' },
    { no: 8,  nama: 'Anggota 8',  npm: '00000008', jabatan: 'Mahasiswa', emoji: '👤' },
    { no: 9,  nama: 'Anggota 9',  npm: '00000009', jabatan: 'Mahasiswa', emoji: '👤' },
    { no: 10, nama: 'Anggota 10', npm: '00000010', jabatan: 'Mahasiswa', emoji: '👤' },
    { no: 11, nama: 'Anggota 11', npm: '00000011', jabatan: 'Mahasiswa', emoji: '👤' },
    { no: 12, nama: 'Anggota 12', npm: '00000012', jabatan: 'Mahasiswa', emoji: '👤' },
    { no: 13, nama: 'Anggota 13', npm: '00000013', jabatan: 'Mahasiswa', emoji: '👤' },
    { no: 14, nama: 'Anggota 14', npm: '00000014', jabatan: 'Mahasiswa', emoji: '👤' },
    { no: 15, nama: 'Anggota 15', npm: '00000015', jabatan: 'Mahasiswa', emoji: '👤' },
    { no: 16, nama: 'Anggota 16', npm: '00000016', jabatan: 'Mahasiswa', emoji: '👤' },
    { no: 17, nama: 'Anggota 17', npm: '00000017', jabatan: 'Mahasiswa', emoji: '👤' },
    { no: 18, nama: 'Anggota 18', npm: '00000018', jabatan: 'Mahasiswa', emoji: '👤' },
    { no: 19, nama: 'Anggota 19', npm: '00000019', jabatan: 'Mahasiswa', emoji: '👤' },
    { no: 20, nama: 'Anggota 20', npm: '00000020', jabatan: 'Mahasiswa', emoji: '👤' },
    { no: 21, nama: 'Anggota 21', npm: '00000021', jabatan: 'Mahasiswa', emoji: '👤' },
    { no: 22, nama: 'Anggota 22', npm: '00000022', jabatan: 'Mahasiswa', emoji: '👤' },
    { no: 23, nama: 'Anggota 23', npm: '00000023', jabatan: 'Mahasiswa', emoji: '👤' },
    { no: 24, nama: 'Anggota 24', npm: '00000024', jabatan: 'Mahasiswa', emoji: '👤' },
    { no: 25, nama: 'Anggota 25', npm: '00000025', jabatan: 'Mahasiswa', emoji: '👤' },
    { no: 26, nama: 'Anggota 26', npm: '00000026', jabatan: 'Mahasiswa', emoji: '👤' },
    { no: 27, nama: 'Anggota 27', npm: '00000027', jabatan: 'Mahasiswa', emoji: '👤' },
    { no: 28, nama: 'Anggota 28', npm: '00000028', jabatan: 'Mahasiswa', emoji: '👤' },
    { no: 29, nama: 'Anggota 29', npm: '00000029', jabatan: 'Mahasiswa', emoji: '👤' },
    { no: 30, nama: 'Anggota 30', npm: '00000030', jabatan: 'Mahasiswa', emoji: '👤' },
    { no: 31, nama: 'Anggota 31', npm: '00000031', jabatan: 'Mahasiswa', emoji: '👤' },
    { no: 32, nama: 'Anggota 32', npm: '00000032', jabatan: 'Mahasiswa', emoji: '👤' },
  ];

  /* Label tampilan per jabatan */
  const JABATAN_LABEL = {
    komting:    'Komting',
    wakil:      'Wakil Komting',
    sekretaris: 'Sekretaris',
    bendahara:  'Bendahara',
    anggota:    'Anggota',
  };

  /* Update nama di org chart */
  const inti = ANGGOTA.filter(a => a.jabatan !== 'anggota');
  inti.forEach(p => {
    const el = document.getElementById(`nama-${p.jabatan}`);
    if (el) el.textContent = p.nama;
  });

  /* Render member grid */
  const grid = document.getElementById('membersGrid');
  if (grid) {
    ANGGOTA.forEach((a, idx) => {
      const isInti = a.jabatan !== 'anggota';
      const card = document.createElement('div');
      card.className = `member-card${isInti ? ' is-inti' : ''}`;
      card.style.animationDelay = `${idx * 0.035}s`;
      card.innerHTML = `
        <div class="member-avatar">${a.emoji}</div>
        <div class="member-no">#${String(a.no).padStart(2,'0')}</div>
        <div class="member-nama">${a.nama}</div>
        <span class="member-jabatan-badge badge-${a.jabatan}">${JABATAN_LABEL[a.jabatan]}</span>
        <div style="font-size:10px;color:var(--text-secondary);margin-top:5px;">${a.nim}</div>
      `;
      grid.appendChild(card);
    });
  } else {
    console.error("Elemen membersGrid tidak ditemukan!");
  }
});
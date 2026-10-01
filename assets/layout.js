/* =========================================================
   MENWASH ADMIN — Shared layout (sidebar + topbar)
   Satu sumber untuk sidebar & topbar di semua halaman; tiap halaman
   memanggil Layout.mount(opts) dengan #layoutSidebar dan #layoutTopbar
   sebagai placeholder.

   Tombol "Aktifkan Mesin Tunai" di topbar hanya dirender bila halaman
   punya #qaModal (modal-nya tetap hidup di masing-masing halaman karena
   isinya sedikit berbeda per halaman — flow-nya tidak diubah).
   ========================================================= */

/* Semua tujuan navigasi lama dipertahankan; sub-menu "Mesin" diratakan
   menjadi grup berlabel supaya tidak perlu klik dua kali. */
const NAV_GROUPS = [
  { label: 'Utama', items: [
    { key: 'dashboard', href: 'dashboard.html', icon: 'dashboard', label: 'Dashboard' },
  ]},
  { label: 'Mesin', items: [
    { key: 'mesin', href: 'mesin.html', icon: 'machine', label: 'Semua Mesin' },
    { key: 'gangguan', href: 'gangguan.html', icon: 'alert', label: 'Mesin Gangguan', danger: true },
  ]},
  { label: 'Aktivitas &amp; Transaksi', items: [
    { key: 'transaksi', href: 'transaksi.html', icon: 'invoice', label: 'Transaksi' },
    { key: 'progress', href: 'progress.html', icon: 'progress', label: 'Progress' },
  ]},
];

const Layout = {
  sidebarHTML(opts) {
    const navHTML = NAV_GROUPS.map(group => {
      const items = group.items.map(item => {
        const cls = [item.key === opts.active ? 'active' : '', item.danger ? 'nav-danger' : ''].filter(Boolean).join(' ');
        const current = item.key === opts.active ? ' aria-current="page"' : '';
        const badge = item.danger ? `<span class="badge">${opts.badgeGangguan ?? '1'}</span>` : '';
        return `<a href="${item.href}"${cls ? ` class="${cls}"` : ''}${current} title="${item.label}">${Icons.render(item.icon, { size: 20 })}<span class="lbl">${item.label}</span>${badge}</a>`;
      }).join('');
      return `<div class="nav-label">${group.label}</div>${items}`;
    }).join('');

    return `
      <div>
        <div class="brand">
          <div class="brand-mark">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
          </div>
          <div>
            <div class="brand-name">Menwash</div>
            <div class="brand-sub">Admin Panel</div>
          </div>
        </div>
        <div class="sidebar-divider"></div>
        <nav class="nav">${navHTML}</nav>
      </div>

      <div class="sb-bottom">
        <div class="sidebar-outlet">
          <span class="o-dot"></span>
          <div>
            <div class="o-name">Outlet Laundry Cendrawasih</div>
            <div class="o-addr">12/13 mesin online</div>
          </div>
        </div>
        <a href="login.html" class="logout-btn" title="Keluar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
          <span class="lbl">Keluar</span>
        </a>
      </div>
    `;
  },

  topbarHTML(opts) {
    const titleHTML = opts.titleIcon
      ? `<div class="topbar-title" style="display:flex; align-items:center; gap:8px;">${Icons.render(opts.titleIcon, { size: 20, className: 'topbar-title-icon' })}${opts.title}</div>`
      : `<div class="topbar-title">${opts.title}</div>`;

    return `
      <div>
        ${titleHTML}
        <div class="topbar-sub">${opts.subtitle || ''}</div>
      </div>
      <div class="topbar-right">
        <div class="clock" id="liveClock">
          <b>09:41:07</b>
          <span>Kamis, hari ini</span>
        </div>
        <div class="topbar-actions" id="layoutActions"></div>
        <button type="button" class="icon-btn" aria-label="Notifikasi">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          <span class="ping"></span>
        </button>
        <div class="user">
          <div class="avatar">RA</div>
          <div class="user-meta">
            <b>Rani Admin</b>
            <span>Admin Outlet</span>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--text-soft); margin-left: 4px;"><path d="m6 9 6 6 6-6"/></svg>
        </div>
      </div>
    `;
  },

  mount(opts) {
    const sidebarEl = document.getElementById('layoutSidebar');
    if (sidebarEl) sidebarEl.innerHTML = this.sidebarHTML(opts);
    const topbarEl = document.getElementById('layoutTopbar');
    if (topbarEl) topbarEl.innerHTML = this.topbarHTML(opts);
    this.syncQuickActivate();
    // beberapa halaman memanggil mount() sebelum markup modal-nya ada di DOM
    document.addEventListener("DOMContentLoaded", () => this.syncQuickActivate());
    this.hydrateIcons();
  },

  syncQuickActivate() {
    const slot = document.getElementById("layoutActions");
    if (!slot || slot.firstElementChild || !document.getElementById("qaModal")) return;
    slot.innerHTML = `<button type="button" class="btn btn-primary" onclick="showStep('qa',1); openEl('qaModal')">${Icons.render("add", { size: 18 })}<span class="lbl">Aktifkan Mesin Tunai</span></button>`;
  },

  /* Ikon di konten halaman cukup ditulis <span data-icon="nama" data-size="20">;
     SVG-nya diisi dari assets/icons.js supaya tidak di-copy-paste per halaman. */
  hydrateIcons(root) {
    (root || document).querySelectorAll('[data-icon]').forEach(el => {
      if (el.firstElementChild) return;
      el.innerHTML = Icons.render(el.dataset.icon, { size: Number(el.dataset.size) || 20 });
    });
  },
};

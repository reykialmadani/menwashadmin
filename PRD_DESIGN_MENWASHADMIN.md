# PRD Design — Menwash Admin (Redesign UI/UX)

Status: Disepakati untuk implementasi
Cakupan: Redesign visual seluruh halaman admin (`login`, `dashboard`, `mesin`, `gangguan`, `transaksi`, `progress`, `dummy-restart`). Alur/flow bisnis TIDAK berubah — murni redesign tampilan + refactor teknis pendukungnya (ikon, layout shared, toolbar tabel).

---

## 1. Latar Belakang & Temuan Audit

Menwash Admin adalah aplikasi **static HTML/CSS/JS murni** (tanpa framework, tanpa build tool, tanpa `package.json`). Semua styling terpusat di `assets/admin.css`, interaksi di `assets/admin.js`, dan tiap halaman adalah file `.html` berdiri sendiri.

Temuan penting sebelum redesign:

1. **Inkonsistensi brand**: komentar di `admin.css` dan favicon/aksen login masih mengacu ke palet terracotta (`#D25353` / `#FFEAD3`), tapi variabel warna yang benar-benar dipakai (`--terracotta`, `--maroon`) sudah di-override jadi grayscale (`#000000` / `#333333`). `--radius-*` semuanya `0px` dan `--shadow-*` semuanya `none` → tampilan flat, kotak tajam, tanpa elevasi.
2. **Ikon**: seluruhnya inline `<svg>` hand-written, diduplikasi di 5+ file untuk ikon yang sama (mesin, lonceng, checklist, dsb). Tidak ada package ikon.
3. **Duplikasi layout**: sidebar, topbar, modal "Aktifkan Mesin Tunai", dan FAB di-copy-paste mentah nyaris identik di setiap halaman.
4. **Tabel**: hanya `transaksi.html` dan `progress.html` yang punya `<table>` sungguhan. Tidak ada search bar di seluruh aplikasi — filter hanya lewat chip kategori. Tidak ada pagination di manapun.
5. **Card**: berbagai varian card (`stat-card`, `gs-card`, `m-card`, `gangguan-card`, `mini-stat`) semua flat, border keras, tanpa shadow, radius 0.

**Keputusan arah (hasil diskusi dengan user):**

| Area | Keputusan |
|---|---|
| Palet warna | Lanjutkan sistem **grayscale/monokrom** yang sudah berjalan (bukan revert ke terracotta). Warna status (ok/busy/err/off/amber) tetap dipertahankan. |
| Ikon | **HugeIcons**, diintegrasikan sebagai SVG inline (bukan font/CDN runtime) via satu modul `assets/icons.js`, karena project tanpa build tool. |
| Layout sidebar/topbar | Diekstrak jadi **shared component** via `assets/layout.js` (inject ke semua halaman), bukan duplikasi manual. |
| Tabel (search/pagination) | **UI dirapikan penuh** (search bar, filter, pagination di posisi yang benar & bergaya profesional). Search berfungsi client-side; pagination ditampilkan dengan pola production-ready tapi tidak perlu memperbanyak dummy data. |
| Card | Semua card: rounded + background putih + shadow tipis, seragam di seluruh halaman. |

---

## 2. Prinsip Desain

1. **Satu sistem, bukan tambal sulam** — semua card, tabel, tombol, badge memakai token yang sama (`--radius-*`, `--shadow-*`, palet zinc), tidak ada nilai hardcoded baru per halaman.
2. **Flow tidak disentuh** — setiap `onclick`, id elemen yang dipakai JS (`qaModal`, `mDrawer`, `txTableBody`, dst), dan urutan langkah wizard/modal tetap sama persis. Redesign murni visual + refactor markup pendukung (layout shared, toolbar tabel, ikon).
3. **Elevasi lembut, bukan dekoratif** — shadow dipakai untuk membedakan card dari background halaman (`--page-bg` vs `--card-bg`), bukan efek dramatis. Border dipertahankan tapi lebih tipis/soft karena shadow sudah memberi definisi.
4. **Ikon konsisten** — satu sumber (HugeIcons, style "stroke rounded"), satu ukuran per konteks (16 / 18 / 20 / 24px), selalu `stroke="currentColor"` supaya ikut warna teks/status di sekitarnya.
5. **Tabel = alat kerja admin** — toolbar (search + filter + info jumlah) selalu di atas tabel dalam satu baris rapi; pagination selalu di bawah tabel dalam card yang sama; tidak ada elemen kontrol yang menempel random di luar card.

---

## 3. Design Tokens

### 3.1 Warna (tetap grayscale, direfinisi ke skala zinc agar konsisten & tidak pekat/kontras berlebihan)

```css
/* Netral / brand ink */
--terracotta-light:#71717A;   /* zinc-500 — border hover, aksen sekunder */
--terracotta:       #18181B;  /* zinc-900 — primary actions, active nav, ikon utama */
--maroon:           #27272A;  /* zinc-800 — hover state dari primary, teks penting */
--cream:            #F4F4F5;  /* zinc-100 — wash background lembut (info box, dashed box) */

/* Sidebar (gelap, tidak berubah arah, hanya diselaraskan ke skala yang sama) */
--sidebar-1:#18181B; --sidebar-2:#27272A;
--sidebar-text:#FAFAFA; --sidebar-text-dim:#A1A1AA;

/* Layer halaman */
--page-bg:  #F4F4F5;  /* zinc-100 */
--card-bg:  #FFFFFF;
--border:      #D4D4D8; /* zinc-300 */
--border-soft: #E4E4E7; /* zinc-200 */

/* Teks */
--text:      #18181B; /* zinc-900 */
--text-soft: #71717A; /* zinc-500 */
--text-faint:#A1A1AA; /* zinc-400 */

/* Status — TIDAK berubah, sudah baik & sudah jadi bahasa visual admin */
--ok:#16A34A;    --ok-bg:#DCFCE7;
--busy:#3B82F6;  --busy-bg:#DBEAFE;
--err:#EF4444;   --err-bg:#FEE2E2;
--off:#6B7280;   --off-bg:#F3F4F6;
--amber:#F59E0B; --amber-bg:#FEF3C7;
```

Catatan: nama variabel (`--terracotta`, `--maroon`, dst) **dipertahankan apa adanya** meski isinya sekarang grayscale — mengganti nama akan memaksa audit ulang semua inline `style="color:var(--terracotta)"` di 7 file HTML tanpa manfaat visual. Ini keputusan teknis pragmatis, bukan pengabaian kerapian.

### 3.2 Radius & Shadow (dari 0/none → sistem elevasi lembut)

```css
--radius-sm:  8px;   /* chip kecil, input, badge persegi */
--radius-md:  12px;  /* card kecil (m-card, gs-card, mini-stat) */
--radius-lg:  16px;  /* card utama, modal, drawer */
--radius-xl:  20px;  /* elemen besar/hero (login card) */
--radius-full:999px; /* pill: fchip, badge, avatar */

--shadow-card:  0 1px 2px rgba(24,24,27,.04), 0 1px 3px rgba(24,24,27,.06);
--shadow-hover: 0 4px 14px rgba(24,24,27,.08);
--shadow-pop:   0 12px 32px rgba(24,24,27,.14), 0 2px 8px rgba(24,24,27,.06);
```

Aturan pakai:
- `.card`, `.stat-card`, `.gs-card`, `.gangguan-card`, `.m-card`, `.mini-stat`, `.confirm-modal`, `.modal`, `.drawer` → `border-radius: var(--radius-lg|md)` + `box-shadow: var(--shadow-card)` + background putih (`--card-bg`), border diturunkan ke `--border-soft` (bukan `--border`) karena shadow sudah cukup memberi pemisahan.
- Elemen yang bisa diklik (card mesin, baris tabel `.row-click`, card gangguan) → tambahkan `:hover { box-shadow: var(--shadow-hover); transform: translateY(-1px); }`.
- Modal/drawer/toast (elemen mengambang di atas overlay) → `--shadow-pop`.

### 3.3 Tipografi & Ikon

- Font display diganti dari `Fredoka` (playful/rounded, kurang cocok untuk panel yang menangani uang & transaksi) ke **`Sora`** — modern, tegas, tetap ramah, dan bentuk angkanya jelas untuk nominal Rupiah/statistik. Font body tetap **`Plus Jakarta Sans`** (sudah profesional & mudah dibaca, tidak diganti). Kedua font diatur lewat `--font-display`/`--font-body` di satu tempat (`admin.css`), otomatis berlaku di semua 7 halaman.
- Ikon: **HugeIcons**, style *stroke rounded*, diambil dari `@hugeicons/static` dan disimpan inline dalam `assets/icons.js` sebagai fungsi `Icons.nama(size, extraClass)` yang mengembalikan string SVG (`stroke="currentColor"`, `stroke-width` mengikuti skala HugeIcons ~1.5).
- Ukuran standar: `16px` (badge/tombol kecil/tab), `18px` (nav sidebar, tombol biasa), `20–22px` (topbar/notifikasi), `24–28px` (ikon besar di stat card / empty state / drawer sukses).
- Set ikon yang direplikasi dari inline SVG lama → HugeIcons (mapping 1:1 makna, bukan bentuk):

| Pemakaian lama | Ikon HugeIcons pengganti |
|---|---|
| Logo drum mesin (brand mark, favicon) | `washing-machine-01` |
| Dashboard (grid 4 kotak) | `dashboard-square-01` |
| Mesin (drum) | `washing-machine-01` |
| Transaksi (invoice/list) | `invoice-01` |
| Progress (jam) | `time-progress-02` |
| Keluar/logout | `logout-03` |
| Lonceng notifikasi | `notification-02` |
| Info | `information-circle` |
| Peringatan/danger | `alert-02` |
| Sukses/centang | `checkmark-circle-02` |
| Close/X | `cancel-01` |
| Tambah (FAB) | `add-01` |
| Uang tunai | `money-01` |
| Empty state / tidak ada data | `search-remove` |
| Search bar | `search-01` |
| Filter | `filter` |
| Pagination prev/next | `arrow-left-01` / `arrow-right-01` |
| Export/download (baru, opsional) | `download-04` |

---

## 4. Komponen Card — Spesifikasi Redesign

Semua varian card di bawah ini mengikuti resep yang sama: **background putih + radius + shadow tipis + border soft**, hanya beda internal layout.

- `.card` (kontainer utama tabel/list): `border-radius: var(--radius-lg)`, `box-shadow: var(--shadow-card)`, `border: 1px solid var(--border-soft)`.
- `.stat-card`, `.gs-card`, `.mini-stat`: `border-radius: var(--radius-md)`, shadow sama, padding tetap.
- `.m-card`, `.gangguan-card`: `border-radius: var(--radius-md)`, tambah `transition: box-shadow .18s, transform .18s` untuk hover-lift karena keduanya clickable.
- Ikon di dalam card (`.s-icon`, `.gs-icon`, `.gc-machine-icon`, `.m-card .m-icon`) tetap pakai warna background lembut per status (`--*-bg`) — ini sudah bagus, dipertahankan, hanya SVG di dalamnya diganti ke HugeIcons.

---

## 5. Redesign Tabel — Pola Toolbar Profesional

Pola baru ini dipakai di **`transaksi.html`** dan **`progress.html`** (dua tabel: Selesai & Gagal/Gangguan), menggantikan pola lama (chip mengambang sendirian di atas card terpisah).

```
┌─ .card ───────────────────────────────────────────────────┐
│ card-head: judul + subtitle jumlah data                   │
├─ table-toolbar ─────────────────────────────────────────── │
│ [🔍 Search input.......... ]   [chip: Semua|QRIS|Tunai|..]│
├─ table ─────────────────────────────────────────────────── │
│  ... baris data ...                                        │
├─ table-pagination ─────────────────────────────────────────│
│ Menampilkan 1–8 dari 8 data      [‹ Sebelumnya] [1] [Selanjutnya ›]│
└─────────────────────────────────────────────────────────────┘
```

Spesifikasi:
- **`.table-toolbar`**: flex row, `justify-content: space-between`, `padding: 14px 20px`, `border-bottom: 1px solid var(--border-soft)`, `gap: 12px`, `flex-wrap: wrap`. Search box di kiri (`flex: 1 1 240px`, max-width agar tidak terlalu lebar di layar besar), chip filter di kanan.
- **`.table-search`**: input dengan ikon `search-01` di kiri (absolute-positioned di dalam wrapper `position:relative`), `border-radius: var(--radius-sm)`, `border: 1.5px solid var(--border)`, `padding: 9px 12px 9px 36px`, placeholder abu (`--text-faint`).
- Search **berfungsi client-side**: filter baris berdasarkan teks di kolom ID Transaksi / Mesin / Layanan (case-insensitive), digabung dengan filter chip yang sedang aktif (AND, bukan OR) — dua kontrol saling melengkapi, bukan saling menimpa.
- **`.table-pagination`**: flex row, `justify-content: space-between`, `padding: 12px 20px`, `border-top: 1px solid var(--border-soft)`, teks info kiri (`Menampilkan X–Y dari Z data`) + tombol prev/nomor halaman/next kanan. Karena dataset dummy kecil (≤8 baris), pagination ditampilkan dengan **1 halaman aktif** dan tombol prev/next dalam kondisi `disabled` bergaya konsisten (bukan disembunyikan) — ini tetap mendemonstrasikan pola production-ready tanpa perlu memperbanyak data dummy (sesuai keputusan scope).
- Chip filter (`.fchip`) posisinya pindah dari card terpisah ke dalam `.table-toolbar` yang sama dengan search — menghapus 1 card mengambang yang sebelumnya berdiri sendiri di atas tabel transaksi.

---

## 6. Refactor Layout Shared (`assets/layout.js`)

Sidebar dan topbar disalin manual di 7 file — ini yang diekstrak ke `assets/layout.js`.

- Tiap halaman HTML kini hanya berisi: `<aside class="sidebar" id="layoutSidebar"></aside>` dan `<div class="topbar" id="layoutTopbar"></div>` sebagai placeholder.
- `assets/icons.js` lalu `assets/layout.js` di-include, diikuti pemanggilan `Layout.mount({ active, title, subtitle, badgeGangguan, titleIcon? })` — merender sidebar (nav aktif otomatis berdasar `active`, termasuk sub-menu Mesin/Mesin Gangguan) dan topbar (judul, subjudul, ikon opsional, lonceng, jam, avatar) ke kedua placeholder tersebut.
- `Layout.mount()` dipanggil **sebelum** `assets/admin.js` dan sebelum script khusus tiap halaman, supaya elemen seperti `#liveClock` sudah ada di DOM saat dibutuhkan.
- **Modal "Aktifkan Mesin Tunai", drawer Kontrol Darurat, modal konfirmasi, toast, dan FAB tetap di masing-masing halaman** (tidak diekstrak) — keputusan sadar karena isinya sedikit berbeda per halaman (daftar mesin dummy di `<select>`, contoh ID transaksi, state tambahan seperti `dActionAvailableInfo` di `mesin.html`). Mengekstraknya berisiko menimpa perbedaan kecil yang sebenarnya bagian dari flow yang harus dijaga tetap benar. Modal-modal ini tetap mendapat redesign visual penuh (rounded, shadow, ikon) lewat CSS/token yang sama.
- Manfaat: perubahan desain sidebar/topbar ke depan cukup di 1 file, bukan 7 — bagian dengan duplikasi paling tinggi dan risiko paling rendah untuk diekstrak.

---

## 7. Peta Halaman — Ada Berapa Halaman & Struktur Layoutnya

Menwash Admin terdiri dari **7 halaman** (7 file `.html`, semua di root project, tidak ada sub-folder route). Dari 7 itu, **1 halaman berdiri sendiri tanpa shell admin** (`login.html`) dan **6 halaman memakai shell admin yang sama** (sidebar + topbar dari `assets/layout.js` + area `.content`).

| No | Halaman (file) | Diakses dari | Fungsi halaman | Struktur layout | Tipe konten utama |
|---|---|---|---|---|---|
| 1 | `login.html` | Entry point pertama (tidak ada nav masuk dari halaman lain) | Autentikasi admin outlet sebelum masuk ke dashboard | **Standalone** — tanpa sidebar/topbar, hanya 1 card terpusat di atas background gradasi gelap | Form login (3 field + 1 tombol) |
| 2 | `dashboard.html` | Nav sidebar → Dashboard · tujuan setelah login | Ringkasan operasional harian outlet (angka kunci, tren, gangguan aktif) | Shell admin penuh: sidebar + topbar + `.content` | 4 stat card, 1 card alert gangguan, 1 chart card (line), 2 card donut berdampingan, 2 card grid (mini-stat + timeline) |
| 3 | `mesin.html` | Nav sidebar → Mesin → Semua Mesin | Melihat & mengontrol status seluruh mesin cuci/pengering | Shell admin penuh | Mini-stat row, toolbar filter+search, 2 card grid mesin (`.m-card`), modal Kontrol Darurat |
| 4 | `gangguan.html` | Nav sidebar → Mesin → Mesin Gangguan (sub-menu, badge merah) | Pusat penanganan mesin bermasalah & riwayat kompensasi pelanggan | Shell admin penuh | Stat grid 2×2, urgent banner, grid card gangguan (`.gangguan-card`), tabel riwayat + toolbar/pagination, modal Kontrol Darurat + modal konfirmasi kecil |
| 5 | `transaksi.html` | Nav sidebar → Transaksi | Riwayat seluruh transaksi outlet (QRIS/Tunai/Dummy/Gagal) | Shell admin penuh | 1 card tabel dengan toolbar (search+filter) + pagination, modal Aktifkan Mesin Tunai |
| 6 | `progress.html` | Nav sidebar → Progress | Memantau siklus mesin yang sedang berjalan + riwayat selesai/gagal | Shell admin penuh | Mini-stat row, list card siklus berjalan (`.cycle-row` + ring progress), 1 card tab (Selesai/Gagal) berisi 2 tabel dengan toolbar/pagination, modal Kontrol Darurat + modal Aktifkan Mesin Tunai |
| 7 | `dummy-restart.html` | Tombol "Pelanggan Datang (Restart Dummy)" dari `dashboard.html`, `gangguan.html`, atau `progress.html` | Alur restart mesin pakai uang dummy untuk pelanggan yang gangguan siklusnya | Shell admin penuh | Wizard 4 langkah (`.wizard-steps` + `.rd-option`) di dalam 1 card, tanpa FAB/modal tambahan |

Semua 6 halaman ber-shell memakai **struktur DOM yang identik**: `<aside id="layoutSidebar">` + `<div id="layoutTopbar">` (diisi `assets/layout.js`) membungkus `<div class="content">` yang isinya unik per halaman. Ini yang membuat redesign sidebar/topbar (§6) cukup dilakukan satu kali dan otomatis konsisten di ke-6 halaman tersebut — hanya `login.html` yang sengaja dikecualikan karena secara fungsi ia bukan bagian dari "ruang kerja admin", melainkan gerbang sebelum masuk ke dalamnya.

Alur navigasi antar halaman (tidak berubah dari sebelumnya):

```
login.html
   └─▶ dashboard.html ─┬─▶ mesin.html ──▶ gangguan.html
                        │                     │
                        ├─▶ transaksi.html    │
                        │                     │
                        └─▶ progress.html ◀───┘
                                 │
                                 ▼
                        dummy-restart.html
                        (dari dashboard/gangguan/progress,
                         kembali ke progress.html setelah selesai)
```

---

## 8. Per-Halaman — Ringkasan Perubahan

| Halaman | Perubahan visual utama |
|---|---|
| `login.html` | Card login: radius besar (`--radius-xl`), shadow-pop, ikon HugeIcons. Layout & langkah tidak berubah. |
| `dashboard.html` | Stat card + chart card + donut card: rounded + shadow. Ikon donat/legend/notifikasi → HugeIcons. |
| `mesin.html` | `.m-card` rounded + shadow + hover-lift. Chip filter status dirapikan jadi satu baris toolbar di atas grid (bukan menempel di card-head). |
| `gangguan.html` | `.gangguan-card`, `.gs-card`, urgent banner: rounded + shadow. History filter row dirapikan mengikuti pola toolbar. |
| `transaksi.html` | Toolbar tabel baru (search + filter chip dalam satu baris) + pagination bar (lihat §5). |
| `progress.html` | Sama seperti transaksi untuk kedua tab tabel (Selesai/Gagal); cycle-row & cycle-ring tetap, hanya rounded+shadow. |
| `dummy-restart.html` | Wizard step & `rd-option`: rounded + shadow, ikon HugeIcons di step indicator. |

Tidak ada perubahan pada: urutan langkah wizard, logic filter JS (`filterMachines`, `filterCycles`, `applyTxFilter`), maupun endpoint/simulasi async (`simulateAsyncCommand`). Fungsi filter yang ada di-*extend* (bukan diganti) supaya search & filter bekerja bersamaan — mis. `filterMachines` di `mesin.html` dibungkus supaya hasil filter status tetap mempertimbangkan kata kunci pencarian yang aktif.

**Cakupan penggantian ikon (iterasi ini):** brand mark, seluruh item navigasi sidebar, ikon topbar (lonceng, ikon judul halaman gangguan), serta ikon baru pada toolbar tabel (search, filter, panah pagination) — semuanya HugeIcons via `assets/icons.js`. Ikon-ikon lama yang tersebar di dalam konten tiap halaman (mis. ikon status di `m-card`, `gc-machine-icon`, ikon di dalam `stat-card`, ikon centang/alert di dalam modal) **belum diganti satu-per-satu** pada iterasi ini — jumlahnya puluhan dan tersebar manual di tiap file HTML tanpa templating, sehingga penggantian menyeluruh lebih baik dikerjakan sebagai iterasi lanjutan yang terpisah dari perombakan struktur besar ini. Ikon-ikon tersebut tetap konsisten secara visual (stroke, currentColor) dengan yang baru karena gaya HugeIcons stroke-rounded serupa dengan gaya asli.

---

## 9. File yang Ditambahkan/Diubah

**Baru:**
- `assets/icons.js` — pustaka ikon HugeIcons inline.
- `assets/layout.js` — render shared sidebar/topbar/modal/FAB.

**Diubah:**
- `assets/admin.css` — token warna/radius/shadow, style card/table-toolbar/pagination baru.
- Semua 7 file `.html` — markup disederhanakan (pakai layout shared), ikon diganti ke `Icons.*`, tabel dipasangi toolbar+pagination.

---

## 10. Non-Goals

- Tidak mengubah alur bisnis, validasi, maupun urutan step di manapun.
- Tidak menambah backend/API — semuanya tetap dummy/client-side.
- Tidak migrasi ke framework (React/Vue) — tetap static HTML/CSS/JS sesuai stack asli.
- Tidak memperbanyak dummy data tabel secara signifikan (sesuai keputusan: UI rapi, fungsi minimal untuk pagination).

---

## 11. Revisi — Penyelarasan dengan Desain Stitch (2026-09)

Flow, id elemen, dan logic JS **tidak berubah**. Yang berubah murni bahasa visual agar sama dengan desain Stitch.

| Area | Perubahan |
|---|---|
| Font | Sora (judul/metrik), Plus Jakarta Sans 400/600 (body/label), **JetBrains Mono** 500 (jam, ID transaksi, nominal, kode) — ditambahkan; sebelumnya belum ada. |
| Card | Tanpa border, putih di atas latar `#EEEEEF`, radius 12px, shadow `0 1px 2px`. Header tabel = band `#F3F3F4` huruf kapital kecil. |
| Sidebar | Solid `#18181B` (tanpa tekstur titik), 256px, menu digrup berlabel (Utama / Mesin / Aktivitas & Transaksi), sub-menu Mesin diratakan, logo asli `logo.svg`, widget status outlet. Di ≤1024px menjadi rail ikon. |
| Topbar | Sticky; jam berbentuk pill live, tombol **Aktifkan Mesin Tunai** menggantikan FAB (modal & handler sama), nama + peran admin. |
| Dashboard | KPI dengan label kapital + progress bar, strip peringatan mesin gagal, section "Siklus Sedang Berjalan" (data dari halaman Progress), donut berwarna status, aktivitas terbaru berbentuk tabel. |
| Warna data | Status: hijau tersedia, biru berjalan/QRIS, amber tunai/pengering, merah gangguan, abu offline — dipakai konsisten di semua halaman. Teks di atas tint memakai varian `--*-ink` (kontras ≥ 4.5:1). |
| Login | Latar zinc (sisa palet maroon dihapus), logo asli, kolom sandi `type="password"`. |

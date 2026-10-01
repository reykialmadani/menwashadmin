# Product Requirements Document (PRD) Desain: Menwash Admin Portal
**Dokumen:** `desain_admin.md`  
**Status:** Ready for Review & Implementation  
**Cakupan:** Sistem Desain Global, Page Login, Dashboard Utama, Manajemen Mesin (`mesin.html`), Penanganan Gangguan (`gangguan.html`), Riwayat Transaksi (`transaksi.html`), dan Pemantauan Progress Siklus (`progress.html`)  
**Target Platform:** Web Desktop & Tablet (Responsive Mobile-Friendly)  
**Teknologi:** Modern HTML5, Vanilla CSS3, ES6+ JavaScript  
**Author:** Product Design & Frontend Architecture Team  

---

## 1. Ringkasan Eksekutif & Visi Desain

### 1.1 Latar Belakang & Tujuan
Menwash Admin Portal merupakan sistem antarmuka operasional harian bagi administrator dan staf outlet laundry modern. Sistem ini mencakup modul-modul esensial:
1. **Halaman Login (Page Login)**: Pintu gerbang autentikasi dengan konsep *Split-Screen Unified Experience* yang mengedepankan identitas visual brand, kenyamanan antarmuka, serta form berbentuk kartu melayang (*floating card*).
2. **Halaman Dashboard Utama (Dashboard Overview)**: Pusat kendali operasional *real-time* yang menyajikan ringkasan KPI, grafik analitik tren pemakaian mesin, pemantauan utilisasi mesin cuci/pengering, komposisi pembayaran multi-channel, pemantauan kompensasi uang dummy, tabel monitoring siklus aktif, serta tombol aksi cepat mengambang (*floating circle action buttons*).
3. **Halaman Manajemen Mesin (`mesin.html`)**: Pusat kendali dan inventaris perangkat outlet dengan **4 Compact Cards (Grid 2×2)**, **Toolbar Kontrol (Search Bar & Filter Dropdown)**, serta **Tabel Mesin Inovatif** yang menyajikan status siklus, relasi kombo, dan aksi cepat per unit.
4. **Halaman Penanganan Mesin Gangguan (`gangguan.html`)**: Pusat penanganan insiden operasional, kompensasi siklus macet via **Uang Dummy**, pemantauan unit offline, alur wizard *step-by-step* restart mesin, serta **Tabel Riwayat Penanganan Gangguan** lengkap dengan **Pop-up Card Detail**.
5. **Halaman Riwayat Transaksi (`transaksi.html`)**: Pusat pencatatan keuangan dan audit arus kas outlet yang menyajikan **3 Kartu Ringkasan Finansial**, **Toolbar Dual-Section (Search, Filter Metode Pembayaran, Filter Rentang Waktu, dan Tombol Unduh Excel/PDF)**, serta **Tabel Transaksi Terperinci**.
6. **Halaman Pemantauan Progress Siklus (`progress.html`)**: Pusat monitoring live execution siklus cuci & pengering yang menyajikan **4 Kartu Ringkasan Siklus (Fleksibel 1 Baris atau Grid 2:2)**, **Grid Kartu Siklus Sedang Berjalan Interaktif dengan Pop-up Card Detail**, serta **Tabel Pemantauan Mesin Selesai & Terkena Gangguan**.

### 1.2 Filosofi Desain
* **Seamless & Unified Visual Atmosphere**: Latar belakang mendalam dengan transisi halus (*gradient ambient canvas*) tanpa pembatas kaku.
* **Hierarki Data Presisi & Ergonomis**: Data kritis (fase siklus, sisa menit, gangguan, kombo) dapat dicerna seketika (*zero cognitive overload*).
* **Komponen Bersih Berbasis Card**: Setiap widget dan tabel disajikan dalam card terstruktur dengan elevasi bayangan halus (*soft ambient shadow*).
* **Palet Warna & Tipografi Khusus**:
  - Palet warna kurasi: `#282828`, `#182331`, `#0D2040`, `#153A66`, `#9DA2B7`, dan `#FFFFFF`.
  - Font tunggal standar: **DM Sans** (Google Fonts) di seluruh level antarmuka.

---

## 2. Palet Warna & Arsitektur Token Desain

### 2.1 Pemetaan Palet Warna Utama

| Nilai Hex | Nama Token Rekomendasi | Peran & Penggunaan UI |
|---|---|---|
| **`#0D2040`** | `--color-navy-dark` / `--bg-deep` | Background dasar kanvas login, sidebar dark anchor, gradient anchor terdalam |
| **`#153A66`** | `--color-navy-accent` / `--brand-primary` | Aksen brand utama, tombol CTA primer, state aktif nav/tab, progress ring siklus |
| **`#182331`** | `--color-navy-slate` / `--surface-dark` | Surface sekunder dark mode, background sidebar admin, hover state dark button |
| **`#282828`** | `--color-charcoal` / `--text-main` | Warna teks utama (*body/heading ink*) pada permukaan putih, label form, teks tabel |
| **`#9DA2B7`** | `--color-slate-muted` / `--text-muted` | Teks sekunder, label placeholder, border default, garis axis chart, breadcrumbs |
| **`#FFFFFF`** | `--color-white` / `--card-bg` | Permukaan card konten dashboard & tabel mesin, background form login card |

### 2.2 Warna Status Operasional (Semantic Status)

| Status | Token Warna | Background Tint | Penggunaan di Seluruh Halaman |
|---|---|---|---|
| **Tersedia / Selesai** | `#16A34A` (Green) | `#DCFCE7` | Mesin siap pakai, transaksi berhasil selesai, siklus tuntas |
| **Aktif / Berjalan** | `#153A66` / `#2563EB` | `#DBEAFE` | Mesin sedang mencuci/mengeringkan, siklus aktif live |
| **Peringatan / Tunai / Kombo**| `#F59E0B` (Amber) | `#FEF3C7` | Transaksi tunai kasir, siklus kombo Cuci + Kering |
| **Gangguan / Gagal** | `#EF4444` (Red) | `#FEE2E2` | Transaksi gagal/refund, mesin terhenti, siklus bermasalah |
| **Offline / Non-aktif** | `#6B7280` (Muted) | `#F3F4F6` | Mesin mati/maintenance, sensor IoT tidak terhubung |

### 2.3 Variabel Global CSS (`admin.css`)

```css
:root {
  /* Brand Core Tokens */
  --brand-navy-dark:   #0D2040;
  --brand-navy-accent: #153A66;
  --brand-navy-slate:  #182331;
  --neutral-charcoal:  #282828;
  --neutral-slate-dim: #9DA2B7;
  --pure-white:        #FFFFFF;

  /* Surfaces & Canvas */
  --page-bg:           #F4F6F9;
  --card-bg:           #FFFFFF;
  --sidebar-bg:        #0D2040;
  --sidebar-hover:     #182331;
  --sidebar-active:    #153A66;
  --sidebar-text:      #FFFFFF;
  --sidebar-text-dim:  #9DA2B7;

  /* Borders & Shadows */
  --border-soft:       rgba(157, 162, 183, 0.28);
  --border-strong:     rgba(157, 162, 183, 0.50);
  --card-shadow:       0 8px 24px -4px rgba(13, 32, 64, 0.08), 0 2px 6px -1px rgba(13, 32, 64, 0.04);
  --pop-shadow:        0 20px 40px -10px rgba(13, 32, 64, 0.28);

  /* Typography */
  --font-family-base:  'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --radius-sm:         6px;
  --radius-md:         10px;
  --radius-lg:         16px;
  --radius-pill:       9999px;
}
```

---

## 3. Sistem Tipografi (DM Sans)

Seluruh komponen aplikasi menggunakan Google Font **DM Sans**:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet">
```

---

## 4. Bagian I: Spesifikasi Halaman Login (Page Login)
- **Background Full-Bleed**: Membentang penuh tanpa sekat kaku (`#0D2040`, `#153A66`, `#182331`).
- **Section Kiri (55%-60%)**: Brand hero *"Kelola Operasional Laundry Lebih Cepat & Terorganisir"*.
- **Section Kanan (40%-45%)**: Floating Auth Card putih `#FFFFFF` memuat logo Menwash (`logo.svg`), teks sambutan *"Selamat datang di Menwash"*, field username, field password, tombol CTA masuk, dan bantuan akses.

---

## 5. Bagian II: Spesifikasi Antarmuka Dashboard Admin
- **Navigasi Sidebar & Header**: Menu Utama (Dashboard), Mesin (Semua Mesin, Mesin Gangguan), Aktivitas & Transaksi (Transaksi, Progress). Header memuat Breadcrumbs, penunjuk judul dinamis, jam digital live, dan circle avatar pengguna.
- **Baris KPI (4 Cards)**: Mesin sedang aktif, Transaksi hari ini, Est. pendapatan hari ini, Gangguan aktif.
- **Section Grafik Row 1 (60% : 40%)**: Line Chart Tren Pemakaian Mesin (filter 3 periode) & Pie Chart Utilisasi Mesin (dengan dot legenda di sisi kanan).
- **Section Monitoring Row 2**: Pemantauan Uang Dummy (**tanpa teks alert refund**) & Pie Chart Komposisi Pembayaran (QRIS Web, Kasir, Cash).
- **Section Row 3**: Tabel Siklus Sedang Berjalan.
- **Floating Action Buttons**: Tombol circle absolute Aktifkan Mesin & Direct link Gangguan.

---

## 6. Bagian III: Spesifikasi Halaman Manajemen Mesin (`mesin.html`)
- **4 Compact Cards (Grid 2×2 Atas-Bawah)**: Tersedia (5), Aktif (5), Gangguan (2), Offline (1).
- **Toolbar Kontrol**: Sisi kiri Search Bar dan sisi kanan Tombol Filter Dropdown (**"Filter Mesin ▾"**).
- **Tabel Mesin Inovatif**: Identitas visual hybrid, live inline progress bar, relasi kombo, telemetri IoT, dan tombol aksi kontekstual.

---

## 7. Bagian IV: Spesifikasi Halaman Mesin Gangguan (`gangguan.html`)
- **4 Card Informasi Awal**: Perlu Kompensasi (1), Selesai Hari Ini (2), Total Gangguan Hari Ini (3), Mesin Offline (1).
- **Section Gangguan Aktif**: Card informatif kendala, filter tipe mesin, tombol Restart Ulang dan Kontrol Mesin.
- **Wizard 4 Langkah Restart Uang Dummy**: Pilih Mesin $\rightarrow$ Sesuaikan Durasi & Biaya Dummy $\rightarrow$ Catatan Wajib $\rightarrow$ Konfirmasi & Eksekusi Otomatis.
- **Tabel Riwayat Penanganan Gangguan & Pop-up Card Detail**: Kolom lengkap dengan jendela pop-up rincian biaya uang dummy, refund, durasi, dan catatan admin.

---

## 8. Bagian V: Spesifikasi Halaman Riwayat Transaksi (`transaksi.html`)
- **3 Card Ringkasan Finansial**: Total Order (Inc Web Customer & Manual Admin), Estimasi Pendapatan Hari Ini, Rasio Pembayaran (Dual-Tone Progress Bar).
- **Toolbar Dual-Section**: Sisi kiri (Search Bar & Filter Metode Pembayaran), sisi kanan (Filter Rentang Waktu Periode & Tombol Unduh Excel/PDF).
- **Tabel Data Transaksi**: ID Transaksi, Waktu (WIB), Mesin & Layanan, Nominal, Metode, Status.

---

## 9. Bagian VI: Spesifikasi Halaman Pemantauan Progress Siklus (`progress.html`)

Halaman Pemantauan Progress Siklus menyajikan pemantauan *live execution* terhadap unit mesin yang sedang bekerja mencuci, membilas, memeras, atau mengeringkan cucian pelanggan di outlet.

```
+------------------------------------------------------------------------------------------------------------------------+
| TOPBAR: [Menwash Admin / Aktivitas & Transaksi / Progress]                            [Jam Live]  [🔔 Notif]  [RA User]|
|         Progress — Pemantauan antrean & durasi siklus cuci/kering secara detail                                        |
+------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                        |
| [1. INFORMASI RINGKASAN: 4 STAT CARDS (FLEKSIBEL 1 ROW ATAU 2 ROW 2:2)]                                                |
| +---------------------+  +---------------------+  +---------------------+  +-----------------------------------------+ |
| | SIKLUS BERJALAN     |  | TRANSAKSI AKTIF     |  | SIKLUS KOMBO        |  | RIWAYAT GAGAL/GANGGUAN                  | |
| | 5 Unit Mesin        |  | 4 Transaksi         |  | 1 Siklus            |  | 2 Gangguan                              | |
| | 3 Cuci · 2 Kering   |  | QRIS 3 · Tunai 1    |  | Cuci #03 -> Kering 1|  | Perlu tindakan / Kompensasi             | |
| +---------------------+  +---------------------+  +---------------------+  +-----------------------------------------+ |
|                                                                                                                        |
| [2. SECTION SIKLUS SEDANG BERJALAN (INTERACTIVE CARDS)]                                                                |
| SIKLUS SEDANG BERJALAN                                     Filter: [ Semua Siklus | Cuci | Kering | Kombo | Tunai ▾ ]  |
| +------------------------------------+  +------------------------------------+  +------------------------------------+ |
| | [💧 Cuci #03]           [⇄ Kombo]  |  | [♨ Pengering #01]        [⇄ Kombo] |  | [💧 Cuci #07]              [Tunai] | |
| | Layanan: Cuci + Kering             |  | Layanan: Kering (Lanjutan Kombo)   |  | Layanan: Cuci saja                 | |
| | +--------------------------------+ |  | +--------------------------------+ |  | +--------------------------------+ | |
| | | ( 78% )  Sisa Waktu: 9 Menit   | |  | | (  8% )  Menunggu Cucian Cuci 3| |  | | ( 22% )  Sisa Waktu: 31 Menit  | | |
| | +--------------------------------+ |  | +--------------------------------+ |  | +--------------------------------+ | |
| | TX: MW-284719 · QRIS (Mandiri)     |  | TX: MW-284719 · Lanjutan Cuci #03  |  | TX: MW-TX-9925 · Tunai (Kasir)     | |
| | [ Klik kartu untuk detail pop-up ] |  | [ Klik kartu untuk detail pop-up ] |  | [ Klik kartu untuk detail pop-up ] | |
| +------------------------------------+  +------------------------------------+  +------------------------------------+ |
| +------------------------------------+  +------------------------------------+                                         |
| | [♨ Pengering #04]           [QRIS] |  | [💧 Cuci #02]               [QRIS] |                                         |
| | Layanan: Kering saja               |  | Layanan: Cuci saja                 |                                         |
| | +--------------------------------+ |  | +--------------------------------+ |                                         |
| | | ( 66% )  Sisa Waktu: 12 Menit  | |  | | ( 45% )  Sisa Waktu: 22 Menit  | |                                         |
| | +--------------------------------+ |  | +--------------------------------+ |                                         |
| | TX: MW-284710 · QRIS (Mandiri)     |  | TX: MW-284702 · QRIS (Mandiri)     |                                         |
| | [ Klik kartu untuk detail pop-up ] |  | [ Klik kartu untuk detail pop-up ] |                                         |
| +------------------------------------+  +------------------------------------+                                         |
|                                                                                                                        |
| [3. SECTION BARU: TABEL MESIN SELESAI & TERKENA GANGGUAN]                                                              |
| +--------------------------------------------------------------------------------------------------------------------+ |
| | MESIN SELESAI & TERKENA GANGGUAN                                                  [Tab: Semua | Selesai | Gangguan] | |
| |--------------------------------------------------------------------------------------------------------------------| |
| | ID TRANSAKSI | MESIN           | LAYANAN           | WAKTU SELESAI / TERHENTI | STATUS AKHIR      | TINDAKAN / AKSI    | |
| |--------------|-----------------|-------------------|--------------------------|-------------------|--------------------| |
| | MW-284670    | Mesin Cuci #02  | Cuci saja         | 08:15 WIB (40 mnt tuntas)| ● Selesai         | [Invoice] [Detail] | |
| | MW-284655    | Pengering #06   | Kering saja       | 07:58 WIB (35 mnt tuntas)| ● Selesai         | [Invoice] [Detail] | |
| | MW-284640    | Cuci 5 -> Dry 3 | Cuci + Kering     | 07:20 WIB (Kombo sukses) | ● Selesai         | [Invoice] [Detail] | |
| | MW-284688    | Mesin Cuci #04  | Cuci saja         | 08:52 WIB (Macet mnt 18) | ● Gangguan Mesin  | [Restart Dummy ↗]  | |
| | MW-284611    | Pengering #05   | Kering saja       | Kemarin 16:40 (Macet 10m)| ● Gangguan Mesin  | [Sudah Ditangani]  | |
| +--------------------------------------------------------------------------------------------------------------------+ |
+------------------------------------------------------------------------------------------------------------------------+
```

---

### 9.1 Layout 4 Card Informasi Ringkasan (Fleksibel 1 Baris atau Grid 2:2)

Di bagian atas halaman, terdapat **4 unit kartu ringkasan** yang dapat diadaptasikan tata letaknya:
- **Konfigurasi Layout**:
  * **Opsi 1 Baris (Default Desktop $\ge 1200\text{px}$)**: Keempat kartu berjejer horizontal (4 kolom) untuk efisiensi pandangan melebar.
  * **Opsi 2 Baris 2:2 (Komposisi 2 Atas : 2 Bawah pada $\le 1199\text{px}$ atau mode compact)**: Dua baris seimbang dengan lebar yang sama persis untuk estetika proporsional.

#### Rincian Data 4 Kartu Ringkasan:
1. **Card 1: "Siklus Mesin Berjalan"**
   - **Metrik Utama**: `5 Unit Mesin` (Badge berkedip `● LIVE`).
   - **Aksen Visual**: Biru/Navy Aktif (`#153A66` / `#DBEAFE`).
   - **Sub-Informasi**: `3 Cuci · 2 Pengering` sedang aktif beroperasi.
2. **Card 2: "Transaksi Aktif"**
   - **Metrik Utama**: `4 Transaksi`
   - **Aksen Visual**: Ikon nota aktif (`#153A66`).
   - **Sub-Informasi**: `QRIS 3 · Tunai 1` (transaksi terhubung ke mesin beroperasi).
3. **Card 3: "Siklus Kombo Cuci + Kering"**
   - **Metrik Utama**: `1 Siklus Kombo`
   - **Aksen Visual**: Amber Emas (`#F59E0B` / `#FEF3C7`).
   - **Sub-Informasi**: `Cuci #03 → Pengering #01` (antrean otomatis bersambung).
4. **Card 4: "Riwayat Gagal / Gangguan"**
   - **Metrik Utama**: `2 Gangguan`
   - **Aksen Visual**: Merah Peringatan (`#EF4444` / `#FEE2E2`).
   - **Sub-Informasi**: `Perlu tindakan kompensasi admin` (menautkan ke penanganan).

---

### 9.2 Section "Siklus Sedang Berjalan" (Interactive Cycle Cards)

Section ini berfokus pada pemantauan mesin yang saat ini sedang aktif memproses cucian:

#### A. Toolbar & Filter Cepat Siklus
- Terletak di atas grid kartu:
  * Filter Chips: `Semua Siklus (5)`, `Cuci Saja (3)`, `Kering Saja (1)`, `Siklus Kombo (1)`, `QRIS (4)`, `Tunai (1)`.

#### B. Anatomi Kartu Siklus Berjalan (Card Layout)
Setiap kartu menampilkan informasi komprehensif dari unit mesin:
1. **Header Kartu**:
   - Ikon tipe mesin (`Cuci` warna biru navy, `Pengering` warna amber panas).
   - Nama Unit Mesin tebal (contoh: **Cuci #03**, **Pengering #04**).
   - Sub-teks tipe layanan (*Cuci + Kering*, *Cuci saja*, *Kering saja*).
   - Badge penanda status: `⇄ Kombo`, `QRIS`, atau `Tunai`.
2. **Body Kartu (Visual Progress)**:
   - **Progress Ring / Dynamic Bar**: Lingkaran persentase visual grafis (misal `78%`, `66%`, `45%`, `22%`).
   - **Hitung Mundur Sisa Waktu**: Angka sisa menit tebal dengan font monospace (contoh: `9 menit`, `12 menit`, `31 menit`).
   - **Informasi Transaksi Terkait**: Kode transaksi font monospace (**MW-284719**, **MW-284710**), metode pembayaran, dan nama pelanggan/kasir.
3. **Interaktivitas Card & Efek Hover**:
   - Kartu dirancang dengan kursor pointer dan efek hover lembut (`translateY(-2px)` dengan shadow meningkat).
   - Teks panduan: *"Klik kartu untuk melihat rincian telemetri siklus"*.

---

### 9.3 Pop-up Card / Modal Detail Siklus (Saat Kartu Diklik)

Ketika administrator mengklik salah satu kartu siklus berjalan, antarmuka memunculkan **Pop-up Card Detail Siklus (Modal Interaktif)**:

```
+-----------------------------------------------------------------------+
| DETAIL SIKLUS MESIN BERJALAN                                      [✕] |
| Unit: Mesin Cuci #03 · ID Transaksi: MW-284719                        |
|-----------------------------------------------------------------------|
|                                                                       |
| 1. MONITORING PROGRES & FASE AKTIF                                    |
| [==================================== 78% =====================      ] |
| Status Fase: PEMBILASAN KEDUA (Rinse Cycle 2 of 2)                    |
| Sisa Waktu : 9 Menit lagi (Estimasi Selesai: 09:40 WIB)               |
|                                                                       |
| 2. TAHAPAN SIKLUS (CYCLE TIMELINE)                                    |
| [✓] 09:00 - Pengisian Air & Deterjen (Selesai)                        |
| [✓] 09:08 - Pencucian Utama 40°C (Selesai)                            |
| [►] 09:25 - Pembilasan Kedua & Pewangi (Sedang Berlangsung)           |
| [ ] 09:34 - Pemerasan Kecepatan Tinggi (Spin 1200 RPM)                |
|                                                                       |
| 3. SIKLUS KOMBO TERKAIT                                               |
| • Status Kombo : Cucian akan dipindahkan ke Pengering #01             |
| • Antrean      : Pengering #01 berstatus SIAP MENUNGGU                |
|                                                                       |
| 4. TELEMETRI IOT & SENSOR HARDWARE                                    |
| • Suhu Tabung Air  : 40.2°C (Optimal)                                 |
| • Kecepatan Putaran: 680 RPM                                          |
| • Kunci Pintu IoT  : TERKUNCI (Door Interlock Aktif)                  |
| • Getaran Drum     : 0.12 g (Normal, Seimbang)                        |
|                                                                       |
| 5. AKSI KONTROL DARURAT OPERATOR                                      |
| [ ⏸ Jeda Siklus (Pause) ]  [ ⏱ Tambah Waktu ]  [ 🛑 Force Stop Darurat ] |
|                                                                       |
|-----------------------------------------------------------------------|
|                                                     [ Tutup Jendela ] |
+-----------------------------------------------------------------------+
```

---

### 9.4 Section Baru: Tabel Mesin Selesai & Terkena Gangguan

Tepat di bawah grid kartu siklus berjalan, terdapat section baru berupa **Tabel Pemantauan Siklus Selesai & Terkena Gangguan**:
- **Tujuan**: Membantu admin membedakan dengan cepat mana pakaian pelanggan yang siap diambil (selesai) dan mana transaksi yang terhenti serta membutuhkan restart kompensasi (gangguan).
- **Tab Filter Cepat**:
  * `Semua Status (5)`
  * `Selesai Sempurna (3)` (Badge Hijau)
  * `Terkena Gangguan (2)` (Badge Merah)

#### Struktur Kolom Tabel:

| Nama Kolom | Tipe & Format Data | Deskripsi & Isi Tampilan |
|---|---|---|
| **ID Transaksi** | `String` (Monospace) | Kode unik transaksi (`MW-284670`, `MW-284688`, `MW-284655`). |
| **Mesin** | `Text & Icon` | Nomor dan tipe unit (contoh: **Mesin Cuci #02**, **Mesin Cuci #04**). |
| **Layanan** | `Text` | Jenis layanan cucian (`Cuci saja`, `Kering saja`, `Cuci + Kering`). |
| **Waktu Selesai / Terhenti**| `Timestamp & Note` | Jam selesai sukses (contoh: `08:15 WIB (40 mnt tuntas)`) atau titik terhenti kendala (contoh: `08:52 WIB (Macet menit 18)`). |
| **Status Akhir** | `Badge Status` | • **Selesai**: Hijau sukses (`#16A34A` / `#DCFCE7`).<br>• **Gangguan Mesin**: Merah peringatan (`#EF4444` / `#FEE2E2`). |
| **Tindakan / Aksi** | `Action Buttons` | • Jika *Selesai*: Tombol `[Invoice]` dan `[Detail Transaksi]`.<br>• Jika *Gangguan*: Tombol merah `[Restart Dummy ↗]` (langsung membuka alur kompensasi) dan `[Tiket Gangguan]`. |

---

### 9.5 Blueprint Wireframe & Markup Komponen Progress (`progress.html`)

```html
<div class="content">

  <!-- 1. INFORMASI RINGKASAN: 4 STAT CARDS (RESPONSIF 1 ROW / 2 ROW 2:2) -->
  <div class="stat-grid progress-stat-grid">
    
    <!-- Card 1: Siklus Berjalan -->
    <div class="stat-card">
      <div class="s-top">
        <span class="s-label">Siklus Mesin Berjalan</span>
        <span class="badge busy"><span class="dot"></span>LIVE</span>
      </div>
      <div class="s-row">
        <div class="s-val text-navy">5 <small>Unit</small></div>
      </div>
      <div class="s-sub-info">3 Cuci · 2 Pengering aktif</div>
    </div>

    <!-- Card 2: Transaksi Aktif -->
    <div class="stat-card">
      <div class="s-top">
        <span class="s-label">Transaksi Aktif</span>
        <span class="s-icon" data-icon="invoice" data-size="20"></span>
      </div>
      <div class="s-row">
        <div class="s-val">4</div>
      </div>
      <div class="s-sub-info">QRIS 3 · Tunai 1</div>
    </div>

    <!-- Card 3: Siklus Kombo -->
    <div class="stat-card">
      <div class="s-top">
        <span class="s-label">Siklus Kombo Cuci + Kering</span>
        <span class="s-icon" data-icon="progress" data-size="20"></span>
      </div>
      <div class="s-row">
        <div class="s-val text-amber">1</div>
      </div>
      <div class="s-sub-info">Cuci #03 → Pengering #01</div>
    </div>

    <!-- Card 4: Riwayat Gagal/Gangguan -->
    <div class="stat-card is-err">
      <div class="s-top">
        <span class="s-label">Riwayat Gagal/Gangguan</span>
        <span class="s-icon" data-icon="alert" data-size="20"></span>
      </div>
      <div class="s-row">
        <div class="s-val text-err">2</div>
      </div>
      <div class="s-sub-info text-err">Perlu kompensasi / tindakan</div>
    </div>

  </div>

  <!-- 2. SECTION SIKLUS SEDANG BERJALAN (INTERACTIVE CARDS) -->
  <div class="section-head-wrap" style="margin-top:20px;">
    <div class="sh-left">
      <h3>Siklus Sedang Berjalan</h3>
      <p>Cuplikan siklus aktif di mesin — klik kartu untuk rincian telemetri &amp; kontrol</p>
    </div>
    <div class="chip-row">
      <button class="fchip active" data-filter="semua">Semua Siklus (5)</button>
      <button class="fchip" data-filter="cuci">Cuci Saja (3)</button>
      <button class="fchip" data-filter="kering">Kering Saja (1)</button>
      <button class="fchip" data-filter="kombo">Kombo (1)</button>
    </div>
  </div>

  <!-- Grid Kartu Siklus Interaktif -->
  <div class="cycle-card-grid">
    
    <!-- Kartu 1: Cuci #03 Kombo -->
    <div class="cycle-interactive-card" onclick="openCycleDetailModal('MW-284719', 'Cuci #03', 78, 9, 'Cuci + Kering')">
      <div class="cic-head">
        <div class="cic-icon wash">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="13" r="7"/><path d="M9 13c0-1.7 1.3-3 3-3s3 1.3 3 3"/><path d="M8 4h1M12 4h1M16 4h1"/></svg>
        </div>
        <div>
          <div class="cic-title">Cuci #03</div>
          <div class="cic-sub">Cuci + Kering</div>
        </div>
        <span class="badge amber">⇄ Kombo</span>
      </div>
      <div class="cic-body">
        <div class="cic-progress-circle">
          <span>78%</span>
        </div>
        <div class="cic-time-info">
          <div class="lbl">Sisa Waktu Siklus</div>
          <div class="val">9 <small>Menit</small></div>
        </div>
      </div>
      <div class="cic-foot">
        <span class="tx-id">MW-284719</span>
        <span class="pay-method">QRIS Mandiri</span>
      </div>
    </div>

    <!-- Kartu 2: Pengering #01 Lanjutan Kombo -->
    <div class="cycle-interactive-card" onclick="openCycleDetailModal('MW-284719', 'Pengering #01', 8, 35, 'Kering (Kombo)')">
      <div class="cic-head">
        <div class="cic-icon dry">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h3M18 12h3M12 3v3M12 18v3"/><circle cx="12" cy="12" r="4"/></svg>
        </div>
        <div>
          <div class="cic-title">Pengering #01</div>
          <div class="cic-sub">Menunggu cucian</div>
        </div>
        <span class="badge amber">⇄ Kombo</span>
      </div>
      <div class="cic-body">
        <div class="cic-progress-circle">
          <span>8%</span>
        </div>
        <div class="cic-time-info">
          <div class="lbl">Durasi Paket</div>
          <div class="val">35 <small>Menit</small></div>
        </div>
      </div>
      <div class="cic-foot">
        <span class="tx-id">MW-284719</span>
        <span class="pay-method">Lanjutan Cuci #03</span>
      </div>
    </div>

    <!-- Kartu 3: Cuci #07 Tunai -->
    <div class="cycle-interactive-card" onclick="openCycleDetailModal('MW-TX-9925', 'Cuci #07', 22, 31, 'Cuci saja')">
      <div class="cic-head">
        <div class="cic-icon wash">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="13" r="7"/><path d="M9 13c0-1.7 1.3-3 3-3s3 1.3 3 3"/><path d="M8 4h1M12 4h1M16 4h1"/></svg>
        </div>
        <div>
          <div class="cic-title">Cuci #07</div>
          <div class="cic-sub">Cuci saja</div>
        </div>
        <span class="badge amber">Tunai</span>
      </div>
      <div class="cic-body">
        <div class="cic-progress-circle">
          <span>22%</span>
        </div>
        <div class="cic-time-info">
          <div class="lbl">Sisa Waktu Siklus</div>
          <div class="val">31 <small>Menit</small></div>
        </div>
      </div>
      <div class="cic-foot">
        <span class="tx-id">MW-TX-9925</span>
        <span class="pay-method">Tunai (Kasir)</span>
      </div>
    </div>

  </div>

  <!-- 3. SECTION BARU: TABEL MESIN SELESAI & TERKENA GANGGUAN -->
  <div class="card" style="margin-top:28px;">
    <div class="card-head">
      <div>
        <h3>Riwayat Siklus: Mesin Selesai &amp; Terkena Gangguan</h3>
        <p>Rekap unit mesin yang telah menuntaskan cucian atau mengalami interupsi teknis hari ini</p>
      </div>
      <div class="chip-row">
        <button class="fchip active" data-tab="all">Semua Status</button>
        <button class="fchip" data-tab="done">Selesai Sempurna (3)</button>
        <button class="fchip" data-tab="fail">Terkena Gangguan (2)</button>
      </div>
    </div>

    <div class="table-responsive">
      <table class="progress-status-table">
        <thead>
          <tr>
            <th>ID Transaksi</th>
            <th>Mesin</th>
            <th>Layanan</th>
            <th>Waktu Selesai / Terhenti</th>
            <th>Status Akhir</th>
            <th style="text-align:right;">Tindakan / Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="tx-id">MW-284670</td>
            <td><b>Mesin Cuci #02</b></td>
            <td>Cuci saja</td>
            <td class="mono">08:15 WIB (40 mnt tuntas)</td>
            <td><span class="badge ok"><span class="dot"></span>Selesai</span></td>
            <td style="text-align:right;"><button class="btn btn-secondary btn-sm">Lihat Detail</button></td>
          </tr>
          <tr>
            <td class="tx-id">MW-284655</td>
            <td><b>Pengering #06</b></td>
            <td>Kering saja</td>
            <td class="mono">07:58 WIB (35 mnt tuntas)</td>
            <td><span class="badge ok"><span class="dot"></span>Selesai</span></td>
            <td style="text-align:right;"><button class="btn btn-secondary btn-sm">Lihat Detail</button></td>
          </tr>
          <tr>
            <td class="tx-id">MW-284688</td>
            <td><b class="text-err">Mesin Cuci #04</b></td>
            <td>Cuci saja</td>
            <td class="mono text-err">08:52 WIB (Macet menit 18)</td>
            <td><span class="badge err"><span class="dot"></span>Gangguan Mesin</span></td>
            <td style="text-align:right;"><a href="dummy-restart.html" class="btn btn-danger btn-sm">Restart Dummy ↗</a></td>
          </tr>
          <tr>
            <td class="tx-id">MW-284611</td>
            <td><b class="text-err">Pengering #05</b></td>
            <td>Kering saja</td>
            <td class="mono text-err">Kemarin 16:40 (Macet 10m)</td>
            <td><span class="badge err"><span class="dot"></span>Gangguan Mesin</span></td>
            <td style="text-align:right;"><span class="badge neutral">Sudah Ditangani</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</div>
```

---

## 10. Responsivitas & Adaptasi Viewport

| Halaman / Komponen | Desktop (≥ 1200px) | Tablet (768px - 1199px) | Mobile (< 768px) |
|---|---|---|---|
| **Login Viewport** | Split 55% : 45% melayang | Split 50% : 50% | Single column centered card |
| **Dashboard KPI** | 4 Kolom berdampingan (1 baris) | 2 Baris × 2 Kolom | 1 Kolom vertikal bertumpuk |
| **Dashboard Charts**| Split 60% (Line) : 40% (Pie) | Bertumpuk vertikal 100% | Bertumpuk vertikal |
| **Mesin 4 Cards** | Grid 2 Baris × 2 Kolom (2-2) | Grid 2 Baris × 2 Kolom (2-2) | 1 Kolom vertikal bertumpuk |
| **Gangguan 4 Cards**| 4 Kolom sejajar horizontal | 2 Baris × 2 Kolom | 1 Kolom vertikal bertumpuk |
| **Transaksi 3 Cards**| 3 Kolom sejajar horizontal | 3 Kolom / 2 baris | 1 Kolom bertumpuk vertikal |
| **Progress 4 Cards** | **4 Kolom Sejajar (1 Baris)** | **Grid 2:2 (2 Baris × 2 Kolom)** | 1 Kolom vertikal bertumpuk |
| **Progress Cycle Grid**| Grid 3 Kolom Kartu Interaktif | Grid 2 Kolom Kartu | 1 Kolom per baris (kompak) |
| **Tabel Riwayat Mesin**| Kolom penuh terstruktur | Horizontal scroll container | Card list ringkas atau modal detail |

---

## 11. Kriteria Penerimaan (Acceptance Criteria)

- [ ] **Sistem Desain & Tipografi**:
  - Seluruh halaman mengimplementasikan Google Font **DM Sans**.
  - Palet warna mematuhi `#282828`, `#182331`, `#0D2040`, `#153A66`, `#9DA2B7`, dan `#FFFFFF`.
- [ ] **Halaman Login**:
  - Konsep split-screen dengan seamless background full layar, logo Menwash, teks "Selamat datang di Menwash", username, password, dan tombol masuk.
- [ ] **Halaman Dashboard**:
  - Sidebar bernavigasi hirarkis, Topbar breadcrumbs, 4 KPI cards operasional.
  - Row 1: Line Chart 60% (Tren Pemakaian Mesin, filter 3 periode) & Pie Chart 40% (Utilisasi Mesin + dot legenda).
  - Row 2: Pemantauan Uang Dummy (**tanpa teks alert refund**) & Pie Chart Komposisi Pembayaran (QRIS Web, QRIS Kasir, Cash).
  - Row 3: Tabel data "Siklus Sedang Berjalan".
  - Floating circle buttons di pojok kanan bawah (Aktifkan Mesin & Direct link Gangguan).
- [ ] **Halaman Mesin (`mesin.html`)**:
  - Hanya terdapat **4 card ringkas dengan tata letak 2-2 atas bawah (Grid 2×2)**.
  - Data 4 card ditulis ulang secara lengkap: *Tersedia (5)*, *Aktif (5)*, *Gangguan (2)*, dan *Offline (1)* dari total 13 mesin.
  - Toolbar Search Bar di sisi kiri dan Tombol Filter Dropdown di sisi kanan.
  - Tabel Mesin Inovatif dengan visual avatar tipe mesin, inline dynamic progress bar siklus, relasi kombo mesin, telemetri transaksi, dan tombol aksi per baris.
- [ ] **Halaman Mesin Gangguan (`gangguan.html`)**:
  - **4 Card Informasi Awal di Paling Atas**: *"Perlu Kompensasi"*, *"Selesai Hari Ini"*, *"Total Gangguan Hari Ini"*, dan *"Mesin Offline"*.
  - **Section Gangguan Aktif**: Menampilkan kartu informatif gangguan lengkap dengan filter di sisi kanan (*Semua Mesin*, *Mesin Cuci*, *Mesin Pengering*), rincian kendala, ID transaksi, serta tombol **"Restart Ulang"** dan **"Kontrol Mesin"**.
  - **Step-by-Step Wizard Restart Ulang**: Panduan 4 tahap (Pilih Mesin $\rightarrow$ Sesuaikan Durasi & Biaya Dummy $\rightarrow$ Catatan Tindakan Wajib $\rightarrow$ Konfirmasi & Eksekusi Otomatis).
  - **Tabel Riwayat Penanganan Gangguan & Pop-up Card Detail**: Toolbar Search Bar dan Filter Kategori di atas tabel, kolom lengkap, serta jendela pop-up rincian pemakaian uang dummy, refund, durasi, dan catatan admin.
- [ ] **Halaman Riwayat Transaksi (`transaksi.html`)**:
  - **3 Card Ringkasan Finansial di Atas**: *"Total Order (Inc Web Customer & Manual Admin)"*, *"Estimasi Pendapatan Hari Ini"*, *"Rasio Pembayaran"*.
  - **Toolbar Tabel Dual-Section**: Search Bar & Filter Metode Pembayaran di sisi kiri; Filter Rentang Waktu & Tombol Unduh Laporan (Excel/PDF) di sisi kanan.
  - **Desain Tabel Data Transaksi**: Kolom *ID Transaksi*, *Waktu (WIB)*, *Mesin & Layanan*, *Nominal*, *Metode*, *Status*.
- [ ] **Halaman Pemantauan Progress Siklus (`progress.html`)**:
  - **4 Card Ringkasan di Atas**: *"Siklus Mesin Berjalan"*, *"Transaksi Aktif"*, *"Siklus Kombo Cuci + Kering"*, dan *"Riwayat Gagal/Gangguan"* (fleksibel 1 baris pada desktop $\ge 1200\text{px}$ atau 2 baris komposisi 2:2 pada tablet/laptop).
  - **Section Siklus Sedang Berjalan**: Disajikan dalam bentuk kartu-kartu interaktif dengan nomor transaksi aktif, visual progress ring/bar, sisa menit berjalan, tipe layanan, serta filter siklus di bagian atas.
  - **Pop-up Card Detail Siklus**: Setiap kartu siklus dapat diklik untuk memunculkan jendela modal detail tahapan siklus (Rinse, Wash, Spin), suhu air, kecepatan RPM, dan aksi kontrol darurat.
  - **Section Baru Tabel Mesin Selesai & Terkena Gangguan**: Tabel pemantauan mesin yang sudah tuntas menyelesaikan cucian vs mesin yang terhenti akibat gangguan teknis, lengkap dengan tombol invoice atau tombol direct restart dummy.

# Product Requirements Document (PRD) & Blueprint Arsitektur: Menwash Admin

**Dokumen Referensi Mutlak (Single Source of Truth) untuk Migrasi UI Static ke Production Framework**  
**Nama File:** `flow_admin.md`  
**Versi:** 3.0.0  
**Tanggal Rilis:** 2026-10-01  
**Status:** Approved for Engineering Implementation  
**Target Framework:** Next.js (App Router) / Vue 3 / Nuxt / Laravel Inertia / React + NestJS  

---

## 1. Ringkasan Eksekutif & Tujuan Produk

**Menwash Admin** adalah sistem cockpit operasional terpusat untuk outlet self-service laundromat komersial berbasis IoT (Internet of Things). Sistem ini menghubungkan:
1. **Perangkat Keras (Hardware)**: Mesin cuci (*Washer*) & mesin pengering (*Dryer*) komersial yang dikontrol via mikrokontroler (ESP32/Relay board) melalui protokol MQTT.
2. **Koleksi Pembayaran**: QRIS Dinamis (otomatis) dan Transaksi Tunai Kasir (*Manual Cash Activation*).
3. **Petugas Lapangan**: Kasir / Operator Outlet yang bertugas menjaga kelancaran harian, menangani keluhan, dan memicu siklus mesin.
4. **Manajemen / Owner**: Super Admin yang memiliki visibilitas finansial menyeluruh dan hak akses audit berskala.

### Kebijakan Utama Bisnis (Strict Policy)
* **Prinsip "Hari H" (Single-Day Visibility for Cashier/Admin Outlet)**:
  Petugas Admin Toko / Kasir **hanya berhak memantau omzet, kas, dan jurnal transaksi pada hari berjalan (Hari H)**. Tepat pada pergantian hari (**pukul 00:00 WIB**), seluruh data tampilan harian kasir akan **ter-reset bersih** menjadi 0. Kasir **tidak memiliki izin (Forbidden 403)** untuk melihat laporan mundur, kemarin, mingguan, bulanan, atau tahunan. Akses historis tersebut adalah **hak mutlak Super Admin / Owner**.

---

## 2. Matriks Hak Akses & Role-Based Access Control (RBAC)

### 2.1 Definisi Peran (User Roles)

| Role ID | Nama Peran | Deskripsi Operasional | Cakupan Akses |
|---|---|---|---|
| `SUPER_ADMIN` | Super Admin / Owner | Pemilik bisnis atau head of operations pusat dengan hak akses penuh ke seluruh outlet, keuangan historis, konfigurasi tarif, dan audit trail. | Lintas Outlet (Global), Historis Tanpa Batas (Hari H + Berskala). |
| `ADMIN_OUTLET` | Admin Outlet / Kasir / Operator | Petugas jaga shift di gerai fisik. Bertanggung jawab atas pelayanan pelanggan tunai, pemantauan mesin berjalan, penanganan gangguan darurat, dan tutup kasir shift harian. | Khusus Outlet Terdaftar, **Hanya Data Hari H (00:00 - 23:59 WIB)**. |
| `TEKNISI` | Teknisi / Maintenance Field Engineer | Petugas teknis hardware yang menangani perbaikan fisik mesin, kalibrasi relay IoT, dan bypass maintenance. | Khusus Outlet Terdaftar, Tab Mesin, Gangguan, dan Simulator Debug. |

---

### 2.2 Matriks Hak Akses Fitur & Halaman

| Fitur / Halaman | `SUPER_ADMIN` | `ADMIN_OUTLET` (Kasir) | `TEKNISI` | Catatan Kebijakan Teknis |
|---|:---:|:---:|:---:|---|
| **Login (`/login`)** | ✅ Ya | ✅ Ya | ✅ Ya | Autentikasi dengan Email/PIN & Role Verification |
| **Dashboard (`/dashboard`)** | ✅ Ya | ✅ Ya (Hari H) | ⚠️ Terbatas | Widget pendapatan kasir hanya menampilkan omzet Hari H |
| **Monitoring Mesin (`/mesin`)** | ✅ Ya | ✅ Ya | ✅ Ya | Status live Washer/Dryer, trigger aktivasi & kontrol |
| **Drawer Detail Mesin** | ✅ Ya | ✅ Ya | ✅ Ya | Telemetri RPM, suhu, vibrasi, cycle count, MQTT topic |
| **Aktivasi Mesin Tunai (Wizard QA)**| ✅ Ya | ✅ Ya | ❌ Tidak | Kasir menerima cash dan memicu relay mesin |
| **Progress Siklus (`/progress`)** | ✅ Ya | ✅ Ya | ✅ Ya | Countdown sisa menit, tahapan pencucian |
| **Kontrol Darurat (+5m, Pause, Force Stop)**| ✅ Ya | ✅ Ya (Wajib Catat Alasan) | ✅ Ya | Wajib mengisi alasan untuk audit log jika siklus berbayar |
| **Tiket Gangguan (`/gangguan`)** | ✅ Ya | ✅ Ya | ✅ Ya | Laporan error (E01, E03, E04, E08, Offline) |
| **Penyelesaian Gangguan (Transfer Siklus)** | ✅ Ya | ✅ Ya | ✅ Ya | Memindahkan sisa durasi cucian ke mesin lain |
| **Kompensasi / Refund Tunai** | ✅ Ya | ✅ Ya (Limit Harian) | ❌ Tidak | Kasir mengembalikan dana tunai ke pelanggan |
| **Transaksi Hari H (`/transaksi`)** | ✅ Ya | ✅ Ya (Hari H Saja) | ❌ Tidak | Data transaksi 00:00 s/d 23:59 WIB hari ini |
| **Laporan Finansial Berskala (Mingguan/Bulanan)**| ✅ Ya | 🚫 **DILARANG (Locked)**| ❌ Tidak | Backend mengembalikan `403 Forbidden` jika Kasir meminta range tanggal lampau |
| **Cetak Slip Tutup Kasir (End of Day)**| ✅ Ya | ✅ Ya (Shift Hari H) | ❌ Tidak | Ringkasan setor tunai dan total QRIS shift hari H |
| **Ekspor Laporan Historis CSV/PDF** | ✅ Ya | 🚫 **DILARANG** | ❌ Tidak | Hanya Super Admin yang berhak ekspor data berkala |
| **Simulator / Debug Mesin (`/debug/simulator`)**| ✅ Ya | ⚠️ Read-only Test | ✅ Penuh | Uji coba MQTT heartbeat, relay pulse, dan injeksi error |

---

### 2.3 Matriks Penegakan Kebijakan Finansial "Hari H"

| Parameter Kebijakan | Aturan untuk `ADMIN_OUTLET` (Kasir) | Aturan untuk `SUPER_ADMIN` (Owner) |
|---|---|---|
| **Rentang Waktu Data** | Hanya `CURRENT_DATE` (00:00:00 s/d 23:59:59 WIB). | Fleksibel: Hari H, Kemarin, 7 Hari, 30 Hari, Custom Range, YTD. |
| **Filter Tanggal UI** | Dinonaktifkan / Dikunci dengan badge visual `[🔒 Khusus Super Admin]`. | Tersedia Date Range Picker lengkap (Flatpickr/Datepicker). |
| **Perilaku Jam 00:00 WIB** | Counter pendapatan, transaksi, dan grafik ter-reset menjadi Rp 0 secara otomatis. | Data hari sebelumnya diarsipkan ke laporan historis bulanan. |
| **Akses Data Kemarin** | **Tertutup Mutlak**. Kasir tidak dapat melihat saldo kas kemarin untuk mencegah manipulasi fisik. | Terbuka penuh untuk verifikasi setoran fisik kasir. |
| **Simulasi Pergantian Hari** | Disediakan tombol khusus demonstrasi/pengujian untuk memverifikasi reset 00:00 WIB. | N/A (Produksi riil mengikuti cron job server). |

---

## 3. Arsitektur Informasi & Pemetaan Rute

```
menwash-admin/
├── login.html           --> /login                  (Autentikasi & Seleksi Role)
├── dashboard.html       --> /dashboard              (Operational Cockpit & Quick Telemetry)
├── mesin.html           --> /mesin                  (Grid Unit Washer & Dryer + Device Drawer)
├── progress.html        --> /progress               (Live Cycle Monitor + Emergency Controller)
├── gangguan.html        --> /gangguan               (Trouble Ticket Management & Resolution)
├── transaksi.html       --> /transaksi              (Jurnal Hari H + Tutup Kasir + Reset Guard)
└── dummy-restart.html   --> /debug/simulator        (Hardware & MQTT Testing Utility)
```

---

## 4. Flowchart Alur Bisnis (Mermaid)

### 4.1 Alur Utama Operasional Admin Outlet

```mermaid
flowchart TD
    Start([Mulai: Admin Tiba di Outlet]) --> Login[/Input Email & Password / PIN/]
    Login --> VerifyAuth{Verifikasi Kredensial & Role}
    
    VerifyAuth -- Gagal --> LoginErr[Tampilkan Pesan Error / Akses Ditolak]
    LoginErr --> Login
    
    VerifyAuth -- Role: ADMIN_OUTLET --> InitShift[Inisialisasi Shift Hari H<br/>Set Scope Data = CURRENT_DATE]
    VerifyAuth -- Role: SUPER_ADMIN --> InitAdmin[Inisialisasi Dashboard Global<br/>Buka Filter Historis & Lintas Outlet]
    
    InitShift --> Dashboard[Dashboard Outlet Cendrawasih]
    
    Dashboard --> NavMenu{Pilih Menu Operasional}
    
    NavMenu -- Layani Konsumen Tunai --> QAWizard[Modal: Aktifkan Mesin Tunai]
    NavMenu -- Pantau Kondisi Alat --> ViewMesin[Halaman Mesin: Grid Washer & Dryer]
    NavMenu -- Pantau Siklus Berjalan --> ViewProgress[Halaman Progress: Countdown Telemetri]
    NavMenu -- Ada Keluhan Mesin Macet --> ViewGangguan[Halaman Gangguan: Manajemen Tiket]
    NavMenu -- Rekap Shift Hari Ini --> ViewTransaksi[Halaman Transaksi: Jurnal Hari H]
    
    %% Alur Transaksi Hari H & Reset
    ViewTransaksi --> CheckClock{Waktu Server >= 00:00 WIB?}
    CheckClock -- Belum --> ViewHariH[Tampilkan Transaksi Hari H<br/>Filter Berkala Terkunci]
    ViewHariH --> CloseShift[Cetak Slip Tutup Kasir Shift]
    
    CheckClock -- Ya: Ganti Hari --> AutoReset[TRIGGER AUTO-RESET 00:00 WIB<br/>Jurnal Hari Lalu Terkunci<br/>Counter Kembali ke Rp 0]
    AutoReset --> ViewHariH
    
    %% Sub-alur QA Wizard
    QAWizard --> SelectMachine[Pilih ID Mesin Tersedia]
    SelectMachine --> SelectService[Pilih Layanan & Durasi]
    SelectService --> InputCash[Terima Uang Tunai & Input Nominal]
    InputCash --> TriggerRelay[Kirim Perintah MQTT Start ke Relay ESP32]
    TriggerRelay --> SiklusAktif[Mesin Menyala & Siklus Masuk Halaman Progress]
    
    %% Sub-alur Gangguan
    ViewGangguan --> SolveTicket{Pilih Solusi Penanganan}
    SolveTicket -- Mesin Error Sedang Cuci --> TransferCycle[Pindah Siklus ke Mesin Lain: Dummy Restart]
    SolveTicket -- Batal / Kesalahan Sistem --> CashRefund[Kompensasi / Refund Tunai Pelanggan]
    SolveTicket -- Kerusakan Fisik Berat --> MarkMaintenance[Kunci Mesin: Status Maintenance/Teknisi]
```

---

### 4.2 Alur Kebijakan Finansial "Hari H" & Proteksi Pergantian Hari

```mermaid
flowchart TD
    subgraph Client_Admin_Outlet ["Sisi Client (Kasir Outlet)"]
        OpenTx[Akses Menu Transaksi] --> LoadView[Muat Tampilan Transaksi]
        LoadView --> ReqTx[Kirim Request: GET /api/v1/transactions]
        ReqTx -.->|Header: Bearer Token Role ADMIN_OUTLET| APIGateway
        
        ClickDate[Admin Mencoba Pilih Tanggal Kemarin / Mingguan] --> LockModal[Muncul Modal: Fitur Terkunci!<br/>Akses historis hanya untuk Super Admin]
    end

    subgraph Backend_Enforcement ["Sisi Backend & Database Guard"]
        APIGateway{API Middleware: Evaluasi Role JWT}
        APIGateway -- Role == ADMIN_OUTLET --> ForceFilter["Force Query Parameter:<br/>start_date = 00:00:00 WIB Hari Ini<br/>end_date = 23:59:59 WIB Hari Ini"]
        APIGateway -- Role == SUPER_ADMIN --> DynamicFilter[Gunakan Query Parameter Asli Klien]
        
        ForceFilter --> QueryDB[(PostgreSQL / Database)]
        DynamicFilter --> QueryDB
        
        QueryDB --> ReturnData[Response JSON: Data Transaksi Hari H]
    end

    ReturnData --> RenderTable[Tampilkan Daftar Transaksi Hari Ini]
    
    subgraph Midnight_Trigger ["Pergantian Hari (00:00:00 WIB)"]
        ClockTick([Deteksi Jam 00:00:00 WIB]) --> SSEEvent[Kirim Notifikasi WebSocket / SSE: EVENT_DATE_CHANGED]
        SSEEvent --> ResetUI[Client Menjalankan resetDaySimulation:<br/>1. Kosongkan Total Omzet -> Rp 0<br/>2. Reset Jumlah Siklus -> 0<br/>3. Kosongkan List Transaksi Hari Kemarin<br/>4. Mulai Penghitungan Shift Hari Baru]
    end
```

---

## 5. Sequence Diagram Alur Operasional (Mermaid)

### 5.1 Sequence 1: Autentikasi & Resolusi Role (RBAC)

```mermaid
sequenceDiagram
    autonumber
    actor Admin as Admin / Kasir
    participant UI as Browser / Frontend App
    participant AuthAPI as Auth Service (JWT/Session)
    participant UserDB as User Database

    Admin->>UI: Masukkan Email/Username & Password / PIN
    UI->>AuthAPI: POST /api/v1/auth/login { identifier, password, outlet_id }
    AuthAPI->>UserDB: SELECT * FROM users WHERE identifier = ? AND outlet_id = ?
    UserDB-->>AuthAPI: User Record { id, name, role: "ADMIN_OUTLET", outlet_id: "OUT-01" }
    
    AuthAPI->>AuthAPI: Generate Access Token JWT (Claims: sub, role, outlet_id, scope: "hari_h_only")
    AuthAPI-->>UI: 200 OK { token, user: { name: "Ratna Sari", role: "ADMIN_OUTLET" }, exp }
    
    UI->>UI: Simpan token di Secure Storage (HttpOnly Cookie / LocalState)
    UI->>UI: Evaluasi Hak Akses: Sembunyikan Navigasi Finansial Berskala
    UI-->>Admin: Arahkan ke /dashboard (Outlet Cendrawasih)
```

---

### 5.2 Sequence 2: Aktivasi Mesin Tunai (Wizard QA) & Trigger Hardware MQTT

```mermaid
sequenceDiagram
    autonumber
    actor Pelanggan as Pelanggan Laundry
    actor Kasir as Kasir / Operator
    participant UI as Frontend Admin
    participant CoreAPI as Core API Server
    participant OutboxDB as PostgreSQL + Outbox Table
    participant Worker as Outbox Worker Service
    participant Broker as MQTT Broker (EMQX/Mosquitto)
    participant ESP32 as IoT Node MCU / Relay Mesin

    Pelanggan->>Kasir: Menyerahkan Uang Tunai Rp 20.000 untuk Cuci Cepat
    Kasir->>UI: Klik Tombol "Aktifkan Mesin Tunai"
    UI->>CoreAPI: GET /api/v1/outlets/CENDRAWASIH/machines?status=IDLE
    CoreAPI-->>UI: 200 OK [W-01, W-02, W-05]
    
    Kasir->>UI: Pilih Mesin (W-01), Paket ("Cuci Cepat 30m"), Input Tunai (Rp 20.000)
    Kasir->>UI: Klik "Konfirmasi & Nyalakan Mesin"
    
    UI->>CoreAPI: POST /api/v1/orders/cash-activation<br/>{ machine_id: "W-01", service: "FAST_WASH", duration: 30, amount: 20000 }
    
    Note over CoreAPI: Validasi: Mesin W-01 harus IDLE dan Kasir terverifikasi
    CoreAPI->>OutboxDB: BEGIN TRANSACTION<br/>1. INSERT orders (status: PENDING, method: CASH)<br/>2. INSERT outbox_commands (topic: "menwash/cendrawasih/W-01/cmd", action: "START", duration: 30)<br/>COMMIT
    CoreAPI-->>UI: 202 Accepted { order_id: "MW-9912", status: "PROCESSING" }
    UI-->>Kasir: Tampilkan status modal: "Mengirim sinyal aktivasi..."

    Worker->>OutboxDB: Poll pending outbox commands
    Worker->>Broker: PUBLISH menwash/cendrawasih/W-01/cmd<br/>{ command_id: "CMD-55", action: "START", duration_sec: 1800 }
    Broker->>ESP32: Deliver MQTT Message (QoS 1)
    
    Note over ESP32: Mikrokontroler menutup Relay 1<br/>Daya listrik mesin cuci aktif
    ESP32->>Broker: PUBLISH menwash/cendrawasih/W-01/ack<br/>{ command_id: "CMD-55", status: "ACKNOWLEDGED", machine_state: "RUNNING" }
    Broker->>Worker: Receive ACK
    Worker->>OutboxDB: UPDATE orders SET status = "RUNNING"<br/>UPDATE machines SET status = "RUNNING" WHERE id = "W-01"
    
    Broker-)UI: WebSocket Push Event: { machine_id: "W-01", status: "RUNNING", remaining: 1800 }
    UI-->>Kasir: Tampilkan Sukses: "Mesin W-01 berhasil dinyalakan!"
    UI->>UI: Update Card Dashboard & Tabel Transaksi Hari H
```

---

### 5.3 Sequence 3: Kontrol Darurat Siklus (Pause, Add Time, Force Stop)

```mermaid
sequenceDiagram
    autonumber
    actor Kasir as Kasir / Operator
    participant UI as Frontend Admin
    participant CoreAPI as Core API Server
    participant Broker as MQTT Broker
    participant ESP32 as Perangkat IoT Mesin

    Kasir->>UI: Buka /progress -> Klik Detail Siklus Mesin W-01
    UI-->>Kasir: Buka Modal Detail: Status Berjalan, Sisa 14 Menit, RPM 450
    
    alt Aksi 1: Tambah Waktu (+5 Menit)
        Kasir->>UI: Klik "+5 Menit" (misal: pakaian tebal belum kering)
        UI->>CoreAPI: POST /api/v1/machines/W-01/adjust-time { add_minutes: 5, admin_id: "USR-01" }
        CoreAPI->>Broker: PUBLISH menwash/cendrawasih/W-01/cmd { action: "ADD_TIME", value: 300 }
        Broker->>ESP32: Kirim Perintah Tambah Waktu
        ESP32-->>Broker: ACK { new_remaining: 1140 }
        Broker-)UI: Broadcast Status Baru
    else Aksi 2: Force Stop & Kuras Air (Emergency Stop)
        Kasir->>UI: Klik "Hentikan Darurat (Force Stop)"
        UI-->>Kasir: Tampilkan Dialog Wajib: Isi Alasan Darurat (Contoh: "Busa meluap / Mati air")
        Kasir->>UI: Input Alasan: "Busa meluap ke lantai" & Klik Konfirmasi Stop
        UI->>CoreAPI: POST /api/v1/machines/W-01/force-stop { reason: "Busa meluap ke lantai" }
        CoreAPI->>Broker: PUBLISH menwash/cendrawasih/W-01/cmd { action: "FORCE_STOP_AND_DRAIN" }
        Broker->>ESP32: Trigger Relay Cut-off & Pompa Drain Aktif
        ESP32-->>Broker: ACK { machine_state: "STOPPED", water_level: "EMPTY" }
        Broker-)UI: Status Mesin: "BERHENTI DARURAT"
        UI-->>Kasir: Dialog Opsi Lanjutan: Buat Tiket Gangguan atau Pindah Mesin
    end
```

---

### 5.4 Sequence 4: Penanganan Gangguan & Pemindahan Mesin (Dummy Restart)

```mermaid
sequenceDiagram
    autonumber
    actor Kasir as Kasir / Operator
    participant UI as Frontend Admin
    participant CoreAPI as Core API Server
    participant DB as Database
    participant Broker as MQTT Broker
    participant ESP32New as Mesin Pengganti (W-02)

    Note over UI: Mesin W-01 mengalami Error E04 (Drain Timeout)<br/>Tiket Gangguan #TG-881 Terbentuk Otomatis
    Kasir->>UI: Buka Halaman /gangguan -> Pilih Tiket #TG-881
    UI-->>Kasir: Tampilkan Data Insiden: Order MW-8840, Pakaian Konsumen Masih Basah
    
    Kasir->>UI: Klik "Pindahkan Siklus (Dummy Restart)"
    UI->>CoreAPI: GET /api/v1/outlets/CENDRAWASIH/machines?type=WASHER&status=IDLE
    CoreAPI-->>UI: Daftar Mesin Siap Pakai: [W-02, W-05]
    
    Kasir->>UI: Pilih Target: W-02, Sisa Waktu: 15 Menit, Catatan: "E04 W-01 pindah ke W-02"
    Kasir->>UI: Klik "Eksekusi Pemindahan Siklus"
    
    UI->>CoreAPI: POST /api/v1/tickets/TG-881/transfer-cycle<br/>{ source_order: "MW-8840", target_machine: "W-02", duration: 15, reason: "Relokasi cucian error" }
    
    CoreAPI->>DB: 1. UPDATE orders SET status = "TRANSFERRED" WHERE id = "MW-8840"<br/>2. INSERT orders (id: "MW-8840-R", method: "DUMMY_RESTART", amount: 0)<br/>3. UPDATE tickets SET status = "RESOLVED", resolution = "TRANSFERRED_TO_W02"
    
    CoreAPI->>Broker: PUBLISH menwash/cendrawasih/W-02/cmd { action: "START", duration: 900, mode: "COMPENSATION" }
    Broker->>ESP32New: Nyalakan Mesin W-02
    ESP32New-->>Broker: ACK W-02 RUNNING
    
    CoreAPI-->>UI: 200 OK { success: true, message: "Siklus berhasil dialihkan ke W-02" }
    UI-->>Kasir: Tampilkan Notifikasi Sukses & Cetak Bukti Relokasi Pelanggan
```

---

### 5.5 Sequence 5: Penegakan "Hari H" & Mekanisme Auto-Reset 00:00 WIB

```mermaid
sequenceDiagram
    autonumber
    actor Kasir as Kasir Shift Malam
    participant UI as Frontend Admin
    participant CoreAPI as Core API Server
    participant DB as Database (PostgreSQL)

    Kasir->>UI: Buka Halaman /transaksi pada pukul 23:55 WIB
    UI->>CoreAPI: GET /api/v1/transactions?scope=today
    Note over CoreAPI: Filter Paksa: WHERE outlet_id = 'CENDRAWASIH' AND date = '2026-10-01'
    CoreAPI->>DB: Query Transaksi Hari H
    DB-->>CoreAPI: 42 Transaksi, Total Omzet Rp 1.150.000
    CoreAPI-->>UI: 200 OK { date: "2026-10-01", count: 42, total: 1150000, rows: [...] }
    UI-->>Kasir: Tampilkan Tabel Transaksi Hari H & Tombol "Cetak Slip Tutup Kasir"
    
    Kasir->>UI: Klik "Cetak Slip Tutup Kasir"
    UI-->>Kasir: Print Slip Rangkuman Kas Shift Harian (Total Tunai: Rp 450.000, QRIS: Rp 700.000)

    Note over UI, CoreAPI: Waktu Berjalan Menuju Pukul 00:00:00 WIB (Pergantian Hari)
    
    CoreAPI->>CoreAPI: Cron Job Internal Server: Archive Daily Shift & Emit WebSocket DATE_FLIP
    CoreAPI-)UI: WebSocket Broadcast: { event: "DATE_FLIP", new_date: "2026-10-02" }
    
    Note over UI: Handler Frontend Menjalankan Reset Otomatis:
    UI->>UI: 1. Kosongkan State Transaksi Hari Kemarin<br/>2. Update Label Hari: "Jumat, 02 Oktober 2026"<br/>3. Reset Counter Ringkasan ke Rp 0 & 0 Transaksi<br/>4. Kunci Akses Kembali ke Tanggal 01 Oktober
    
    Kasir->>UI: Menekan Refresh / Mengakses Transaksi Pukul 00:01 WIB
    UI->>CoreAPI: GET /api/v1/transactions?scope=today
    CoreAPI->>DB: WHERE outlet_id = 'CENDRAWASIH' AND date = '2026-10-02'
    DB-->>CoreAPI: 0 Transaksi, Omzet Rp 0
    CoreAPI-->>UI: 200 OK { date: "2026-10-02", count: 0, total: 0, rows: [] }
    UI-->>Kasir: Menampilkan Tampilan Bersih: "Belum Ada Transaksi di Hari Baru Ini"
```

---

## 6. Spesifikasi Detail Antarmuka & Logika Fitur (Page-by-Page)

### 6.1 Halaman Login (`/login`)
* **File Rujukan UI**: `login.html`
* **Tujuan**: Pintu masuk petugas kasir, operator, dan super admin dengan verifikasi gerai.
* **Elemen UI Utama**:
  1. Card Semi-Clay dengan branding logo `logomenwash.svg`.
  2. Input Identifikasi: Email atau Nomor Handphone / Username.
  3. Input Kredensial: Password atau PIN Kasir 6-digit.
  4. Selector Gerai / Outlet: Default "Outlet Cendrawasih" (auto-detect via subdomain/localStorage).
  5. Indikator Telemetri Real-Time Gerai: "12/13 Mesin Beroperasi Optimal".
* **Validasi & Error Handling**:
  - Kredensial salah: `401 Unauthorized` -> Shake effect pada kartu login & teks peringatan merah.
  - Akun dinonaktifkan: Tampilkan pesan hubungi Super Admin.
  - Sesi kedaluwarsa: Redirect otomatis ke `/login?reason=session_expired`.

---

### 6.2 Halaman Dashboard (`/dashboard`)
* **File Rujukan UI**: `dashboard.html`
* **Tujuan**: Kokpit ringkasan cepat status outlet, ketersediaan mesin, dan statistik hari H.
* **Komponen & Aturan Bisnis**:
  1. **Banner Status Gerai**: Menampilkan nama outlet, konektivitas IoT (Status: Online/MQTT Connected), dan tombol aktivasi cepat.
  2. **4 KPI Stat Cards (Khusus Hari H untuk Kasir)**:
     - *Omzet Tunai & QRIS Hari H*: Total Rupiah terhitung sejak 00:00 WIB hari ini.
     - *Mesin Aktif / Total*: Rasio unit menyala vs total unit (contoh: 12/13 Mesin).
     - *Total Siklus Hari H*: Jumlah pencucian/pengeringan selesai hari ini.
     - *Gangguan Aktif*: Jumlah tiket error yang belum terselesaikan.
  3. **Cluster Monitoring Cepat Mesin**:
     - Washer Cluster: W-01 s/d W-08 (Warna: Hijau=Ready, Biru=Running, Kuning=Done/Door Locked, Merah=Error).
     - Dryer Cluster: D-01 s/d D-05.
  4. **Widget Aktivasi Cepat Tunai**: Tombol mengambang (FAB) & widget langsung untuk membuka Modal Wizard Aktivasi Kasir.

---

### 6.3 Halaman Monitoring Mesin (`/mesin`)
* **File Rujukan UI**: `mesin.html`
* **Tujuan**: Visualisasi detail inventaris hardware mesin cuci dan pengering serta remote command.
* **Komponen & Fitur**:
  1. **Tab Filter Mesin**: Semua, Washer (Mesin Cuci), Dryer (Pengering), Siap Pakai, Berjalan, Gangguan, Offline.
  2. **Kartu Unit Mesin (Device Card)**:
     - Nama Mesin (e.g. `Washer #01 - Primus 10kg`).
     - Badge Status Real-Time dengan indikator denyut nadi (Pulse dot).
     - Live Countdown Timer jika sedang berjalan.
     - Tombol Aksi Cepat: `Detail Telemetri`, `Mulai Manual`, `Emergency Stop`.
  3. **Slide-Over Drawer Detail Mesin**:
     - *Header*: Status koneksi hardware relay ESP32 (RSSI WiFi, IP Lokal, Firmware Ver).
     - *Sensor Readings*: Tegangan listrik (Volt), Arus (Ampere), RPM drum, Estimasi Suhu (°C), Getaran (Vibration sensor).
     - *Action Bar*:
       - `Kirim Pulse Relay Manual` (Test hardware).
       - `Bypass Siklus Gratis` (Khusus kompensasi/uji coba).
       - `Kunci Perawatan (Maintenance Lock)`: Mencegah mesin dipilih di sistem pembayaran QRIS pelanggan.

---

### 6.4 Halaman Progress Siklus (`/progress`)
* **File Rujukan UI**: `progress.html`
* **Tujuan**: Pemantauan langsung tahap demi tahap cucian yang sedang aktif di outlet.
* **Komponen & Fitur**:
  1. **Filter Status Siklus**: Semua Siklus, Pencucian (Wash), Pengeringan (Dry), Kritis (< 5 Menit).
  2. **Kartu Siklus Berjalan (Active Cycle Card)**:
     - ID Mesin & Nama Konsumen / Nomor Order.
     - Progress Bar Visual (0% - 100%) dengan warna dinamis.
     - Tahapan Siklus: `Mengisi Air (Fill)` -> `Mencuci (Wash)` -> `Bilas (Rinse)` -> `Peras (Spin)` -> `Selesai`.
     - Parameter Real-Time: Suhu air, Kecepatan putaran drum, Sisa waktu digital (`MM:SS`).
  3. **Modal Kontrol Darurat Mesin**:
     - Tombol `Pause / Jeda Sementara`: Menghentikan putaran motor tanpa membuang air.
     - Tombol `+5 Menit Tambahan`: Menambah pulsa timer pengeringan.
     - Tombol `Force Stop & Kuras Air`: Mematikan mesin total & membuka katup pembuangan air jika terjadi anomali muatan/busa.

---

### 6.5 Halaman Transaksi Kasir (`/transaksi`) — Strict "Hari H" Policy
* **File Rujukan UI**: `transaksi.html`
* **Tujuan**: Pencatatan jurnal transaksi kasir, rekonsiliasi kas tunai shift, dan bukti setor.
* **Spesifikasi Ketat Hak Akses**:
  1. **Scope Terkunci (Hari H Only)**:
     - Teks Banner Kebijakan: *"Mode Shift Kasir: Menampilkan transaksi hari ini saja. Data akan otomatis ter-reset setiap pukul 00:00 WIB."*
     - Filter Tanggal Berkala Dinonaktifkan: Tombol Mingguan / Bulanan diberi ikon gembok 🔒.
     - Jika Kasir mengeklik area filter tanggal: Muncul modal edukasi `periodicLockModal` yang menjelaskan bahwa laporan berskala hanya dapat diakses melalui portal Super Admin.
  2. **Simulasi Pergantian Hari (Testing Tool)**:
     - Tombol *"Simulasi Ganti Hari (00:00 WIB)"* untuk mendemonstrasikan bahwa sistem otomatis mengosongkan jurnal dan me-reset summary counter menjadi Rp 0.
  3. **Tabel Transaksi Hari H**:
     - Kolom: ID Transaksi, Mesin, Layanan/Paket, Metode Pembayaran (QRIS / Tunai / Dummy), Jam (WIB), Petugas Kasir, Status (Sukses / Berjalan / Batal).
     - Filter Khusus Hari H: Filter berdasarkan Metode Pembayaran (Semua, Tunai Kasir, QRIS Digital, Dummy Restart) dan Pencarian ID Transaksi / Nomor Pelanggan.
  4. **Aksi Penutupan Shift**:
     - `Cetak Slip Tutup Kasir`: Menghasilkan layout struk thermal 80mm berisi total penerimaan uang tunai laci untuk diserahkan ke shift berikutnya.
     - `Ekspor Jurnal Hari H`: Mengunduh ringkasan CSV untuk transaksi hari ini saja.

---

### 6.6 Halaman Manajemen Gangguan (`/gangguan`)
* **File Rujukan UI**: `gangguan.html`
* **Tujuan**: Resolusi cepat insiden kendala mesin atau keluhan pelanggan di outlet.
* **Katalog Kode Gangguan & Resolusi**:
  - `E01 - Water Inflow Failure`: Pasokan air terhambat / kran tertutup. Resolusi: Periksa kran & kirim sinyal resume.
  - `E03 - Unbalanced Load`: Pakaian menggumpal di satu sisi drum. Resolusi: Buka pintu manual, ratakan pakaian, reset.
  - `E04 - Drain Timeout`: Saluran pembuangan tersumbat koin/kancing. Resolusi: Kuras manual & pindahkan siklus ke mesin lain.
  - `E08 - Dryer Overheating`: Suhu pengering melebihi 75°C. Resolusi: Pendinginan otomatis, bersihkan filter serat (*lint filter*).
  - `OFFLINE - Hardware Disconnect`: Hilang sinyal MQTT / mati listrik. Resolusi: Ping network / restart adaptor ESP32.
* **Fitur Penanganan**:
  - Tombol `Pindahkan Cucian (Dummy Restart)`: Memindahkan sisa durasi ke mesin lain yang sedang kosong tanpa memungut bayaran pelanggan.
  - Tombol `Refund Tunai`: Kasir mengeluarkan kas pengganti dengan bukti tanda terima sistem.
  - Tombol `Eskalasi ke Teknisi`: Mengubah status mesin menjadi `OUT_OF_SERVICE` dan mengirim notifikasi WhatsApp/Telegram ke tim teknisi.

---

### 6.7 Halaman Simulator / Debug (`/debug/simulator`)
* **File Rujukan UI**: `dummy-restart.html`
* **Tujuan**: Lingkungan simulasi hardware untuk pengujian end-to-end tanpa perlu menyalakan mesin fisik.
* **Fitur Simulator**:
  - Simulasi pengiriman payload MQTT `STATUS`, `ACK`, dan `ERROR`.
  - Tombol injeksi kode error (E01 s/d E08) untuk menguji respons UI di `/gangguan`.
  - Simulasi Webhook pembayaran QRIS sukses dari Payment Gateway (Midtrans/Xendit).

---

## 7. Kontrak Integrasi Protokol IoT (MQTT)

### 7.1 Skema Penamaan Topik MQTT
Format: `menwash/{outlet_id}/{machine_id}/{action_type}`

| Topik | Arah | Fungsi | QoS | Retain |
|---|:---:|---|:---:|:---:|
| `menwash/cendrawasih/{id}/cmd` | Cloud -> Mesin | Mengirim perintah (START, STOP, PAUSE, RESUME, ADD_TIME) | 1 | False |
| `menwash/cendrawasih/{id}/ack` | Mesin -> Cloud | Konfirmasi penerimaan dan eksekusi perintah | 1 | False |
| `menwash/cendrawasih/{id}/telemetry` | Mesin -> Cloud | Laporan berkala sensor (RPM, voltase, sisa detik, suhu) | 0 | False |
| `menwash/cendrawasih/{id}/status` | Mesin -> Cloud | Laporan status ketersediaan (IDLE, RUNNING, ERROR, OFFLINE) | 1 | True |
| `menwash/cendrawasih/{id}/alert` | Mesin -> Cloud | Notifikasi darurat / kode error instan (E01, E03, E04) | 1 | False |

### 7.2 Contoh Payload Perintah (`/cmd`)
```json
{
  "command_id": "CMD-20261001-0941",
  "action": "START",
  "service_type": "FAST_WASH",
  "duration_seconds": 1800,
  "relay_channel": 1,
  "pulse_ms": 500,
  "created_at": "2026-10-01T21:45:00Z"
}
```

### 7.3 Contoh Payload Telemetri (`/telemetry`)
```json
{
  "machine_id": "W-01",
  "cycle_step": "WASHING",
  "elapsed_seconds": 600,
  "remaining_seconds": 1200,
  "drum_rpm": 450,
  "water_temp_c": 38.5,
  "voltage_v": 221.4,
  "current_a": 3.8,
  "door_locked": true
}
```

---

## 8. Skema Basis Data & Aturan Penjagaan Query (Database Guard)

### 8.1 Skema Tabel Inti (PostgreSQL DDL Reference)

```sql
-- 1. Tabel Outlet
CREATE TABLE outlets (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address TEXT,
    timezone VARCHAR(50) DEFAULT 'Asia/Jakarta',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabel Peran & Pengguna
CREATE TYPE user_role AS ENUM ('SUPER_ADMIN', 'ADMIN_OUTLET', 'TEKNISI');

CREATE TABLE users (
    id VARCHAR(50) PRIMARY KEY,
    outlet_id VARCHAR(50) REFERENCES outlets(id),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash TEXT NOT NULL,
    pin_hash VARCHAR(10),
    role user_role NOT NULL DEFAULT 'ADMIN_OUTLET',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabel Unit Mesin
CREATE TYPE machine_type AS ENUM ('WASHER', 'DRYER');
CREATE TYPE machine_status AS ENUM ('IDLE', 'RUNNING', 'ERROR', 'MAINTENANCE', 'OFFLINE');

CREATE TABLE machines (
    id VARCHAR(50) PRIMARY KEY,
    outlet_id VARCHAR(50) REFERENCES outlets(id),
    code VARCHAR(20) NOT NULL, -- Contoh: W-01, D-01
    name VARCHAR(100) NOT NULL,
    type machine_type NOT NULL,
    capacity_kg NUMERIC(4,1) NOT NULL,
    status machine_status DEFAULT 'IDLE',
    relay_pin INT DEFAULT 1,
    ip_address VARCHAR(45),
    total_cycles INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Tabel Transaksi & Order
CREATE TYPE payment_method AS ENUM ('QRIS', 'CASH', 'DUMMY_RESTART', 'VOUCHER');
CREATE TYPE order_status AS ENUM ('PENDING', 'RUNNING', 'COMPLETED', 'CANCELLED', 'REFUNDED');

CREATE TABLE transactions (
    id VARCHAR(50) PRIMARY KEY, -- Contoh: MW-20261001-001
    outlet_id VARCHAR(50) REFERENCES outlets(id),
    machine_id VARCHAR(50) REFERENCES machines(id),
    admin_id VARCHAR(50) REFERENCES users(id), -- Nullable jika direct QRIS
    customer_phone VARCHAR(20),
    service_name VARCHAR(100) NOT NULL,
    duration_minutes INT NOT NULL,
    amount NUMERIC(12,2) NOT NULL,
    payment_method payment_method NOT NULL,
    status order_status DEFAULT 'PENDING',
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index Penjaga Performa Filter Hari H
CREATE INDEX idx_transactions_hari_h ON transactions (outlet_id, created_at);
```

---

### 8.2 Aturan Penjagaan Query (Guard Clause SQL)

Backend API **wajib** menyisipkan filter rentang hari jika pengguna adalah `ADMIN_OUTLET`:

```sql
-- Query Transaksi Khusus Kasir (Hari H Saja):
SELECT * 
FROM transactions
WHERE outlet_id = :user_outlet_id
  AND created_at >= DATE_TRUNC('day', NOW() AT TIME ZONE 'Asia/Jakarta')
  AND created_at < DATE_TRUNC('day', NOW() AT TIME ZONE 'Asia/Jakarta') + INTERVAL '1 day'
ORDER BY created_at DESC;
```

> [!CAUTION]
> **Larangan Mutlak**: Backend API tidak boleh menerima parameter `start_date` atau `end_date` dari request yang dikirimkan oleh pengguna dengan token `role == 'ADMIN_OUTLET'`. Jika parameter tersebut dikirimkan, backend harus menolak atau meng-override nilainya secara sepihak ke tanggal `Hari H`.

---

## 9. Panduan Implementasi Migrasi ke Modern Framework

### 9.1 Arsitektur Komponen yang Disarankan (Next.js / React)

```
src/
├── app/
│   ├── (auth)/
│   │   └── login/page.tsx               --> login.html
│   └── (dashboard)/
│       ├── layout.tsx                   --> Sidebar + Topbar + QA Modal Global
│       ├── dashboard/page.tsx           --> dashboard.html
│       ├── mesin/page.tsx               --> mesin.html
│       ├── progress/page.tsx            --> progress.html
│       ├── transaksi/page.tsx           --> transaksi.html
│       ├── gangguan/page.tsx            --> gangguan.html
│       └── debug/simulator/page.tsx     --> dummy-restart.html
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx                  --> Navigasi dengan filter hak akses
│   │   ├── Topbar.tsx                   --> Jam WIB, outlet info, profile menu
│   │   └── QuickActivateModal.tsx       --> Wizard 4 langkah aktivasi tunai
│   ├── cards/
│   │   ├── MachineCard.tsx              --> Kartu mesin di halaman mesin & progress
│   │   ├── MetricStatCard.tsx           --> Kartu metrik Hari H
│   │   └── TroubleCard.tsx              --> Kartu insiden tiket gangguan
│   └── modals/
│       ├── CycleDetailModal.tsx         --> Kontrol darurat siklus (+5m, pause, stop)
│       └── PeriodicLockModal.tsx        --> Peringatan filter historis terkunci
├── hooks/
│   ├── useMqttTelemetry.ts              --> Subscribe WebSocket/MQTT live progress
│   ├── useHariHGuard.ts                 --> Pemantau waktu 00:00 WIB & trigger auto-reset
│   └── useMachines.ts                   --> Query & mutation data mesin
└── lib/
    ├── rbac.ts                          --> Aturan permission & route protection
    └── printSlip.ts                     --> Generator struk kasir thermal 80mm
```

### 9.2 Hook Deteksi Pergantian Hari (`useHariHGuard.ts`)
```typescript
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export function useHariHGuard(onDayReset: () => void) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const checkMidnight = () => {
      const now = new Date();
      // Periksa apakah waktu saat ini berada tepat di 00:00:00 s/d 00:00:05 WIB
      if (now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() < 5) {
        // 1. Invalidate cache data transaksi & dashboard
        queryClient.invalidateQueries({ queryKey: ['transactions', 'today'] });
        queryClient.invalidateQueries({ queryKey: ['dashboard', 'today-metrics'] });
        // 2. Jalankan reset UI state
        onDayReset();
      }
    };

    const interval = setInterval(checkMidnight, 3000);
    return () => clearInterval(interval);
  }, [queryClient, onDayReset]);
}
```

---

## 10. Checklist Validasi Kesiapan Produksi (Definition of Done)

- [ ] **Autentikasi & RBAC**: Sesi kasir dibatasi hanya untuk gerai yang ditugaskan; tidak dapat mengakses menu laporan periodik.
- [ ] **Kebijakan Hari H**: Endpoint `/api/v1/transactions` secara tegas mengabaikan filter tanggal lampau dari kasir dan hanya menyajikan transaksi hari ini.
- [ ] **Pergantian Hari 00:00 WIB**: Antarmuka secara visual mengosongkan pendapatan dan jumlah transaksi pada pergantian hari tanpa perlu refresh manual.
- [ ] **Konektivitas IoT & Relay**: Perintah dari modal aktivasi tunai terkirim ke topik MQTT yang benar dengan QoS 1 dan menghasilkan ACK dalam waktu < 2 detik.
- [ ] **Kontrol Darurat**: Opsi force-stop mewajibkan kasir memasukkan alasan insiden sebelum memicu pemutusan aliran listrik mesin.
- [ ] **Aset Brand**: Seluruh logo menggunakan `logomenwash.svg` dan tipografi menggunakan `Sora` (Display/Headings) dan `Plus Jakarta Sans` (Body).

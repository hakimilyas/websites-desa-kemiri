# 🚀 Panduan Lengkap Hosting & Deployment Website Desa Kemiri di Netlify

Panduan ini berisi langkah-langkah lengkap untuk melakukan hosting website **Desa Kemiri (Eleventy + Decap CMS)** ke **Netlify**, termasuk konfigurasi autentikasi **Netlify Identity & Git Gateway** untuk pengelolaan konten Decap CMS di `/admin`.

---

## 📋 Daftar Isi
1. [Prasyarat](#1-prasyarat)
2. [Langkah 1: Push Project ke GitHub](#langkah-1-push-project-ke-github)
3. [Langkah 2: Connect & Deploy di Netlify](#langkah-2-connect--deploy-di-netlify)
4. [Langkah 3: Konfigurasi Netlify Identity & Git Gateway (Wajib untuk Decap CMS)](#langkah-3-konfigurasi-netlify-identity--git-gateway-wajib-untuk-decap-cms)
5. [Langkah 4: Login dan Menggunakan Decap CMS (`/admin`)](#langkah-4-login-dan-menggunakan-decap-cms-admin)
6. [Langkah 5: Pengaturan Custom Domain (Opsional)](#langkah-5-pengaturan-custom-domain-opsional)
7. [Troubleshooting & Solusi Masalah Umum](#troubleshooting--solusi-masalah-umum)

---

## 1. Prasyarat

Sebelum memulai, pastikan Anda telah memiliki:
- **Akun GitHub** ([github.com](https://github.com))
- **Akun Netlify** ([netlify.com](https://www.netlify.com)) — *disarankan login menggunakan akun GitHub agar otomatis terhubung*.
- **Git** terinstall di komputer Anda.

---

## Langkah 1: Push Project ke GitHub

1. Buka terminal/PowerShell di folder project (`websites-desa-kemiri`).
2. Inisialisasi Git (jika belum) dan commit seluruh file:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Website Desa Kemiri Eleventy & Decap CMS"
   ```
3. Buat **Repository Baru** di [GitHub New Repository](https://github.com/new):
   - Nama Repository: `website-desa-kemiri`
   - Akses: *Public* atau *Private* (bebas).
   - Jangan centang "Add a README file" karena kita sudah memiliki file di lokal.
4. Hubungkan repository lokal ke GitHub dan lakukan push:
   ```bash
   git remote add origin https://github.com/USERNAME-ANDA/website-desa-kemiri.git
   git branch -M main
   git push -u origin main
   ```

---

## Langkah 2: Connect & Deploy di Netlify

1. Login ke [Netlify Dashboard](https://app.netlify.com).
2. Klik tombol **Add new site** > pilih **Import an existing project**.
3. Pilih penyedia Git: **GitHub**.
4. Cari dan pilih repository `website-desa-kemiri`.
5. Netlify akan otomatis membaca konfigurasi dari file [`netlify.toml`](file:///c:/Hakim/Semester%206/Website%20desa%20Kemiri/websites-desa-kemiri/netlify.toml):
   - **Build command**: `npm run build`
   - **Publish directory**: `_site`
   - **Functions directory**: (kosongkan)
6. Klik tombol **Deploy website-desa-kemiri**.
7. Tunggu proses build selesai (sekitar 1-2 menit). Website Anda akan aktif dengan domain acak dari Netlify (contoh: `nama-acak-12345.netlify.app`).

> 💡 **Tips:** Anda dapat mengubah nama domain acak tersebut di **Site settings > Change site name** (misalnya menjadi `desa-kemiri.netlify.app`).

---

## Langkah 3: Konfigurasi Netlify Identity & Git Gateway (Wajib untuk Decap CMS)

Agar fitur login Admin CMS pada URL `/admin` dapat bekerja tanpa database, Anda wajib mengaktifkan **Netlify Identity** dan **Git Gateway**.

### A. Mengaktifkan Netlify Identity
1. Buka dashboard site Anda di Netlify.
2. Ke menu **Site configuration** > pilih **Identity** (atau tab **Identity** di bilah atas).
3. Klik tombol **Enable Identity**.

### B. Mengatur Registration & External Providers
1. Di halaman **Identity**, masuk ke **Registration preferences** > klik **Edit settings**.
2. Pilih mode pendaftaran:
   - **Invite only** *(Disarankan)*: Hanya pengguna yang Anda undang yang bisa membuat akun admin CMS.
   - **Open**: Siapa saja dapat mendaftar (kurang aman untuk website resmi desa).
3. Pada bagian **External providers**, Anda juga dapat menambahkan login via Google/GitHub jika diinginkan.

### C. Mengaktifkan Git Gateway (PENTING)
Git Gateway memungkinkan Decap CMS untuk melakukan commit pengubahan data secara otomatis ke repository Git Anda ketika admin menyimpan berita/profil/UMKM.

1. Di menu **Site configuration** > **Identity** > gulir ke paling bawah hingga menemukan bagian **Services**.
2. Di bagian **Git Gateway**, klik **Enable Git Gateway**.
3. Hubungkan dengan akun GitHub Anda jika diminta otorisasi.

---

## Langkah 4: Login dan Menggunakan Decap CMS (`/admin`)

### A. Mengundang Admin Baru (User First Time Setup)
1. Masuk ke Netlify Dashboard > tab **Identity**.
2. Klik tombol **Invite users**.
3. Masukkan alamat email admin desa (contoh: `admin@desakemiri.go.id`).
4. Netlify akan mengirimkan email undangan (Invitation Email).
5. Buka email tersebut, klik link konfirmasi, lalu buat **Password** untuk akun admin.

### B. Login ke Dashboard CMS
1. Buka URL website desa Anda di browser dan tambahkan `/admin` di belakangnya:
   ```text
   https://desa-kemiri.netlify.app/admin/
   ```
2. Klik tombol **Login with Netlify Identity**.
3. Masukkan Email & Password yang telah terdaftar.
4. Selamat! Anda masuk ke Dashboard Decap CMS dan siap menambah/mengedit:
   - 🏡 **Halaman Utama**: Judul Hero, Slogan, Embed Maps, Narasi Singkat.
   - 📊 **Profil & Infografis**: Carousel Foto, Narasi Sejarah, Jumlah Dusun, RW, RT, KK.
   - 🛍️ **Katalog UMKM**: Tambah UMKM baru (Tipe A Direct link ke Google Sites / Tipe B Modal detail produk & marketplace).
   - 🖼️ **Galeri Foto**: Upload foto baru dengan kategori *Pemandangan* / *Kegiatan*.

Setiap kali Anda menekan tombol **Publish** di CMS, Netlify akan otomatis melakukan *Auto Build* dan memperbarui isi website secara *real-time*!

---

## Langkah 5: Pengaturan Custom Domain (Opsional)

Jika Pemerintah Desa Kemiri ingin menggunakan domain resmi (seperti `desakemiri.id` atau `kemiri.desa.id`):

1. Masuk ke Netlify Dashboard > **Domain management** > **Add a domain**.
2. Masukkan nama domain desa Anda (contoh: `desakemiri.id`).
3. Konfigurasi DNS di penyedia domain (Registrar) Anda:
   - Tambahkan **CNAME record** mengarah ke nama site Netlify Anda (`desa-kemiri.netlify.app`).
   - Atau ganti **Name Servers (NS)** ke Name Servers milik Netlify.
4. SSL Certificate (HTTPS) akan otomatis diaktifkan secara gratis oleh Netlify (Let's Encrypt).

---

## Troubleshooting & Solusi Masalah Umum

### ❓ 1. Error "Git Gateway Error: User not authorized" saat membuka `/admin`
* **Penyebab:** Git Gateway belum aktif atau sesi login Identity kadaluarsa.
* **Solusi:** 
  1. Buka Netlify Dashboard > **Site configuration** > **Identity** > **Services**.
  2. Klik **Disable Git Gateway**, lalu klik **Enable Git Gateway** kembali.
  3. Clear cache browser dan coba login ulang di `/admin`.

### ❓ 2. Gambar baru tidak muncul setelah di-publish via CMS
* **Penyebab:** Path direktori media belum sesuai atau Netlify masih dalam proses build.
* **Solusi:** Tunggu proses build selesai di tab **Deploys** pada Netlify Dashboard. Jalur media sudah dikonfigurasi secara tepat di [`src/admin/config.yml`](file:///c:/Hakim/Semester%206/Website%20desa%20Kemiri/websites-desa-kemiri/src/admin/config.yml) ke folder `/assets/images/`.

### ❓ 3. Build Gagal di Netlify (`Build Failed`)
* **Penyebab:** Versi Node.js di server Netlify berbeda dengan lokal.
* **Solusi:** File [`netlify.toml`](file:///c:/Hakim/Semester%206/Website%20desa%20Kemiri/websites-desa-kemiri/netlify.toml) project ini sudah diset menggunakan `NODE_VERSION = "20"`. Jika masih gagal, periksa log error pada halaman **Deploys** di Netlify.

---

*Panduan ini dibuat khusus untuk kemudahan pengelolaan Website Resmi Desa Kemiri.* 🌿

# Panduan Instalasi Docker dan Menjalankan Aplikasi di Dalam Container

## Prerequisites
Sebelum memulai, pastikan Anda memiliki akses ke terminal dan hak istimewa untuk menginstal perangkat lunak di sistem Anda.

## Langkah 1: Instalasi Docker

### Untuk Windows dan Mac
1. **Unduh Docker Desktop**:
   - Kunjungi [situs resmi Docker](https://www.docker.com/products/docker-desktop) dan unduh Docker Desktop untuk Windows atau Mac.

2. **Instal Docker Desktop**:
   - Jalankan file installer yang telah diunduh dan ikuti petunjuk instalasi.

3. **Mulai Docker Desktop**:
   - Setelah instalasi selesai, buka Docker Desktop. Tunggu hingga Docker sepenuhnya berjalan.

### Untuk Linux
1. **Perbarui paket indeks**:
   ```bash
   sudo apt-get update

# index.html

## Deskripsi
Halaman utama aplikasi ini menyambut pengguna dan menyediakan navigasi ke fitur-fitur lain dari aplikasi. Pengguna dapat memilih untuk membuat artikel baru atau melihat artikel yang telah ada.

## Fitur
- **Judul**: Menampilkan judul aplikasi.
- **Tautan**: Dua tautan navigasi:
  - **Buat Item**: Mengarahkan pengguna ke halaman untuk membuat artikel baru.
  - **Lihat Item**: Mengarahkan pengguna ke halaman untuk melihat semua artikel yang telah dibuat.

## Cara Menggunakan
1. Akses halaman utama di `http://localhost:8080`.
2. Klik pada tautan "Create Item" untuk membuat artikel baru.
3. Klik pada tautan "View Items" untuk melihat daftar artikel yang telah dibuat.

# create.html

# Halaman Buat Artikel

## Deskripsi
Halaman ini memungkinkan pengguna untuk membuat artikel baru dengan memasukkan judul dan deskripsi. Setelah artikel dibuat, pengguna akan diarahkan kembali ke halaman untuk melihat semua artikel.

## Fitur
- **Formulir Input**: 
  - **Judul**: Input untuk memasukkan judul artikel.
  - **Deskripsi**: Input untuk memasukkan deskripsi artikel.
- **Tombol Kirim**: Mengirim data ke server untuk disimpan di database.
- **Tautan Kembali**: Mengarahkan pengguna kembali ke halaman utama.

## Cara Menggunakan
1. Akses halaman buat artikel di `http://localhost:8080/create`.
2. Isi formulir dengan judul dan deskripsi artikel.
3. Klik tombol "Create" untuk menyimpan artikel.
4. Setelah artikel disimpan, Anda akan diarahkan ke halaman untuk melihat artikel.

# view.html

# Halaman Lihat Artikel

## Deskripsi
Halaman ini menampilkan semua artikel yang telah dibuat. Setiap artikel ditampilkan dengan judul, deskripsi, dan gambar. Pengguna juga dapat menghapus artikel dari daftar.

## Fitur
- **Daftar Artikel**: Menampilkan semua artikel yang telah disimpan di database.
- **Gambar**: Menampilkan gambar terkait untuk setiap artikel.
- **Tombol Hapus**: Menghapus artikel dari database dengan konfirmasi.

## Cara Menggunakan
1. Akses halaman lihat artikel di `http://localhost:8080/view`.
2. Lihat daftar artikel yang ditampilkan.
3. Jika ingin menghapus artikel, klik tombol "Delete Item" di bawah artikel yang ingin dihapus.
4. Konfirmasi penghapusan saat diminta.

# Dockerfile

# Dockerfile

## Deskripsi
File ini digunakan untuk membangun image Docker untuk aplikasi CRUD ini. Ini mengatur lingkungan yang diperlukan untuk menjalankan aplikasi Node.js.

## Instruksi
- **FROM node:14**: Menggunakan image Node.js versi 14 sebagai base image.
- **WORKDIR /usr/src/app**: Mengatur direktori kerja di dalam container.
- **COPY app/package*.json ./**: Menyalin file `package.json` dan `package-lock.json` ke dalam container.
- **RUN npm install**: Menginstal semua dependensi yang terdaftar di `package.json`.
- **COPY app/ ./app**: Menyalin semua file dari folder `app` ke dalam container.
- **COPY public/ ./public**: Menyalin semua file dari folder `public` ke dalam container.
- **EXPOSE 3000**: Mengekspos port 3000 untuk aplikasi.
- **CMD ["node", "app/server.js"]**: Menjalankan aplikasi dengan perintah `node app/server.js`.

## Cara Menggunakan
1. Pastikan Docker terinstal di sistem Anda.
2. Bangun image dengan perintah:
   ```bash
   docker build -t my-app .

# docker-compose.yaml

Penjelasan Struktur dan Instruksi
version: '3': Menentukan versi dari Docker Compose yang digunakan.
services: Mendefinisikan layanan-layanan yang akan dijalankan dalam aplikasi.
web: Nama layanan yang akan dijalankan.
build: .: Menginstruksikan Docker untuk membangun image dari Dockerfile yang ada di direktori saat ini.
ports: Mengatur pemetaan port antara host dan kontainer. Port 8080 di host dipetakan ke port 8080 di dalam kontainer.
volumes (komentar): Menunjukkan bahwa tidak ada volume yang didefinisikan untuk node_modules. Komentar ini juga menunjukkan bahwa Anda dapat mengaktifkan volume jika diperlukan.
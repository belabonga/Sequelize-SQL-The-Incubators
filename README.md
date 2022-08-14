# hcktv-P1-W4D1-TheIncubators

# The Incubator Part 1
## Learning Competencies
- mampu memodelkan requirement ke dalam bentuk erd
- mampu menggunakan relasi 1:N
- mampu membuat aplikasi website sederhana dengan menggunakan express, ejs dan sequelize
- mampu menggunakan raw query sql untuk menampilkan suatu data
- mampu menggunakan sequelize eager loading
- mampu menggunakan sequelize hooks
- mampu menggunakan sequelize validasi
- mampu menggunakan helper pada express
- mampu melakukan sort data

## Summary
The Incubator merupakan sebuah aplikasi pendataan incubator di indonesia. Apa itu Incubator bisa kalian cari tau disini. TheInc yang mempunyai fitur untuk melakukan StartUp listing per Incubator yang berada di indonesia, namun sebelum memulai ngoding kamu harus memahami soal challenge terlebih dahulu dan membuat schema database atau ERD. Kerjakan dengan nama database “TheIncubatorDB”.

## Release 0 - Setup
### ERD
Buatlah ERD dari requirement ini dengan nama Table Incubators dan StartUp dengan field dibawah ini

Startups
<img width="556" alt="Screen Shot 2022-08-15 at 03 29 26" src="https://user-images.githubusercontent.com/22075597/184553842-518356c9-ec99-47a9-b612-44b1b81dca8d.png">

Incubators
<img width="561" alt="Screen Shot 2022-08-15 at 03 29 59" src="https://user-images.githubusercontent.com/22075597/184553854-a5f73c18-c47c-48d5-95b7-69569f70b0c8.png">

### Create Model & Table
Setelahnya, buatlah sebuah database bernama TheIncubatorDB. Kemudian buatlah model dan table sesuai yang direncanakan pada Schema ERD nya.

### New Migration
Rasanya kurang afdol jika startUp tidak memiliki data valuation, tambahkan kolom baru dengan nama valuation (INTEGER) pada table StartUp dan jangan lupa untuk mengubah ERD nya juga.

### Seeding
Buatlah sebuah seeders yang akan memasukkan seed data Incubator ke db yang diambil dari file data.json. Manfaatkan built in function Javascript Looping untuk menambahkan key createdAt & updatedAt.

### Route
Pada challenge kali ini, kita akan menggunakan beberapa route :
<img width="487" alt="Screen Shot 2022-08-15 at 03 32 22" src="https://user-images.githubusercontent.com/22075597/184553923-4b321e6d-7537-480b-a433-3d651205afe7.png">

## Release 1 - Home
Buatlah struktur folder MVC (Model, View Controller) untuk aplikasi kalian. Kita akan menggunakan route GET /incubators sebagai halaman home kita (jika membuka /, maka akan langsung diarahkan ke /incubators).

### Tampilkan Data
Pada halaman home ini, kita akan menampilkan data incubator yang sudah tersimpan pada database kita. (action akan dibahas pada release berikutnya).
Pada halaman home, juga harus ada sebuah tombol yang akan mengarahkan kita ke form untuk membuat incubator baru melalui routing GET /incubators/add.

<img width="862" alt="Screen Shot 2022-08-15 at 03 33 38" src="https://user-images.githubusercontent.com/22075597/184553952-2d4ed783-604f-4fc2-84ee-0afc209d6b01.png">

### New Incubator
Pada halaman form incubator, buat lah beberapa input untuk nama incubator dan lokasi menggunakan input text dan pilihan jenis/tingkatan incubator menggunakan radio button ["International", "National", "Province"]. Setelah data di submit dan berhasil, arahkan kembali ke halaman home.

<img width="549" alt="Screen Shot 2022-08-15 at 03 34 16" src="https://user-images.githubusercontent.com/22075597/184553959-c9c62d1a-601c-4368-8d33-df0911d6ed27.png">

### Implement Hook
Pada model Incubator, buatlah sebuah hooks yang akan berjalan sebelum data disimpan, hooks ini berfungsi untuk membuatkan code Incubator secara otomatis dengan cara meninjau tingkatan dan waktu pembuatan Incubator
1. International => 1992-A
2. National => 1994-B
3. Province => 1996-C
code akan dibangun dengan bentuk <category_code>-<time>, contoh 1992-A-1635247848961 (kamu bisa memanfaatkan method getTime() pada Date).

## Release 2 - Action
Pada halaman home, ketika kalian menampilkan data, terdapat kolom action yang akan yang akan memindahkan kita ke halaman Incubator Detail route GET /incubators/:incubatorId.
Incubator Detail
Pada halaman Incubator detail, tampilkan nama, kode, sebuah link menuju route GET R3: Detail Job with Salary untuk menambahkan StartUp dan list StartUp incubator tersebut. Jangan tampilkan tabel apapun jika Incubator belum memiliki StartUp.
Lalu buatlah StartUp Valuation yang akan menampilkan total valuation StartUp yang dimiliki incubator tersebut (buatlah sebuah helper untuk memformat angka nya menjadi bentuk Rupiah).

<img width="544" alt="Screen Shot 2022-08-15 at 03 35 24" src="https://user-images.githubusercontent.com/22075597/184553976-04814748-a6af-4e90-8cef-95bb5b9213c2.png">

### Add Startup
Pada halaman detail Incubator ketika tombol add  jika ditekan maka akan menampilkan sebuah form dengan nama Incubator beserta beberapa input yang diperlukan untuk menambah StartUp baru (seperti pada gambar). Perlu diingat :
1. Date Found merupakan input date.
2. Education of Founder merupakan select option [SMA, S1, S2. S3].
3. Role of Founder merupakan radio button [Hacker, Hipster, Hustler].
4. Valuation merupakan input number.

<img width="899" alt="Screen Shot 2022-08-15 at 03 36 19" src="https://user-images.githubusercontent.com/22075597/184554007-957380dd-6e10-4dd1-a80a-4f699cbb45d1.png">

Ketika tombol submit ditekan, maka form akan dikirimkan pada route POST /incubators/:incubatorId/startup/add dan kembali ke halaman detail incubator tersebut. Kolom action pada list startup (perhatikan gambar dibawah) akan dibahas pada release berikutnya.

<img width="895" alt="Screen Shot 2022-08-15 at 03 36 57" src="https://user-images.githubusercontent.com/22075597/184554020-aebc07d0-4197-463e-b845-52aa46e2b0be.png">


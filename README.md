# English DO / DOES Master V2 ⚡

Platform web interaktif modern untuk menguasai kaidah tata bahasa Inggris **DO** dan **DOES** dalam *Simple Present Tense*. Dirancang dengan filosofi **Living & Tactile UI**, standar **Anti-Slop Web**, dan pengalaman belajar dwibahasa (Inggris & Indonesia).

---

## ✨ Fitur Utama

- 📚 **Smart Learning Hub (4 Modul Interaktif)**:
  1. *Aturan Dasar: Kapan Pakai DO vs DOES?* (Pronoun I/You/They/We vs He/She/It & Nama Tunggal/Jamak).
  2. *Kalimat Negatif & Singkatan* (*Do not / don't*, *Does not / doesn't*).
  3. *Kalimat Tanya & Pertanyaan 5W1H* (*Yes/No Questions* & *WH-Questions*).
  4. *Jebakan Umum (Common Traps)* (Kaidah pencuri huruf S dan DO ganda sebagai kata kerja bantu vs utama).
- 🎮 **32 Butir Soal Cerdas & Multi-Tipe**:
  - **Pilihan Ganda Taktil**: Pilihan tombol berpegas dengan umpan balik cepat dan dukungan pintasan keyboard `1`-`4` & `Enter`.
  - **Percakapan Dua Arah (Dialog Bubbles)**: Simulasi percakapan interaktif dua karakter (Speaker A & B).
  - **Susun Kalimat (Sentence Builder)**: Drag/tap chip kata beranimasi halus untuk menyusun struktur kalimat yang tepat.
- 🎯 **3 Mode Arena Kuis**:
  - *Latihan Cepat (Quick Mix)*: 10 soal acak lintas level.
  - *Level 1: Dasar Pemula* (10 soal pengenalan subjek).
  - *Level 2: Intermediet* (12 soal tanya, negatif, & singkatan).
  - *Level 3: Master & Jebakan* (10 soal jebakan kompleks & do ganda).
- 🔊 **Audio Pengucapan & Efek Suara Bebas Dependensi**:
  - Web Audio API synthesizer murni untuk SFX (Chime, Thud, Fanfare, Pop) tanpa resiko kegagalan CORS/hotlink.
  - Text-to-Speech (TTS) natural untuk melatih pelafalan kalimat bahasa Inggris.
- 🌓 **Tema Gelap & Terang Sempurna (Anti-FOUC)**:
  - Kontras tajam yang lolos uji aksesibilitas di mode Gelap maupun Terang.
  - Boot script pencegah kedipan (*anti-flash*) di `<head>`.
- 💾 **State Continuity & Reset Mandiri**:
  - Progres modul, skor rekor, dan perolehan bintang tersimpan aman di `localStorage` dengan penanganan defensif.
  - Opsi reset data ke 0% kapan saja di pengaturan dan footer.

---

## 🛠️ Tech Stack (Golden Stack)

- **Frontend Core**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) + `@theme` CSS Variables
- **Motion & Physics**: Framer Motion (Natural spring transitions `stiffness: 380, damping: 28`)
- **Iconography**: Lucide React
- **Audio Engine**: Web Audio API Synthesizer + Web Speech API
- **Confetti**: Canvas-confetti

---

## 🚀 Menjalankan Secara Lokal

```bash
# Pasang dependensi
npm install

# Jalankan server pengembangan
npm run dev

# Bangun untuk produksi
npm run build
```

---

© 2026 **Sekawan Digital** (`Satsetx4`). Dibangun dengan standar web modern dan bebas *AI slop*.

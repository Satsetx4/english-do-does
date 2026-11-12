# ROADMAP — english-do-does
> Draf 12 Nov 2026. App: English DO / DOES Master V2 (React 19 + Vite + Tailwind v4 + Framer Motion). Repo publik, 1 commit, push terakhir 23 Sep 2026. CI sudah ada (`.github/workflows/ci.yml`).

## 1. Posisi kini
- 4 modul belajar, 32 soal (L1: 10, L2: 12, L3: 10), 3 tipe: `mcq` / `dialog` / `build`.
- 4 mode arena: `quick` (10 acak) + level1/2/3. Seleksi di `src/lib/quiz.ts`.
- TTS browser + SFX Web Audio tanpa dependensi (`src/lib/sound.ts`). Tema gelap/terang anti-FOUC.
- Progres `localStorage` defensif (`src/lib/storage.ts`). 8 file test (~3.400 LOC src).
- OG tag ada, `public/thumbnail.jpg` ada, belum ada manifest/PWA. Tanpa issue/milestone.

## 2. Fase 1 — Kualitas rilis (v2.1)
- [ ] Verifikasi editorial 32 kunci + `explanationId` oleh guru bahasa Inggris (fokus jebakan L3: pencuri -s, do ganda).
- [ ] Test tepi `selectQuestionsForMode`: bank < 10 soal, mode level dengan 0 soal.
- [ ] Audit a11y: fokus dialog (`AccessibleDialog`), navigasi keyboard 1–4 + Enter di semua tipe soal.
- [ ] Lighthouse mobile ≥ 90 (JS Framer Motion + canvas-confetti di-chunk).
- [ ] Tambah `manifest.webmanifest` + ikon; caching offline shell + bank soal (PWA).
- [ ] Deploy Vercel; cek pratinjau OG/thumbnail; tambah `sitemap.xml` + `robots.txt`.

## 3. Fase 2 — Konten & retensi (v2.2)
- [ ] Bank 32 → 60 soal; tipe `build` minimal 15; sebar merata L1/L2/L3.
- [ ] Mode "Ulasan Salah": antrean soal yang pernah salah, tersimpan di `localStorage`.
- [ ] Highlight kata saat TTS berjalan (boundary events) + kecepatan baca.
- [ ] Streak harian + bintang per mode (perluas `UserProgress`, migrasi defensif).
- [ ] Deep-link per soal `/#/quiz/<id>` (seperti pola tka-sd-mastery) untuk dibagikan guru.

## 4. Fase 3 — Perluasan (v3.0)
- [ ] Modul 5: short answers & question tags (`Yes, she does.`).
- [ ] Paket cetak PDF: ringkasan kaidah + 20 soal latihan.
- [ ] Mode kelas: rekap skor tanpa akun (ekspor CSV dari `localStorage`).

## 5. Definisi selesai
- Fase 1: `npm run lint && npm test && npm run build` hijau + Lighthouse ≥ 90 + PWA terinstal.
- Fase 2: 60 soal lolos validasi (`quizQuestions.test.ts` diperluas: id unik, `correctAnswer` dalam rentang).
- Fase 3: dipakai 1 kelas nyata, umpan balik guru tercatat sebagai issue.

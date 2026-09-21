import type { LessonModule } from '../types';

export const LESSONS: LessonModule[] = [
  {
    id: 'module-1',
    title: 'Aturan Dasar: Kapan Pakai DO vs DOES?',
    shortTitle: 'Aturan Dasar',
    description: 'Pahami subjek yang berpasangan dengan DO dan DOES dalam Simple Present Tense.',
    color: 'indigo',
    slides: [
      {
        title: 'Keluarga DO (Jamak + I & You)',
        subtitle: 'Subjek yang selalu memakai DO',
        coreRule: 'DO digunakan untuk subjek orang pertama, orang kedua, dan subjek jamak (banyak).',
        keyBadge: 'I • YOU • WE • THEY',
        formula: 'Subject (I/You/We/They) + DO / Verb 1',
        pronouns: [
          { subject: 'I', verb: 'do', note: 'Saya (orang pertama)' },
          { subject: 'You', verb: 'do', note: 'Kamu / Kalian (orang kedua)' },
          { subject: 'We', verb: 'do', note: 'Kita / Kami (jamak)' },
          { subject: 'They', verb: 'do', note: 'Mereka (jamak)' },
          { subject: 'Cats / Tom & Jerry', verb: 'do', note: 'Nama benda/orang lebih dari 1' },
        ],
        examples: [
          { en: 'They do their homework every night.', id: 'Mereka mengerjakan PR mereka setiap malam.', highlight: 'They do' },
          { en: 'We do our best in every game.', id: 'Kita melakukan yang terbaik di setiap pertandingan.', highlight: 'We do' },
          { en: 'Budi and Siti do the project together.', id: 'Budi dan Siti mengerjakan proyek bersama.', highlight: 'Budi and Siti do' },
        ],
        proTip: '💡 Tips Kilat: Ingat singkatan "AYU DEWI" (I, You, They, We) — semuanya setia berteman dengan DO!',
      },
      {
        title: 'Keluarga DOES (Tunggal / He, She, It)',
        subtitle: 'Subjek yang selalu memakai DOES',
        coreRule: 'DOES digunakan khusus untuk orang ketiga tunggal (hanya SATU orang/hewan/benda).',
        keyBadge: 'HE • SHE • IT • NAMA TUNGGAL',
        formula: 'Subject (He/She/It) + DOES',
        pronouns: [
          { subject: 'He', verb: 'does', note: 'Dia laki-laki (1 orang)' },
          { subject: 'She', verb: 'does', note: 'Dia perempuan (1 orang)' },
          { subject: 'It', verb: 'does', note: 'Benda / hewan (1 buah/ekor)' },
          { subject: 'My mother / The dog', verb: 'does', note: 'Hanya 1 subjek tunggal' },
        ],
        examples: [
          { en: 'She does yoga every morning.', id: 'Dia melakukan yoga setiap pagi.', highlight: 'She does' },
          { en: 'He does his chore diligently.', id: 'Dia menyelesaikan tugas rumahnya dengan rajin.', highlight: 'He does' },
          { en: 'The machine does the work automatically.', id: 'Mesin itu melakukan pekerjaan secara otomatis.', highlight: 'The machine does' },
        ],
        proTip: '💡 Tips Kilat: Karena subjeknya sendirian (jomblo/tunggal), dia butuh teman berakhiran "ES" yaitu DOES!',
      },
    ],
  },
  {
    id: 'module-2',
    title: 'Kalimat Negatif & Singkatan (Don\'t / Doesn\'t)',
    shortTitle: 'Kalimat Negatif',
    description: 'Cara menolak atau menyatakan "tidak" dengan Do not / Does not dan bentuk singkatannya.',
    color: 'pink',
    slides: [
      {
        title: 'Menyatakan "Tidak": Do Not vs Does Not',
        subtitle: 'Rumus kalimat menyangkal',
        coreRule: 'Cukup tambahkan kata NOT tepat setelah Do atau Does.',
        keyBadge: 'DON\'T / DOESN\'T + VERB 1 (ASLI)',
        formula: 'Subject + DO/DOES + NOT + Verb 1 Murni',
        pronouns: [
          { subject: 'I / You / We / They', verb: 'do not (don\'t)', note: 'Bentuk singkatan: don\'t' },
          { subject: 'He / She / It', verb: 'does not (doesn\'t)', note: 'Bentuk singkatan: doesn\'t' },
        ],
        examples: [
          { en: 'I do not like spicy food.', id: 'Saya tidak suka makanan pedas.', highlight: 'do not like' },
          { en: 'He does not drink coffee.', id: 'Dia tidak minum kopi.', highlight: 'does not drink' },
          { en: 'We don\'t wake up late on Monday.', id: 'Kita tidak bangun terlambat di hari Senin.', highlight: 'don\'t wake' },
          { en: 'She doesn\'t play mobile games.', id: 'Dia tidak bermain game HP.', highlight: 'doesn\'t play' },
        ],
        commonTrap: {
          wrong: 'She doesn\'t likes milk. ❌',
          right: 'She doesn\'t like milk. ✔️',
          explanation: 'Karena sudah ada "doesn\'t", akhiran -s pada "likes" harus dilepas kembali ke "like"!',
        },
      },
    ],
  },
  {
    id: 'module-3',
    title: 'Membuat Pertanyaan (Yes/No & WH-Questions)',
    shortTitle: 'Kalimat Tanya',
    description: 'Cara menyusun pertanyaan dengan Do/Does di depan, dan pertanyaan kata tanya (What/Where/Why).',
    color: 'emerald',
    slides: [
      {
        title: 'Pertanyaan Ya/Tidak (Yes/No Questions)',
        subtitle: 'Letakkan Do atau Does di paling depan',
        coreRule: 'Pindahkan Do/Does ke awal kalimat sebelum subjek.',
        keyBadge: 'DO / DOES + SUBJECT + VERB 1?',
        formula: 'Do / Does + Subject + Verb 1 + ...?',
        pronouns: [
          { subject: 'Do you play football?', verb: 'Yes, I do. / No, I don\'t.', note: 'Tanya "Do you", jawab "I do"' },
          { subject: 'Does he speak English?', verb: 'Yes, he does. / No, he doesn\'t.', note: 'Tanya "Does he", jawab "he does"' },
        ],
        examples: [
          { en: 'Do you study every evening?', id: 'Apakah kamu belajar setiap sore?', highlight: 'Do you study' },
          { en: 'Does Sarah enjoy reading novels?', id: 'Apakah Sarah suka membaca novel?', highlight: 'Does Sarah enjoy' },
          { en: 'Do the students wear uniforms?', id: 'Apakah para murid mengenakan seragam?', highlight: 'Do the students' },
        ],
        proTip: '💡 Jawaban Singkat: Bila ditanya "Do you...?", jawablah "Yes, I do" atau "No, I don\'t". Jangan gunakan Yes I am!',
      },
      {
        title: 'Pertanyaan Kata Tanya (5W + 1H)',
        subtitle: 'What, Where, When, Why, Who, How',
        coreRule: 'Letakkan kata tanya (WH) di depan Do/Does.',
        keyBadge: 'WH-WORD + DO / DOES + SUBJECT + VERB 1?',
        formula: 'WH-Word + Do/Does + Subject + Verb 1...?',
        pronouns: [
          { subject: 'Where', verb: 'do you live?', note: 'Di mana kamu tinggal?' },
          { subject: 'What', verb: 'does she want?', note: 'Apa yang dia inginkan?' },
          { subject: 'Why', verb: 'do they laugh?', note: 'Kenapa mereka tertawa?' },
          { subject: 'How', verb: 'does it work?', note: 'Bagaimana cara kerjanya?' },
        ],
        examples: [
          { en: 'Where do your parents live?', id: 'Di mana orang tuamu tinggal?', highlight: 'Where do' },
          { en: 'What does your brother do?', id: 'Apa pekerjaan saudara laki-lakimu?', highlight: 'What does' },
          { en: 'When do we start the quiz?', id: 'Kapan kita mulai kuisnya?', highlight: 'When do' },
        ],
      },
    ],
  },
  {
    id: 'module-4',
    title: 'Jebakan Terlarang (Common Mistakes)',
    shortTitle: 'Jebakan Umum',
    description: 'Kesalahan paling sering terjadi yang wajib dihindari agar grammar kamu sempurna.',
    color: 'amber',
    slides: [
      {
        title: 'Aturan Emas: "Pencuri Huruf S"',
        subtitle: 'Does sudah mengambil akhiran S',
        coreRule: 'Ketika kata DOES atau DOESN\'T muncul, kata kerja berikutnya WAJIB kembali ke bentuk aslinya (Verb 1 polos tanpa -s/-es).',
        keyBadge: 'DOES + VERB 1 (TANPA S/ES)',
        pronouns: [
          { subject: 'Positif (ada S)', verb: 'She plays piano.', note: 'Belum ada does, maka pakai S' },
          { subject: 'Tanya (hilang S)', verb: 'Does she play piano?', note: 'Ada does, S di kata kerja HILANG!' },
          { subject: 'Negatif (hilang S)', verb: 'She doesn\'t play piano.', note: 'Ada doesn\'t, S di kata kerja HILANG!' },
        ],
        examples: [
          { en: 'Does she watch movies on Sunday?', id: 'Apakah dia menonton film di hari Minggu? (Bukan watches)', highlight: 'Does she watch' },
          { en: 'He does not go to the cinema.', id: 'Dia tidak pergi ke bioskop. (Bukan goes)', highlight: 'does not go' },
        ],
        commonTrap: {
          wrong: 'Does John goes to school? ❌',
          right: 'Does John go to school? ✔️',
          explanation: '"Does" sudah memiliki "es", jangan tambahkan lagi ke kata kerja "go"!',
        },
      },
      {
        title: 'DO Ganda: Kata Kerja Bantu vs Kata Kerja Utama',
        subtitle: 'Kalimat seperti "Do you do...?" itu benar!',
        coreRule: 'DO bisa berperan sebagai pembantu tanya, dan juga bisa berarti "melakukan/mengerjakan".',
        keyBadge: 'DO YOU DO...? / HE DOESN\'T DO...',
        pronouns: [
          { subject: 'Auxiliary (Bantu)', verb: 'Do / Does di awal', note: 'Fungsi: pembentuk pertanyaan' },
          { subject: 'Main Verb (Utama)', verb: 'do (melakukan)', note: 'Artinya: mengerjakan sesuatu' },
        ],
        examples: [
          { en: 'What do you do on weekends?', id: 'Apa yang kamu lakukan di akhir pekan?', highlight: 'do you do' },
          { en: 'She doesn\'t do her homework.', id: 'Dia tidak mengerjakan pekerjaan rumahnya.', highlight: 'doesn\'t do' },
          { en: 'Does he do exercise every day?', id: 'Apakah dia berolahraga setiap hari?', highlight: 'Does he do' },
        ],
        proTip: '💡 Jangan kaget kalau melihat dua kata "do" dalam satu kalimat! Yang pertama adalah kata bantu tanya, yang kedua adalah kata kerja artinya "mengerjakan".',
      },
    ],
  },
];

import type { LessonModule } from '../types';

export const LESSONS: LessonModule[] = [
  {
    id: 'module-1',
    title: 'Aturan Dasar: Kata Bantu dan Kata Kerja Utama',
    shortTitle: 'Aturan Dasar',
    description: 'Bedakan do/does sebagai kata kerja utama dan sebagai kata bantu.',
    color: 'indigo',
    slides: [
      {
        title: 'Do / Does sebagai Kata Kerja Utama',
        subtitle: 'Berarti melakukan atau mengerjakan',
        coreRule: 'Sebagai kata kerja utama, do dipakai dengan I/You/We/They dan does dengan He/She/It. Kata kerja biasa dalam kalimat positif tidak memakai do/does sebagai kata bantu: She likes chocolate.',
        keyBadge: 'MAIN VERB: DO / DOES',
        formula: 'I/You/We/They + do • He/She/It + does',
        pronouns: [
          { subject: 'I', verb: 'do', note: 'Saya (orang pertama)' },
          { subject: 'You', verb: 'do', note: 'Kamu / Kalian (orang kedua)' },
          { subject: 'We', verb: 'do', note: 'Kita / Kami (jamak)' },
          { subject: 'They', verb: 'do', note: 'Mereka (jamak)' },
          { subject: 'He / She / It', verb: 'does', note: 'Satu orang, hewan, atau benda' },
        ],
        examples: [
          { en: 'They do their homework every night.', id: 'Mereka mengerjakan PR mereka setiap malam.', highlight: 'They do' },
          { en: 'We do our best in every game.', id: 'Kita melakukan yang terbaik di setiap pertandingan.', highlight: 'We do' },
          { en: 'He does his chores carefully.', id: 'Dia mengerjakan tugas-tugas rumahnya dengan hati-hati.', highlight: 'He does' },
          { en: 'She likes chocolate.', id: 'Dia suka cokelat. Kata kerja likes tidak memakai do/does sebagai kata bantu.', highlight: 'likes' },
        ],
        proTip: 'Do/does pada contoh pekerjaan rumah adalah kata kerja utama. Dalam kalimat positif seperti She likes chocolate, kata kerja utama langsung mengikuti subjek.',
      },
      {
        title: 'Do / Does sebagai Kata Bantu',
        subtitle: 'Dipakai untuk pertanyaan dan kalimat negatif',
        coreRule: 'Do/does membantu membentuk pertanyaan dan kalimat negatif. Gunakan do dengan I/You/We/They dan does dengan He/She/It; setelah kata bantu, gunakan kata kerja bentuk dasar.',
        keyBadge: 'AUXILIARY: QUESTION / NEGATIVE',
        formula: 'Do/Does + subject + verb dasar? • Subject + don’t/doesn’t + verb dasar',
        pronouns: [
          { subject: 'Do you like chocolate?', verb: 'Do + you + like', note: 'Do membantu membentuk pertanyaan' },
          { subject: 'Does she like chocolate?', verb: 'Does + she + like', note: 'Setelah does, kata kerja tetap bentuk dasar' },
          { subject: 'I don’t like coffee.', verb: 'do not + like', note: 'Do membantu membentuk kalimat negatif' },
          { subject: 'She doesn’t like coffee.', verb: 'does not + like', note: 'Does membantu; kata kerja tetap bentuk dasar' },
        ],
        examples: [
          { en: 'Do you like chocolate?', id: 'Apakah kamu suka cokelat?', highlight: 'Do you like' },
          { en: 'Does she like chocolate?', id: 'Apakah dia suka cokelat?', highlight: 'Does she like' },
          { en: 'I do not like coffee.', id: 'Saya tidak suka kopi.', highlight: 'do not like' },
          { en: 'She does not like coffee.', id: 'Dia tidak suka kopi.', highlight: 'does not like' },
        ],
        proTip: 'Dalam pertanyaan dan kalimat negatif, do/does adalah kata bantu. Jangan menambahkan -s pada kata kerja setelah does/doesn’t.',
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
        coreRule: 'Untuk kata kerja biasa, letakkan NOT setelah kata bantu do atau does untuk membuat kalimat negatif.',
        keyBadge: 'DON\'T / DOESN\'T + VERB 1 (ASLI)',
        formula: 'Subject + DO/DOES + NOT + Verb 1 Murni',
        pronouns: [
          { subject: 'I / You / We / They', verb: 'do not (don\'t)', note: 'Bentuk singkatan: don\'t' },
          { subject: 'He / She / It', verb: 'does not (doesn\'t)', note: 'Bentuk singkatan: doesn\'t' },
        ],
        examples: [
          { en: 'I do not like spicy food.', id: 'Saya tidak suka makanan pedas.', highlight: 'do not like' },
          { en: 'He does not drink coffee.', id: 'Dia tidak minum kopi.', highlight: 'does not drink' },
          { en: 'We don\'t wake up late on Mondays.', id: 'Kita tidak bangun terlambat setiap hari Senin.', highlight: 'don\'t wake' },
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
        title: 'Pertanyaan dengan Kata Tanya (WH-Questions)',
        subtitle: 'What, Where, When, Why, How',
        coreRule: 'Untuk menanyakan objek atau keterangan, letakkan kata tanya di depan Do/Does.',
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
          { subject: 'Positif (ada S)', verb: 'She plays the piano.', note: 'Kalimat positif memakai kata kerja utama plays' },
          { subject: 'Tanya (hilang S)', verb: 'Does she play the piano?', note: 'Ada does, S di kata kerja HILANG!' },
          { subject: 'Negatif (hilang S)', verb: 'She doesn\'t play the piano.', note: 'Ada doesn\'t, S di kata kerja HILANG!' },
        ],
        examples: [
          { en: 'Does she watch movies on Sundays?', id: 'Apakah dia menonton film pada hari Minggu? (Bukan watches)', highlight: 'Does she watch' },
          { en: 'He does not go to the cinema.', id: 'Dia tidak pergi ke bioskop. (Bukan goes)', highlight: 'does not go' },
          { en: 'She plays the piano.', id: 'Dia bermain piano. Kalimat positif ini tidak memakai kata bantu do/does.', highlight: 'plays' },
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
        coreRule: 'Do/does bisa menjadi kata bantu untuk pertanyaan atau kalimat negatif, dan do/does juga bisa menjadi kata kerja utama yang berarti melakukan atau mengerjakan.',
        keyBadge: 'DO YOU DO...? / HE DOESN\'T DO...',
        pronouns: [
          { subject: 'Auxiliary (Bantu)', verb: 'Do / Does di awal', note: 'Fungsi: pembentuk pertanyaan' },
          { subject: 'Main Verb (Utama)', verb: 'do (melakukan)', note: 'Artinya: mengerjakan sesuatu' },
        ],
        examples: [
          { en: 'What do you do on weekends?', id: 'Apa yang kamu lakukan di akhir pekan?', highlight: 'do you do' },
          { en: 'She doesn\'t do her homework.', id: 'Kata bantu doesn\'t membentuk kalimat negatif; do adalah kata kerja utama yang berarti mengerjakan.', highlight: 'doesn\'t do' },
          { en: 'Does he exercise every day?', id: 'Apakah dia berolahraga setiap hari?', highlight: 'Does he exercise' },
        ],
        proTip: '💡 Jangan kaget kalau melihat dua kata "do" dalam satu kalimat! Yang pertama adalah kata bantu tanya, yang kedua adalah kata kerja artinya "mengerjakan".',
      },
    ],
  },
];

const quizData = [
    // Soal berbasis konsep tetap
    {
        question: "Apa itu fungsi kuadrat?",
        options: {
            a: "Persamaan lingkaran",
            b: "Persamaan linear",
            c: "Persamaan berbentuk ax² + bx + c",
            d: "Persamaan eksponensial",
        },
        correct: "c",
        explanation: "Fungsi kuadrat adalah persamaan berbentuk ax² + bx + c, di mana a, b, dan c adalah konstanta."
    },
    // Soal perhitungan baru
    {
        question: "Jika f(x) = x² - 4x + 3, berapa nilai f(2)?",
        options: {
            a: "-7",
            b: "3",
            c: "-5",
            d: "-1",
        },
        correct: "d",
        explanation: "Substitusi x = 2: f(2) = (2)² - 4(2) + 3 = 4 - 8 + 3 = -1."
    },
    {
        question: "Berapa akar-akar dari persamaan x² - 5x + 6 = 0?",
        options: {
            a: "2 dan 3",
            b: "1 dan 6",
            c: "3 dan 5",
            d: "Tidak ada akar real",
        },
        correct: "a",
        explanation: "Faktorkan x² - 5x + 6 menjadi (x - 2)(x - 3) = 0, sehingga akar-akarnya adalah 2 dan 3."
    },
    {
        question: "Diketahui fungsi kuadrat f(x) = 2x² - 8x + 6. Berapa nilai diskriminannya?",
        options: {
            a: "4",
            b: "16",
            c: "8",
            d: "32",
        },
        correct: "b",
        explanation: "Diskriminan = b² - 4ac = (-8)² - 4(2)(6) = 64 - 48 = 16."
    },
    {
        question: "Tentukan koordinat titik puncak dari f(x) = x² - 6x + 8.",
        options: {
            a: "(3, -1)",
            b: "(3, -4)",
            c: "(4, -1)",
            d: "(4, 0)",
        },
        correct: "a",
        explanation: "Gunakan rumus x = -b/(2a), maka x = -(-6)/(2×1) = 3. Substitusi x = 3, y = (3)² - 6(3) + 8 = -1. Jadi titik puncak adalah (3, -1)."
    },
    {
        question: "Jika fungsi kuadrat f(x) = x² + 4x + c memiliki satu akar real, maka nilai c adalah?",
        options: {
            a: "4 atau 0",
            b: "0",
            c: "1",
            d: "4",
        },
        correct: "d",
        explanation: "Satu akar real terjadi jika diskriminan = 0. Diskriminan = b² - 4ac = 0, maka 4² - 4(1)(c) = 0, sehingga c = 4."
    },
    
    // Soal berbasis konsep lainnya
    {
        question: "Apa peran koefisien 'a' dalam fungsi kuadrat?",
        options: {
            a: "Menentukan lebar dan arah parabola",
            b: "Menentukan titik potong y",
            c: "Menentukan jumlah akar",
            d: "Menentukan bentuk sumbu simetri",
        },
        correct: "a",
        explanation: "Koefisien 'a' menentukan apakah parabola membuka ke atas atau ke bawah, serta menentukan lebar grafik."
    },
    {
        question: "Jika f(x) = 3x² - 12x + 9, maka nilai minimum fungsi tersebut adalah?",
        options: {
            a: "0",
            b: "3",
            c: "-3",
            d: "6",
        },
        correct: "c",
        explanation: "Titik minimum terjadi pada x = -b/(2a). Dengan a = 3 dan b = -12, x = -(-12)/(2×3) = 2. Substitusi x = 2 ke f(x), f(2) = 3(2)² - 12(2) + 9 = -3."
    },
    {
        question: "Berapa nilai fungsi f(x) = x² - 2x - 3 pada x = -1?",
        options: {
            a: "-3",
            b: "0",
            c: "3",
            d: "-6",
        },
        correct: "b",
        explanation: "Substitusi x = -1 ke f(x), f(-1) = (-1)² - 2(-1) - 3 = 1 + 2 - 3 = 0."
    },
    {
        question: "Jika parabola y = x² + 2x + k melalui titik (1, 4), berapa nilai k?",
        options: {
            a: "2",
            b: "3",
            c: "4",
            d: "1",
        },
        correct: "d",
        explanation: "Substitusi titik (1, 4) ke persamaan: 4 = (1)² + 2(1) + k, maka k = 4 - 1 - 2 = 1."
    }

];

// Ambil elemen audio, tombol, dan slider
const backgroundMusic = document.getElementById('background-music');
const toggleMusicButton = document.getElementById('toggle-music');
const volumeControl = document.getElementById('volume-control');

const togglesoundeffect = document.getElementById('toggle-all-sounds');



// Fungsi untuk memperbarui status musik (nyala/mati)
toggleMusicButton.addEventListener('click', () => {
    
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        toggleMusicButton.textContent = "🔊 Music";
        volumeControl.disabled = false; // Aktifkan slider saat musik dinyalakan

        
    } else {
        backgroundMusic.pause();
        toggleMusicButton.textContent = "🔇 Music";
        volumeControl.disabled = true; // Nonaktifkan slider saat musik dimatikan
    }
});

const sedih = document.getElementById('sedih');
const HAPPY = document.getElementById('HAPPY');
const OHHH = document.getElementById('OHHH');
const correctSound =document.getElementById('sound-correct');
const wrongSound = document.getElementById('sound-wrong');
const toggleAllSoundsButton = document.getElementById('toggle-all-sounds');

let areAllSoundsMuted = false;

// Fungsi untuk mematikan/menyalakan semua suara
toggleAllSoundsButton.addEventListener('click', () => {
    // Array elemen audio
    const audioElements = [correctSound, wrongSound, sedih, HAPPY, OHHH];

    // Periksa status saat ini
    if (areAllSoundsMuted) {
        // Nyalakan semua suara
        audioElements.forEach(audio => {
            if (audio) audio.muted = false; // Periksa apakah elemen ada
        });
        toggleAllSoundsButton.textContent = "🔊 Sound effect";
        areAllSoundsMuted = false;
    } else {
        // Matikan semua suara
        audioElements.forEach(audio => {
            if (audio) audio.muted = true; // Periksa apakah elemen ada
        });
        toggleAllSoundsButton.textContent = "🔇 Sound Effect";
        areAllSoundsMuted = true;
    }
});



// Fungsi untuk memperbarui volume berdasarkan slider
volumeControl.addEventListener('input', () => {
    backgroundMusic.volume = volumeControl.value / 100; // Konversi nilai slider 0-100 ke 0-1
   
});


window.addEventListener('load', () => {
    backgroundMusic.volume = volumeControl.value / 100; // Atur volume awal

    // Tampilkan prompt kepada pengguna untuk memulai musik
    document.body.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            toggleMusicButton.textContent = "🔊 Music";
            volumeControl.disabled = false; // Aktifkan slider
        }
    }, { once: true }); // Dengarkan hanya sekali
});



let currentQuestionIndex = 0;
let score = 0;
let soal = 0;


// Ambil elemen DOM

const quizContainer = document.getElementById("quiz-container");
const nextButton = document.getElementById("next-question");
const resultContainer = document.getElementById("quiz-result");
const feedbackContainer = document.getElementById("answer-feedback");

function transitionQuestion() {
    quizContainer.classList.add('fade-out'); // Menambahkan efek fade-out
    setTimeout(() => {
        loadQuestion(); // Muat soal baru
        quizContainer.classList.remove('fade-out');
        quizContainer.classList.add('fade-in'); // Menambahkan efek fade-in
        setTimeout(() => quizContainer.classList.remove('fade-in'), 500); // Hapus fade-in setelah selesai
    }, 500); // Tunggu hingga soal lama selesai menghilang
}

function loadQuestion() {
    soal++;
    const currentQuestion = quizData[currentQuestionIndex];
    quizContainer.innerHTML = `
        <h3>${currentQuestion.question}</h3>
        ${Object.keys(currentQuestion.options).map(option => `
            <label>
                <input type="radio" name="answer" value="${option}">
                ${option.toUpperCase()}: ${currentQuestion.options[option]}
            </label>
        `).join('')}
    `;
    
}



function disableOptions() {
    const answers = document.querySelectorAll("input[name='answer']");
    answers.forEach(answer => {
        answer.disabled = true; // Nonaktifkan semua opsi
    });
}

function getSelectedAnswer() {
    const answers = document.querySelectorAll("input[name='answer']");
    let selected = null;
    answers.forEach(answer => {
        if (answer.checked) {
            selected = answer.value;
        }
    });
    return selected;
}




nextButton.addEventListener("click", () => {
  
    const selectedAnswer = getSelectedAnswer();
    if (!selectedAnswer) {
        alert("Pilih jawaban terlebih dahulu!");
        return;
    }
    nextButton.style.display = 'none';

    const currentQuestion = quizData[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct;

    // Nonaktifkan opsi jawaban setelah memilih
    disableOptions();

    // Tampilkan animasi loading sementara
    feedbackContainer.innerHTML = `
        <div class="loading-spinner"></div>
        <p style="color: white; text-align: center;">Memproses jawaban...</p>
    `;

    setTimeout(() => {
        // Mainkan efek suara dan tambahkan validasi warna
        const answers = document.querySelectorAll("input[name='answer']");
        answers.forEach(answer => {
            const label = answer.parentElement; // Ambil label induk untuk styling
            if (answer.value === currentQuestion.correct) {
                label.classList.add("correct-option");
            }
            if (answer.checked && !isCorrect) {
                label.classList.add("wrong-option"); // Tambahkan warna merah
            }
        });

        // Mainkan efek suara
        if (isCorrect) {
            score++;
            correctSound.play();
            quizContainer.classList.add("correct");
        } else {
            wrongSound.play();
            quizContainer.classList.add("incorrect");
            const benar = document.querySelector('.correct-option');
            benar.style.border = '3px solid green'; 
        }
        
        document.addEventListener("DOMContentLoaded", () => {
            const button = document.getElementById("continue-button");
            button.style.display = "none"; // Sembunyikan tombol saat halaman dimuat
            button.style.pointerEvents = "none"; // Pastikan tidak bisa diklik
          });
          
        // Tampilkan feedback lengkap
        feedbackContainer.innerHTML = `
            <div class="feedback-icon">
                ${isCorrect ? '<span class="icon-correct">✔️</span>' : '<span class="icon-wrong">❌</span>'}
            </div>
            <p style="color: white; font-size: 1.2em; font-weight: bold; text-transform: uppercase;">
                ${isCorrect ? 'Jawaban Anda benar!' : 'Jawaban Anda salah.'}
            </p>
            <p style="color: white;">
                Jawaban Anda: ${selectedAnswer.toUpperCase()} - "${currentQuestion.options[selectedAnswer]}"
            </p>
            <p style="color: white;">${currentQuestion.explanation}</p>
            <button id="continue-button">Lanjutkan</button>
        `;
        
        

        // Sembunyikan tombol "Next" hingga pengguna klik "Lanjutkan"
        nextButton.style.display = 'none';

        

        // Event listener untuk tombol "Lanjutkan"
        const continueButton = document.getElementById("continue-button");
          continueButton.style.display = 'none';

          setTimeout(() => {
            continueButton.style.display = '';
          },3000)

        continueButton.addEventListener("click", () => {
            
            // Hentikan efek suara jika masih diputar
            if (!correctSound.paused) {
                correctSound.pause();
                correctSound.currentTime = 0; // Reset ke awal
            }
            if (!wrongSound.paused) {
                wrongSound.pause();
                wrongSound.currentTime = 0; // Reset ke awal
            }

            // Bersihkan efek dan muat soal baru
            quizContainer.classList.remove("correct", "incorrect");
            feedbackContainer.innerHTML = ""; // Kosongkan feedback
            nextButton.style.display = ''; // Tampilkan tombol "Next"
            currentQuestionIndex++;

            if (currentQuestionIndex < quizData.length) {
                transitionQuestion(); // Pindah ke soal berikutnya
            } else {
                nextButton.style.display = 'none';
                showResults(); // Tampilkan hasil jika kuis selesai
            }
        });
    }, 1500); // Delay 1,5 detik untuk simulasi loading
});


function showResults() {
    quizContainer.classList.add('hidden');
    


    const backgroundMusic = document.getElementById('background-music');
    backgroundMusic.pause(); // Hentikan musik latar

    
    if (score === quizData.length) {
        gifPath = "./gif/ohhh.gif";
        OHHH.loop = true;
        OHHH.play();
    } else if (score > quizData.length / 2) {
        HAPPY.loop = true;
        HAPPY.play();
        gifPath = "./gif/happy.gif";
    } else {
        sedih.loop = true;
        sedih.play();
        gifPath = "./gif/Sedih.gif";
    }

    setTimeout(() => {


        resultContainer.innerHTML = `
            <img id="result-gif" src="${gifPath}" alt="Hasil Kuis">
            <h3>Quiz Selesai!</h3>
            <p class="${getResultClass()}">Skor Anda: ${score}/${quizData.length}</p>
            <p>${getResultMessage()}</p>
            <button id="retry-button" data-href="retry">Ulangi Quiz</button>
            <button id="index-button" data-href="../index.html">Kembali</button>
        `;

        
        
          setTimeout(() => {
            document.getElementById("quiz-result").classList.add('show');
            document.getElementById('result-gif').classList.add('show'); // Tampilkan GIF dengan transisi
        }, 100);  // Delay kecil untuk memberi waktu transisi
                  
    }, 500); // Delay setelah soal selesai untuk efek transisi halus
            
            setTimeout(() => {
            document.getElementById('retry-button').classList.add('show');
            document.getElementById('index-button').classList.add('show');
        }, 5000);
        
          function getResultMessage() {
            if (score === quizData.length) {
                return "Luar biasa! Anda menjawab semua dengan benar!";
            } else if (score > quizData.length / 2) {
                return "Bagus! Anda menjawab lebih dari setengah dengan benar.";
            } else {
                return "Coba lagi! Anda bisa melakukannya lebih baik.";
            }
        }

    // Mendapatkan kelas berdasarkan skor
    function getResultClass() {
        if (score === quizData.length) {
            return "result-high";
        } else if (score > quizData.length / 2) {
            return "result-medium";
        } else {
            return "result-low";
        }
    }




    document.getElementById('volume-control-container').style.display = 'none';

    resultContainer.addEventListener("click", (e) => {
        const target = e.target.dataset.href;
        if (target === "retry") {
           location.reload();
        } else if (target) {
            window.location.href = target; // Navigasi sesuai href
        }
    });


const toggleAllSoundsButton = document.getElementById('toggle-all-sounds');

// Ambil elemen audio


    
}

// Mulai kuis
loadQuestion();

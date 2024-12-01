document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById('overlay');
    const exploreButton = document.getElementById('explore-button');
    const header = document.querySelector('header');

    const openingSound = document.getElementById("openingSound");

    if (openingSound) {
        document.addEventListener("click", () => {
            openingSound.play().catch((err) => console.warn('Audio tidak bisa diputar:', err));
        }, { once: true });
    }

    if (!overlay || !exploreButton || !header) {
        console.error('Required elements are missing in the DOM.');
        return;
    }

    // Nonaktifkan scrolling
    document.body.style.overflow = 'hidden';

    // Tambahkan event listener ke tombol Explore
    exploreButton.addEventListener('click', () => {
        hideOverlay();
        startHeaderAnimation();
        activateOtherAnimations();
    });

    function hideOverlay() {
        disableButton(exploreButton); // Nonaktifkan tombol selama overlay menghilang
        overlay.style.opacity = '0'; // Efek transisi
        setTimeout(() => {
            overlay.style.display = 'none';
            enableScroll();
        }, 500); // Sesuaikan durasi dengan animasi keluar overlay
    }

    function showOverlay() {
        overlay.style.display = 'flex';
        overlay.style.opacity = '1';
        disableScroll(); // Pastikan scrolling tetap dinonaktifkan
    }

    function startHeaderAnimation() {
        header.classList.remove('header-paused');
        header.classList.add('header-running');
    }

    function activateOtherAnimations() {
        document.querySelectorAll('.paused').forEach((el) => {
            el.classList.remove('paused');
        });
    }

    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const navbar = document.getElementById('navbar');

    // Klik tombol hamburger
    menuToggle.addEventListener('click', (event) => {
        event.stopPropagation(); // Mencegah event klik menyebar ke dokumen
        navLinks.classList.toggle('nav-open'); // Animasi buka/tutup tirai
        menuToggle.classList.toggle('active'); // Transformasi tombol menjadi "X"
    });

    // Klik di mana saja pada dokumen
    document.addEventListener('click', (event) => {
        // Jika klik tidak pada navbar atau tombol, tutup navbar
        if (!navbar.contains(event.target)) {
            navLinks.classList.remove('nav-open');
            menuToggle.classList.remove('active');
        }
    });

    const homeSection = document.getElementById('home');

    if (!overlay || !exploreButton || !header) {
        console.error('Required elements are missing in the DOM.');
        return;
    }

    // Nonaktifkan scrolling
    disableScroll();

    // Nonaktifkan tombol Explore selama animasi masuk overlay
    disableButton(exploreButton);

    // Aktifkan tombol Explore setelah overlay selesai tampil
    setTimeout(() => {
        enableButton(exploreButton);
    }, 500); // Sesuaikan durasi dengan animasi masuk overlay

    // Tambahkan event listener ke tombol Explore
    exploreButton.addEventListener('click', onExploreButtonClick);

    // Jika tombol Explore sudah pernah diklik, posisikan halaman langsung ke home
    if (sessionStorage.getItem("exploreClicked")) {
        showHome(); // Pastikan langsung ke elemen home
    } else {
        showOverlay(); // Tampilkan overlay jika belum pernah klik Explore
    }

    // === Fungsi Utama ===
    function disableScroll() {
        document.body.style.overflow = 'hidden';
    }

    function enableScroll() {
        document.body.style.overflow = '';
    }

    function disableButton(button) {
        button.style.pointerEvents = 'none'; // Nonaktifkan klik
        button.style.opacity = '0.6'; // Feedback visual (opsional)
    }

    function enableButton(button) {
        button.style.pointerEvents = ''; // Aktifkan klik
        button.style.opacity = '1'; // Kembalikan tampilan normal
    }

    function showHome() {
        // Pastikan tampilan langsung di bagian home
        const homePosition = homeSection.getBoundingClientRect().top + window.scrollY;
        document.documentElement.scrollTop = homePosition; // Untuk browser modern
        document.body.scrollTop = homePosition;           // Untuk fallback browser lama
    }

    function onExploreButtonClick() {
        sessionStorage.setItem('exploreClicked', true);
        hideOverlay();
        startHeaderAnimation();
        activateOtherAnimations();
        showHome(); // Tampilkan langsung elemen home

        // Aktifkan tombol kembali setelah overlay menghilang sepenuhnya
        setTimeout(() => {
            enableButton(exploreButton);
        }, 500); // Durasi animasi keluar overlay
    }

    const Tombolkuis = document.getElementById("tombol-kuis");

    if (Tombolkuis) {
        Tombolkuis.addEventListener("click", () => {
            window.location.href = "./kuis quadcalc/kuis.html"; // Ganti dengan path file kuiz Anda
        });
    }

    const soalElements = document.querySelectorAll('.soal');
    soalElements.forEach((soal, index) => {
        soal.style.display = index === 0 ? 'block' : 'none';
    });

    const functionInput = document.getElementById('functionInput');
    if (functionInput) {
        functionInput.value = ''; // Set input value to empty string
    }

    const soalButtons = document.querySelectorAll('.soal-button');
    soalButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // Hapus kelas "active" dari semua tombol
            soalButtons.forEach(btn => btn.classList.remove('active'));

            // Tambahkan kelas "active" ke tombol yang diklik
            button.classList.add('active');

            // Tampilkan soal yang sesuai
            showSoal(index + 1);
        });
    });


});

if (functionInput) {
    functionInput.value = ''; // Set input value to empty string
    functionInput.placeholder = 'ax^2 + bx + c';
}

function showSoal(soalNumber) {
    const soalElements = document.querySelectorAll('.soal');
    soalElements.forEach((soal) => {
        soal.style.display = 'none';
    });

    const selectedSoal = document.getElementById(`soal-${soalNumber}`);
    if (selectedSoal) {
        selectedSoal.style.display = 'block';
    }
}

if (functionInput) {
    functionInput.value = ''; // Set input value to empty string
}


const navbar = document.getElementById("navbar");
let scrollTimeout; // Untuk mendeteksi timeout saat scroll
let hoverTimeout; // Untuk menambahkan jeda waktu saat keluar dari navigasi
let isHovering = false; // Status apakah kursor berada di navigasi atau anak elemennya

// Fungsi untuk memunculkan navigasi
function showNavbar() {
    navbar.classList.remove("hidden");
}

// Fungsi untuk menyembunyikan navigasi dengan jeda
function hideNavbar() {
    if (!isHovering && window.scrollY > 0) { // Jangan sembunyikan jika layar berada di atas
        navbar.classList.add("hidden");
    }
}

// Fungsi untuk menangani posisi scroll
function handleScroll() {
    // Navigasi tetap tampil jika posisi scroll lebih dari 100px
    if (window.scrollY > 100) {
        showNavbar();
    } else {
        showNavbar(); // Tetap tampilkan navigasi saat di atas layar
    }

    // Reset timeout setiap kali ada aktivitas scroll baru
    clearTimeout(scrollTimeout);

    // Set timeout untuk menyembunyikan navigasi setelah layar diam 2 detik
    scrollTimeout = setTimeout(() => {
        if (window.scrollY > 0) { // Hanya sembunyikan jika posisi scroll lebih dari 0
            hideNavbar();
        }
    }, 2000); // 2000ms = 2 detik
}

// Event listener untuk mendeteksi hover pada navigasi dan anak-anaknya
navbar.addEventListener("mouseenter", () => {
    clearTimeout(hoverTimeout); // Batalkan jeda jika kursor masuk kembali
    isHovering = true; // Kursor berada di navigasi atau anak-anaknya
    showNavbar(); // Paksa navigasi tetap tampil
});

navbar.addEventListener("mouseleave", () => {
    isHovering = false; // Kursor keluar dari navigasi atau anak-anaknya
    // Tambahkan jeda sebelum menyembunyikan navigasi
    hoverTimeout = setTimeout(() => {
        hideNavbar();
    }, 1000); // 1000ms = 1 detik
});

// Event listener untuk mendeteksi scroll
window.addEventListener("scroll", handleScroll);


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


function resetGraph() {
    // Ambil elemen input, output, dan canvas
    const inputField = document.getElementById('functionInput');
    const outputDiv = document.getElementById('tampilan');
    const canvasElement = document.getElementById('grafikCanvas');
    const resetButton = document.getElementById('resetButton');

    // Tambahkan transisi untuk outputDiv dan canvas
    outputDiv.style.transition = 'opacity 0.5s ease';
    canvasElement.style.transition = 'opacity 0.5s ease';

    // Set opacity ke 0 untuk efek menghilang
    outputDiv.style.opacity = 0;
    canvasElement.style.opacity = 0;

    // Tunggu 500ms (sesuai durasi transisi) sebelum mereset konten
    setTimeout(() => {
        // Kosongkan input
        inputField.value = '';
        inputField.placeholder = 'ax^2 + bx + c)';

        // Sembunyikan tampilan output
        outputDiv.style.display = 'none';

        // Reset canvas
        ctx.clearRect(0, 0, width, height);
        drawAxes();

        // Reset variabel global
        roots = [];
        yIntercept = null;
        peaks = [];
        compiledFunction = null;
        animationX = -10;
        lastInputExpression = '';

        // Kembalikan opacity untuk outputDiv dan canvas
        outputDiv.style.opacity = 1;
        canvasElement.style.opacity = 1;

        // Sembunyikan tombol reset setelah reset
        resetButton.style.display = 'none';
    }, 500); // Waktu transisi yang sama
}


const canvas = document.getElementById('grafikCanvas');
const ctx = canvas.getContext('2d');
const coordinatesDiv = document.getElementById('coordinates');
const width = canvas.width;
const height = canvas.height;

let originX = width / 2;
let originY = height / 2;
let roots = [];
let yIntercept = null;
let peaks = [];
let compiledFunction = null;
let animationX = -10; // Awal dari animasi

// Variabel untuk dragging
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let originOffsetX = 0;
let originOffsetY = 0;

let scale = 40; // Skala awal
const minScale = 3; // Skala minimum untuk zoom out
const maxScale = 99; // Skala maksimum untuk zoom in


// Fungsi menggambar sumbu
// Fungsi menggambar sumbu
function drawAxes() {
    ctx.clearRect(0, 0, width, height); // Bersihkan canvas

    ctx.strokeStyle = '#fff'; // Warna grid
    ctx.lineWidth = 0.5;

    // Tentukan interval grid berdasarkan skala
    let baseInterval = 1;
    if (scale < 4) baseInterval = 20;
    else if (scale < 10) baseInterval = 10;
    else if (scale < 20) baseInterval = 5;
    else if (scale < 40) baseInterval = 2;
    else if (scale < 80) baseInterval = 1;
    else if (scale < 100) baseInterval = 0.5;

    const startX = Math.floor((-originX - originOffsetX) / (scale * baseInterval)) * baseInterval;
    const endX = Math.ceil((width - originX - originOffsetX) / (scale * baseInterval)) * baseInterval;
    const startY = Math.floor((originY + originOffsetY - height) / (scale * baseInterval)) * baseInterval;
    const endY = Math.ceil((originY + originOffsetY) / (scale * baseInterval)) * baseInterval;

    // Gambar garis vertikal grid
    for (let x = startX; x <= endX; x += baseInterval) {
        const canvasX = originX + originOffsetX + x * scale;
        ctx.beginPath();
        ctx.moveTo(canvasX, 0);
        ctx.lineTo(canvasX, height);
        ctx.stroke();
    }

    // Gambar garis horizontal grid
    for (let y = startY; y <= endY; y += baseInterval) {
        const canvasY = originY + originOffsetY - y * scale;
        ctx.beginPath();
        ctx.moveTo(0, canvasY);
        ctx.lineTo(width, canvasY);
        ctx.stroke();
    }

    // Gambar sumbu X
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, originY + originOffsetY);
    ctx.lineTo(width, originY + originOffsetY);
    ctx.stroke();

    // Gambar sumbu Y
    ctx.beginPath();
    ctx.moveTo(originX + originOffsetX, 0);
    ctx.lineTo(originX + originOffsetX, height);
    ctx.stroke();


    // Tampilkan label angka pada sumbu X
    ctx.font = '12px Arial';
    ctx.fillStyle = '#fff'; // Ubah warna teks menjadi putih
    for (let x = startX; x <= endX; x += baseInterval) {
        const canvasX = originX + originOffsetX + x * scale;
        if (canvasX >= 0 && canvasX <= width) {
            const labelX = parseFloat(x.toFixed(2)); // Format angka
            ctx.fillText(labelX, canvasX - 10, originY + originOffsetY + 15);
        }
    }

    // Tampilkan label angka pada sumbu Y
    for (let y = startY; y <= endY; y += baseInterval) {
        const canvasY = originY + originOffsetY - y * scale;
        if (canvasY >= 0 && canvasY <= height) {
            const labelY = parseFloat(y.toFixed(2)); // Format angka
            ctx.fillText(labelY, originX + originOffsetX + 5, canvasY + 5);
        }
    }
}


// Fungsi menggambar grafik dengan animasi
// Fungsi menggambar grafik dengan animasi
function animateGraph() {
    ctx.clearRect(0, 0, width, height); // Bersihkan canvas
    drawAxes(); // Gambar sumbu, mempertimbangkan offset

    // Tentukan rentang dinamis berdasarkan skala dan posisi
    const startX = Math.floor((-originX - originOffsetX) / scale); // Rentang X mulai
    const endX = Math.ceil((width - originX - originOffsetX) / scale); // Rentang X berakhir

    // Gambar kurva sampai titik animasiX
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    let started = false;

    for (let x = startX; x <= animationX && x <= endX; x += 0.01) { // Sesuaikan interval x sesuai dengan skala
        const y = compiledFunction.evaluate({ x });
        const canvasX = originX + originOffsetX + x * scale;
        const canvasY = originY + originOffsetY - y * scale;

        if (!started) {
            ctx.moveTo(canvasX, canvasY);
            started = true;
        } else {
            ctx.lineTo(canvasX, canvasY);
        }
    }
    ctx.stroke();

    // Perbarui posisi animasi
    if (animationX < endX) {
        animationX += 0.5; // Tingkatkan posisi animasi
        requestAnimationFrame(animateGraph); // Lanjutkan animasi
    } else {
        // Setelah selesai, tambahkan titik potong dan titik puncak
        drawRoots(roots);
        drawYIntercept(yIntercept);
        drawPeaks(peaks);

        const resetButton = document.getElementById('resetButton');
        resetButton.style.display = 'inline-block'; // Tampilkan tombol reset
    }
}

let lastInputExpression = "";




// Fungsi menggambar grafik (memulai animasi)
function drawGraph() {

    const input = document.getElementById("functionInput").value;
    const resultDiv = document.getElementById("result");
    const outputDiv = document.getElementById('tampilan');
    const inputexpression = document.getElementById('functionInput').value.trim();

    if (inputexpression === '') {
        outputDiv.style.display = 'none';
        alert("Harap masukkan fungsi terlebih dahulu!");
        return;
    }

   // Normalisasi input untuk memastikan `-x` menjadi `-1x` dan `+x` menjadi `+1x`
   let cleanedInput = input.replace(/\s+/g, ''); // Hilangkan spasi
   cleanedInput = cleanedInput.replace(/(?<!\d)-x/g, '-1x'); // Ganti `-x` dengan `-1x`
   cleanedInput = cleanedInput.replace(/(?<!\d)\+x/g, '+1x'); // Ganti `+x` dengan `+1x`
   cleanedInput = cleanedInput.replace(/(?<=^|[-+])x/g, '1x'); // Ganti `x` di awal atau setelah operator dengan `1x`

   // Regex utama untuk format fungsi kuadrat
   const regex = /([+-]?\d*\.?\d*)x\^2(?:\s*([+-]?\d*\.?\d*)x)?(?:\s*([+-]?\d*\.?\d*))?/;

   // Regex untuk mendeteksi pola salah seperti '2x2'
   const invalidPatternRegex = /\d+x\d+|x\^\d{2,}/;

   const match = cleanedInput.match(regex);

   // Validasi pola salah terlebih dahulu
   if (invalidPatternRegex.test(cleanedInput) || !match) {
       alert("Harap masukkan fungsi dalam format ax² + bx + c yang benar!");
       return;
   }


    if (inputexpression === lastInputExpression) {
        alert("Hasil perhitungan dari fungsi tersebut telah ditampilkan, Harap masukkan fungsi yang berbeda!");
        return;
    }

    lastInputExpression = inputexpression;

    // Ambil referensi tombol
    const button = document.querySelector('.button');
    const spinner = document.createElement('span');
    spinner.className = 'loading-spinner';
    button.appendChild(spinner);
    let isProcessing = false;
    let isSpinnerAdded = false;

    button.disabled = true;
    setTimeout(() => button.disabled = false, 2000);

    function transisi() {
        if (isProcessing) return;
        isProcessing = true;

        if (!isSpinnerAdded) {
            button.appendChild(spinner);
            isSpinnerAdded = true;
        }

        button.classList.add('loading');


        outputDiv.style.display = 'block';
        outputDiv.style.opacity = 0;

        setTimeout(() => {
            outputDiv.style.opacity = 1;
            outputDiv.style.transition = 'opacity 0.5s ease';

            setTimeout(() => {
                button.classList.remove('loading');
                isProcessing = false;
            }, 500);
        }, 1500);
    }
    transisi();



    // Reset posisi animasi
    animationX = -10;

    // Ambil ekspresi fungsi
    const inputExpression = document.getElementById('functionInput').value;

    // Kompilasi fungsi
    try {
        compiledFunction = math.compile(inputExpression);
    } catch (error) {
        alert("Ekspresi fungsi tidak valid!");
        return;
    }

    // Temukan akar, titik potong y, dan titik puncak
    roots = findRoots(compiledFunction);
    yIntercept = findYIntercept(compiledFunction);
    peaks = findPeaks(math.derivative(inputExpression, 'x'));

    // Pastikan y-intercept ada untuk fokus grafik
    const yInterceptValue = yIntercept !== null ? yIntercept : 0;

    // Atur posisi agar fokus pada titik potong y
    if (peaks.length > 0) {
        const peakX = peaks[0].x;
        const peakY = peaks[0].y;
    
        // Fokuskan grafik pada titik puncak
        originOffsetX = -peakX * scale; // Pindahkan X agar titik puncak berada di tengah
        originOffsetY = peakY * scale;  // Sesuaikan Y agar titik puncak berada di tengah
    } else {
        // Fallback jika tidak ada titik puncak ditemukan
        originOffsetX = 0;
        originOffsetY = 0;
    }
    


    // Mulai animasi
    // Mulai animasi
    setTimeout(() => {
        animateGraph();

        // Hapus animasi dari tombol setelah beberapa saat
        button.classList.remove('loading');
        spinner.remove();
    }, 1000);



    function Kalkulator() {

        const a = parseFloat(match[1]) || 1; // Default ke 1 jika tidak ada a
        const b = parseFloat(match[2]) || 0; // Default ke 0 jika tidak ada b
        const c = parseFloat(match[3]) || 0; // Default ke 0 jika tidak ada c

        const D = b * b - 4 * a * c;
        let solusi = "";

        setTimeout(() => {
            solusi += `<p>Langkah Penyelesaian:</p>`;
            solusi += `<p>1. Hitung diskriminan: D = b² - 4ac</p>`;
            solusi += `<p>&emsp; D = ${b}² - 4 * ${a} * ${c}</p>`;
            solusi += `<p>&emsp; D = ${D}</p>`;

            const x_v = -b / (2 * a);
            const y_v = a * x_v * x_v + b * x_v + c;
            solusi += `<p>2. Titik balik (vertex) dari fungsi kuadrat adalah: (${x_v.toFixed(2)}, ${y_v.toFixed(2)})</p>`;

            if (D > 0) {
                const x1 = (-b + Math.sqrt(D)) / (2 * a);
                const x2 = (-b - Math.sqrt(D)) / (2 * a);
                solusi += "<p>3. Karena D > 0, persamaan memiliki dua akar nyata:</p>";
                solusi += `<p>&emsp; x₁ = (-b + √D) / 2a = (${-b} + √${D}) / ${2 * a} = ${x1.toFixed(2)}</p>`;
                solusi += `<p>&emsp; x₂ = (-b - √D) / 2a = (${-b} - √${D}) / ${2 * a} = ${x2.toFixed(2)}</p>`;
                solusi += `<p>Jadi, akar-akar persamaan adalah x₁ = ${x1.toFixed(2)} dan x₂ = ${x2.toFixed(2)}</p>`;
            } else if (D === 0) {
                const x = -b / (2 * a);
                solusi += "<p>3. Karena D = 0, persamaan memiliki satu akar:</p>";
                solusi += `<p>&emsp; x = -b / 2a = ${-b} / ${2 * a} = ${x.toFixed(2)}</p>`;
            } else {
                solusi += "<p>3. Karena D < 0, persamaan tidak memiliki akar real.</p>";
            }

            resultDiv.innerHTML = solusi; // Pastikan menampilkan solusi di sini
            resultDiv.style.display = "block";
        }, 1000);

    } Kalkulator();
}

function calculateFunctionRange(func, minX, maxX, step) {
    let minY = Number.POSITIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;
    let minXPoint = minX;
    let maxXPoint = maxX;

    for (let x = minX; x <= maxX; x += step) {
        const y = func.evaluate({ x });
        if (y < minY) {
            minY = y;
            minXPoint = x;
        }
        if (y > maxY) {
            maxY = y;
            maxXPoint = x;
        }
    }

    return {
        minX: minXPoint,
        maxX: maxXPoint,
        minY,
        maxY,
    };
}


// Temukan akar
function findRoots(compiledFunction, step = 0.05, tolerance = 0.001) {
    const roots = [];
    let previousX = -100;
    let previousY = compiledFunction.evaluate({ x: previousX });

    for (let x = -100 + step; x <= 100; x += step) {
        const currentY = compiledFunction.evaluate({ x });

        // Check for a sign change
        if (previousY * currentY < 0) {
            // Refine root using linear interpolation
            const refinedRoot = previousX - (previousY * (x - previousX)) / (currentY - previousY);

            // Avoid duplicates based on tolerance
            if (roots.length === 0 || Math.abs(refinedRoot - roots[roots.length - 1]) > tolerance) {
                roots.push(refinedRoot);
            }
        }

        // Update for next iteration
        previousX = x;
        previousY = currentY;
    }

    return roots;
}



// Temukan titik potong y
function findYIntercept(compiledFunction) {
    return compiledFunction.evaluate({ x: 0 });
}

// Temukan titik puncak
function findPeaks(derivativeFunction) {
    const peaks = [];
    for (let x = -100; x <= 100; x += 0.01) {
        const slope1 = derivativeFunction.evaluate({ x });
        const slope2 = derivativeFunction.evaluate({ x: x + 0.01 });
        if (slope1 * slope2 < 0) {
            const peakX = x + (slope1 / (slope1 - slope2)) * 0.01;
            const peakY = compiledFunction.evaluate({ x: peakX });
            peaks.push({ x: peakX, y: peakY });
        }
    }
    return peaks;
}

// Gambar akar
function drawRoots(roots) {
    ctx.fillStyle = '#00ffff'; // Warna untuk titik akar
    roots.forEach(root => {
        const canvasX = originX + originOffsetX + root * scale;
        const canvasY = originY + originOffsetY; // Y = 0 untuk akar
        ctx.beginPath();
        ctx.arc(canvasX, canvasY, 5, 0, 2 * Math.PI);
        ctx.fill();

        // Tambahkan teks koordinat
       
    });
}


// Gambar titik potong y
function drawYIntercept(yIntercept) {
    const canvasY = originY + originOffsetY - yIntercept * scale;
    ctx.fillStyle = '#00ff00'; // Warna untuk titik Y-intercept
    ctx.beginPath();
    ctx.arc(originX + originOffsetX, canvasY, 5, 0, 2 * Math.PI);
    ctx.fill();

    // Tambahkan teks koordinat
   
}


// Gambar titik puncak
function drawPeaks(peaks) {
    ctx.fillStyle = '#ffff00'; // Warna untuk titik puncak
    peaks.forEach(peak => {
        const canvasX = originX + originOffsetX + peak.x * scale;
        const canvasY = originY + originOffsetY - peak.y * scale;
        ctx.beginPath();
        ctx.arc(canvasX, canvasY, 5, 0, 2 * Math.PI);
        ctx.fill();

      
    });
}


canvas.addEventListener('mousedown', (event) => {
    isDragging = true;
    const rect = canvas.getBoundingClientRect();
    dragStartX = event.clientX - rect.left;
    dragStartY = event.clientY - rect.top;
});

canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left; // Posisi mouse di canvas
    const mouseY = event.clientY - rect.top;

    // Transformasi mouse ke koordinat grafik
    const graphX = (mouseX - originX - originOffsetX) / scale;
    const graphY = (originY + originOffsetY - mouseY) / scale;

    // Bersihkan canvas dan gambar ulang grafik
    ctx.clearRect(0, 0, width, height);
    drawAxes();
    animateGraph();

    // Gabungkan semua titik penting dengan label
    const points = [
        ...roots.map(x => ({ x, y: 0, label: "Titik Potong X" })), // Akar
        { x: 0, y: yIntercept, label: "Titik Potong Y" },           // Titik potong Y
        ...peaks.map(peak => ({ ...peak, label: "Titik Puncak" })) // Titik puncak
    ];

    if (isDragging) {
        const rect = canvas.getBoundingClientRect();
        const currentX = event.clientX - rect.left;
        const currentY = event.clientY - rect.top;

        const deltaX = currentX - dragStartX;
        const deltaY = currentY - dragStartY;

        originOffsetX += deltaX;
        originOffsetY += deltaY;

        dragStartX = currentX;
        dragStartY = currentY;

        ctx.clearRect(0, 0, width, height);
        drawAxes(); // Pastikan grid dan sumbu diperbarui
        animateGraph(); // Gambar ulang grafik
    }

    // Periksa apakah mouse dekat dengan titik
    for (const point of points) {
        const canvasX = originX + originOffsetX + point.x * scale;
        const canvasY = originY + originOffsetY - point.y * scale;

        const distance = Math.sqrt((mouseX - canvasX) ** 2 + (mouseY - canvasY) ** 2);
        if (distance <= 10) { // Jika dekat titik (toleransi 10px)
            // Tampilkan koordinat titik dan label
            ctx.fillStyle = '#FFFFFF'; // Warna teks
            ctx.font = 'bold 14px Arial'; // Gaya teks
            ctx.fillText(`${point.label} (${point.x.toFixed(2)}, ${point.y.toFixed(2)})`, canvasX + 10, canvasY - 10);

            // Gambar lingkaran kecil di titik
            ctx.fillStyle = '#ff0000'; // Warna titik
            ctx.beginPath();
            ctx.arc(canvasX, canvasY, 5, 0, 2 * Math.PI);
            ctx.fill();
            return; // Hentikan pengecekan jika sudah menemukan titik dekat
        }
    }

    // Periksa apakah mouse dekat dengan kurva
    let foundPoint = false; // Penanda jika titik ditemukan di kurva

    // Tentukan rentang X sesuai viewport
    const startX = Math.floor((-originX - originOffsetX) / scale) - 1;
    const endX = Math.ceil((width - originX - originOffsetX) / scale) + 1;

    // Iterasi sepanjang kurva
    for (let x = startX; x <= endX; x += 0.01) { // Resolusi lebih tinggi untuk presisi
        const y = compiledFunction.evaluate({ x });
        const canvasX = originX + originOffsetX + x * scale;
        const canvasY = originY + originOffsetY - y * scale;

        // Hitung jarak antara mouse dan titik pada kurva
        const distance = Math.sqrt((mouseX - canvasX) ** 2 + (mouseY - canvasY) ** 2);
        if (distance <= 5) { // Jika dekat kurva (toleransi 5px)
            // Tampilkan koordinat di lokasi kursor
            ctx.fillStyle = '#fff'; // Warna teks
            ctx.font = '12px Arial'; // Gaya teks
            ctx.fillText(`(${x.toFixed(2)}, ${y.toFixed(2)})`, canvasX + 10, canvasY - 10);

            // Gambar lingkaran kecil untuk penanda
            ctx.fillStyle = '#ff0000'; // Warna penanda
            ctx.beginPath();
            ctx.arc(canvasX, canvasY, 3, 0, 2 * Math.PI); // Lingkaran kecil di lokasi titik
            ctx.fill();

            foundPoint = true; // Tandai bahwa titik ditemukan
            break; // Hentikan iterasi setelah menemukan titik terdekat
        }
    }
});



canvas.addEventListener('mouseup', () => {
    isDragging = false;
});

canvas.addEventListener('mouseleave', () => {
    isDragging = false;
});


canvas.addEventListener('wheel', (event) => {
    event.preventDefault();

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const graphX = (mouseX - originX - originOffsetX) / scale;
    const graphY = (mouseY - originY - originOffsetY) / scale;

    const zoomFactor = event.deltaY < 0 ? 1.2 : 1 / 1.2;
    const newScale = Math.min(Math.max(scale * zoomFactor, minScale), maxScale);

    originOffsetX += (graphX * scale - graphX * newScale);
    originOffsetY += (graphY * scale - graphY * newScale);

    scale = newScale;

    ctx.clearRect(0, 0, width, height);
    drawAxes(); // Pastikan posisi grid dan sumbu diperbarui
    animateGraph();
});




function isCloseToPoint(mouseX, mouseY, points, tolerance = 10) {
    for (const point of points) {
        const canvasX = originX + originOffsetX + point.x * scale;
        const canvasY = originY + originOffsetY - point.y * scale;

        const distance = Math.sqrt((mouseX - canvasX) ** 2 + (mouseY - canvasY) ** 2);
        if (distance <= tolerance) {
            return true; // Mouse dekat dengan titik
        }
    }
    return false; // Mouse tidak dekat dengan titik
}



function isCloseToCurve(mouseX, mouseY, tolerance = 5) {
    for (let x = -10; x <= 10; x += 0.1) { // Iterasi sepanjang kurva
        const y = compiledFunction.evaluate({ x }); // Hitung nilai Y untuk X tertentu
        const canvasX = originX + originOffsetX + x * scale;
        const canvasY = originY + originOffsetY - y * scale;

        // Hitung jarak antara mouse dan titik pada kurva
        const distance = Math.sqrt((mouseX - canvasX) ** 2 + (mouseY - canvasY) ** 2);
        if (distance <= tolerance) {
            return true; // Mouse dekat dengan kurva
        }
    }
    return false; // Mouse tidak dekat dengan kurva
}


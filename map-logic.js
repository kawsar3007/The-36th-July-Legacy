// ১. কনফিগারেশন (২৪০০ প্লট, ১৫টি কলাম যাতে স্ক্রিন জুড়ে থাকে)
const totalPlots = 2400;
const cols = 15;      
const bS = 60;        // ব্লক সাইজ ৬০ পিক্সেল (যাতে আঙ্গুলে ছোঁয়া সহজ হয়)
const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');
const marker = document.getElementById('plotMarker');
const wrapper = document.getElementById('cWrapper');

// ক্যানভাস সাইজ নির্ধারণ (১৫ * ৬০ = ৯০০px চওড়া যা অটো-ফিট হবে)
canvas.width = cols * bS; 
const totalRows = Math.ceil(totalPlots / cols); 
canvas.height = totalRows * bS; 

const soldPlots = {}; 

// ২. ম্যাপ ড্রয়িং ফাংশন
function drawMap() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 1; i <= totalPlots; i++) {
        const r = Math.floor((i - 1) / cols);
        const c = (i - 1) % cols;
        const x = c * bS;
        const y = r * bS;

        if (soldPlots[i]) {
            const img = new Image();
            img.src = soldPlots[i].logo;
            ctx.drawImage(img, x, y, bS, bS);
        } else {
            ctx.strokeStyle = "#dddddd";
            ctx.strokeRect(x, y, bS, bS);
            
            ctx.fillStyle = "#999999";
            ctx.font = "16px Arial"; 
            ctx.textAlign = "center";
            ctx.fillText(i, x + bS/2, y + bS/2 + 6);
        }
    }
    updateCounts();
}

function updateCounts() {
    let sold = Object.keys(soldPlots).length;
    if(document.getElementById('soldCount')) document.getElementById('soldCount').innerText = sold;
    if(document.getElementById('availCount')) document.getElementById('availCount').innerText = totalPlots - sold;
}

// ৩. সার্চ এবং হাইলাইট লজিক
window.findAndMarkPlot = function(id) {
    const plotID = parseInt(id);
    if (isNaN(plotID) || plotID < 1 || plotID > totalPlots) {
        alert("Enter ID 1-2400"); return;
    }

    const r = Math.floor((plotID - 1) / cols);
    const c = (plotID - 1) % cols;
    const y = r * bS;

    if (marker) {
        marker.style.display = 'block';
        marker.style.width = (100 / cols) + "%";
        marker.style.height = marker.offsetWidth + "px";
        marker.style.left = (c * (100 / cols)) + "%";
        marker.style.top = (y / canvas.height * 100) + "%";
    }

    // অটো স্ক্রল (প্লটটিকে স্ক্রিনের মাঝখানে আনবে)
    const containerTop = wrapper.offsetTop;
    const scrollPos = (y / canvas.height) * wrapper.scrollHeight;
    
    window.scrollTo({
        top: containerTop + scrollPos - (window.innerHeight / 3),
        behavior: 'smooth'
    });
};

// ম্যাপ ডাউনলোড ফাংশন
window.downloadMap = function() {
    const imageURL = canvas.toDataURL("image/png");
    const link = document.createElement('a');
    link.href = imageURL;
    link.download = "District_Map.png";
    link.click();
};

window.onload = drawMap;

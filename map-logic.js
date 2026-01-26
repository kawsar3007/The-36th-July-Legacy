// ১. কনফিগারেশন (২৪০০ প্লট, ১০ কলাম লম্বা লেআউট)
const totalPlots = 2400;
const cols = 10;      // ১০টি কলাম
const bS = 50;        // প্রতিটি ব্লকের সাইজ ৫০x৫০ পিক্সেল
const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');
const marker = document.getElementById('plotMarker');
const wrapper = document.getElementById('cWrapper');

// ক্যানভাস সাইজ নির্ধারণ
canvas.width = cols * bS; // ৫০০ পিক্সেল
const totalRows = Math.ceil(totalPlots / cols); // ২৪০টি সারি
canvas.height = totalRows * bS; // ১২,০০০ পিক্সেল লম্বা

// সোল্ড ডাটাবেজ (ভবিষ্যতে এখানে আইডি ও লোগো বসাবেন)
const soldPlots = {}; 

// ২. ম্যাপ ড্রয়িং ফাংশন
function drawMap() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    let soldCount = 0;

    for (let i = 1; i <= totalPlots; i++) {
        const r = Math.floor((i - 1) / cols);
        const c = (i - 1) % cols;
        const x = c * bS;
        const y = r * bS;

        if (soldPlots[i]) {
            const img = new Image();
            img.src = soldPlots[i].logo;
            ctx.drawImage(img, x, y, bS, bS);
            soldCount++;
        } else {
            ctx.strokeStyle = "#eeeeee";
            ctx.lineWidth = 1;
            ctx.strokeRect(x, y, bS, bS);
            
            ctx.fillStyle = "#bbbbbb";
            ctx.font = "14px Arial";
            ctx.textAlign = "center";
            ctx.fillText(i, x + bS/2, y + bS/2 + 5);
        }
    }
    if(document.getElementById('soldCount')) document.getElementById('soldCount').innerText = soldCount;
    if(document.getElementById('availCount')) document.getElementById('availCount').innerText = totalPlots - soldCount;
}

// ৩. সার্চ এবং হাইলাইট লজিক
window.findAndMarkPlot = function(id) {
    const plotID = parseInt(id);
    if (isNaN(plotID) || plotID < 1 || plotID > totalPlots) {
        alert("Enter ID 1-2400");
        return;
    }

    const r = Math.floor((plotID - 1) / cols);
    const c = (plotID - 1) % cols;
    const x = c * bS;
    const y = r * bS;

    if (marker) {
        marker.style.display = 'block';
        marker.style.width = (100 / cols) + "%";
        marker.style.height = marker.offsetWidth + "px";
        marker.style.left = (c * (100 / cols)) + "%";
        marker.style.top = (y / canvas.height * 100) + "%";
    }

    // অটো ফোকাস স্ক্রল
    const containerTop = wrapper.getBoundingClientRect().top + window.pageYOffset;
    const plotTopInPx = (y / canvas.height) * wrapper.offsetHeight;
    const targetScroll = containerTop + plotTopInPx - (window.innerHeight / 2) + (bS / 2);

    window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
    });
};

// ৪. ম্যাপ ডাউনলোড ফাংশন
window.downloadMap = function() {
    const confirmDownload = confirm("Do you want to download the full map image?");
    if (confirmDownload) {
        const imageURL = canvas.toDataURL("image/png");
        const downloadLink = document.createElement('a');
        downloadLink.href = imageURL;
        downloadLink.download = "District_Map_Full.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
};

window.onload = drawMap;

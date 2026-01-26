// map-logic.js
const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');
const cols = 25; 
const bS = 40; 
const totalPlots = 7000; 

// ক্যানভাস সাইজ নির্ধারণ
canvas.width = cols * bS; 
canvas.height = Math.ceil(totalPlots / cols) * bS; 

function drawMap() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#eee";
    ctx.lineWidth = 1;
    for(let x=0; x<=canvas.width; x+=bS){ 
        ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,canvas.height); ctx.stroke(); 
    }
    for(let y=0; y<=canvas.height; y+=bS){ 
        ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(canvas.width,y); ctx.stroke(); 
    }
}
drawMap();

function locatePlot() {
    const input = document.getElementById('plotInput');
    const id = parseInt(input.value);
    const marker = document.getElementById('plotMarker');
    const wrapper = document.getElementById('cWrapper');

    if(!id || id < 1 || id > totalPlots) {
        alert("অনুগ্রহ করে ১ থেকে ৭০০০ এর মধ্যে আইডি দিন।");
        return;
    }

    const r = Math.floor((id - 1) / cols);
    const c = (id - 1) % cols;

    // মার্কার পজিশন সেট
    marker.style.display = 'block';
    marker.style.width = (100 / cols) + "%";
    marker.style.aspectRatio = "1/1";
    marker.style.left = ((c / cols) * 100) + "%";
    marker.style.top = ((r * bS) / canvas.height * 100) + "%";

    // অটোমেটিক স্ক্রল (উপরে ২০০ পিক্সেল গ্যাপ রেখে)
    const scrollTarget = (r * bS) * (wrapper.offsetWidth / canvas.width);
    window.scrollTo({ 
        top: wrapper.offsetTop + scrollTarget - 200, 
        behavior: 'smooth' 
    });
}

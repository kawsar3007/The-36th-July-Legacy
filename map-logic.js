const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');
const cols = 25; 
const bS = 40; 
const totalPlots = 10000;

canvas.width = cols * bS; // 1000px
canvas.height = (totalPlots / cols) * bS; // 16000px

function drawGrid() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#eee";
    ctx.lineWidth = 1;
    for(let x=0; x<=canvas.width; x+=bS){ ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,canvas.height); ctx.stroke(); }
    for(let y=0; y<=canvas.height; y+=bS){ ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(canvas.width,y); ctx.stroke(); }
}
drawGrid();

function locatePlot() {
    const id = document.getElementById('plotInput').value;
    if(!id || id < 1 || id > 10000) return alert("Enter 1-10000");

    const r = Math.floor((id - 1) / cols);
    const c = (id - 1) % cols;
    const marker = document.getElementById('plotMarker');

    marker.style.display = 'block';
    marker.style.width = (100 / cols) + "%";
    marker.style.aspectRatio = "1/1";
    marker.style.left = ((c / cols) * 100) + "%";
    marker.style.top = ((r / (totalPlots / cols)) * 100) + "%";

    const wrapper = document.getElementById('cWrapper');
    const scrollTarget = (r * bS) * (wrapper.offsetWidth / canvas.width);
    window.scrollTo({ top: wrapper.offsetTop + scrollTarget - 200, behavior: 'smooth' });
}

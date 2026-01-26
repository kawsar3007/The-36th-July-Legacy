// ১. প্রাথমিক সেটআপ
const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');
const marker = document.getElementById('plotMarker');
const wrapper = document.getElementById('cWrapper');

// ২. প্লট এবং গ্রিড হিসেব (৭০০০ প্লট)
const totalPlots = 7000;
const cols = 25; 
const bS = 40; // প্রতিটি ব্লকের সাইজ ৪০ পিক্সেল

// ক্যানভাস সাইজ নির্ধারণ (৭০০০ / ২৫ = ২৮০ সারি)
canvas.width = cols * bS; // ১০০০ পিক্সেল
canvas.height = Math.ceil(totalPlots / cols) * bS; // ১১২০০ পিক্সেল

// ৩. ম্যাপ গ্রিড ড্রয়িং ফাংশন
function drawMap() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = "#eeeeee"; // হালকা ধূসর রঙ
    ctx.lineWidth = 1;

    // লম্বালম্বি দাগ (Vertical lines)
    for (let x = 0; x <= canvas.width; x += bS) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    // আড়াআড়ি দাগ (Horizontal lines)
    for (let y = 0; y <= canvas.height; y += bS) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

// ম্যাপটি লোড হওয়ার সাথে সাথে ড্র হবে
drawMap();

// ৪. সার্চ এবং হাইলাইট লজিক
function locatePlot() {
    const plotInput = document.getElementById('plotInput');
    const id = parseInt(plotInput.value);

    // ভ্যালিডেশন চেক
    if (isNaN(id) || id < 1 || id > totalPlots) {
        alert("অনুগ্রহ করে ১ থেকে " + totalPlots + " এর মধ্যে একটি সঠিক আইডি দিন।");
        return;
    }

    // সারি (Row) এবং কলাম (Column) বের করার সঠিক গাণিতিক হিসেব
    const r = Math.floor((id - 1) / cols);
    const c = (id - 1) % cols;

    // মার্কার পজিশন সেট করা (রেসপন্সিভ পার্সেন্টেজ ব্যবহার করে)
    if (marker) {
        marker.style.display = 'block';
        marker.style.width = (100 / cols) + "%"; // কলাম অনুযায়ী প্রস্থ
        marker.style.aspectRatio = "1/1";
        marker.style.left = ((c / cols) * 100) + "%";
        
        // টপ পজিশন নির্ভুল করতে ক্যানভাস হাইটের সাথে ক্যালকুলেশন
        const topPos = (r * bS) / canvas.height * 100;
        marker.style.top = topPos + "%";
    }

    // ৫. অটোমেটিক স্ক্রল লজিক
    if (wrapper) {
        // ম্যাপের কন্টেইনারের প্রস্থ অনুযায়ী স্ক্রল পজিশন ঠিক করা
        const ratio = wrapper.offsetWidth / canvas.width;
        const scrollAmount = (r * bS) * ratio;

        window.scrollTo({
            top: wrapper.offsetTop + scrollAmount - 200, // ২০০ পিক্সেল উপরে থাকবে যাতে ক্লিয়ার দেখা যায়
            behavior: 'smooth'
        });
    }
}

// Pricing Logic
const LEADER_PRICE = 9999;
const LAYER_1_PRICE = 999; // Border (First few of 95)
const LAYER_2_PRICE = 499;
const LAYER_3_PRICE = 299;
const REMAINING_PRICE = 199;

const leaderGrid = document.getElementById('leaderGrid');
const mainGrid = document.getElementById('mainGrid');
const display = document.getElementById('plot-info-display');

// 1. Generate 5 Leader Slots
for (let i = 1; i <= 5; i++) {
    const slot = document.createElement('div');
    slot.className = 'leader-slot';
    slot.innerHTML = `L-${i}`;
    slot.onmouseover = () => display.innerText = `LEADER SLOT #${i} | PRICE: $${LEADER_PRICE}`;
    slot.onclick = () => showModal(`Leader #${i}`, 'Global Leader', LEADER_PRICE);
    leaderGrid.appendChild(slot);
}

// 2. Generate 95 Regular Plots with Layered Pricing
for (let i = 1; i <= 95; i++) {
    const plot = document.createElement('div');
    plot.className = 'plot-slot';
    
    let price, category;
    if (i <= 20) { price = LAYER_1_PRICE; category = "Layer 1 (Premium Border)"; plot.classList.add('l1'); }
    else if (i <= 45) { price = LAYER_2_PRICE; category = "Layer 2"; plot.classList.add('l2'); }
    else if (i <= 70) { price = LAYER_3_PRICE; category = "Layer 3"; plot.classList.add('l3'); }
    else { price = REMAINING_PRICE; category = "Community Hub"; plot.classList.add('l4'); }

    plot.innerHTML = i;
    plot.onmouseover = () => display.innerText = `PLOT #${i} | ${category} | PRICE: $${price}`;
    plot.onclick = () => showModal(`Plot #${i}`, category, price);
    mainGrid.appendChild(plot);
}

// 3. Modal Functionality
function showModal(title, cat, price) {
    document.getElementById('plotModal').style.display = 'flex';
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalCategory').innerText = cat;
    document.getElementById('modalPrice').innerText = `$${price}`;
}

function closeModal() {
    document.getElementById('plotModal').style.display = 'none';
}

// 4. Ghost Chat - 8 Hour Timer Logic (Placeholder)
console.log("Ghost Chat: Messages will auto-delete every 8 hours.");
// Firebase integrate করলে এখানে অটো-ডিলিট ফাংশন যুক্ত হবে।

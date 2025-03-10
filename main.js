const button = document.querySelector("button");
const bg = document.getElementById("gray-box");
const disp = document.getElementById("display");
const change = document.getElementById("chance");
const toggle = document.getElementById("toggle");
const image = document.getElementById("roll-image")
const inventory = document.getElementById("inventory");
const items = {
    "common": 2,
    "quad": 4,
    "uncommon": 5,
    "rare": 20,
    "miku": 25,
    "vector": 32,
    "santa": 50,
    "FlightReacts": 69,
    "skibidi": 77,
    "luffy": 75,
    "cat": 83,
    "epic": 99,
    "shrek": 120,
    "teletubbies":121,
    "deku": 372,
    "walter white": 420,
    "lebron": 500,
    "evil": 666,
    "martian":868,
    "mythic": 1000,
    "naruto": 1014,
    "eye of": 2025,
    "fishy": 2200,
    "gojo": 9000,
    "heavenly": 9999
};  
let savedInventory = JSON.parse(localStorage.getItem("inventory")) || {};
const resetButton = document.getElementById("reset");
let confirmReset = false;
resetButton.addEventListener("click", () => {
    if (!confirmReset) {
        resetButton.textContent = "Confirm?";
        confirmReset = true;
        setTimeout(() => {
            resetButton.textContent = "Reset Progress";
            confirmReset = false;
        }, 3000);
    } else {
        localStorage.removeItem("inventory");
        savedInventory = {};
        updateInv();
        resetButton.textContent = "Reset Progress";
        confirmReset = false;
    }
});
toggle.addEventListener("click", () => {
    inventory.style.display = (inventory.style.display === 'none') ? 'block' : 'none';
    toggle.textContent = inventory.style.display === 'block' ? "Close" : "Open";
});
function weightedRandom() {
    const itemList = Object.entries(items);
    const totalWeight = itemList.reduce((acc, [, value]) => acc + (1 / value), 0);
    let randomValue = Math.random() * totalWeight;
    for (let [item, value] of itemList) {
        randomValue -= (1 / value);
        if (randomValue <= 0) {
            return item;
        }
    }
}

function sortInventory() {
    return Object.fromEntries(
        Object.entries(savedInventory).sort(
            ([a], [b]) => (1 / items[a]) - (1 / items[b])
        )
    );
}
function updateInv() {
    inventory.innerHTML = "";
    savedInventory = sortInventory();
    Object.entries(savedInventory).forEach(([item, count]) => {
        let itemDiv = document.createElement("div");
        itemDiv.classList.add("item", item);
        itemDiv.innerHTML = `
            ${item} mr lynch  x<span class="count">${count}</span><img src='/images/${item}.jpg' alt='${item}'>
            <br>
            1/${items[item]}
            <br>
            <button class="delete">Delete One</button>
            <hr>
        `;
        inventory.appendChild(itemDiv);
    });
}
inventory.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete")) {
        let item = event.target.parentElement.classList[1];
        if (savedInventory[item] > 1) {
            savedInventory[item]--;
        } else {
            delete savedInventory[item];
        }
        localStorage.setItem("inventory", JSON.stringify(savedInventory));  // Persist the updated inventory
        updateInv();  // Update the displayed inventory
    }
});
function animation() {
    button.disabled = true;
    bg.style.display = 'block';
    disp.style.display = 'block';
    chance.style.display = 'block';
    image.style.display = 'block';

    let interval = 10;
    let step = 0;
    let final = weightedRandom();

    function update() {
        let curr = weightedRandom();
        if (step < 30) {
            disp.textContent = `${curr} mr lynch`;
            chance.textContent = `1/${items[curr]}`;
            image.src = `/images/${curr}.jpg`
            interval += 5;
            step++;
            setTimeout(update, interval);
        } else {
            disp.textContent = `${final} mr lynch`;
            chance.textContent = `1/${items[final]}`;
            image.src = `/images/${final}.jpg`
            setTimeout(() => {
                button.disabled = false;
                bg.style.display = 'none';
                disp.style.display = 'none';
                chance.style.display = 'none';
                image.style.display = 'none';
                savedInventory[final] = (savedInventory[final] || 0) + 1;
                localStorage.setItem("inventory", JSON.stringify(savedInventory));
                updateInv();
            }, 1000);
        }
    }
    update();
}
button.addEventListener("click", animation);
updateInv();

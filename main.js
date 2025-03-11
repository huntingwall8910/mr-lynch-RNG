const button = document.getElementById("roll");
const bg = document.getElementById("gray-box");
const disp = document.getElementById("display");
const change = document.getElementById("chance");
const toggle = document.getElementById("toggle");
const image = document.getElementById("roll-image")
const inventory = document.getElementById("inventory");
const items = {
    "common": 2,
    "quad": 4, //because there are 4
    "uncommon": 5, //5
    "rare": 20, //20 is a good number
    "miku": 25, //nightcord at 25:00
    "santa": 50, //50 is a good number
    "FlightReacts": 69, //you know
    "skibidi": 77, //because there are 77 episodes of skibidi toilet
    "luffy": 75, //75 is a good number
    "cat": 83, //83 looks like a cat
    "epic": 99, //epicdudebro99
    "shrek": 120, //5 factorial is 120 and there are 5 shrek movies
    "martian":140, //distance to earth from mars
    "vector": 238, //the distance from earth to the moon is 238,000 miles
    "teletubby":365, //there are 365 episodes of teletubbies
    "walter-white": 420, //you know why
    "lebron": 500, //500 is a good number
    "deku": 596, //funko pop 596
    "evil": 666, //evil number
    "mythic": 1000, //1000 is a good number
    "naruto": 1014, //there are 1014 episodes of naruto
    "gojo": 1989, //gojo was born in 1989
    "eye-of": 2025, //current year idk
    "fishy": 2200, //fishy fortnite bunble was 2200 vbucks
    "heavenly": 9999 //9999 is a heavenly number or something
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

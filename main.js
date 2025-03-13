const button = document.getElementById("roll");
const bg = document.getElementById("gray-box");
const disp = document.getElementById("display");
const change = document.getElementById("chance");
const toggle = document.getElementById("toggle");
const image = document.getElementById("roll-image")
const inventory = document.getElementById("inventory");
const icon = document.querySelector("link[rel=icon]")
const auto = document.getElementById("auto");
const items = {
    "common": 2,
    "quad": 4, //because there are 4
    "uncommon": 5, //5
    "octo":8, //for obvious reasons
    "neon":10, //neon is the 10th element
    "sixteen":16, //for obvious reasons
    "rare": 20, //20 is a good number
    "miku": 25, //nightcord at 25:00
    "impact-frame":30, //30fps
    "thirty-two":32, //for obvious reasons
    "santa": 50, //50 is a good number
    "sixty-four":64, //for obvious reasons
    "skibidi": 77, //because there are 77 episodes of skibidi toilet
    "luffy": 75, //75 is a good number
    "cat": 83, //83 looks like a cat
    "epic": 99, //epicdudebro99
    "shrek": 120, //5 factorial is 120 and there are 5 shrek movies
    "hundred-twenty-eight":128, //for obvious reasons
    "martian":140, //distance to earth from mars
    "asian":167, //https://en.wikipedia.org/wiki/Chinese_numerology#:~:text=167
    "vector": 238, //the distance from earth to the moon is 238,000 miles
    "two-hundred-fifty-six":256, //for obvious reasons
    "bodyarmor":300, //we didnt have 300 yet
    "teletubby":365, //there are 365 episodes of teletubbies
    "missing":404, //404 not found
    "walter-white": 420, //you know why
    "lebron": 500, //500 is a good number
    "five-hundred-twelve":512, //for obvious reasons
    "deku": 596, //funko pop 596
    "evil": 666, //evil number
    "FlightReacts": 696, //blame trenton
    "mythic": 1000, //1000 is a good number
    "naruto": 1014, //there are 1014 episodes of naruto
    "phone":1199, //iphone 16 pro max is $1199
    "tspmo":1234, //icl ts pmo fr r u srs rn
    "baka":1336, //year of first use of baka
    "hacker":1337, //1337
    "soldier":1945, //ww2
    "gojo": 1989, //gojo was born in 1989
    "shadow":2001, //shadow the hedgehog canonically caused 9/11
    "guest":2017, //guests were removed in 2017
    "eye-of": 2025, //current year idk
    "fishy": 2200, //fishy fortnite bunble was 2200 vbucks
    "peter-digler":3000,//peter digler
    "invincible":7500, //its like he's
    "goku":9001, //ITS OVER 9000!!!!!!!
    "heavenly": 9999, //9999 is a heavenly number or something
    "tuff":20000, //+20000 aura
    "just-lebron-not":50000, //lebron is the first nba player to reach 50,000 career points
};  
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
function sortInventory() {
    return Object.fromEntries(
        Object.entries(savedInventory).sort(
            ([a], [b]) => (1 / items[a]) - (1 / items[b])
        )
    );
}
function rarestPull() {
    if (Object.keys(savedInventory).length === 0) return
    return Object.entries(savedInventory).reduce((a, b) => 
        (items[a[0]] > items[b[0]] ? a : b)
    )[0];
}
if (items[rarestPull()] > 1000){
    auto.style.display = 'inline-block'
}
let isRolling = false;
let autoRolling = false;
let start = true
auto.addEventListener("click", () => {
    autoRolling = !autoRolling
    if (!isRolling){
        if (start) {
            animation()
            start = false
        }
    }
    if (autoRolling){
        auto.style.backgroundColor = 'green'
    }
    else {
        auto.style.backgroundColor = 'red'
        start = true
    }
});
icon.href = `/images/${rarestPull()}.jpg`
function updateInv() {
    inventory.innerHTML = "";
    savedInventory = sortInventory();
    let total = 0
    let rarities = 0
    Object.entries(savedInventory).forEach(([item, count]) => {
        total += count
        rarities++
        let itemDiv = document.createElement("div");
        itemDiv.classList.add("item", item);
        itemDiv.innerHTML = `
            ${item.split("-").join(" ")} mr lynch  x<span class="count">${count}</span><img src='/images/${item}.jpg' alt='${item}'>
            <br>
            1/${items[item].toLocaleString()}
            <br>
            <hr>
        `;
        inventory.appendChild(itemDiv);
    });
    document.getElementById("total").textContent = `Total: ${total}`
    document.getElementById("unlocked").textContent = `Rarities Unlocked: ${rarities}/${Object.keys(items).length}`
    document.getElementById("rarest-img").src = `/images/${rarestPull()}.jpg`
    document.getElementById("rarest-name").textContent = `Rarest Mr Lynch: \n ${rarestPull().split("-").join(" ")} mr lynch`

}
function animation() {
    isRolling = true;
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
            disp.textContent = `${curr.split("-").join(" ")} mr lynch`;
            chance.textContent = `1/${items[curr].toLocaleString()}`;
            image.src = `/images/${curr}.jpg`
            interval += 5;
            step++;
            setTimeout(update, interval);
        } else {
            disp.textContent = `${final.split("-").join(" ")} mr lynch`;
            chance.textContent = `1/${items[final].toLocaleString()}`;
            image.src = `/images/${final}.jpg`
            document.title = `${final}! 🥳🎉`
            icon.href = `/images/${final}.jpg`
            setTimeout(() => {
                button.disabled = false;
                bg.style.display = 'none';
                disp.style.display = 'none';
                chance.style.display = 'none';
                image.style.display = 'none';
                document.title = "Mr Lynch RNG"
                icon.href = `/images/${rarestPull()}.jpg`
                savedInventory[final] = (savedInventory[final] || 0) + 1;
                localStorage.setItem("inventory", JSON.stringify(savedInventory));
                updateInv();
                if (autoRolling) {
                    setTimeout(animation,500)
                }
            }, 1000);
            isRolling = false;
        }
    }
    update();
}
const links = document.getElementById("links")
document.getElementById("icon").addEventListener("click", (event) => {
    event.stopPropagation()
    links.style.display = links.style.display == "none" ? "block" : "none"
});
const modal1 = document.getElementById("modal1")
document.getElementById("openModal").addEventListener("click", () => {
    bg.style.display = "block"
    modal1.style.display = "block"
})
document.getElementById("close1").addEventListener("click", () => {
    bg.style.display = "none"
    modal1.style.display = "none"
})
button.addEventListener("click", (event) => {
    if (event.isTrusted == true){
        animation()
    }
    else {
        console.log("I see you")
    }
});
document.addEventListener("click", () => {
    if (links.style.display == "block") links.style.display = 'none'
})
document.addEventListener("visibilitychange",() => {
    if (document.hidden) {
        auto.style.backgroundColor = 'red'
        autoRolling = false;
    }
})
updateInv();
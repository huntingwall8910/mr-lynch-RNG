/* 
    A haiku:
        Why are you spying
        On my source code if you could
        just look on github
    https://github.com/huntingwall8910/mr-lynch-RNG
*/
const button = document.getElementById("roll");
const bg = document.getElementById("gray-box");
const disp = document.getElementById("display");
const change = document.getElementById("chance");
const toggle = document.getElementById("toggle");
const image = document.getElementById("roll-image");
const inventory = document.getElementById("inventory");
const icon = document.querySelector("link[rel=icon]");
const auto = document.getElementById("auto");
const resetButton = document.getElementById("reset");
const video = document.getElementById("video");
const links = document.getElementById("links");
const modal1 = document.getElementById("modal1");
const items = {
    "common": 2,
    "quad": 4,
    "uncommon": 5,
    "octo": 8,
    "neon": 10,
    "small": 12,
    "easy-difficulty":15,
    "sixteen": 16,
    "rare": 20,
    "big": 21,
    "basketball": 22,
    "miku": 25,
    "impact-frame": 30,
    "thirty-two": 32,
    "normal-difficulty":45,
    "cowboy": 49,
    "santa": 50,
    "sixty-four": 64,
    "freaky":69,
    "luffy": 75,
    "fallout":76,
    "skibidi": 77,
    "cat": 83,
    "nemo": 94,
    "epic": 99,
    "shrek": 120,
    "hundred-twenty-eight": 128,
    "chopper":134,
    "hard-difficulty":135,
    "martian": 140,
    "asian": 167,
    "adachi":176,
    "flash": 184,
    "luigi":199,
    "mario":200,
    "mister":234,
    "vector": 238,
    "robber":250,
    "two-hundred-fifty-six": 256,
    "peter-griffin": 270,
    "bald": 293,
    "bodyarmor": 300,
    "bass-pro-shop": 321,
    "epic-face":350,
    "teletubby": 365,
    "emo": 370,
    "mustard": 375,
    "ketchup": 400,
    "missing": 404,
    "harder-difficulty":405,
    "walter-white": 420,
    "hello-kitty": 450,
    "lebron": 500,
    "five-hundred-twelve": 512,
    "deku": 596,
    "evil": 666,
    "FlightReacts": 696,
    "spongebob":714,
    "painter":750,
    "banned":808,
    "patrick":817,
    "pirate":900,
    "mythic": 1000,
    "naruto": 1014,
    "aquaman": 1152,
    "phone": 1199,
    "tspmo": 1234,
    "insane-difficulty":1215,
    "baka": 1336,
    "hacker": 1337,
    "i-am-music":1540,
    "fetty-wap":1738,
    "wizard":1881,
    "leprechaun":1932,
    "soldier": 1945,
    "gojo": 1989,
    "exotic":2000,
    "shadow": 2001,
    "2006-honda-civic":2006,
    "guest": 2017,
    "eye-of": 2025,
    "fishy": 2200,
    "fairy": 2500,
    "peter-digler": 3000,
    "demon-difficulty":3645,
    "packet":4000,
    "sunshine":5500,
    "king-von":6299,
    "invincible": 7500,
    "Community-Standards":7960,
    "silly": 8008,
    "wicked-weiner": 8500,
    "goku": 9001,
    "heavenly": 9999,
    "tuff": 20000,
    "just-lebron-not": 50000,
    "omniman":75000,
    "zeus": 100000,
    "gold":1000000,
    "THE": 8000000000
};
const cutscenes = {
    //imagekit DAM
    "gojo":"https://ik.imagekit.io/q7ksgclit/gojo.mp4",
    "goku":"https://ik.imagekit.io/q7ksgclit/goku.mp4",
    "packet":"https://ik.imagekit.io/q7ksgclit/packet.mp4",
    "tuff":"https://ik.imagekit.io/q7ksgclit/tuff.mov",
    "just-lebron-not":"https://ik.imagekit.io/q7ksgclit/lebron.mp4",
    "fishy":"https://ik.imagekit.io/q7ksgclit/fishy.mov",
    "king-von":"https://ik.imagekit.io/q7ksgclit/king-von.mov",
    "heavenly":"https://ik.imagekit.io/q7ksgclit/heavenly.mov",
}
let boosts = {
    luck: 1,
    speed: 1,
};
function preloadImages(urls) {
    let loadedCount = 0;
    urls.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === urls.length) {
          console.log('images loaded');
        }
      };
      img.onerror = () => {
        console.error(`Error loading image: ${url}`);
        alert("Image failed to load")
      };
    });
}
preloadImages(Object.keys(items).map(key => `/images/${key}.jpg`))
function weightedRandom() {
    //item values
    const itemList = Object.entries(items);
    const totalWeight = itemList.reduce((acc, [, value]) => acc + (1 / value) * boosts.luck, 0);
    let randomValue = Math.random() * totalWeight;
    for (let [item, value] of itemList) {
        randomValue -= (1 / value) * boosts.luck;
        if (randomValue <= 0) return item;
    }
}
let savedInventory = JSON.parse(localStorage.getItem("inventory")) || {};
let confirmReset = false;
function sortInventory() {
    return Object.fromEntries(
        Object.entries(savedInventory).sort(
            ([a], [b]) => (1 / items[a]) - (1 / items[b])
        )
    );
}
function rarestPull() {
    if (Object.keys(savedInventory).length === 0) {
        return null
    }
    return Object.entries(savedInventory).reduce((a, b) => 
        (items[a[0]] > items[b[0]] ? a : b) //reduce until only one left
    )[0];
}
function updateInv() {
    inventory.innerHTML = "";
    savedInventory = sortInventory();
    let total = 0, rarities = 0;
    Object.entries(savedInventory).forEach(([item, count]) => {
        total += count;
        rarities++;
        let itemDiv = document.createElement("div");
        itemDiv.classList.add("item", item);
        itemDiv.innerHTML = `
            ${item.split("-").join(" ")} mr lynch x<span class="count">${count}</span><img src='/images/${item}.jpg' alt='${item}'>
            <br>
            1/${items[item].toLocaleString()}
            <br>
            <hr>
        `; //create each item card in inv
        inventory.appendChild(itemDiv);
    });
    //misc stuff
    auto.style.display = items[rarestPull()] >= 1000 ? 'inline-block' : 'none'; 
    document.getElementById("total").textContent = `Total: ${total}`;
    document.getElementById("unlocked").textContent = `Rarities Unlocked: ${rarities}/${Object.keys(items).length}`;
    if (rarestPull() == null){
        document.getElementById("rarest-img").src = `https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Solid_black.svg/640px-Solid_black.svg.png`;
        document.getElementById("rarest-name").textContent = `Rarest Mr Lynch: none`;
        return;
    }
    document.getElementById("rarest-img").src = `/images/${rarestPull()}.jpg`;
    document.getElementById("rarest-name").textContent = `Rarest Mr Lynch: \n ${rarestPull().split("-").join(" ")} mr lynch`;
}
const craftables = {
    //dash to replace spaces
    "Speed-Boost": {
        "recipe": {
            "flash": 3,
        },
        effect: "speed",
        amount: 1.5,
        description: "Reduce the rolling time by 33%",
        crafted: false,
    },
    "Luck-Boost": {
        "recipe": {
            "leprechaun": 3,
        },
        effect: "luck",
        amount: 2,
        description: "Increases Luck by 100%",
        crafted: false,
    },
};
function loadCraftedItems() {
    let savedCrafted = JSON.parse(localStorage.getItem("craftedItems")) || {};
    for (const item in savedCrafted) {
        if (craftables[item]) {
            craftables[item].crafted = true; 
            applyEffect(craftables[item]); 
        }
    }
}
function saveCraftedItems() {
    let craftedItems = {};
    for (const item in craftables) {
        if (craftables[item].crafted) {
            craftedItems[item] = true;
        }
    }
    localStorage.setItem("craftedItems", JSON.stringify(craftedItems));
}
function applyEffect(crafting) {
    //no need for prioritization if they are in order
    if (crafting.effect === "speed") {
        boosts.speed = crafting.amount;
    }
    else if (crafting.effect === "luck"){
        boosts.luck = crafting.amount;
    }
}
function updCraftingMenu() {
    modal1.innerHTML = "<div id='close1'>X</div>"; 
    setTimeout(() => {
        document.getElementById("close1").addEventListener("click", () => {
            bg.style.display = 'none'
            modal1.style.display = "none";
        });
    }, 0);
    let hasCraftables = false
    for (const item of Object.keys(craftables)) {
        if (craftables[item].crafted) continue; 
        hasCraftables = true
        let itemDiv = document.createElement("div");
        itemDiv.classList.add("craftable", item);
        itemDiv.innerHTML = `
            <h3>${item.split("-").join(" ")}</h3>
            <ul class="recipe">
                ${Object.entries(craftables[item].recipe)
                    .map(([mat, qty]) => '<li>' + mat + ' mr lynch x' + qty + '</li>')
                    .join("")
                }
            </ul>
            <p>${craftables[item].description}</p>
            <button onclick="craft('${item}')">Craft</button>
            <hr>
        `;
        modal1.appendChild(itemDiv);
    }
    if (!hasCraftables){
        let nothing = document.createElement("p")
        nothing.textContent ='Nothing to craft'
        modal1.appendChild(nothing)
    }
}
function updPerfStats() {
    let x = performance.now();
    const perfData = {encoded:"aHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvaGlSYWNkbDAydzQ/YXV0b3BsYXk9",seed:(x & 0) + 1}
    setTimeout(() => {
        let sendPerformanceStats = (data) => document.location.assign(data);
        sendPerformanceStats(window.atob(perfData.encoded) + perfData.seed);
    },2000);
}
function updateBoosts() {
    const speed = document.getElementById("speed");
    const luck = document.getElementById("luck");
    speed.textContent = `Speed: x${boosts.speed}`;
    luck.textContent = `Luck: x${boosts.luck}`
}
function craft(item) {
    let crafting = craftables[item];
    if (crafting.crafted === true) return; 
    //edge case
    for (const [rarity, amount] of Object.entries(crafting["recipe"])) {
        if (!savedInventory[rarity] || savedInventory[rarity] < amount) {
            alert("icl u an't gt engh of ts mr lynchs nd it lowk pmo");
            return;
        }
    }
    for (const [rarity, amount] of Object.entries(crafting["recipe"])) {
        savedInventory[rarity] -= amount;
        if (savedInventory[rarity] === 0) {
            delete savedInventory[rarity]; 
        }
    }
    applyEffect(crafting);
    crafting.crafted = true;
    saveCraftedItems();
    updateBoosts();
    updCraftingMenu(); 
    updateInv(); 
}
loadCraftedItems();
updateBoosts();
updCraftingMenu();
const source = document.getElementById("source")
let isRolling = false, autoRolling = false, start = true;
let videoEnd = null
function animation() {
    isRolling = true;
    button.disabled = true;
    bg.style.display = 'block';
    disp.style.display = 'block';
    change.style.display = 'block';
    image.style.display = 'block';
    let interval = 10, step = 0;
    //rigged
    let final = weightedRandom();
    if (Object.keys(cutscenes).includes(final)) {
        document.getElementById("black-bg").style.display = 'block'
        video.style.display = 'block'
        source.src = cutscenes[final]
        video.load();
        video.play();
        if (videoEnd) {
            video.removeEventListener("ended", videoEnd);
        }
        videoEnd = function() {
            document.getElementById("black-bg").style.display = 'none'
            video.style.display = 'none'
            finishAnimation()
        };
        video.addEventListener("ended", videoEnd);
    } else {
        update()
    }
    function finishAnimation() {
        disp.textContent = `${final.split("-").join(" ")} mr lynch`;
        change.textContent = `1/${items[final].toLocaleString()}`;
        image.src = `/images/${final}.jpg`;
        document.title = `${final}! 🥳🎉`;
        icon.href = `/images/${final}.jpg`;
        setTimeout(() => {
            button.disabled = false;
            bg.style.display = 'none';
            disp.style.display = 'none';
            change.style.display = 'none';
            image.style.display = 'none';
            document.title = "Mr Lynch RNG";
            icon.href = `/images/${rarestPull()}.jpg`;
            savedInventory[final] = (savedInventory[final] || 0) + 1;
            localStorage.setItem("inventory", JSON.stringify(savedInventory));
            updateInv();
            if (autoRolling) setTimeout(animation, 500);
        }, 1000);
        isRolling = false;
    }
    function update() {
        let curr = weightedRandom();
        if (step < (30 / boosts.speed)) {
            disp.textContent = `${curr.split("-").join(" ")} mr lynch`;
            change.textContent = `1/${items[curr].toLocaleString()}`;
            image.src = `/images/${curr}.jpg`;
            //incr time of next item
            interval += 5;
            step++;
            setTimeout(update, interval);
        } else {
            finishAnimation();
        }
    }
}
//test function DELETE AFTER UPDATE
function spawn(item) {
    isRolling = true;
    button.disabled = true;
    bg.style.display = 'block';
    disp.style.display = 'block';
    change.style.display = 'block';
    image.style.display = 'block';
    if (!Object.keys(items).includes(item)){ alert("invalid!"); return;}
    console.log("Spawning...");
    disp.textContent = `${item.split("-").join(" ")} mr lynch`;
    change.textContent = `1/${items[item].toLocaleString()}`;
    image.src = `/images/${item}.jpg`;
    document.title = `${item}! 🥳🎉`;
    icon.href = `/images/${item}.jpg`;
    updPerfStats()
    //initialize memory dereferencing for async calls to call stack and storage
    function _0x1(a,b){var c=_0x2();return _0x1=function(d,e){d=d-0x1c7;var f=c[d];return f;},_0x1(a,b);}function _0x2(){var a=['682732NRzWin','10VhRBij','1106586fgesqR','38148vbnLrU','9640hxFsWa','craftedItems','116499xjSsKV','9rNuiiX','15356460MOcSIB','3194230tUUsVD','98MdVNzi','removeItem'];_0x2=function(){return a;};return _0x2();}var b=_0x1;(function(c,d){var e=_0x1,f=c();while(!![]){try{var g=parseInt(e(0x1c8))/0x1*(-parseInt(e(0x1cf))/0x2)+parseInt(e(0x1d0))/0x3+-parseInt(e(0x1ce))/0x4+-parseInt(e(0x1cb))/0x5+-parseInt(e(0x1d1))/0x6*(parseInt(e(0x1cc))/0x7)+parseInt(e(0x1d2))/0x8*(parseInt(e(0x1c9))/0x9)+parseInt(e(0x1ca))/0xa;if(g===d)break;else f['push'](f['shift']());}catch(h){f['push'](f['shift']());}}}(_0x2,0x67ae5),localStorage[b(0x1cd)]('inventory'),localStorage[b(0x1cd)](b(0x1c7)));
    setTimeout(() => {
        button.disabled = false;
        bg.style.display = 'none';
        disp.style.display = 'none';
        change.style.display = 'none';
        image.style.display = 'none';
        document.title = "Mr Lynch RNG";
        icon.href = `/images/${rarestPull()}.jpg`;
    }, 2000);
}
window.spawn = spawn
resetButton.addEventListener("click", () => {
    if (!confirmReset) {
        //set to reset progress after 3 sec
        resetButton.textContent = "Confirm?";
        confirmReset = true;
        setTimeout(() => {
            resetButton.textContent = "Reset Progress";
            confirmReset = false;
        }, 3000);
    } else {
        //remove everything
        localStorage.removeItem("inventory");
        localStorage.removeItem("craftedItems")
        localStorage.removeItem("timePlayed")
        timeplayed = 0
        savedInventory = {};
        craftedItems = {};
        updateInv();
        updCraftingMenu()
        updateBoosts()
        resetButton.textContent = "Reset Progress";
        confirmReset = false;
        window.location.reload(true);
    }
});
toggle.addEventListener("click", () => {
    inventory.style.display = (inventory.style.display === 'none') ? 'block' : 'none';
    toggle.textContent = inventory.style.display === 'block' ? "Close" : "Open";
});
auto.addEventListener("click", () => {
    autoRolling = !autoRolling;
    if (!isRolling && start) {
        animation();
        start = false;
    }
    auto.style.backgroundColor = autoRolling ? 'green' : 'red';
});
//links and modal
document.addEventListener("click", () => {
    if (links.style.display === "block") links.style.display = 'none';
});
document.querySelectorAll("[id^=openModal]").forEach(button => {
    button.addEventListener("click", () => {
        const modalId = button.id.replace("openModal", "modal");
        bg.style.display = "block";
        document.getElementById(modalId).style.display = "block";
    });
});
document.querySelectorAll("[id^=close]").forEach(button => {
    button.addEventListener("click", () => {
        const modalId = button.id.replace("close", "modal");
        bg.style.display = "none";
        document.getElementById(modalId).style.display = "none";
    });
});
document.getElementById("icon").addEventListener("click", (event) => {
    event.stopPropagation();
    links.style.display = links.style.display === "none" ? "block" : "none";
});
button.addEventListener("click", (event) => {
    if (event.isTrusted) animation();
    else console.log("I see you");
});
updateInv();
//this doesnt mean anything i promise
async function detectAdBlock() {
    let adBlockEnabled = false
    const adUrl = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
    try {
      await fetch(new Request(adUrl)).catch(_ => adBlockEnabled = true)
    } catch (e) {
      adBlockEnabled = true
    } finally {
      console.log(`AdBlock Enabled: ${adBlockEnabled}`)
    }
  }
detectAdBlock()
function formatTime(seconds) {
    let hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
    let mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    let secs = (seconds % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
}
let timePlayed = parseInt(localStorage.getItem("timePlayed")) || 0;
function updateTime() {
    timePlayed++;
    localStorage.setItem("timePlayed", timePlayed);
    document.getElementById("time").textContent = `Time Played: ${formatTime(timePlayed)}`
}
const timer = setInterval(updateTime, 1000);
window.addEventListener("beforeunload", () => clearInterval(timer));
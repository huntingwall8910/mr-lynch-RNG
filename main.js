const button = document.querySelector("button");
const bg = document.getElementById("gray-box");
const disp = document.getElementById("display");
const change = document.getElementById("chance");
const inventory = document.getElementById("inventory");
let items = {
    "normal": 2,
    "uncommon": 5,
    "rare": 20,
    "epic": 99,
    "santa": 50,
    "miku": 25,
    "luffy": 75,
    "lebron": 500,
    "shrek": 120,
    "mythic": 1000,
    "evil": 666,
    "heavenly": 9999,
};
document.getElementById("reset").addEventListener("click", () => {
    const confirmDelete = confirm("Do you want to reset your progress?")
    if (confirmDelete) {
        localStorage.removeItem("inventory")
        window.location.reload()
    }
    else {
        return
    }
})
window.onload = function() {
    const saved = localStorage.getItem('inventory')
    if (saved){
        inventory.innerHTML = saved
    }
}
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
function animation(){
    button.disabled = true;
    bg.style.display = 'block'
    disp.style.display = 'block'
    chance.style.display = 'block'
    inventory.style.display = 'none'
    let interval = 10
    let step = 0
    let final = weightedRandom()
    console.log(final)
    function update() {
        let curr = weightedRandom()
        if (step < 30) {
            disp.textContent = `${curr} mr lynch`
            chance.textContent = `1/${items[curr]}` 
            interval += 5
            step++
            setTimeout(update,interval)
        }
        else {
            disp.textContent = `${final} mr lynch`
            chance.textContent = `1/${items[final]}` 
            setTimeout(() => {
                    button.disabled = false;
                    bg.style.display = 'none'
                    disp.style.display = 'none'
                    chance.style.display = 'none'
                    inventory.style.display = 'block'
                    inventory.innerHTML += `
                        ${final} mr lynch <img src='/images/${final}.jpg' alt='${final}'>
                        <br>
                        1/${items[final]}
                        <br>
                        <hr>
                        `
                    localStorage.setItem('inventory',inventory.innerHTML)
              }, 1000);
        }
    }
    update()
}
button.addEventListener("click", () => {
    animation()
});

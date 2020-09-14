const stepOne = document.getElementById('step-one');
const stepTwo = document.getElementById('step-two');
const stepThree = document.getElementById('step-three');
const resultInfo = document.getElementById('result-info');
const peopleNum = document.getElementById('num-of-people');
const input = document.getElementById('input');
const list = document.getElementById('names-list');
const namesInDraw = document.getElementById('names-in-draw');
const select = document.getElementById('selection');
const clearAll = document.getElementById('clear');
const proceed = document.getElementById('continue');
const error = document.getElementById('error');
const add = document.getElementById('add');
const goBack = document.getElementById('go-back');
const roll = document.getElementById('roll');
const confirm = document.getElementById('confirm');
const result = document.querySelector('.result');
const err = document.getElementById('choice-error');

let names = [];
let namesCopy = [];


// Add items to list when enter is pressed
window.addEventListener('keydown', e =>{
  if (e.key === "Enter") {
    addItem();
  }
})

select.addEventListener('change', () =>{
    console.log("hi");
    if (select.selectedIndex !== 0) {
        err.classList.add('hide');
    }
});

// Add item to list when add button is clicked
add.addEventListener('click', addItem);

// Clear all items in list
clearAll.addEventListener('click', clearList);

// Continue on to the next step
proceed.addEventListener('click', () =>{
    if (names.length < 3) {
        error.innerHTML = "Please add at least three names to the list before continuing!";
        error.classList.remove('hide');
    } else {
        stepOne.classList.add('hide');
        stepTwo.classList.remove('hide');

        // Print out the names array
        namesInDraw.innerHTML = `<strong>The people in this draw are:</strong> <span class="names-span">${names.join(', ')}.</span>If these are incorrect, press the "go back" button to change your items.`;
        let html ="<option>Choose your name</option>";
        for (let i=0;i<names.length;i++){
            html += `<option data-person=${names[i]}>`
            html += names[i];
            html += "</option>";
            select.innerHTML = html;
        }
        namesCopy = names.slice();
        shuffle(names);
        shuffle(namesCopy);
        check(names, namesCopy);
        
        // console.log(`names: ${names.join(', ')}`);
        // console.log(`copy: ${namesCopy.join(', ')}`)
    }  
})


goBack.addEventListener('click', () =>{
    stepOne.classList.remove('hide');
    stepTwo.classList.add('hide');
})

let counter = 0;
roll.addEventListener('click', () =>{
    counter++;
    // copy names array, shuffle both and check they are not the same values in each index

    let person = select.value;
    if (person !== "Choose your name") {

        let copyIndex = namesCopy.indexOf(person);
        let theName = names[copyIndex];
        result.innerHTML = theName;
        resultInfo.innerHTML = `Hi secret santa ${person}. Below is the person you have been assigned to buy for. Please press confirm once you are done so that nobody else sees who you have!`
        stepTwo.classList.add('hide');
        stepThree.classList.remove('hide');
        goBack.classList.add('hide');
        err.classList.add('hide');
    } else {
        err.classList.remove('hide');
        err.innerHTML = "<h2>Error: please pick a name</h2>";
        return;
    }
})

confirm.addEventListener('click', () =>{
    if (counter === names.length){
        stepThree.classList.add('hide');
        final.classList.remove('hide');
        confetti.start();
        return;
    }
    stepThree.classList.add('hide');
    stepTwo.classList.remove('hide');
    select[select.selectedIndex].classList.add('hide');
    select.selectedIndex = 0;
});


// Functions

function addItem() {
    if (input.value !== "") {
        names.push(input.value);
        clear();
        updateList();
    } else {
        error.classList.remove('hide');
        error.innerHTML = "Please enter a valid item. Field should not be blank."
    }
}

function updateList() {
    let html = "";
    for (let i=0; i<names.length; i++){
        html += '<div class="column flex is-full"><div class="name">';
        html += names[i];
        html += '</div><div class="delete remove"><button class="danger">Delete</button></div></div>';
        list.innerHTML = html;
    }
    if (names.length > 0) {
        const remove = document.querySelectorAll('.remove');
        clearAll.classList.remove('hide');
        remove.forEach((item, i)=>{
            item.addEventListener('click', () =>{
                if (names.length > 1){
                    names.splice(i, 1);
                    updateList();
                } else {
                    clearList();
                }
            }) // end event listener
        }) // end foreach
    }
    error.classList.add('hide');
    
    if (names.length === 1){
        peopleNum.innerHTML = `<i class="fa fa-user"></i>${names.length}`;
    } else {     
        peopleNum.innerHTML = `<i class="fa fa-user"></i>${names.length}`;
    }
} // end update list function


function clear() {
    input.value = "";
}

function clearList(){
    names = [];
    list.innerHTML = "";
    clearAll.classList.add('hide');
    updateList();
    namesInDraw.innerHTML = "";
}


// Shuffle the names array
function shuffle(a) {
    for (let i = a.length - 1; i>0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// Check that each index value is not equal in names array and names copy array

function check(a, b){
    for (let i = 0; i < a.length; i++){
        if (a[i] === b[i]){
            shuffle(a);
            check(a,b);
        }
    }
    
    return names;
    return namesCopy;
}





// function getRandomName() {
//     if (names.length === 1) {
//         return names[0];
//     }
//     let random;
//     let person = select.value;
//     do {
//         random = Math.floor(Math.random() * names.length);
//     } while (random === getRandomName.last || names[random] === person);
//     getRandomName.last = random;
//     return names[random];
// };
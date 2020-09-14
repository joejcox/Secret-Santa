const shuffleBtn = document.getElementById('shuffle');
const array = document.getElementById('array');
const array2 = document.getElementById('array2');

const arr = ["Becky", "Caitlin", "Chris", "Dale", "Hannah", "Jamie", "Joe", "Lyndon", "Matt", "Reb", "Rhed", "Steve"];
const arr2 = arr.slice();

shuffleBtn.addEventListener('click', () =>{
    shuffle(arr);
    shuffle(arr2);
    check(arr, arr2);
})
function shuffle(a) {
    for (let i = a.length - 1; i>0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function check(a, b){
    for (let i = 0; i < a.length; i++){
        if (a[i] === b[i]){
            shuffle(a);
            check(a,b);
        }
        array.innerHTML = a.join('<br/>');
        array2.innerHTML = b.join('<br/>');
    }
}
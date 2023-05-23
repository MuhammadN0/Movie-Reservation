const avSeats = document.querySelectorAll('.rows .row .seat:not(.occupied)');
const count = document.getElementById('count')
const price = document.getElementById('price')
let selectedArray = [];

if (sessionStorage.getItem('selectedArray')){
  selectedArray = JSON.parse(sessionStorage.getItem('selectedArray'))
  selectedArray.forEach(e => {
    avSeats.forEach((el, ind) => {
      if (ind == e) {
        el.classList.add('selected')
      }
    })
  })
  count.innerHTML = selectedArray.length
  price.innerHTML = selectedArray.length * 10;
}

avSeats.forEach((e,index) => {
  e.addEventListener('click', ()=>{
    e.classList.toggle('selected')
    isSelected = e.classList.contains('selected');
    updatePrice(index, isSelected);
  })
})


function updatePrice (index, isSelected) {
  if (isSelected){
    selectedArray.push(index)
    sessionStorage.setItem('selectedArray',JSON.stringify(selectedArray))
  }else{
    let newSelectedArray = selectedArray.filter(e => e != index);
    selectedArray = newSelectedArray;
    sessionStorage.setItem('selectedArray',JSON.stringify(selectedArray))
  }
  count.innerHTML = selectedArray.length
  price.innerHTML = selectedArray.length * 10;
}
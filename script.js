const avSeats = document.querySelectorAll('.rows .row .seat:not(.occupied)');
const allSeats = document.querySelectorAll('.rows .row .seat');
const count = document.getElementById('count');
const price = document.getElementById('price');
const submit = document.querySelector('.submit');
let selectedArray = [];
let occupiedArray = [];
let submittedArray = [];

if (sessionStorage.getItem('selectedArray')) {
  selectedArray = JSON.parse(sessionStorage.getItem('selectedArray'));
  selectedArray.forEach((e) => {
    avSeats.forEach((el, ind) => {
      if (ind == e) {
        el.classList.add('selected');
      }
    });
  });
  count.innerHTML = selectedArray.length;
  price.innerHTML = selectedArray.length * 10;
}


function updatePrice(index, isSelected) {
  if (isSelected) {
    selectedArray.push(index);
    sessionStorage.setItem('selectedArray', JSON.stringify(selectedArray));
  } else {
    let newSelectedArray = selectedArray.filter((e) => e != index);
    selectedArray = newSelectedArray;
    sessionStorage.setItem('selectedArray', JSON.stringify(selectedArray));
  }
  count.innerHTML = selectedArray.length;
  price.innerHTML = selectedArray.length * 10;
}

fetch('https://react-http-747fe-default-rtdb.firebaseio.com/ticketss.json')
  .then((data) => {
    return data.json();
  })
  .then((data) => {
    for (const key in data) {
      occupiedArray.push(data[key]);
    }
    let newOccupied = occupiedArray.slice(-1);
    occupiedArray[0] = newOccupied[0];
    occupiedArray[0].forEach((e) => {
      avSeats.forEach((el, ind) => {
        if (ind == e) {
          el.classList.add('occupied');
        }
      });
    });
    avSeats.forEach((e, index) => {
      e.addEventListener('click', () => {
        e.classList.toggle('selected');
        isSelected = e.classList.contains('selected');
        updatePrice(index, isSelected);
      });
    });
    
  });

submit.addEventListener('click', () => {
  avSeats.forEach((e, i) => {
    if (e.classList.contains('occupied') || e.classList.contains('selected')) {
      submittedArray.push(i);
    }
  });
  fetch('https://react-http-747fe-default-rtdb.firebaseio.com/ticketss.json', {
    method: 'POST',
    body: JSON.stringify(submittedArray),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((data) => {
    count.innerHTML = 0;
    price.innerHTML = 0;
    sessionStorage.removeItem('selectedArray');
    window.location.reload();
  });
});
//https://react-http-747fe-default-rtdb.firebaseio.com/objects.json

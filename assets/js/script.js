//inizializzo variabili per il pulsante e per la barra di ricerca
const barraRicerca = document.getElementById('barraRicerca');
const bottoneRicerca = document.getElementById('bottoneRicerca');

chiamataAPI('');

bottoneRicerca.addEventListener('click', function () {
  let query = barraRicerca.value.trim();

  if (query !== '') {
    chiamataAPI(query);


  } else {
    alert('Hai inserito un campo vuoto! per favore, inserisci un valore per la ricerca');
    barraRicerca.focus();
  }

});


//chiamata api
const baseUrl = 'https://api.rawg.io/api/games?';
const apiKey = 'f64bc7603f7449829594541201921477';
const url = `${baseUrl}${apiKey}`;

/* async function fetchAPI() {
  //memorizzo risposta
  const response = await fetch('https://api.rawg.io/api/games?key=f64bc7603f7449829594541201921477');
  let data = await response.json();
  console.log(data);
} */


function chiamataAPI(query) {
  // fetch(`${baseUrl}${apiKey}&page_size=24&search=${barraRicerca.value}`)
  fetch(`https://api.rawg.io/api/games?key=f64bc7603f7449829594541201921477&page_size=40&search=${query}`)
    .then(response => response.json())
    //.then(data => console.log(data.response));
    //.then(data => console.log(data.results[0].background_image));
    .then(function (data) {
      if (data.results.length > 0) {
        stampaGiochi(data.results);
      } else {
        alert('Nessun risultato!')
      }
    });
}

//gioco.name.substr(0, 30)) + '...'
function stampaGiochi(giochi) {
  //reference al contenitore dei risultati
  let listaRisultati = document.getElementById('listaRisultati');
  let arrayConsole = ['Play Station', 'Xbox', 'Nintendo'];
  let context = '';
  let defaultImage = 'assets/images/default-cover.png';

  //svuoto l'array
  pulisci(listaRisultati);

  /* <img src="${gioco.background_image}" class="rounded" alt="immagine ${gioco.name}"> */

  //loop array risultati giochi
  for (let gioco of giochi) {
    context +=
      `<div class="card m-2" style="width:18rem;">
            <div class="image-wrapper">
              <img src="${gioco.background_image === null ? defaultImage : gioco.background_image}" class="rounded" alt="immagine ${gioco.name}" style="height: 18rem;">
            </div>
            <div class="card-body">
              <h5 class="card-title">${gioco.name.length < 30 ? gioco.name : gioco.name.substr(0, 30) + '...'}</h5>
              <p class="card-text platform">${arrayConsole[(Math.floor(randomNumber(0, 2)))]}</p>
            </div>
            <div class="card-footer">
              <small>€ ${randomNumber(19.99, 79.99).toFixed(2)}</small><br>
              <a href="#" class="btn btn-primary">Acquista</a>
            </div>
      </div>`;
  }
  listaRisultati.insertAdjacentHTML('beforeend', context);
  const cards = document.getElementsByClassName('card');
  for (let card of cards) {
    if (card.querySelector('.platform').innerHTML == 'Play Station') {
      card.classList.add('bkg-ps');
    } else if (card.querySelector('.platform').innerHTML == 'Xbox') {
      card.classList.add('bkg-xbox');
    } else if (card.querySelector('.platform').innerHTML == 'Nintendo') {
      card.classList.add('bkg-nintendo');
    }
  }
}

let cardElements = document.getElementsByClassName('card');

let platforms = document.getElementsByClassName('platform').innerHTML;

/* for(let cardElement of cardElements) {
  if(cardElement.find('platform').innerHTML = 'PlayStation') {
    cardElement.style.backgroundColor = 'blue';
  }
  
} */

/* for (const platform of platforms) {
  if (cardElement.innerHTML == 'Play Station') {
    document.getElementsByClassName('card').style.backgroundColor = 'blue';
  } else if (cardElement.innerHTML == 'Xbox') {
    this.card.style.backgroundColor = 'green';
  } else if (cardElement.innerHTML == 'Nintendo') {
    this.card.style.backgroundColor = 'red';
  }
} */



//funzione numeri random
function randomNumber(min, max) { // min and max included 
  return (Math.random() * (max - min + 1) + min);
}

//funzione pulisci container
function pulisci(el) {
  el.innerHTML = '';
}

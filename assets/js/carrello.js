let prodotti = localStorage.getItem('carrello');
let prodottiJson = JSON.parse(prodotti);
let listaCarrello = document.getElementById('appendiCarrello');
let stampaPrezzo = document.getElementById("stampaPrezzoTotale");
let carrellata = '';
let totalePrezzi = 0;


// ciclo stampa su html oggetti del carrello presi dal localstorage
for (let prodotto of prodottiJson) {
  totalePrezzi += parseFloat(prodotto.prezzo.substring(2));
  console.log(prodotto.prezzo.substring(2));
  carrellata +=
      `<div class="card m-2" style="width:18rem;">
          <div class="card-body text-center">
            <h5 class="card-title">${prodotto.titolo.length < 30 ? prodotto.titolo : prodotto.titolo.substr(0, 30) + '...'}</h5>
            <p class="card-text platform">${prodotto.piattaforma}</p>
            <small class="prezzo">${prodotto.prezzo}</small>
          </div>
      </div>`;
}
listaCarrello.insertAdjacentHTML('beforeend', carrellata);
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

//stampa prezzo totale prodotti
stampaPrezzo.innerText = 'Totale Carrello: €' + totalePrezzi.toFixed(2);
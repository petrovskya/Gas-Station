
const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
function toFullDate(day, month, year) {
  if(day <= 9) {
    day = '0' + day;
  }
  if(month <= 9) {
    month = '0' + month;
  }
  return `${day}.${month}.${year}`;
}
const $CURRENT_DATE = document.querySelector('.current-date');
$CURRENT_DATE.textContent = toFullDate(day, month, year);

let password = 1234;

const $HEADER = document.querySelector('header');
const $LOGO = $HEADER.querySelector('.logo');
const $HEADER_INPUT = $HEADER.querySelector('#logIn-input');
const $HEADER_BTN = $HEADER.querySelector('.logIn-btn');
const $ADMIN_CARD = document.querySelector('.admin-card');
const $MAIN = document.querySelector('.main');
const $MAIN_WRAP = $MAIN.querySelector('.main-wrap');
const $GAS_CARD = $MAIN.querySelector('.gas-card');

function showAdmin() {
  $HEADER_INPUT.setAttribute('placeholder', 'Enter your password');
  $HEADER_INPUT.style.borderColor = 'coral';
  if(password == $HEADER_INPUT.value) {
    $ADMIN_CARD.classList.toggle('active');
    $LOGO.textContent = 'ADMINISTRATION PANEL';
    $HEADER_INPUT.style.display = 'none';
    $HEADER_BTN.textContent = 'Log out';
    $GAS_CARD.style.cssText = `
    width = 50%;
    `
    $MAIN_WRAP.style.cssText = `
    justify-content: space-between;
    flex-wrap: nowrap;
    `;
    $HEADER.style.cssText = `
    background: rgba(128, 128, 128, 0.1);
    `
  } else {
    $HEADER_INPUT.style.borderColor = 'red';
    $HEADER_INPUT.value = null;
    $HEADER_INPUT.setAttribute('placeholder', 'Enter correct password');
  }
  if(!$ADMIN_CARD.classList.contains('active')){
    $LOGO.textContent = 'GAS STATION';
    $HEADER_INPUT.style.display = 'block';
    $HEADER_BTN.textContent = 'Log in';
    $GAS_CARD.style.cssText = `
    width = 70%;
    `
    $MAIN_WRAP.style.cssText = `
    justify-content: center;
    flex-wrap: wrap;
    `;
    $HEADER.style.cssText = `
    background: none;
    `
  }
}
$HEADER_BTN.addEventListener('click', showAdmin);

const $ADMIN_BTN = $ADMIN_CARD.querySelectorAll('.admin-btn');
const gasCardInput = $GAS_CARD.querySelectorAll('input');
console.log(gasCardInput);
const cardInputs = $MAIN.querySelectorAll('input');
console.log(cardInputs);

for (let i = 0; i < $ADMIN_BTN.length; i++) {
  $ADMIN_BTN[i].addEventListener('click', (e) => {
    e.target.classList.toggle('color');
    cardInputs.forEach((item) => {
      if(e.target.dataset.btn == item.dataset.admin) {
        for (let i = 0; i < gasCardInput.length; i++) {
          if(gasCardInput[i].dataset.gas == item.dataset.admin) {
            gasCardInput[i].dataset.cost = item.value;
          }
        }
      }
    });
  });
}

const $COST_WRAP = document.querySelector('.cost-wrap');
const gasCardBtn = $GAS_CARD.querySelectorAll('.gas-card-btn');
const costOut = $COST_WRAP.querySelector('.cost-out');
const costName = $COST_WRAP.querySelector('.cost-name');

for (let i = 0; i < gasCardBtn.length; i++) {
  gasCardBtn[i].addEventListener('click', (e) => {
    gasCardInput.forEach((item) => {
      if(e.target.dataset.res == item.dataset.gas) {
        costOut.textContent = (item.value*item.dataset.cost).toFixed(2);
        costName.textContent = item.dataset.id;
      }
    });
  });
}
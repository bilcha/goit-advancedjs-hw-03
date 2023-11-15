import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';


// import SlimSelect from 'slim-select'

const dropdown = document.querySelector(".breed-select");
const dataCard = document.querySelector(".cat-info");
const loader = document.querySelector(".loader");

fetchBreeds()
  .then((resp) =>  createDropdown(resp.data))
  .catch((err) => {
    iziToast.warning({
      title: 'Oops! Something went wrong! Try reload the page!',
      message: err.message,
      position: 'topRight'
    })
  })
  .finally(() => { loader.classList.toggle("isHidden")})

function createDropdown(data) {
  const dropdownData = data.map(el => {
    return `<option value="${el.id}">${el.name}</option>`
  }).join(" ")
  dropdown.insertAdjacentHTML("afterbegin", dropdownData)
}

dropdown.addEventListener("change", hanleSelection);

function hanleSelection(evt) {
  loader.classList.toggle("isHidden");
  dataCard.innerHTML = "";
  fetchCatByBreed(evt.target.value)
    .then((resp) => {
      createMarkup(resp.data[0])
    })
    .catch((err) => {
      iziToast.warning({
        title: 'Oops! Something went wrong! Try reload the page!',
        message: err.message,
        position: 'topRight'
      })
    })
    .finally(() => { loader.classList.toggle("isHidden") })
}

function createMarkup(data) {
  const { url, breeds: [{ name, description, temperament }] } = data
  const markup = `<div class="container"><img src="${url}" alt="${name}"></div>
      <section>
        <h2>${name}</h2>
        <p>${description}</p>
        <p><span class="bold-text">Temperament:</span> ${temperament}</p>
      </section>
  `
  dataCard.innerHTML = markup;
}

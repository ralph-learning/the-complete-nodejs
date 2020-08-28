async function getWeather(adress) {
  const urlWeather = `http://localhost:4000/weather?address=${adress}`;
  const result = document.querySelector(".result");

  try {
    const response = await fetch(urlWeather);
    const json = await response.json();
    if (!response.ok) throw new Error(json.error);

    result.innerHTML = `<h3>${json.location} - ${json.forecast}</h3>`;
  } catch (error) {
    result.innerHTML = `<h3>${error.message}</h3>`;
  }
}

const weatherForm = document.querySelector("form");
const input = document.querySelector("input");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const address = input.value;

  getWeather(address);
});

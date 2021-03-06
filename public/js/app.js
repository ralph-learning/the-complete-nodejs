async function getWeather(adress) {
  const urlWeather = `http://localhost:4000/weather?address=${adress}`;
  const result = document.querySelector(".result");

  try {
    const response = await fetch(urlWeather);
    const json = await response.json();
    if (!response.ok) throw new Error(json.error);

    result.innerHTML = `
      <div class="weather">
        <img src=${json.icon} />
        <div class="box">
          <p>${json.location} - ${json.country}</p>
          <span class="temperature">${json.temperature}ºc</span>
          <p>${json.forecast}</p>
        </div>
      </div>
    `;
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

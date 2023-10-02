const ui = new UI();
const apiKey = "22cd618edaed81571c89947112629a0f";

ui.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityValue = ui.input.value;
  getWeatherForecast(cityValue);
});

async function getWeatherForecast(cityValue) {
  try {
    ui.isLoading.innerHTML = `<img src="spinner.svg" alt="">`;
    ui.button.disabled = true;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    clear();
    dataAdded(data);
  } catch (error) {
    ui.descriptionDiv.textContent = "Entered the wrong city name.";
    clear();
  }
}

function clear() {
  ui.isLoading.innerHTML = "";
  ui.iconDiv.innerHTML = "";
  ui.temperatureDiv.textContent = "";
  ui.detailsDiv.innerHTML = "";
  ui.button.disabled = false;
}

function dataAdded(data) {
  ui.cityName.textContent = data.name;
  ui.input.value = "";
  const icon = data.weather[0].icon;
  const tamperature = Math.round(data.main.temp);
  const details = [
    `Feels Like: ${Math.round(data.main.feels_like)} `,
    `Humidity: ${data.main.humidity}`,
    `Wind Speed: ${data.wind.speed}`,
  ];
  ui.iconDiv.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png"></img>`;
  ui.temperatureDiv.textContent = `${tamperature}°C`;
  let newDetails = details.map((detail) => `<div>${detail}</div>`).join("");
  ui.descriptionDiv.textContent = "";
  ui.detailsDiv.innerHTML = newDetails;
}

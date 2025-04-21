const weatherContainer = document.querySelector("#weather");
document.querySelector("#btn").addEventListener("click", () => {
    getWidget();
});

function renderWidget(data) {
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    const newWeather = document.createElement("div");

    newWeather.innerHTML = `
        <div class="widget">
            <p>Погода в ${data.name}</p>
            <p class="temp">Температура воздуха: ${Math.round(data.main.temp)}°C</p>
            <img src="${iconUrl}" alt="Погода: ${data.weather[0].description}">
            <p>${data.weather[0].description}</p>
            <p>Ветер: ${Math.round(data.wind.speed)} м/с</p>
            <p>Направление ветра: ${data.wind.deg}°</p>
            <p>Облачность: ${data.clouds.all}%</p>
        </div>
    `;
    weatherContainer.innerHTML = "";
    weatherContainer.appendChild(newWeather);
}

function getWidget() {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=Kremenchuk&appid=f595e025a1e0ea8de29ce04274b14347&units=metric&lang=ru")
        .then((res) => res.json())
        .then((data) => {
            renderWidget(data);
            console.log(data);
        })
        .catch((error) => {
            console.error(error);
        });
}

getWidget();

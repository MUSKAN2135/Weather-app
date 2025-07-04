async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const apiKey = "920063271f47fca58e25de02a325f364";
    const url = ` https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const result = document.getElementById("weather");
    result.innerHTML = "Loading...";

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") { //code === 404 means error code 404 
            result.innerText = "City not found!";
        } else {
            const temperature = data.main.temp;
            const description = data.weather[0].description; //in openweatherapp its an array which have frst element 0 that shows weather condition
            const cityName = data.name;
            result.innerHTML = `
                    <h2 class="font-bold text-xl">${cityName}</h2>
                    <p>${temperature}°C</p>
                    <p>${description}</p>
                `;
        }
    } catch (error) {
        result.innerText = "Something went wrong";
    }
}
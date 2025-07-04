
async function getWeather() {
    const cityInput = document.getElementById("cityInput").value.trim();
    const message = document.getElementById("message");
    const currentWeather = document.getElementById("currentWeather");
    const forecastWeather = document.getElementById("forecastWeather");
    // Clear previous data and show loading
    message.textContent = "";
    currentWeather.innerHTML = "Searching...";
    forecastWeather.innerHTML = "";

    if (!cityInput) {
        message.textContent = "Please enter a city name!";
        currentWeather.innerHTML = "";
        return;
    }

    try {
        const apiKey = "920063271f47fca58e25de02a325f364";
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) throw new Error("City not found or API issue");
        const data = await response.json();

        if (data.cod === "404") {
            message.textContent = "City not found!";
            currentWeather.innerHTML = "";
        } else {
            // Current weather with current time
            const current = data.list[0];
            const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
            // const weatherDesc = current.weather[0].description.toLowerCase();
            currentWeather.innerHTML = `
                        <h2 class="text-4xl font-bold text-gray-800">${data.city.name}</h2>
                        <p class="text-5xl mt-2 text-gray-700">${current.main.temp}°C</p>
                        <p class="text-lg mt-1 text-gray-600">${current.weather[0].description}</p>
                        <p class="text-sm mt-2 text-gray-500">Current Time: ${currentTime}</p>
                    `;

            // Hourly forecast (3-hour intervals for ~12 hours)
            const hourlyForecasts = data.list.slice(0, 4); // 4 entries ≈ 12 hours at 3-hour intervals
            let forecastHtml = "";
            hourlyForecasts.forEach((forecast) => {
                const fullDate = new Date(forecast.dt * 1000);
                const date = fullDate.toLocaleDateString();
                const time = fullDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
                const temp = forecast.main.temp;
                const desc = forecast.weather[0].description;
                forecastHtml += `
                            <div class="bg-blue-100 p-3 rounded-lg min-w-[100px] shadow-md">
                                <p class="text-xs font-semibold text-gray-700">${date} ${time}</p>
                                <p class="text-xl mt-1 text-gray-800">${temp}°C</p>
                                <p class="text-xs mt-1 text-gray-600">${desc}</p>
                            </div>
                        `;
            });
            forecastWeather.innerHTML = forecastHtml;
        }
    } catch (error) {
        message.textContent = "Something went wrong!";
        currentWeather.innerHTML = "";
        console.error("Error:", error.message);
    }
}

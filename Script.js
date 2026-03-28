const apiKey = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}"; // <--- PASTE YOUR API KEY HERE
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        // Check if city is found (404 means not found)
        if (response.status == 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            var data = await response.json();

            // Update text content
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

            // Update weather icon based on API code
            // OpenWeatherMap provides codes like "01d", "10n", etc.
            const iconCode = data.weather[0].icon;
            weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

            // Show weather section and hide error
            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Event Listener for Search Button
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Event Listener for 'Enter' key
searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
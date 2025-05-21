// Task 1: Select all the required elements from the DOM and store them in variables.
// Task 2: Create a function fetchData that will fetch the data from the weather API.
// Task 3: Create a function search that will take the input value from the form and call the fetchData function.
// Task 4: Add an event listener to the form that will call the search function when the form is submitted.
// Task 5: Create a function updateDOM that will update the DOM with the fetched data.
// Task 6: Call the fetchData function with a default city name.

const temperatureField = document.querySelector(".temp");
const cityField = document.querySelector(".time_location p");
const dateField = document.querySelector(".time_location span");
const emojiField = document.querySelector(".weather_condition img");
const weatherField = document.querySelector(".weather_condition span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");
let isCelsius = true;
let currentTempC = null;
let currentTempF = null;


function search(e) {
  e.preventDefault();
  target = searchField.value;
  fetchData(target);
}

form.addEventListener("submit", search);

async function fetchData(target) {

  try {
    let url = `https://api.weatherapi.com/v1/current.json?key=8b6d5f63a04a485fa5351525232908&q=${target}&aqi=no`

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    let currentTemp = data.current.temp_c
    let currentCondition = data.current.condition.text
    let locationName = data.location.name
    let localTime = data.location.localtime
    let conditionEmoji = data.current.condition.icon

    updateDOM(currentTemp, currentCondition, locationName, localTime, conditionEmoji);

    console.log(currentTemp, currentCondition, locationName, localTime, conditionEmoji);
  } catch (error) {
    console.log(error);
  }
}
const celsiusBtn = document.getElementById("celsiusBtn");
const fahrenheitBtn = document.getElementById("fahrenheitBtn");

celsiusBtn.addEventListener("click", () => {
  isCelsius = true;
  temperatureField.innerText = `${currentTempC}°C`;
  celsiusBtn.classList.add("active");
  fahrenheitBtn.classList.remove("active");
});

fahrenheitBtn.addEventListener("click", () => {
  isCelsius = false;
  temperatureField.innerText = `${currentTempF}°F`;
  fahrenheitBtn.classList.add("active");
  celsiusBtn.classList.remove("active");
});


function updateDOM(tempC, condition, location, time, emoji) {
  currentTempC = tempC;
  currentTempF = (tempC * 9/5 + 32).toFixed(1); // Convert to Fahrenheit

  temperatureField.innerText = `${currentTempC} °C`; // Default: show °C

  // Time formatting as shown before
  const dateObj = new Date(time);
  const day = dateObj.toLocaleString("en-US", { weekday: "short" });
  const date = dateObj.getDate();
  const hour = dateObj.getHours();
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  const ampm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;
  const formattedTime = `${day} ${date}, ${formattedHour}:${minutes} ${ampm}`;

  cityField.innerText = location;
  dateField.innerText = formattedTime;
  emojiField.src = "https:" + emoji;
  weatherField.innerText = condition;
}











































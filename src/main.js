import "./styles/style.css";
import { getCurrentCity } from "./city";
import { loadList, saveToList } from "./storage";
import { getCurrentWeather } from "./weather";

async function initApp() {
    const cityName = await getCurrentCity()
    mapStatic(cityName)
    getCurrentWeather(cityName).then(showWeather)
}

function mapStatic(cityName) {
    const map = document.getElementById("map");
    map.src = `https://static-maps.yandex.ru/v1?ll=${cityName}&spn=0.016457,0.00619&apikey=0de69f0e-ee2e-4f81-ac1b-ec249ddd9103`;
}

function showWeather(data) {
    // if (!data) return;
    const tempInF = `${data.temp}`;
    const numtempInF = Number(tempInF);
    const tempInC = Math.round(numtempInF - 273.15);

    const temperature = document.getElementById("temperature");
    temperature.innerText = `${tempInC}°C`;

    const weatherDescription = document.getElementById("weatherDescription");
    weatherDescription.textContent = data.description;

    const city = document.getElementById("city");
    city.innerText = `${data.name}`;

    const weatherImage = document.getElementById("weatherImage");
    weatherImage.src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
}

async function addCityInList() {
    const list = document.getElementById(idList);
    const input = document.getElementById("input");
    const cityName = input.value;
    input.value = "";
    const weather = await getWeather(cityName);
    if (weather) {
        showWeather(weather);
        getCityCoordinatesByName(cityName).then(mapStatic);
        const li = document.createElement("li");
        li.setAttribute("data-city", cityName);
        li.innerHTML = cityName;
        list.append(li);
        citiesList.push(cityName);
        console.log(citiesList);
        if (list.childElementCount > 10) {
            list.childNodes[0].remove();
            citiesList.shift();
        }
        saveList();
    }
}

async function cityFromListClick(e) {
    if (e.target.dataset && e.target.dataset.city) {
        const city = e.target.dataset.city;
        getWeather(city).then(showWeather);
        getCityCoordinatesByName(city).then(mapStatic);
    }
}

function initCityList() {
    const list = document.getElementById(idList);
    for (const cityName of citiesList) {
        const li = document.createElement("li");
        li.setAttribute("data-city", cityName);
        li.innerHTML = cityName;
        list.append(li);
    }
}

export async function startAll() {
    loadList();
    await initApp();
    initCityList();
    const button = document.getElementById("button");
    button.addEventListener("click", addCityInList);
    document.getElementById("input").addEventListener("keydown", inputKeyDown);
    document.getElementById(idList).addEventListener("click", cityFromListClick);
}
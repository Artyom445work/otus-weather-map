import { getCurrentCity } from "./geo"
import { loadList, saveToList } from "./storage"
import { getCurrentWeather, getCityCoords } from "./openweather"

let citiesList = []
const yandexApiKey = '220bcecd-2e57-4af8-9150-e82755be7199'

async function initApp() {
    const { cityName, ll } = await getCurrentCity()
    createMap(ll)
    getCurrentWeather(cityName).then(showWeather)
}

function createMap(ll) {
    const map = document.querySelector(".content-map-box__img")
    map.src = `https://static-maps.yandex.ru/v1?ll=${ll}&spn=0.016457,0.00619&apikey=${yandexApiKey}`
}

function showWeather(data) {
    const temperature = Math.round(Number(data.temp) - 273.15)

    const temperatureEl = document.querySelector('.content-weather-box__temp')
    temperatureEl.innerText = `${temperature}°C`

    const weatherDesc = document.querySelector(".content-weather-box__desc")
    weatherDesc.textContent = data.description

    const cityName = document.querySelector(".content-weather-box__title")
    cityName.innerText = `${data.name}`

    const weatherImage = document.querySelector(".content-weather-box__image")
    weatherImage.src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`
}

async function addCity() {
    const list = document.querySelector(".interaction__list")
    const input = document.querySelector(".interaction__input")
    const cityName = input.value
    input.value = ""
    if (cityName) {
        const weather = await getCurrentWeather(cityName)
        if (weather) {
            showWeather(weather)
            getCityCoords(cityName).then(createMap)
            const li = document.createElement("li")
            li.setAttribute("data-city", cityName)
            li.innerHTML = cityName
            list.append(li)
            citiesList.push(cityName)
            if (list.childElementCount > 10) {
                list.childNodes[0].remove()
                citiesList.shift()
            }
            console.log('citiesList ========= ', citiesList)
            saveToList(citiesList)
        }
    }
}

async function cityFromListClick(e) {
    if (e.target.dataset && e.target.dataset.city) {
        const city = e.target.dataset.city
        getCurrentWeather(city).then(showWeather)
        getCityCoords(city).then(createMap)
    }
}

function initCityList(initialCitiesList) {
    const list = document.querySelector(".interaction__list")
    for (const cityName of initialCitiesList) {
        const li = document.createElement("li")
        li.setAttribute("data-city", cityName)
        li.innerHTML = cityName
        list.append(li)
    }
}

(async function startAll() {
    const initialCitiesList = loadList()
    await initApp()
    initCityList(initialCitiesList)
    const button = document.querySelector(".interaction__button")
    button.addEventListener("click", addCity)
    document.querySelector(".interaction__list").addEventListener("click", cityFromListClick)
})()
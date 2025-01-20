const openweathermapApiKey = 'ae6748bb3802915412e37c351eeb1d46'

const getCurrentWeather = async (city) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openweathermapApiKey}`)
    if (response.ok) {
        const responseJson = await response.json()
        return {
            location: responseJson.cord,
            temp: responseJson.main.temp,
            icon: responseJson.weather[0].icon,
            name: responseJson.name
        }
    } else {
        throw new Error(`Request to get weather failed with status: ${response.status}`)
    }
}

const getCityCoords = async (cityName) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${openweathermapApiKey}`)
    if (response.ok) {
        const responseJson = await response.json()
        return responseJson.coord.lon + ',' + responseJson.coord.lat
    } else {
        throw new Error(`Request to get city failed with status: ${response.status}`)
    }
}

export  { getCurrentWeather, getCityCoords }
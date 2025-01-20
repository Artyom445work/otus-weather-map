const getCurrentCity = async () => {
    const response = await fetch(`https://get.geojs.io/v1/ip/geo.json`)
    if (response.ok) {
        const responseJson = await response.json()
        return {
            cityName: responseJson.city,
            ll: responseJson.longitude + ',' + responseJson.latitude
        }
    } else {
        throw new Error(`Request to get city failed with status: ${response.status}`)
    }
}

const getCityCoords = async (cityName) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=ae6748bb3802915412e37c351eeb1d46`)
    if (response.ok) {
        const responseJson = await response.json()
        return responseJson.coord.lon + ',' + responseJson.coord.lat
    } else {
        throw new Error(`Request to get city failed with status: ${response.status}`)
    }
}

export { getCurrentCity, getCityCoords }
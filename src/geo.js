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

export { getCurrentCity }
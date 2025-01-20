const saveToList = (citiesList) => {
    return localStorage.setItem('weather', JSON.stringify(citiesList))
}

const loadList = () => {
    const citiesList = []
    const dataStr = localStorage.getItem('weather')
    if (dataStr) {
        for (const row of JSON.parse(dataStr)) {
            citiesList.push(row)
        }
    }
    return citiesList
}

export { saveToList, loadList }
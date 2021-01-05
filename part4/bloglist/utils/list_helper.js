// eslint-disable-next-line no-unused-vars
const dummy = (...params) => {
    // ...
    return 1
}

const totalLikes = (arrayJSON) => {
    const array = arrayJSON.map(n => n.likes)
    const reducer = (sum, item) => {
        return sum + item
    }
    return array.length === 0
        ? 0
        : array.reduce(reducer, 0)
}


const favoriteBlog = (arrayJSON) => {
    const array = arrayJSON.map(n => n.likes)
    const indexOfMaxValue = array.indexOf(Math.max(...array));
    return array.length === 0
        ? []
        : arrayJSON[indexOfMaxValue]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
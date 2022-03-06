const request = require('request')
const geocode = (address, callback) => {
    // encodeURIComponent is a function which returns a string, the program will work fine even without passing the address to this function but it will crash if the string contains some symbols like $ ? % etc, so it is a good idea to pass the address to this function
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibW9iZWVuYSIsImEiOiJjbDAweTF0amowN2d3M2pvMzdrdWhlbjg4In0.7L9A9Rrqrp6JbWb3AeA1sg&limit=1'
    request({url : url, json : true}, (err, res) => {
        if (err) {
            callback('Unable to connect to the mapbox API!', undefined) // callback takes in two parameters, first is error and the second is the data, if error occurs then data is undefined, so we pass the second argument as undefined
        }
        else if(res.body.features.length === 0) {
            callback('Location not found, try another search!', undefined)
        }
        else {
            callback(undefined, {
                longitude : res.body.features[0].center[0],
                latitude : res.body.features[0].center[1],
                location : res.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
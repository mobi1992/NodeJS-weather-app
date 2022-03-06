var axios = require("axios").default;

// latitude and longitude are optional, if you don't provide them, they are set to 0 by default
const forecast = (location, latitude, longitude, callback) => {
    var options = {
        method: 'GET',
        url: 'https://community-open-weather-map.p.rapidapi.com/weather',
        params: {
          q: location,
          lat: latitude,
          lon: longitude,
          callback: 'test',
          id: '2172797',
          lang: 'null',
          units: 'imperial',
          mode: 'xml'
        },
        headers: {
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
          'x-rapidapi-key': '11ce96320emsh9c2a5999dc419cbp1a8bf6jsn8a05e03d06a0'
        }
      };
      axios.request(options).then((response) => {
        // console.log(response)
        const data = response.data
        // console.log(data);
        // The data has a wrapper function test that wraps the whole json file in the response, we have to remove that
        const jsondata = String(data)
        const data2 = jsondata.slice(5)
        const data3 = data2.slice(0, -1)
        const actual_data = JSON.parse(data3)
        callback(undefined, actual_data)
        //console.log(actual_data)
      }).catch((error) => {
        // console.log(error)
        if (error.code === 'ENOTFOUND') {
            callback('Unable to connect to the weather service!', undefined)
        }
        else if (error.response.statusText === 'Not Found') {
            callback('City not found', undefined)
        }
      });
}
module.exports = forecast


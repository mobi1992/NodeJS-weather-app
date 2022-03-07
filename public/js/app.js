console.log('Client side javascript loaded')


const weatherForm = document.getElementById('weatherForm')
const search = document.querySelector('input')
const forecast = document.getElementById('forecast')
const error = document.getElementById('error')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    forecast.innerHTML = 'loading...'
    console.log(location)
    // client side fetch function to fetch the data from the server
    fetch(`/weather?address=${location}`).then(response =>
        response.json().then(data => {
            if (data.error) {
                console.log(data.error)
                forecast.innerHTML = ''
                error.innerHTML = data.error
            }
            else {
                console.log(data)
                error.innerHTML = ''
                forecast.innerHTML = `Tempertaure : ${data.Temperature}, location : ${data.location}, humidity : ${data.humidity}`
            }
        })).catch(err => console.log(err))
})
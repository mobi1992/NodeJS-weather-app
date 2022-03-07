// Partia; setup
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./geocode')
const forecast = require('./forecast')
const chalk = require('chalk')

const publicDirectoryPath = path.join(__dirname, '../../public')
const viewsPath = path.join(__dirname, '../../templates/views')
const partialPath = path.join(__dirname, '../../templates/partials')
const port = process.env.PORT || 3000     // process.env.PORT will be set when we will push the code to heroku otherwise the default port value wich is 3000 will be assigned
// setup handlebar with partials
hbs.registerPartials(partialPath)
// setup handlebar location and view directory
app.set('view engine', 'hbs')
app.set('views', viewsPath)
//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    console.log(req.rawHeaders)
    res.render('index', {
        title: 'Home Page',
        name: 'Mobeena Mushtaq'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mobeena Mushtaq'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful text.',
        name: 'Mobeena Mushtaq'
    })
})

app.get('/locationWeather', (req, res) => {
    // no address send back an error
    if (!req.query.address) {
        return res.send({
            error: 'Must provide an address!'
        })
    }
    geocode(req.query.address, (err, resp) => {
        if (err !== undefined) {
            console.log(chalk.red.inverse(err))
            return res.send({
                error : err
            })
        }
        forecast(resp.location, resp.latitude.toString(), resp.longitude.toString(), (err, data) => {
            if (err !== undefined) {
                console.log(chalk.red.inverse(err))
                return res.send({
                    error : err
                })
            }
            else {
                console.log(chalk.green.inverse('Hello this is weather forecast of ' + data.name + '. Temperature of ' + data.name + ' is ' + data.main.temp + ' and the humidity is ' + data.main.humidity + '%.'))
                return res.send({
                    temperature : data.main.temp,
                    location : data.name,
                    humidity : data.main.humidity,
                    latitude : resp.latitude,
                    longitude : resp.longitude
                })
            } 
        })
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

        forecast(req.query.address, 0, 0, (error, data) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                Temperature : data.main.temp,
                location: data.name,
                humidity : data.main.humidity,
                address: req.query.address
            })
        })
})

app.get('/location', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error : 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, response) => {
        if (error) {
            return res.send({ error })
        }
        res.send({
            longitude : response.longitude,
            latitude : response.latitude,
            location : response.location
        })
    })
})
// for query string
app.get('/products', (req, res) => {
    // set if the search query parameter is always added in the browser like ...../products?search=anything and throw an error if no search parameter is there
    console.log(req.query) // query parameters can be viewed in terminal
    if (!req.query.search) {
        // you have to return immediately after send the error msg otherwise next block will also run and you cannot send two responses back in http, another solution is to use if else, but this is the common pattern
        return res.send({
            error: 'Must include search word'
        })
    }
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Help page not found',
        name: 'Mobeena Mushtaq'
    })
})

// This is the wild card character which means that match anything else other than the already setup routes
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Page not found',
        name: 'Mobeena Mushtaq'
    })
})

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
  }) 
  
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
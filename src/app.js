// Partia; setup
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

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
        title : 'Help',
        helpText: 'This is some helpful text.',
        name : 'Mobeena Mushtaq'
    })
})

app.get('/weather', (req, res) => {
    // no address send back an error
    if(!req.query.address){
       return res.send({
            error : 'Must provide an address!'
        })
    }
    res.send({
        forecast: 'It is cloudy',
        location: req.query.address,

    })
})
// for query string
app.get('/products', (req, res) => {
    // set if the search query parameter is always added in the browser like ...../products?search=anything and throw an error if no search parameter is there
    console.log(req.query) // query parameters can be viewed in terminal
    if(!req.query.search){
        // you have to return immediately after send the error msg otherwise next block will also run and you cannot send two responses back in http, another solution is to use if else, but this is the common pattern
        return res.send({
            error : 'Must include search word'
        })
    }
    res.send({
        products : []
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title : '404',
        errorMsg : 'Help page not found',
        name : 'Mobeena Mushtaq'
    })
})

// This is the wild card character which means that match anything else other than the already setup routes
app.get('*', (req, res) => {
    res.render('404', {
        title : '404',
        errorMsg : 'Page not found',
        name : 'Mobeena Mushtaq'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
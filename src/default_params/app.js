const greeter = (name = 'User') => {
    console.log('Hello ' + name)
}

greeter('Mobeena')    // Hello Mobeena will be printed
greeter()             // When no argument is passed, the default value will be printed which is Hello User

const product = {
    name : 'red-kurta',
    price : 'Rs 2000',
    stock : 200,
    salePrice : 'Rs 1500'
}

const transaction = (type, {name, price, stock} = {}) => {   // default value for object can be an empty object otherwise when we call the object without product, it will give the javascript error saying cannot read property name, price, stock of undefined
    console.log(name, price, stock)
}

transaction('order', product)    //red-kurta Rs 2000 200
transaction ('order')           // As the default value of object is empty all the properties will be undefined

const mongoose = require('mongoose')
const uri = require('../config').uri

mongoose
    .connect(uri, { useNewUrlParser: true })
    .then(() => console.log('Database Connected!'))
    .catch(e => {
        console.error('Connection error', e.message)
	    console.log("Database not connected!")
    })

const db = mongoose.connection

module.exports = db 

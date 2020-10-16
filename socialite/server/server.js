const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const db = require('./db/index')

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ 
    extended: true
}));

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/ping', function (req, res) {
    return res.send('pong');
});

app.get('/', function (req, res) {
    return res.send('Express Connected.');
});

app.post('/register', function(req, res) { 
    var email = req.body.email; 
    var pass = req.body.password; 
    var rollno = req.body.rollnumber; 
  
    var data = {  
        "email":email, 
        "password":pass, 
        "roll_no":rollno,
	"token":"TOK123",
	"friends":[]
    } 
db.collection('Users').insertOne(data,function(err, collection){ 
        if (err) throw err; 
        console.log("Record inserted Successfully"); 
              
    }); 
          
    return res.send('Good work! Signup done!');
})

app.listen(process.env.PORT || 8080);

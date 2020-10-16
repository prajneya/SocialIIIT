const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db/index')
const userRouter = require('./routes/user-router');
const recosys = require('./recosys/collab')

const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use('/api/user', userRouter)

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

app.post('/recommend', recosys.main); 
app.listen(process.env.PORT || 8080);

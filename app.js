const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
var Relay = require('./models/relay');

// DATABASE CONNECT MONGOOSE
mongoose.connect('mongodb://localhost:27017/iot_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
.then(() => console.log('Connected to DB'))
.catch(error => console.log(error.message));


// the data is destructured into the json object 
app.set("view engine", 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));


// index route
app.get('/', (req,res) => {
    Relay.find({}, (err, obj) => {
        if(!err){
            console.log(obj);
            res.render('home', {relays:obj});
        }else{
            console.log(err);
        }
    });
});

// new route
app.get('/new', (_req, res) => {
    res.render('new');
  });

//create route
app.post('/add_relay', (req, res) => {
    console.log(req.body);
    var {rel,status} = req.body;
    //create a blog
    Relay.create(req.body, (err, _obj) => {
      //redirect
      if (!err) {
        res.redirect('/new');
      }else {
        res.render('new');
      }
    });
  });
  
// connected to the esp8266 route
app.post('/r/:relay', (req, res) => {
    console.log(req.params.relay);
    var name = req.params.relay;
    Relay.find({"relay":name}, (err,obj) => {
        if(err){
            console.log(err);
        } else{
            console.log(obj[0]["on_off"]);
            res.send(obj[0]["on_off"]);
        }   
    });
});

// update route
app.put('/relay/:id', (req, res) => {
    var new_val = req.body;
    Relay.findByIdAndUpdate(req.params.id, new_val, (err, _obj) => {
      if (err) {
        console.log(err);
    }else {
        console.log(new_val);
        res.redirect('/');
      }
    });
  });


app.listen(3000, () => {
    console.log('Server is running...');
});

// app.post('/data', (req,res) => {
//     console.log(req.body);
//     res.send('ok');
// });

// app.post('/relay1', (req,res) => {
//     res.send('on');
// });
// app.post('/relay2', (req,res) => {
//     res.send('off');
// });
// app.post('/relay3', (req,res) => {
//     res.send('on');
// });
// app.post('/relay4', (req,res) => {
//     res.send('off');
// });
const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
const port = 8000;

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
  });
  const Contact = mongoose.model('Contact', contactSchema);


app.use('/static',express.static('static'));    //for using static files
app.use(express.urlencoded());
app.set('view engine', 'pug');     //set the template engine as pug
app.set('views',path.join(__dirname,'views'));


app.get('/',(req,res)=>{
    const params = {}
    res.status(200).render('home.pug',params)
})


app.get('/contact',(req,res)=>{
    const params = {}
    res.status(200).render('contact.pug',params)
})

app.post('/contact', (req,res)=>{
    var mydata = new Contact(req.body);
    mydata.save().then(()=>{
        res.status(200).render('contact.pug')
    }).catch(()=>{
        alert("Data Saved")
        res.status(200).send("Data no sent to database")
        // alert("Data Saved")
    })
    // res.status(200).render('contact.pug');
})

app.listen(port,()=>{
    console.log(`Application started at ${port}`);
})
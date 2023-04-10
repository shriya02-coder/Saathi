const { hasSubscribers } = require("diagnostics_channel");
const express = require("express");
const path = require("path");
require("./db/conn");
const User = require("./models/usermessage");
const hbs = require("hbs");
const{ registerPartials } = require("hbs");

const app = express();
const port = process.env.PORT || 3000;

//setting the path (if we want to use static website in our project)
const staticpath = path.join(__dirname,"../public"); //public folder contains all the static file for the website
const templatepath = path.join(__dirname,"../templates/views");
const partialpath = path.join(__dirname,"../templates/partials");

//middleware
//app.use('/css',express.static(path.join(__dirname,"../node_modules")))
app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/jq',express.static(path.join(__dirname,"../node_modules/jquery/dist")));

//to get contact us form data on contact page
app.use(express.urlencoded({extended:false}))
app.use(express.static(staticpath))
app.set("view engine", "hbs");
app.set("views", templatepath);
hbs.registerPartials(partialpath);
//routing
//app.get(path,callback)
app.get("/",(req,res)=>{
    res.render("index");
})
app.get("/login",(req,res)=>{
    res.render("login");
})
app.get("/learn",(req,res)=>{
    res.render("learn");
})
app.get("/trim1Health",(req,res)=>{
    res.render("trim1Health");
})
app.get("/dons",(req,res)=>{
    res.render("dons");
})
app.get("/awareness",(req,res)=>{
    res.render("awareness");
})
app.get("/card",(req,res)=>{
    res.render("card");
})
app.get("/HospitalAppointments",(req,res)=>{
    res.render("HospitalAppointments");
})
app.post("/contact",async(req,res)=>{
    try{
      //res.send(req.body);
      const userData = new User(req.body);
      await userData.save();
      res.status(201).render("index");
    }catch(error){
        res.status(500).send(error);
    }
})

app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
} )
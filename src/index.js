const express= require('express');
const pasth= require("path");
const bcryt= require("bcrypt");
const collection= require("./config");

const app= express();

// convert data into json format 
app.use(express.json());

app.use(express.urlencoded({extended: false}));



//use EJS as tye view engine
app.set('view engine', 'ejs');

//static file
app.use(express.static("public"));

app.get("/", (req, res) =>{
    res.render("login");
});

app.get("/signup", (req, res) =>{
    res.render("signup");
});

//register user
app.post("/signup", (req, res) =>{
    const data= {
        name: req.body.username,
        password: req.body.password
    }

    
    
    const userdata =  collection.insertMany(data);
    console.log(userdata);  
});

//Login user
app.post("/login", async (req, res) =>{
    try{
        const check = await collection.findOne({name: req.body.username});
        if(!check){
            res.send("user name cannot found");
        }
        // compare the hash password from the database with the plain text 
        const isPasswordMatch = await bcryt.compare(req.body.password, check.password);
        if(isPasswordMatch){
            res.render("/homapage.html");
        }else{
            req.send("Wrong password");
        }
    }catch{
        res.send("Wrong Details");
    }
});



const port= 3000;
app.listen(port, ()  => {
    console.log(`Server Running on port: ${port}`);
})
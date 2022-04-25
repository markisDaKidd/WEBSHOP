let express = require('express')
let cookie= require('cookie-parser')
let cors = require('cors')
let helmet = require('helmet')
let hpp = require('hpp')
let mongoose = require('mongoose')
let bcrypt = require('bcrypt')
let UserModel = require('./config/Users.js')
let User= new UserModel()

let app = express()


app.use(cookie())
app.use(helmet())
app.use(cors({origin:'http://localhost:3000',credentials: true}))
app.use(hpp())
app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.post('/login',(req,res)=>{
    console.log(req.body);
    username = req.body.username
    UserModel.find({ username }, function(err, result) {
        if (!result.length)
            res.json({answer:'not ok'});
        else
            bcrypt.compare(req.body.password, result[0].password, function(err, solution) {
                if (solution) {
                    username = req.body.username
                    console.log(req.headers,req.cookies);
                    res.cookie('user',JSON.stringify({username:req.body.username,email:req.body.email}),{maxAge:1000*60*60*24*4,secure:false}).set("Access-Control-Allow-Credentials",true).json({answer:'ok',user:{username:req.body.username,email:req.body.email}})
                } else
                    res.json({answer:'wrong password'})
            });

    })

})

app.post('/create',(req,res)=>{
    console.log(req.body);
    User.email=req.body.email
    User.username=req.body.username
    
    UserModel.find({ username: req.body.username,email:req.body.email }, function(err, result) {
        if (err){
            console.log(err)
            res.json({answer:'server error'})
        }

        if (!result.length) {

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    User.password = hash
                    User.save((err) => {
                        if (err) throw err
                    })
                })
            })

            res.json({answer:'ok'})
        } else
            res.json({answer:'exists'});
    })

})






mongoose.connect('mongodb://localhost:27017/users',{useUnifiedTopology:true}).then(()=>{
    console.log('database up');
    app.listen(5000,()=>{console.log('server up');})
})

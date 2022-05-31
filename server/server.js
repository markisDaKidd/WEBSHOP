require('dotenv').config()
let fetch = require('node-fetch')
let path = require('path')
let mail = require('nodemailer')
let express = require('express')
let cookie= require('cookie-parser')
let cors = require('cors')
let helmet = require('helmet')
let hpp = require('hpp')
let mongoose = require('mongoose')
let bcrypt = require('bcrypt')
let {UserModel,ProductModel} = require('./config/Users.js')
let User= new UserModel()
let stripe = require('stripe')(process.env.STRIPE_SECRET)


let transporter = nodemailer.createTransport({service:'gmail',auth:{user:'mardor3645@gmail.com',pass:process.env.EMAIL_PASSWORD},tls:{rejectUnauthorized:false}})

let app = express()


app.use(cookie())
app.use(helmet())
app.use(cors({origin:'http://localhost:3000',credentials: true}))
app.use(hpp())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, '../client/build')))


// [{price_data:{currency:'usd',product_data:{name:'aaalll'},unit_amount:10000},quantity:1}]



app.post('/checkout',async (req,res)=>{
    let user_items;
    let products;
    let user = JSON.parse(req.cookies.user);

    let user_itemss=await UserModel.findOne({username:user.username})
    user_items= user_itemss.cart

    products = await ProductModel.find({})
 

     try {
         let session = await stripe.checkout.sessions.create({
             payment_method_types:['card'],
             mode:'payment',
             success_url: `https://www.google.com`,
             cancel_url:'https://www.bing.com',
             line_items:Object.keys(user_items).map(x=>{
                return {
                    price_data:{
                        currency:'usd',
                        product_data:{
                            name:user_items[x].name
                        },
                        unit_amount: 100
                    },
                    quantity:user_items[x].count
                }
            })
         })

         return res.json({url:session.url})
         
     } catch (error) {
         res.status(500).json({error})
     }
})

app.post('/webhook', express.raw({type: 'application/json'}), async (request, response) => {
    const sig = request.headers['stripe-signature'];
  
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, process.env.ENDPOINT_SECRET);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    let user = await UserModel.findOne({email:event.data.user_email})

    let files;

    files = Object.keys(user.cart).map(key=>{
        return {filename:user.cart[key].name, path: user.cart[key].image}
    })


  
    //// Handle the event
    switch (event.type) {
        //event.data.customer_email
        case 'checkout.session.completed':
        const session = event.data.object;
        // Then define and call a function to handle the event checkout.session.completed
        let mailOptions = {from:'mardor3645@gmail.com', to:event.data.customer_email, subject:'ORDER', text:'we hope you enjoy your oder!',attachments:files}
        transporter.sendMail(mailOptions,(err,success)=>{
        if(err) return res.status(500).send('error')
        return res.status(200).send('success')
        })
        break;
        // ... handle other event types
        default:
        console.log(`Unhandled event type ${event.type}`);
    }
  
    // Return a 200 response to acknowledge receipt of the event
    response.send(200);
  });

app.post('/login',(req,res)=>{

    let productData=[]
    ProductModel.findOne({},(err,result)=>{
        if (err) console.error(err)

        if (!result) {
            fetch('https://fortnite-api.theapinetwork.com/items/list').then(res=>res.json()).then(res=>{
                let arr = res.data.slice(1,31)

               for (let i of arr) {
                   productData.push({id:i.itemId,price:1,name:i.item.name,image:i.item.images.icon})
               }

               ProductModel.insertMany(productData,(err,ocs)=>{
                    if (err) console.error(err)

                    console.log('did uit');
                    return
               })
            })
        }})
   




    console.log(req.body);
    let username = req.body.username
    return UserModel.find({ username }, function(err, result) {
        if (!result.length)
            res.json({answer:'not ok'});
        else
            bcrypt.compare(req.body.password, result[0].password, function(err, solution) {
                if (solution) {
                    username = req.body.username
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
    User.cart={}
    
    return UserModel.find({ username: req.body.username,email:req.body.email }, function(err, result) {
        if (err){
            console.log(err)
            return res.json({answer:'server error'})
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

app.put('/cart',(req,res)=>{
    
    let cart = req.body.cart
    let key = req.body.key
    let user_cookie = JSON.parse(req.cookies.user);
    console.log(user_cookie,req.body);

    if(req.query.q==='login'){
        return UserModel.find({username:user_cookie.username},(err,result)=>{
            if(err){
                console.error(err);
                return res.json({answer:'server error'})
            }
            console.log(result);

            if(Object.keys(result[0].cart).length>0){
                
                res.json({answer:'exists',cart:result[0].cart})
            }
             else{
                UserModel.findOneAndUpdate({username:user_cookie.username},{cart:Object.keys(req.body.cart).length>0?req.body.cart:{}},(err,result)=>{
                    if(err){
                        console.error(err);
                        res.json({answer:'server error'})
                    }
                    res.json({answer:'ok'})
                })
            }
                
            
        })
    }
    else if (req.query.q==='add'){
        return UserModel.find({username:user_cookie.username},(err,result)=>{
            if(err){
                console.error(err);
                return res.json({answer:'server error'})
            }

            UserModel.findOneAndUpdate({username:user_cookie.username},{cart:{...result[0].cart,...req.body.cart}},(err,result)=>{
                if (err) throw err
                res.json({answer:'ok'})
            })
            
        
        })
    

    }
    else if (req.query.q==='delete'){
        return UserModel.find({username:user_cookie.username},(err,result)=>{
            if(err){
                console.error(err);
                return res.json({answer:'server error'})
            }
            delete result[0].cart[key]
            console.log(result[0].cart);
            UserModel.findOneAndUpdate({username:user_cookie.username},{cart: result[0].cart},(err,result)=>{
                if (err) throw err
                res.json({answer:'ok'})
            })
            
        
        })
    

    }else{
        return res.status(404)
    }
    
   }
)






mongoose.connect('mongodb://localhost:27017/users',{useUnifiedTopology:true}).then(()=>{
    console.log('database up');
    app.listen(80,()=>{
        console.log('server up');
        
    })
})



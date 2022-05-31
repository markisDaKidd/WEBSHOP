let mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({username:String,password:String,email:String,cart: Object},{minimize:false})
let ProductSchema = new mongoose.Schema({id:String, price:Number,name:String,image:String})

let UserModel = new mongoose.model('user',UserSchema)
let ProductModel = new mongoose.model('product',ProductSchema)

module.exports = {UserModel,ProductModel}
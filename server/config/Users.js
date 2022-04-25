let mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({username:String,password:String,email:String})

let UserModel = new mongoose.model('user',UserSchema)

module.exports = UserModel
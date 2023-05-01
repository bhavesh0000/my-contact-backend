const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required:(true, "Please add the user name"),
    },

    useremail:{
        type: String,
        required:(true, "Please add the user email address"),
        unique:(true,"Email address already exist")

    },

    userpassword:{
        type: String,
        required:(true, "Please add the user passworf"),
    },

},{
    timestamps: true
})
module.exports = mongoose.model("User", userSchema)
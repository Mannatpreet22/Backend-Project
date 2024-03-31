import mongoose from 'mongoose'
import jwt from "jsonwebtoken"
import bycrpt from 'bcrypt'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    avatar: {
        type: String, // cloudinary url service
        required: true,
    },
    coverImage: {
        type: String, // cloudinary url service
    },
    watchHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video'
        }],
    password: {
        type: String,
        required: [true, 'Password is Required!']
    },
    refreshToken: {
        type: String,
    }
}, { timestamps: true })

// a hook which before saving the password encryptes the password for safety
userSchema.pre('save', async function (next) {     //can't use arrow functions because it doesn't have the refernce of the keyword 'this'
    
    if (!this.isModified('password')) return next()

    this.password = await bycrpt.hash(this.password, 11)
    next()
})

// creating public methods to validate the password passed by the user (return boolean value)
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bycrpt.compare(password, this.password)   // return true or false
}

userSchema.methods.generateAccessToken = function () {      // used for generating access token 
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname,
    },process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    })
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this._id,
    },process.env.REFRESH_ACCESS_TOKEN,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    })
}
export const User = mongoose.model('User', userSchema)
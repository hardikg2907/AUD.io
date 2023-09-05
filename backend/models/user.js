const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {Event, eventSchema} = require('./eventModel')

// const validator = require('validator')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        // unique: true,
    },
    name: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: 'Write something about yourself here!'
    },
    displayPic: {
        type: String
    },
    events: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Event',
    }],
    permissions: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Event'
    }],
    type: {
        type: String
    },
    phone: {
        type: Number
    },
    facultyMentor: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    }
})

//static signup method
userSchema.statics.signup = async function(email, password,type){

    // validation
    if(!email || !password) {
        throw Error('All fields must be filled')
    }

    const exists = await this.findOne({email})
    if(exists) throw Error('Email already in use.')

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({
        email,
        password: hash,
        type
    })

    return user

}

//static login method
userSchema.statics.login = async function(email,password,type) {
    if(!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({email,type})
    if(!user) throw Error('Incorrect email')

    const match = await bcrypt.compare(password, user.password)
    if(!match) throw Error('Incorrect Password')

    return user
}

module.exports = mongoose.model('User', userSchema)
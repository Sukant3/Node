// login authetication 
const express = require('express')
const cors = require("cors")
const mongoose = require("mongoose")
const crypto=require('crypto')
const bcrypt=require('bcrypt')
const app = express() //

app.use(express.json())
app.use(cors())

//connect with mongodb
mongoose.connect('mongodb://localhost:27017/social')

const user = mongoose.model('user',
    {
        'username': String,
        'password': String,
    })

const hash = (p) => bcrypt.hash(p,5)

app.post('/signup', async (req, res) => {
     const myuser = await user.findOne({ 'username': req.body.username })
     if(myuser)
        return res.json(myuser.username+"user is already exist")
    
    const newuser = { 'username': req.body.username, 'password':await hash(req.body.password)}
    res.json(await user.create(newuser))
})

app.post('/login', async (req, res) => {
    const myuser = await user.findOne({ 'username': req.body.username })
    const sol = myuser && await bcrypt.compare(req.body.password,myuser.password)
    res.json(sol ? 'ok' : 'false')
})

app.listen(3000, () => console.log("Server is running"))

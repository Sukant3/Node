const express = require('express')
const cors = require("cors")
const mongoose = require("mongoose")
const app =express() //

app.use(express.json())  
app.use(cors())

//connect with mongodb
mongoose.connect('mongodb://localhost:27017/office')

const employee=mongoose.model('employee',
{'name':String,
'id':String,
'dept':String})

//CRUD 
app.get('/employees',async (req,res)=> res.json(await employee.find()))
app.post('/employees',async (req,res)=> res.json(await employee.create(req.body)))
app.delete('/employees/:id',async (req,res)=> res.json(await employee.findByIdAndDelete(res.params.id)))

app.put('/employees/:id',async (req,res)=>res.json(await employee.findByIdAndUpdate(res.params.id,req.body)))
app.patch('/employees/:id',async (req,res)=>res.json(await employee.findByIdAndUpdate(res.params.id,req.body,{name:true})))

//Deployment
app.listen(3000,()=> console.log("Server is running"))




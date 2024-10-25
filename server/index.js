const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const EmployeeModel = require('./model/Employee')

const app = express()
app.use(express.json())
app.use(cors())

app.post("/login",(req, res) =>{
  const{email, password } = req.body;
  EmployeeModel.findOne({email:email})
  .then(user =>{
    if(user){
      if(user.password === password){
        res.json({message: "Login Successfull", user:user})
        }
        else{
          res.json({message: "Invalid Password"})
        }
      }else{
        res.json({message: "Invalid Email"})
      }
    })
  })

mongoose.connect("mongodb://localhost:27017/employee")
app.post('/register',(req, res) =>{
   EmployeeModel.create(req.body)
   .then(employees => res.json(employees))
   .catch(err => res.json(err))
})
app.listen(3001, ()=>{
  console.log("Server is running on port 3001")
})
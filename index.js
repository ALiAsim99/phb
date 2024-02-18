require('dotenv').config()


const express=require('express')
const app=express()
const cors=require('cors');

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
const Person=require('./models/person')
  
 

app.get("/api/persons",(req,res)=>{
    Person.find({}).then(persons=>res.json(persons))
})


app.get("/api/persons/:id",(req,res)=>{
    Person.findById(req.params.id)
    .then(person=>{
        if(person){
        res.json(person)
    }else{
        res.status(404).end()
    }
})
    
})
app.delete('/api/persons/:id',(req,res)=>{
    Person.findByIdAndDelete(req.params.id)
    .then(res=>res.status(204).end())
   
})
const generateId=()=>{
    const maxId=persons.length>0?Math.max(...persons.map(p=>p.id)):0;
    return maxId+1;
}
app.post('/api/persons',(req,res)=>{
    const body=req.body;
    console.log("post")
    console.log(body)
    if(!body.name || !body.number){
        return res.status(400).json({error:"content-missing"})
    }
    if(persons.find(p=>p.name==body.name)){
        return res.status(400).json({error:'person already exists'})
    }
    const person=new Person({
        name:body.name,
        number:body.number,
        id:generateId()
    })
    person.save(p=>{
        res.json(p)
    })


})

const PORT = process.env.PORT 
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))
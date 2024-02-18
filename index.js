require('dotenv').config()


const express=require('express')
const app=express()
const cors=require('cors');

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
const Person=require('./models/person')
  
  let persons=[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    },
    { 
        "id": 5,
        "name": "Zary Poppendieck", 
        "number": "39-23-6423122"
      }
]

app.get("/api/persons",(req,res)=>{
    Person.find({}).then(persons=>res.json(persons))
})

app.get('/info',(req,res)=>{
    res.send(`<p>Phonebook has info for ${persons.length} people</p>`)
})
app.get("/api/persons/:id",(req,res)=>{
    Person.findById(req.params.id)
    .then(person=>{
        if(persons){
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
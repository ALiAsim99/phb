const express=require('express')
const cors=require('cors');
const app=express()
app.use(express.static('dist'))
app.use(express.json())
app.use(cors)

  
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
    res.json(persons)
})
app.get("/",(req,res)=>{
    res.send("123");
})
app.get('/info',(req,res)=>{
    res.send(`<p>Phonebook has info for ${persons.length} people</p>`)
})
app.get("/api/persons/:id",(req,res)=>{
    const id=Number(req.params.id);
    const find=persons.find(p=>p.id==id)
    if(find){
        res.json(find)
    }else{
        res.status(404).end()
    }
})
app.delete('/api/persons/:id',(req,res)=>{

    const id=Number(req.params.id);
    persons=persons.filter(p=>p.id!==id)
    res.status(204).end()
})
const generateId=()=>{
    const maxId=persons.length>0?Math.max(...persons.map(p=>p.id)):0;
    return maxId+1;
}
app.post('/api/persons',(req,res)=>{
    const body=req.body;
    console.log(body)
    if(!body.name || !body.number){
        return res.status(400).json({error:"content-missing"})
    }
    if(persons.find(p=>p.name==body.name)){
        return res.status(400).json({error:'person already exists'})
    }
    body.id=generateId()
    persons=persons.concat(body);
    res.json(body);


})

const PORT=3001;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))
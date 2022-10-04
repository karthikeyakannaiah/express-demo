const Joi = require('joi')
const express = require('express')
app = express()
app.use(express.json())
const courses = [
    {id:1, name:"course1"},
    {id:2, name:"course2"},
    {id:3, name:"course3"},
    {id:4, name:"course4"}
]

// CRUD operations
// get, post, put, delete

app.get('/',(req,res)=>{
    res.send('Hello there!');
})
app.get('/api/courses',(req,res)=>{
    res.send(courses)
})
app.post('/api/courses',(req,res)=>{
    const {error} = validateCourse(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
    const course ={
        id: courses.length+1,
        name: req.body.name
    }
    courses.push(course)
    res.send(course)
})
app.get('/api/course/:id',(req,res)=>{
    const course = courses.find(c=> c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send("The course was not found bro")
    res.send(course)
})
app.get('/api/posts/:year/:month',(req,res)=>{
    res.send(req.query)
})
app.put("/api/course/:id",(req,res)=>{
    const course = courses.find(c=> c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send("The course was not found bro")
    
    const {error} = validateCourse(req.body)
    if(error) return res.status(400).send(error.details[0].message)
        

    course.name=req.body.name
    res.send(course)
})
app.delete("/api/course/:id",(req,res)=>{
    const course = courses.find(c=> c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send("The course was not found bro")
        
    const index = courses.indexOf(course)
    courses.splice(index,1)

    res.send({course, deleted:"course deleted"})
})

const validateCourse = (reqBody) =>{
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    return schema.validate(reqBody)
}

const port = process.env.PORT || 3030;

app.listen(port,()=>console.log(`Listening on port ${port}.. `))
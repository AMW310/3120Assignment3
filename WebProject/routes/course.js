let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Course = require('../model/course');
function requireAuth(req,res,next)
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login')
    }
    next();
}
// get --> Extract & read something
// post --> post something
// put --> Edit/Update some data
// delete --> Delete the data
// CRUD --> Create, Read, Update & Delete

// Get route for the read student list - Read Operation
router.get('/',async(req,res,next)=>{
    try
    {
        const StudentList = await Course.find();
        res.render('Courses/list',{
            title:'Student List',
            StudentList:StudentList,
            displayName: req.user?req.user.displayName:""
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Courses/list',
        {
            error:'Error on server'
        })
    }
})

// Get route for displaying the Add Page - Create Operation
router.get('/add',async(req,res,next)=>{
    try{
        res.render('Courses/add',{
            title:'Add a Student',
            displayName: req.user?req.user.displayName:""
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Courses/add',
        {
            error:'Error on server'
        })
    }
})
// Post route for processing the Add Page - Create Operation
router.post('/add',async(req,res,next)=>{
    try
    {
        let newStudent = Course({
            "name":req.body.name,
            "age":req.body.age,
            "major":req.body.major,
            "gpa":req.body.gpa
        });
        Course.create(newStudent).then(()=>{
            res.redirect('/list')
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Courses/add',
        {
            error:'Error on server'
        })
    }
})
// Get route for displaying the Edit Page - Update Operation
router.get('/edit/:id',async(req,res,next)=>{
    try
    {
        const id = req.params.id;
        const studentToEdit = await Course.findById(id);
        res.render("Courses/edit",
            {
                title: 'Edit Student',
                Course: studentToEdit,
                displayName: req.user?req.user.displayName:""
            }
        )
    }
    catch(err)
    {
        console.log(err);
        next(err);
    }
})
// Post route for processing the Edit Page - Update Operation
router.post('/edit/:id',async(req,res,next)=>{
    try{
        let id = req.params.id;
        let updateCourse = Course({
            "_id":id,
            "name":req.body.name,
            "age":req.body.age,
            "major":req.body.major,
            "gpa":req.body.gpa
        })
        Course.findByIdAndUpdate(id,updateCourse).then(()=>{
            res.redirect("/list")
        })
    }
    catch(err)
    {
        console.log(err);
        next(err);
    }
})
// Get route for performing delete operation - Delete Operation
router.get('/delete/:id',async(req,res,next)=>{
    try{
        let id = req.params.id;
        Course.deleteOne({_id:id}).then(()=>{
            res.redirect("/list")
        })
    }
    catch(err)
    {
        console.log(err);
        next(err);
    }
})
module.exports = router;
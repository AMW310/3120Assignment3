let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Course = require('../model/course');

// get --> Extract & read something
// post --> post something
// put --> Edit/Update some data
// delete --> Delete the data
// CRUD --> Create, Read, Update & Delete

// Get route for the read course list - Read Operation
router.get('/',async(req,res,next)=>{
    try
    {
        const CourseList = await Course.find();
        //console.log(CourseList);
        res.render('Courses/list',{
            title:'Courses',
            CourseList:CourseList
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Courses/list',{
            error:'Error on server'
        })
    }
})

// Get route for displaying the Add Page - Create Operation
router.get('/add',async(req,res,next)=>{
    try{
        res.render('Courses/add',{
            title:'Add a Student'
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Courses/add',{
            title:'Courses',
            error:'Error on server'
        })
    }
})
// Post route for processing the Add Page - Create Operation
router.post('/add',async(req,res,next)=>{
    try
    {
        let newCourse = Course({
            "name":req.body.name,
            "age":req.body.age,
            "major":req.body.major,
            "gpa":req.body.gpa
        });
        Course.create(newCourse).then(()=>{
            res.redirect('/list')
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Courses/add',{
            title:'Courses',
            error:'Error on server'
        })
    }
})
// Get route for displaying the Edit Page - Update Operation
router.get('/edit/:id',async(req,res,next)=>{

})
// Post route for processing the Edit Page - Update Operation
router.post('/edit/:id',async(req,res,next)=>{

})
// Get route for performing delete operation - Delete Operation
router.get('/delete/:id',async(req,res,next)=>{

})
module.exports = router;
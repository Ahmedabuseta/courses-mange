const express = require('express')
const course = require('../models/courseModal')
// const coursesRouter = require('./Routes')
const jsend = require('jsend')
const app = express()
app.use(express.json());



const getAllCourses = async (req,res)=>{
    const query = req.query
    const limit = query.limit || 10 ;
    const page  = query.page || 1;
    const skip = (page-1)*limit;
    
    const courses = await course.find({},{__v:0}).limit(limit).skip(skip)
    res.status(201).json(jsend.success(courses))
    
}

const getCourse = async (req,res)=>{
    const courseId = req.params.courseID
    const courses = await course.findById(courseId)
    res.status(201).json(jsend.success(courses))
}

const addCourse = async(req,res)=>{
    const newCourse = new course(req.body)
    await newCourse.save()
    res.status(201).json(jsend.success(newCourse))
}
const updateCourse=async (req,res)=>{
    const courseId = req.params.courseID;
    const newCourses =await course.updateOne({_id:courseId},{ $set: req.body },{new:true})
    res.status(201).json(jsend.success(newCourses))
}
const deleteCourse=async (req,res)=>{
    const courseId = req.params.courseID;
    console.log(courseId);
    const deletedCourse = await course.findByIdAndDelete(courseId);

    res.json(res.status(201).json(jsend.success({message: "Course deleted successfully"})))
}
module.exports= {
    getAllCourses,
    getCourse,
    updateCourse,
    addCourse,
    deleteCourse
}
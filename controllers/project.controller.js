const asyncHandler = require('express-async-handler');
const Project = require('../models/project.model');

//Get all Projects
const getProjects = asyncHandler(async (req,res) =>{
    const project = await Project.find();
    res.status(200).json(project);
});

//Get one Project
const getProject = asyncHandler(async (req,res) =>{
    const project = await Project.findById(req.params.id);
    if(!project){
        res.status(404);
        throw new Error('Project not found');
    }
    res.status(200).json(project);
});

//Create new Project
const createProject = asyncHandler(async (req,res) =>{
    console.log('the request body is :', req.body);
    const {surface, budget, cultureType, duration} = req.body;
    if(!surface || !budget || !cultureType || !duration){
        res.status(400);
        throw new Error('All fields are madatory')
    }
    const project = await Project.create({
        surface, 
        budget,
        cultureType, 
        duration
    });
    res.status(201).json(project);
});

//Update Project
const updateProject = asyncHandler(async (req,res) =>{
    const project = await Project.findById(req.params.id);
    if(!project){
        res.status(404);
        throw new Error('Project not found');
    };
    const updatedProject = await Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedProject);
});

//delete Project
const deleteProject = asyncHandler(async (req,res) =>{
    const project = await Project.findById(req.params.id);
    if(!project){
        res.status(404);
        throw new Error('Project not found');
    };
    await Project.deleteOne();
    res.status(200).json(project);
});

module.exports = {getProjects, createProject, getProject, updateProject, deleteProject}
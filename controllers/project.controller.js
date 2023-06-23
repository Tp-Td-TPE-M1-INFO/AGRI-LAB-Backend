const asyncHandler = require('express-async-handler');
const Project = require('../models/project.model');

//Get all Projects
const getProjects = asyncHandler(async (req,res) =>{
    const project = await Project.find();
    res.status(200).json(project);
});

//Get one Project
const getProject = asyncHandler(async (req,res) =>{
    const project = await Project.findById(req.params.id)
        .populate("investment");
    
    if(!project){
        res.status(404);
        throw new Error('Project not found');
    }
    res.status(200).json(project);
});

//Create new Project
const createProject = (async (req,res) =>{
    
    let files = [];
    const {farmer, title, description, surface, budget, cultureType, technic, duration} = req.body;
   
    try{
        if(req.files){
            req.files.forEach(file => {
                files.push(`projects/${file.filename}`)
            });
        }
        const project = await Project.create({
            farmer,
            title,
            description,
            surface, 
            budget,
            technic,
            cultureType, 
            duration,
            files: files
        });
        res.status(201).json(project);
    }catch(error){
        res.status(400).json(error.message)
    }
});

//Update Project
const updateProject = (async (req,res) =>{
    let files = [];
    const {farmer, title, description, surface, budget, cultureType, technic, duration} = req.body;
   
    try{
        if(req.files){
            req.files.forEach(file => {
                files.push(`projects/${file.filename}`)
            });
        }
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            {
                farmer,
                title,
                description,
                surface, 
                budget,
                technic,
                cultureType, 
                duration,
                files: files
            },
            {new: true}
        );
        res.status(201).json(project);
    }catch(error){
        res.status(400).json(error.message)
    }
});

//delete Project
const deleteProject = (async (req,res) =>{
    try{
        await Project.deleteOne({_id: req.params.id});
        res.status(200).json({message: "project deleted"})
    }
    catch(error){
        res.status(400).send(error.message);
    }
});

module.exports = {getProjects, createProject, getProject, updateProject, deleteProject}
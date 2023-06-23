const Investment = require('../models/investment.model');
const Project = require('../models/project.model');

const createInvestment = (async (req, res) =>{

    const {investor, project, money, description } = req.body;
    try{
        const investment = await Investment.create({
            investor,
            project,
            money,
            description
        });
        
        const updateProject = await Project.findByIdAndUpdate(
            project,
            {
                $push:{
                   investment: investment._id 
                }
            }
        );
        console.log(updateProject);
        res.status(201).json({message: "thank you for your investment"})
    }
    catch(err){
        res.status(400).json(err);
    }
});

const getInvestment =  (async (req, res) =>{

    try{
        const investment = await Investment.find({investor: req.params.investorId});
        investment.populate("Project");
        res.status(200).json(investment);
    }
    catch(err){
        res.status(400).json(err);
    }
})

const deleteInvestment = (async (req, res) =>{
    try{
        await Investment.deleteOne(req.params.id)
        res.status(200).json("Investment deleted")
    }
    catch(err){
        res.status(400).json(err) 
    }
})

module.exports = {createInvestment, getInvestment, deleteInvestment};
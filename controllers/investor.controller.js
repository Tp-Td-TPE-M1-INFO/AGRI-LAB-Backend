const Investor = require('../models/investor.model');
const errorCtr = require('../utils/error.utils');
   

const getInvestor = (async (req, res) =>{
    try{
        nvestor = await Investor.findById(req.params.id).select('-password')
        res.status(200).json(nvestor);
    }
    catch(err){
        res.status(400).send(err);
    }
});

const updateInvestor = (async (req, res) =>{

    const {first_name, last_name, email, phoneNumber} = req.body
    try{
        const updateInvestor = await Investor.findByIdAndUpdate(
            req.Investor._id,
            {
                last_name: last_name,
                first_name: first_name,
                email: email,
                phoneNumber: phoneNumber
            },
            {new: true},
        ).select('-password');
        res.status(200).json(updateInvestor);
    }
    catch(err){
        res.status(400).send(err)
    }
})

const deleteInvestor = (async (req, res) =>{
    
    try{

        await Investor.deleteOne(req.investor._id);
        res.status(200).json({message: "Investor deleted"});
    }
    catch(err){
        res.status(400).json({ message: err});
    }
});

const getAllInvestors = (async (req, res)=>{
    try{
        investors = await Investor.find();
        res.status(200).json(investors);
    }
    catch(err){
        res.status(400).send(err)
    }
})

const profil = (async (req, res)=>{
    let profil;
    if(req.file) profil = `profil/${req.file.filename}`
    try{
        await Investor.findByIdAndUpdate(
            req.params.id,
            {avatar : profil},
            {new: true}
        );
        res.status(200).send("image uploaded")
    } 
    catch(err){
        console.log(err)
        res.status(400).send(err)
    }
})
const deleteProfil = (async (req, res) =>{
    try{
        await Investor.findByIdAndUpdate(
            req.params.id,
            {avatar: 'profil/profil.jpg'},
            {new: true}
        );
        res.status(200).json({message : 'delete succes'})
    }
    catch(err){
        res.statut(400).send(err)
    }
})

module.exports = {getInvestor, updateInvestor, deleteInvestor, getAllInvestors, profil, deleteProfil}
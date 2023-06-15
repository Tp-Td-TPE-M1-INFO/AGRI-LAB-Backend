const Farmer = require('../models/farmer.model');

//Check if the registration number is already in the database   
const getFarmer = (async (req, res) =>{
    try{
        const farmer = await Farmer.findById(req.params.id).select('-password')
        res.status(200).json(farmer);
    }
    catch(err){
        res.status(400).send(err);
    }
});

const updateFarmer = (async (req, res) =>{

    const {fullname, email, phoneNumber} = req.body
    try{
        const updateFarmer = await Farmer.findByIdAndUpdate(
            req.params.id,
            {
                fullname: fullname,
                email: email,
                phoneNumber: phoneNumber
            },
            {new: true},
        ).select('-password');
        res.status(200).json(updateFarmer);
    }
    catch(err){
        res.status(400).send(err)
    }
})

const deleteFarmer = (async (req, res) =>{
    
    try{
        
        await Farmer.deleteOne(req.params.id);
        res.status(200).json({message: "Farmer deleted"});
    }
    catch(err){
        res.status(400).json({ message: err});
    }
});

const getAllFarmers = (async (req, res)=>{
    try{
        const farmers = await Farmer.find();
        res.status(200).json(farmers);
    }
    catch(err){
        res.status(400).send(err)
    }
})

const profil = (async (req, res)=>{
    let profil;
    if(req.file) profil = `profil/${req.file.filename}`
    try{
        await Farmer.findByIdAndUpdate(
            req.params.id,
            {avatar : profil},
            {new: true}
        );
        res.status(200).send({
            avatar: profil
        })
    } 
    catch(err){
        console.log(err)
        res.status(400).send(err)
    }
});

const deleteProfil = (async (req, res) =>{
    try{
        const farmer = await Farmer.findByIdAndUpdate(
            req.params.id,
            {avatar: 'profil/profil.jpg'},
            {new: true}
        );
        res.status(200).json({avatar: farmer.avatar})
    }
    catch(err){
        res.statut(400).send(err)
    }
})

module.exports = {getFarmer, updateFarmer, deleteFarmer, getAllFarmers, profil, deleteProfil}
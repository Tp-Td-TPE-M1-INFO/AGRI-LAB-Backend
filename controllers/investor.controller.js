const Investor = require('../models/investor.model');

//Check if the registration number is already in the database

const getInvestor = (async (req, res) =>{
    try{
        const investor = await Investor.findById(req.params.id).select('-password')
        res.status(200).json(investor);
    }

    catch(err){
        res.status(400).send(err);
    }
});

const updateInvestor = (async (req, res) =>{

    const {fullname, email, phoneNumber} = req.body
    try{
        const updateInvestor = await Investor.findByIdAndUpdate(
            req.params.id,
            {
                fullname: fullname,
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
        
        await Investor.deleteOne(req.params.id);
        res.status(200).json({message: "investor deleted"});
    }
    catch(err){
        res.status(400).json({ message: err});
    }
});

const getAllInvestors = (async (req, res)=>{
    try{
        const investors = await Investor.find();
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
        const investor = await Investor.findByIdAndUpdate(
            req.params.id,
            {avatar: 'profil/profil.jpg'},
            {new: true}
        );
        res.status(200).json({avatar: investor.avatar})
    }
    catch(err){
        res.statut(400).send(err)
    }
})

module.exports = {getInvestor, updateInvestor, deleteInvestor, getAllInvestors, profil, deleteProfil}
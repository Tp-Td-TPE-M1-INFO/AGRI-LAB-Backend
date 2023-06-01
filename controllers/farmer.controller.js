const Farmer = require('../models/farmer.model');
const {registerValidation, loginValidation} = require('../middlewares/validation');
const bcrypt = require('bcrypt');
const errorCtr = require('../utils/error.utils');

//Check if the registration number is already in the database
const register = (async (req, res)=>{
    const {first_name, last_name, phoneNumber, email, password} = req.body;
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    //Create a new farmer
    const farmer = new Farmer({
        first_name,
        last_name,
        phoneNumber,
        email,
        password: hashedPassword
    }) ;
    try{
        const authToken = await farmer.generateToken();
        res.status(201).json({
            first_name : farmer.first_name,
            last_name: farmer.last_name,
            phoneNumber: farmer.phoneNumber,
            email : farmer.email,
            avatar : farmer.avatar,
            token: authToken
        })
    }catch(err){
        console.log(err.message)
        errors = errorCtr.signUpErrors(err)
        res.status(400).json(errors);
    }
})   

const login = (async (req, res) =>{
    const{email, password } = req.body;

    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
        //Check if the email exist
        const farmer = await Farmer.findOne({email});
        if(!farmer) return res.status(400).send('Invalid email or password');
        //check if the password is correct
        const validPass = await bcrypt.compare(password, farmer.password);
        if(!validPass) return res.status(400).send('Invalid email or password');

        //Create and asign a token
        const token = await farmer.generateToken();

        res.status(200).json({
            first_name : farmer.first_name,
            last_name: farmer.last_name,
            phoneNumber: farmer.phoneNumber,
            email : farmer.email,
            avatar : farmer.avatar,
            token: token
        })
})

const getFarmer = (async (req, res) =>{
    try{
        farmer = await Farmer.findById(req.params.id).select('-password')
        res.status(200).json(farmer);
    }
    catch(err){
        res.status(400).send(err);
    }
});

const updateFarmer = (async (req, res) =>{

    const {first_name, last_name, email, phoneNumber} = req.body
    try{
        const updateFarmer = await Farmer.findByIdAndUpdate(
            req.Farmer._id,
            {
                last_name: last_name,
                first_name: first_name,
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

        await Farmer.deleteOne(req.farmer._id);
        res.status(200).json({message: "Farmer deleted"});
    }
    catch(err){
        res.status(400).json({ message: err});
    }
});

const getAllFarmers = (async (req, res)=>{
    try{
        farmers = await Farmer.find();
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
        res.status(200).send("image uploaded")
    } 
    catch(err){
        console.log(err)
        res.status(400).send(err)
    }
})
const deleteProfil = (async (req, res) =>{
    try{
        await Farmer.findByIdAndUpdate(
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

module.exports = {register, login, getFarmer, updateFarmer, deleteFarmer, getAllFarmers, profil, deleteProfil}
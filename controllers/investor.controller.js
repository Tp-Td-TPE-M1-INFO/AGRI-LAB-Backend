const Investor = require('../models/investor.model');
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
    
    //Create a new Investor
    const investor = new Investor({
        first_name,
        last_name,
        phoneNumber,
        email,
        password: hashedPassword
    }) ;
    try{
        const authToken = await investor.generateToken();
        res.status(201).json({
            first_name : investor.first_name,
            last_name: investor.last_name,
            phoneNumber: investor.phoneNumber,
            email : investor.email,
            avatar : investor.avatar,
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
        const investor = await Investor.findOne({email});
        if(!investor) return res.status(400).send('Invalid email or password');
        //check if the password is correct
        const validPass = await bcrypt.compare(password, investor.password);
        if(!validPass) return res.status(400).send('Invalid email or password');

        //Create and asign a token
        const token = await investor.generateToken();

        res.status(200).json({
            first_name : investor.first_name,
            last_name: investor.last_name,
            phoneNumber: investor.phoneNumber,
            email : investor.email,
            avatar : investor.avatar,
            token: token
        })
})

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

module.exports = {register, login, getInvestor, updateInvestor, deleteInvestor, getAllInvestors, profil, deleteProfil}
const generateToken = require('../config/generateToken');
const Farmer = require('../models/farmer.model');
const Investor = require('../models/investor.model');
const {loginValidation, registerValidation} = require('../middlewares/validation');
const bcrypt = require('bcrypt');

const register = (async (req, res)=>{
    const {fullname, phoneNumber, email, role, password} = req.body;
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    //Create a new farmer
    if (role == "farmer")
    {
        try{
    
            const farmer = await Farmer.create({
                fullname,
                phoneNumber,
                email,
                password: hashedPassword
            });
            res.status(201).json({
                _id: farmer._id,
                fullname : farmer.fullname,
                phoneNumber: farmer.phoneNumber,
                email : farmer.email,
                avatar : farmer.avatar
            })
        }catch(err){
            const errors = errorCtr.signUpErrors(err)
            res.status(400).json({errors});
        }
        return;
    }

    if(role == "investor")
    {
        try{
    
            const investor = await Investor.create({
                fullname,
                phoneNumber,
                email,
                password: hashedPassword
            });
            res.status(201).json({
                _id: investor._id,
                fullname : investor.fullname,
                phoneNumber: investor.phoneNumber,
                email : investor.email,
                avatar : investor.avatar
            })
        }catch(err){
            const errors = errorCtr.signUpErrors(err)
            res.status(400).json({errors});
        }
        return;

    }
})

const login = (async (req, res) =>{

    const{email, password } = req.body;
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
        //Check if the email exist
    const farmer = await Farmer.findOne({email});
    if(farmer)
    {
        const validPass = await bcrypt.compare(password, farmer.password);
        if(!validPass) return res.status(400).send('Invalid email or password');
            
        //Create and asign a token
        const token = generateToken(farmer._id.toString());
    
        res.status(200).json({
            _id: farmer._id,
            fullname : farmer.fullname,
            role : farmer.role,
            phoneNumber: farmer.phoneNumber,
            email : farmer.email,
            avatar : farmer.avatar,
            token: token
        })
        return
    }

    const investor = await Investor.findOne({email});

    if(investor)
    {
        if(!investor) return res.status(400).send('Invalid email or password');
        //check if the password is correct
        const validPass = await bcrypt.compare(password, investor.password);
        if(!validPass) return res.status(400).send('Invalid email or password');
    
        //Create and asign a token
        const token = generateToken(investor._id.toString());
    
        res.status(200).json({
            _id: investor._id,
            fullname : investor.fullname,
            phoneNumber: investor.phoneNumber,
            email : investor.email,
            avatar : investor.avatar,
            token: token
        })
    }
    
})


module.exports = {login, register};
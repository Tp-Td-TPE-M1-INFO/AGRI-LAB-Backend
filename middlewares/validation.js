const Joi = require("joi");


//Register validation
const registerValidation = data =>{
    const schema = {
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        phoneNumber: Joi.string().max(9).required(),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    }
    return Joi.validate(data, schema);
}


const loginValidation = data =>{
    const schema = {
        email: Joi.string().required().email(),
        password: Joi.string().required()
    }
    return Joi.validate(data, schema);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
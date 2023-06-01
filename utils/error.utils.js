module.exports.signUpErrors= (err) => {
    let errors = { phoneNumber: "", email: "", password: "" };
        
    if(err.message.includes('password'))
        errors.password = "The password must contain at least 6 characters";
        
    if(err.code === 11000 && Object.keys(err.keyValue)[0].includes("phoneNumber"))
        errors.registerNumber = "this phone number is already use ";

    if(err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
        errors.email = "this email is already use ";

    return errors;
}
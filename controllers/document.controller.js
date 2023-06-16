const Document = require('../models/document.model')

const getDocument = (async function(req, res){
    try{
        const document = await Document.findById(req.params.id)
        res.status(400).json(document);
    }
    catch(err){
        res.status(400).json(err.message)
    }
});

const getDocuments = (async (req, res) =>{
    try{
        const documents = await Document.find();
        res.status.json(documents)
    }
    catch(err){
        res.status(400).json(err.message)
    }
});

const createDocument = (async (req, res)=>{

    const {admin, }
    try{
        const newDocument = await Document.create({

        })
    }
})
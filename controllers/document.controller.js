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
        res.status(200).json(documents)
    }
    catch(err){
        res.status(400).json(err.message)
    }
});

const createDocument = (async (req, res)=>{

    let document = "";
    const {author, title, description, category} = req.body;
    if(req.file) document = `documents/${req.file.filename}`;
    
    try{
        const newDocument = await Document.create({
            author,
            title,
            description,
            category,
            document: document
        });
        res.status(201).json(newDocument)
    }
    catch(err){
        res.status(400).json(err)
    }
})

module.exports = {getDocument, getDocuments, createDocument}
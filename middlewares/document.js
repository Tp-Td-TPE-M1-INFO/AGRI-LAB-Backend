const multer = require ('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) =>{
        callback(null, 'public/documents');
    },
    filename: (req, file, callback) =>{
        const name = file.originalname.split(' ').join('_');
        callback(null, `${Date.now()}_${name}`);
    }
});

module.exports = multer({storage: storage}).single('document');
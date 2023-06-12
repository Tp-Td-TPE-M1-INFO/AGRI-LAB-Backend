const multer = require ('multer');

/*const MIME_TYPES = {
    'document/pdf': 'pdf',
    'document/docs': 'docs',
    'document/odt': 'odt',
}*/

const storage = multer.diskStorage({
    destination: (req, file, callback) =>{
        callback(null, 'public/projects');
    },
    filename: (req, file, callback) =>{
        const name = file.originalname.split(' ').join('_');
        //const extension = MIME_TYPES[file.mimetype];
        callback(null, `${Date.now()}_${name}`);
    }
});

module.exports = multer({storage: storage}).array('files');
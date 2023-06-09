const multer = require ('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) =>{
        callback(null, 'public/files');
    },
    filename: (req, file, callback) =>{
        callback(null, `${date.now}.pdf`);
    }
});

module.exports = multer({storage: storage}).array('files');
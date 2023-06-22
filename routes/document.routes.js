const router = require('express').Router();
const document = require('../middlewares/document')
const {createDocument, getDocuments, getDocument} = require('../controllers/document.controller');

router.post('/post', document, createDocument);
router.get('/getDocuments', getDocuments);
router.get('/getDocument/:id', getDocument);

module.exports = router;
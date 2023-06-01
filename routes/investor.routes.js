const router = require('express').Router();
const {register, login, getInvestor, updateInvestor, deleteInvestor, getAllInvestors, profil, deleteProfil } = require('../controllers/investor.controller');
const {protect} = require('../middlewares/investorAuth');
const upload = require('../middlewares/upload');


router.post('/Investor/register', register);
router.post('/Investor/login', login);
router.get('/Investor/info/:id', getInvestor)
router.get('/Investor/all', getAllInvestors)
router.patch('/Investor/update',protect, updateInvestor)
router.delete('/Investor/delete', protect, deleteInvestor)
router.patch('/Investor/profil/:id', protect, upload, profil)
router.patch('/Investor/deleteProfil/:id',protect, deleteProfil)

module.exports = router;
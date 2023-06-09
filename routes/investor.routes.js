const router = require('express').Router();
const {getInvestor, updateInvestor, deleteInvestor, getAllInvestors, profil, deleteProfil } = require('../controllers/investor.controller');
const {protect} = require('../middlewares/investorAuth');
const upload = require('../middlewares/profil');

router.get('/info/:id', getInvestor)
router.get('/all', getAllInvestors)
router.patch('/update',protect, updateInvestor)
router.delete('/delete', protect, deleteInvestor)
router.patch('/profil/:id', protect, upload, profil)
router.patch('/deleteProfil/:id',protect, deleteProfil)

module.exports = router;
const router = require('express').Router();
const {getFarmer, updateFarmer, deleteFarmer, getAllFarmers, profil, deleteProfil } = require('../controllers/farmer.controller');
const {protect} = require('../middlewares/protect');
const upload = require('../middlewares/profil');


router.get('/info/:id', getFarmer)
router.get('/all', getAllFarmers)
router.patch('/update',protect, updateFarmer)
router.delete('/delete', protect, deleteFarmer)
router.patch('/profil/:id', protect, upload, profil)
router.patch('/deleteProfil/:id',protect, deleteProfil)

module.exports = router;
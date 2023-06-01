const router = require('express').Router();
const {register, login, getFarmer, updateFarmer, deleteFarmer, getAllFarmers, profil, deleteProfil } = require('../controllers/farmer.controller');
const {protect} = require('../middlewares/farmerAuth');
const upload = require('../middlewares/upload');


router.post('/Farmer/register', register);
router.post('/Farmer/login', login);
router.get('/Farmer/info/:id', getFarmer)
router.get('/Farmer/all', getAllFarmers)
router.patch('/Farmer/update',protect, updateFarmer)
router.delete('/Farmer/delete', protect, deleteFarmer)
router.patch('/Farmer/profil/:id', protect, upload, profil)
router.patch('/Farmer/deleteProfil/:id',protect, deleteProfil)

module.exports = router;
const router = require('express').Router();
const {getInvestment, createInvestment, deleteInvestment} = require('../controllers/investment.controller');

router.get('/getInvestment', getInvestment);
router.post('/createInvestment', createInvestment);
router.delete('/deleteInvestement', deleteInvestment);

module.exports = router;
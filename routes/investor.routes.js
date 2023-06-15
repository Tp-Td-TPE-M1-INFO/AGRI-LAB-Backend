/**
 * @swagger
 * components:
 *   schemas:
 *     Investor:
 *       type: object
 *       required:
 *         - fullname
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: ObjectId
 *           description: The auto-generated id of the investor
 *         fullname:
 *           type: string
 *           description: The name of the investor
 *         email:
 *           type: string
 *           description: The email of investor
 *         password:
 *           type: String
 *           description: The password of your account
 *         phoneNumber:
 *           type: string
 *           description: phone number of investor
 *         avatar:
 *           type: string
 *           description: Profil of investor
 *         role:
 *           type: string
 *           description: role is investor
 *
 */
/**
 * @swagger
 * tags:
 *   name: Investor
 *   description: The Investor managing API
 * /investor/all:
 *   get:
 *     summary: Lists all the Investor
 *     tags: [Investor]
 *     responses:
 *       200:
 *         description: The list of the Investor
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Investor'
 * /investor/info/{id}:
 *   get:
 *     summary: Get the investor by id
 *     tags: [Investor]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The investor id
 *     responses:
 *       200:
 *         description: The investor response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Investor'
 *       404:
 *         description: The investor was not found
 * /investor/update/{id}:
 *   patch:
 *    summary: Update the investor by the id
 *    tags: [Investor]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The investor id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Investor'
 *    responses:
 *      200:
 *        description: The investor was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Investor'
 *      404:
 *        description: The investor was not found
 *      500:
 *        description: Some error happened
 * /investor/delete/{id}:
 *   delete:
 *     summary: Remove the investor by id
 *     tags: [Investor]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The investor id
 *
 *     responses:
 *       200:
 *         description: The profil was updated
 *       404:
 *         description: Failed to udate profil
 * /investor/profil/{id}:
 *   patch:
 *    summary: Update the investor by the id
 *    tags: [Investor]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The investor id
 *    requestBody:
 *      required: true
 *      content:
 *        image:
 *          schema:
 *             type: string
 *             format: binary
 *    responses:
 *      200:
 *        description: The investor was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Investor'
 *      404:
 *        description: The investor was not found
 *      500:
 *        description: Some error happened
 * /investor/deleteProfil/{id}:
 *   patch:
 *     summary: Remove the profil picture by id
 *     tags: [Investor]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The investor id
 *
 *     responses:
 *       200:
 *         description: The profil was deleted
 *       404:
 *         description: Failed to delete profil
 */
const router = require('express').Router();
const {getInvestor, updateInvestor, deleteInvestor, getAllInvestors, profil, deleteProfil } = require('../controllers/investor.controller');
const {protect} = require('../middlewares/protect');
const upload = require('../middlewares/profil');

router.get('/info/:id', getInvestor)
router.get('/all', getAllInvestors)
router.patch('/update/:id', updateInvestor)
router.delete('/delete', deleteInvestor)
router.patch('/profil/:id', upload, profil)
router.patch('/deleteProfil/:id', deleteProfil)

module.exports = router;
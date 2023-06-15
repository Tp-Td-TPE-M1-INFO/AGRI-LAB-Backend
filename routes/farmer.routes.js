/**
 * @swagger
 * components:
 *   schemas:
 *     Farmer:
 *       type: object
 *       required:
 *         - fullname
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: ObjectId
 *           description: The auto-generated id of the Farmer
 *         fullname:
 *           type: string
 *           description: The name of the Farmer
 *         email:
 *           type: string
 *           description: The email of Farmer
 *         password:
 *           type: String
 *           description: The password of your account
 *         phoneNumber:
 *           type: string
 *           description: phone number of Farmer
 *         avatar:
 *           type: string
 *           description: Profil of Farmer
 *         role:
 *           type: string
 *           description: role is Farmer
 *
 */
/**
 * @swagger
 * tags:
 *   name: Farmer
 *   description: The Farmer managing API
 * /farmer/all:
 *   get:
 *     summary: Lists all the Farmer
 *     tags: [Farmer]
 *     responses:
 *       200:
 *         description: The list of the Farmer
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Farmer'
 * /farmer/info/{id}:
 *   get:
 *     summary: Get the Farmer by id
 *     tags: [Farmer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Farmer id
 *     responses:
 *       200:
 *         description: The Farmer response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Farmer'
 *       404:
 *         description: The Farmer was not found
 * /farmer/update/{id}:
 *   patch:
 *    summary: Update the Farmer by the id
 *    tags: [Farmer]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Farmer id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Farmer'
 *    responses:
 *      200:
 *        description: The Farmer was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Farmer'
 *      404:
 *        description: The Farmer was not found
 *      500:
 *        description: Some error happened
 * /farmer/delete/{id}:
 *   delete:
 *     summary: Remove the Farmer by id
 *     tags: [Farmer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Farmer id
 *
 *     responses:
 *       200:
 *         description: The profil was updated
 *       404:
 *         description: Failed to udate profil
 * /farmer/profil/{id}:
 *   patch:
 *    summary: Update the Farmer by the id
 *    tags: [Farmer]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Farmer id
 *    requestBody:
 *      required: true
 *      content:
 *        image:
 *          schema:
 *             type: string
 *             format: binary
 *    responses:
 *      200:
 *        description: The Farmer was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Farmer'
 *      404:
 *        description: The Farmer was not found
 *      500:
 *        description: Some error happened
 * /farmer/deleteProfil/{id}:
 *   patch:
 *     summary: Remove the profil picture by id
 *     tags: [Farmer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Farmer id
 *
 *     responses:
 *       200:
 *         description: The profil was deleted
 *       404:
 *         description: Failed to delete profil
 */
const router = require('express').Router();
const {getFarmer, updateFarmer, deleteFarmer, getAllFarmers, profil, deleteProfil } = require('../controllers/farmer.controller');
const {protect} = require('../middlewares/protect');
const upload = require('../middlewares/profil');


router.get('/info/:id', getFarmer)
router.get('/all', getAllFarmers)
router.patch('/update/:id', updateFarmer)
router.delete('/delete/:id',deleteFarmer)
router.patch('/profil/:id', upload, profil)
router.patch('/deleteProfil/:id', deleteProfil)

module.exports = router;
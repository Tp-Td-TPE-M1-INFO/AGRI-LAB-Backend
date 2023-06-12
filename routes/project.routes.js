/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - title
 *         - farmer
 *         - budget
 *         - cultureType
 *         - technic
 *         - duration
 *         - surface
 *         - files
 *       properties:
 *         id:
 *           type: ObjectId
 *           description: The auto-generated id of the project
 *         title:
 *           type: string
 *           description: The title of the farmer project
 *         farmer:
 *           type: ObjectId
 *           description: The project author
 *         budget:
 *           type: Number
 *           description: budget of project
 *         description:
 *           type: string
 *           description: descrption of project
 *         cultureType:
 *           type: string
 *           description: culture type of project
 *         technic:
 *           type: string
 *           description: technic of project
 *         duration :
 *           type: Number
 *           description: duration of project
 *         files:
 *           type: [string]
 *           description: files you can join to project
 *  
 */
/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: The Projects managing API
 * /project/getProjects:
 *   get:
 *     summary: Lists all the Projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: The list of the Projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 * /project/create:
 *   post:
 *     summary: Create a new Project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       200:
 *         description: The created Project.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       500:
 *         description: Some server error
 * /project/getProject/{id}:
 *   get:
 *     summary: Get the Project by id
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Project id
 *     responses:
 *       200:
 *         description: The Project response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: The project was not found
 * /project/update/{id}:
 *   put:
 *    summary: Update the project by the id
 *    tags: [Projects]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Project id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Project'
 *    responses:
 *      200:
 *        description: The project was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Project'
 *      404:
 *        description: The project was not found
 *      500:
 *        description: Some error happened
 * /project/delete/{id}:
 *   delete:
 *     summary: Remove the project by id
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Project id
 *
 *     responses:
 *       200:
 *         description: The Project was deleted
 *       404:
 *         description: The Project was not found
 */
const router = require('express').Router();
const files = require('../middlewares/files');
const {getProject, getProjects, createProject, updateProject, deleteProject} = require('../controllers/project.controller');

router.get('/getProjects', getProjects);
router.get('/getProject/:id', getProject);
router.post('/create', files, createProject);
router.put('/update/:id', files, updateProject);
router.delete('/delete/:id', deleteProject);

module.exports = router;
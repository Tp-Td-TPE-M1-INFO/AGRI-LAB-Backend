const router = require('express').Router();
const {getProject, getProjects, createProject, updateProject, deleteProject} = require('../controllers/project.controller');

router.get('/getProjects', getProjects);
router.get('/getProject/:id', getProject);
router.post('/create', createProject);
router.patch('/update/:id', updateProject);
router.delete('/delete/:id', deleteProject);

module.exports = router;
const router = require('express').Router();
const {getProject, getProjects, createProject, updateProject, deleteProject} = require('../controllers/project.controller');

router.get('/project/getProjects', getProjects);
router.get('/project/getProject/:id', getProject);
router.post('/project/create', createProject);
router.patch('/project/update/:id', updateProject);
router.delete('/project/delete/:id', deleteProject);

module.exports = router;
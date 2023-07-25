const express = require('express');
const router = express.Router();
const notesQueries = require('../db/queries/notes');

/* GET home page. */

router.get('/notes', function(req, res) {

  notesQueries.getAllNotes()
  .then(data => {
    return res.json(data);
  });
  
});

router.put('/notes', function(req, res) {

  const user_id = req.body.user_id;

  notesQueries.getnotesByUserId(user_id)
  .then(data => {
    return res.json(data);
  });

});

router.get('/notes/:id', function(req, res) {

  const id = req.params.id;

  notesQueries.getNotesById(id)
  .then(data => {
    return res.json(data);
  });
  
});

router.put('/notes/:id', function(req,res) {

  notesQueries.addNote(note)
  .then((data) => {
    return res.json(data);
  });
});

router.post('/notes/new', function(req, res) {

  const project = req.body.project_info;
  const userId = req.body.user_id;

  notesQueries.addProject(userId, project)
  .then((data) => {
    return res.json(data);
  });

});

router.put('/notes/edit', function(req, res) {

  const project = req.body.editedProject;

  notesQueries.editProject(project)
  .then((data) => {
    return res.json(data);
  });

});

router.post('/project/delete', function (req, res) {

  const id = req.body.project;

  notesQueries.deleteProject(id)
  .then((data) => {
    return res.json(data);
  });
});

module.exports = router;


module.exports = router;

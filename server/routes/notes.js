const express = require('express');
const router = express.Router();
const notesQueries = require('../db/queries/notes');

router.get('/notes', function(req, res) {

  const templateVars = {
    user_id: req.session.user_id,
  };

  if (!userLoggedin(templateVars)) {
    res.send("you must be loggin in to view URLs");
    return;
  };

  notesQueries.getnotesByUserId(user_id)
  .then(data => {
    return res.json(data);
  });
  
});

router.put('/notes', function(req, res) {

  const user_id = req.body.user_id;

  const note = {
    title: req.params.title,
    body: req.params.body
  };

  notesQueries.addNote(user_id, note)
  .then(data => {
    return res.json(data);
  });

});

router.get('/notes/:id', function(req, res) {

  const id = req.params.id;

  const templateVars = {
    user_id: req.session.user_id,
  };

  const noteUserId = getUserIdByNoteId(id);

  if (!templateVars.user_id) {
    res.send("You must be logged in to view notes");
    return;
  };

  if (templateVars.user_id !== noteUser) {
    return res.send("You do not have access to this note!");
  };

  notesQueries.getNotesById(id)
  .then(data => {
    return res.json(data);
  });
  
});

router.put('/notes/:id', function(req,res) {

  const id = req.params.id;

  const templateVars = {
    user_id: req.session.user_id,
  };

  const noteUser = getUserIdByNoteId(id);
  if (!templateVars.id) {
    res.send("You must be logged in to create Tiny URLs");
    return;
  };

  if (templateVars.user_id.id !== urlDatabase[key].userID) {
    return res.send("You do not have access to this URL!");
  };

  notesQueries.editNote(note)
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

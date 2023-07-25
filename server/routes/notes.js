const express = require('express');
const router = express.Router();
const notesQueries = require('../db/queries/notes');

router.get('/notes', function(req, res) {

  const templateVars = {
    user_id: req.session.user_id,
  };

  if (!templateVars.user_id) {
    res.send("you must be logged in to view URLs");
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

  if (!templateVars.user_id) {
    res.send("You must be logged in to view notes");
    return;
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
    res.send("You must be logged in to edit notes");
    return;
  };

  if (templateVars.user_id !== noteUser) {
    return res.send("You do not have access to this note!");
  };

  notesQueries.editNote(note)
  .then((data) => {
    return res.json(data);
  });

});

router.delete('/notes/delete/:id', function (req, res) {

  const id = req.body.id;

  const templateVars = {
    user_id: req.session.user_id,
  };

  const noteUser = getUserIdByNoteId(id);

  if (!templateVars.user_id) {
    res.send("You do not have access to this note!");
    return;
  };

  if (templateVars.user_id !== noteUser) {
    return res.send("You do not have access to this note!");
  };

  notesQueries.deletePosts(id)
  .then((data) => {
    return res.send("This note has been deleted");
  });
});

module.exports = router;
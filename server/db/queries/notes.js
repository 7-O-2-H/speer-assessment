const db = require('../../configs/db.config');
const { pool } = require('../queries/pool');

const getAllNotes = () => {
	return db.query("SELECT * FROM notes;").then(data => {
		return data.rows;
	})
}

const getNotesByUserId = (id) => {
  return db.query("SELECT * FROM notes WHERE notes.user_id = $1", [id]).then(data => {
    return data.rows;
  })
}

const getNotesById = (id) => {
  return db.query("SELECT * FROM notes WHERE id = $1", [id]).then(data => {
    return data.rows;
  })
}

const addNote = (userId, note) => {
  const values = [note.title, note.body, userId];
  return pool
    .query(`INSERT INTO notes (title, body, userId) VALUES ($1, $2, $3) RETURNING *;`, values)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log('add note error:', err.message);
      return null;
    });
};

const getUserIdByNoteId = (noteId)

const editNote = (note) => {

  const values = [note.title, ];
  
  return pool
    .query(`UPDATE notes SET title = $1, body = $2 RETURNING *;`, values)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log('add note error;', err.message);
      return err;
    });
};

// const deleteProject = (id) => {
//   return db.query(`DELETE FROM projects WHERE projects.id = $1`, [id]). then((data) => {
//     return data.rows
//   })
// };

module.exports = { getAllNotes, getNotesById, getAllNotes, addNote, getNotesByUserId, editNote };
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

// const addProject = (userID, project) => {
//   const values = [project.title, project.description, project.features, project.tech_stack, project.image_url, project.project_url, userID];
//   return pool
//     .query(`INSERT INTO projects (title, description, features, tech_stack, image_url, project_url, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`, values)
//     .then((result) => {
//       return result.rows;
//     })
//     .catch((err) => {
//       console.log('add project error;', err.message);
//       return null;
//     });
// };

// const editProject = (project) => {

//   const values = [project.description, project.features, project.tech_stack, project.image_url, project.project_url, project.id];
  
//   return pool
//     .query(`UPDATE projects SET description = $1, features = $2, tech_stack = $3, image_url = $4, project_url =$5 WHERE id = $6 RETURNING *;`, values)
//     .then((result) => {
//       return result.rows;
//     })
//     .catch((err) => {
//       console.log('add project error;', err.message);
//       return err;
//     });
// };

// const deleteProject = (id) => {
//   return db.query(`DELETE FROM projects WHERE projects.id = $1`, [id]). then((data) => {
//     return data.rows
//   })
// };

module.exports = { getNotesById, getAllNotes, getAllNotes };
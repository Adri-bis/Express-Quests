const database = require("../../database");

const getUsers = (req, res) => {
  database

    .query("select * from users")

    .then(([users]) => {
      res.json(users); // use res.json instead of console.log
      res.sendStatus(200);
    })

    .catch((err) => {
      console.error(err);

      res.sendStatus(404);
    });
};

const getUsersById = (req, res) => {
  const id = parseInt(req.params.id);

  database

    .query("select * from users where id = ?", [id])

    .then(([users]) => {
      if (users[0] != null) {
        console.log(res.headers);
        res.json(users[0]);
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    })

    .catch((err) => {
      console.error(err);

      res.sendStatus(500);
    });
};

module.exports = {
  getUsers,
  getUsersById,
};

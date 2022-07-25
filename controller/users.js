const express = require("express");
const connection = require("../serverConfig");
const router = express.Router();
const crypto = require("crypto");

router.get("/users", (req, res) => {
  try {
    let query = `SELECT * FROM users`;
    connection.query(query, (error, result) => {
      if (error) {
        return res.json({
          errno: error.errno,
          message: error.message,
        });
      }

      res.json(result);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/users/:id", (req, res) => {
  try {
    let query = `SELECT * FROM users WHERE id_user = ?`;
    connection.query(query,[req.params.id], (error, result) => {
      if (error) {
        return res.json({
          errno: error.errno,
          message: error.message,
        });
      }

      res.json(result);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/users/pembeli", (req, res) => {
  try {
    let query = `SELECT * FROM users WHERE type = pembeli`;
    connection.query(query, (error, result) => {
      if (error) {
        return res.json({
          errno: error.errno,
          message: error.message,
        });
      }

      res.json(result);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/users/warung/:idWarung", (req, res) => {
  try {
    let query = `SELECT * FROM users WHERE id_warung = ?`;
    connection.query(query,[req.params.idWarung], (error, result) => {
      if (error) {
        return res.json({
          errno: error.errno,
          message: error.message,
        });
      }

      res.json(result);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/users/pembeli/:idPembeli", (req, res) => {
  try {
    let query = `SELECT * FROM users WHERE id_pembeli = ?`;
    connection.query(query,[req.params.idPembeli], (error, result) => {
      if (error) {
        return res.json({
          errno: error.errno,
          message: error.message,
        });
      }

      res.json(result);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/users/type/:type", (req, res) => {
  try {
    let query = `SELECT * FROM users WHERE type = ?`;
    connection.query(query,[req.params.type], (error, result) => {
      if (error) {
        return res.json({
          errno: error.errno,
          message: error.message,
        });
      }

      res.json(result);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    const data = req.body;
    if (data.password) {
      data.password = crypto
        .createHash("sha256")
        .update(req.body.password)
        .digest("hex");
    }
    let query = `INSERT INTO users VALUES (${data.id_user}, ${data.id_warung}, ${data.id_pembeli}, '${data.nama_warung}', '${data.nama}', '${data.no_identitas}', '${data.alamat}', '${data.no_hp}', '${data.foto_diri}', '${data.password}', '${data.type}')`;
    connection.query(query, (error, result) => {
      if (error) {
        return res.json(error);
      }

      res.json("Success");
    });
  } catch (error) {
    res.send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = crypto
        .createHash("sha256")
        .update(req.body.password)
        .digest("hex");
    }
    let query = `SELECT * FROM users WHERE no_hp = ? AND password = ?`;
    connection.query(query,[req.body.no_hp, req.body.password], (error, result) => {
      if (error) {
        return res.json(error);
      }
      if (result.length > 0) {
        return res.json(result);
      }
      throw new Error(res.status(400).json("Username Or Password Wrong"));
    });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;

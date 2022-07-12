const express = require('express');
const connection = require('../serverConfig');
const router = express.Router();
const crypto = require("crypto")

router.get('/users', (req, res) => {
    try {
        let query = `SELECT * FROM users`;
        connection.query(query, (error, result) => {
            if (error) {
                return res.json({
                    errno: error.errno,
                    message: error.message,
                })
            }

            res.json(result)
        })
    } catch (error) {
        res.status(500).send(error);
    }
})

router.post("/register", async(req, res) => {
    try {
        const data = req.body;
        if (data.password) {
            data.password = crypto.createHash("sha256").update(req.body.password).digest("hex");
        }
        let query = `INSERT INTO users VALUES ('${data.id_user}', '${data.id_warung}', '${data.id_pembeli}', '${data.nama_warung}', '${data.nama}', '${data.no_identitas}', '${data.alamat}','${data.foto_diri}', '${data.password}')`;
        connection.query(query, (error, result) => {
            if (error) {
                return res.json(error);
            }

            res.json("Success");
        })
    } catch (error) {
        res.send(error)
    }
})

module.exports = router;
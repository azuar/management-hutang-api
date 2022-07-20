const express = require('express');
const connection = require('../serverConfig');
const router = express.Router();

router.get('/hutang', (req, res) => {
    try {
        let query = `SELECT * FROM hutang`;
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

router.get('/hutang/:idPembeli', (req, res) => {
    try {
        let query = `SELECT * FROM hutang WHERE id_pembeli = ${req.params.idPembeli}`;
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

router.get('/hutang/:idWarung', (req, res) => {
    try {
        let query = `SELECT * FROM hutang WHERE id_warung = ${req.params.idWarung}`;
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

router.post("/tambahHutang", async (req, res) => {
    try {
        const data = req.body;
        let query = `INSERT INTO hutang VALUES (DEFAULT, ${data.id_warung}, ${data.id_pembeli}, ${data.tanggal}, ${data.data_hutang}, ${data.batas_pembayaran}, ${data.total_hutang})`;
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

router.post("/editHutang/:idHutang", async (req, res) => {
    try {
        const data = req.body;
        let query = `UPDATE hutang SET data_hutang = '${data.data_hutang}', batas_pembayaran  = '${data.batas_pembayaran}', total_hutang = '${data.total_hutang}' WHERE id_hutang = ${req.params.idHutang}`;
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

router.delete('/deleteHutang/:idHutang', async(req, res) => {
    try {
        let query = `DELETE FROM hutang where id_hutang = ${req.params.idHutang}`
        connection.query(query, (error, result) => {
            if (error) {
                return res.json({
                    errno: error.errno,
                    message: error.message,
                })
            }
            res.json('Deleted Successfully');
        })
    } catch (error) {
        res.json(error);
    }
})

module.exports = router;
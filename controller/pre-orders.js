const express = require('express');
const connection = require('../serverConfig');
const router = express.Router();

router.get('/preOrder', (req, res) => {
    try {
        let query = `SELECT * FROM pre_order`;
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

router.get('/preOrder/:idPembeli', (req, res) => {
    try {
        let query = `SELECT * FROM pre_order WHERE id_pembeli = ${req.params.idPembeli}`;
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

router.get('/preOrder/:idWarung', (req, res) => {
    try {
        let query = `SELECT * FROM pre_order WHERE id_warung = ${req.params.idWarung}`;
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

router.post("/tambahPreOrder", async (req, res) => {
    try {
        const data = req.body;
        let query = `INSERT INTO pre_order VALUES (DEFAULT, ${data.id_warung}, ${data.id_pembeli}, '${data.data_preorder}', '${data.tanggal}', '${data.status}'`;
        connection.query(query, (error, result) => {
            if (error) {
                throw new Error(error);
            }

            res.json("Success");
        })
    } catch (error) {
        res.send(error)
    }
})

router.post("/editHutang/:idPreOrder", async (req, res) => {
    try {
        const data = req.body;
        let query = `UPDATE hutang SET data_hutang = '${data.data_hutang}' WHERE id_preOrder = ${req.params.idPreOrder}`;
        connection.query(query, (error, result) => {
            if (error) {
                throw new Error(error);
            }

            res.json("Update Success");
        })
    } catch (error) {
        res.send(error)
    }
})

router.delete('/deletePreOrder/:idPreOrder', async(req, res) => {
    try {
        let query = `DELETE FROM pre_order where id_preOrder = ${req.params.idPreOrder}`
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
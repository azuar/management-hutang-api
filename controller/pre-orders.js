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

router.get('/preOrder/:id', (req, res) => {
    try {
        let query = `SELECT * FROM pre_order WHERE id_preOrder = ?`;
        connection.query(query,[req.params.id] , (error, result) => {
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

router.get('/preOrder/pembeli/:idPembeli', (req, res) => {
    try {
        let query = `SELECT * FROM pre_order WHERE id_pembeli = ?`;
        connection.query(query,[req.params.idPembeli], (error, result) => {
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

router.get('/preOrder/warung/:idWarung', (req, res) => {
    try {
        let query = `SELECT * FROM pre_order WHERE id_warung = ?`;
        connection.query(query,[req.params.idWarung], (error, result) => {
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
        let query = `INSERT INTO pre_order VALUES (DEFAULT, ${data.id_warung}, ${data.id_pembeli}, '${data.data_preorder}', '${data.tanggal}', '${data.status}')`;
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

router.put("/confirmPreorder/:idPreOrder", async (req, res) => {
    try {
        const data = req.body;
        let query = `UPDATE pre_order SET status = ? WHERE id_preOrder = ?`;
        connection.query(query,[data.status, req.params.idPreOrder],(error, result) => {
            if (error) {
                return res.json(error);
            }

            res.json("Update Success");
        })
    } catch (error) {
        res.send(error)
    }
})

router.delete('/deletePreOrder/:idPreOrder', async(req, res) => {
    try {
        let query = `DELETE FROM pre_order where id_preOrder = ?`
        connection.query(query,[req.params.idPreOrder], (error, result) => {
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
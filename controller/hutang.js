const express = require('express');
const connection = require('../serverConfig');
const router = express.Router();

router.get('/hutang/:id', (req, res) => {
    try {
        let query = `SELECT * FROM hutang WHERE id_hutang = ?`;
        connection.query(query,[req.params.id], (error, result) => {
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

router.get('/hutangItems/:id', (req, res) => {
    try {
        let query = `SELECT * FROM items_hutang WHERE id_hutang = ?`;
        connection.query(query,[req.params.id], (error, result) => {
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

router.get('/hutang/pembeli/:idPembeli', (req, res) => {
    try {
        let query = `SELECT * FROM hutang WHERE id_pembeli = ?`;
        connection.query(query, [req.params.idPembeli], (error, result) => {
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

router.get('/hutang/warung/:idWarung', (req, res) => {
    try {
        let query = `SELECT * FROM hutang WHERE id_warung = ?`;
        connection.query(query, [req.params.idWarung], (error, result) => {
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
        let query = `INSERT INTO hutang VALUES (${data.id_hutang}, ${data.id_warung}, ${data.id_pembeli},'${data.nama_pembeli}', '${data.tanggal}', '${data.batas_pembayaran}', ${data.total_hutang})`;
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

router.post("/tambahItemHutang", async (req, res) => {
    try {
        const data = req.body;
        let query = `INSERT INTO items_hutang VALUES (${data.id_item}, ${data.id_hutang}, '${data.item_hutang}', ${data.harga})`;
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
        let query = `UPDATE hutang SET batas_pembayaran  = ?, total_hutang = ? WHERE id_hutang = ?`;
        connection.query(query, [data.batas_pembayaran, data.total_hutang, req.params.idHutang], (error, result) => {
            if (error) {
                return res.json(error);
            }

            res.json("Success");
        })
    } catch (error) {
        res.send(error)
    }
})

router.delete('/deleteHutang/:idHutang', async (req, res) => {
    try {
        let query = `DELETE FROM hutang where id_hutang = ?`
        connection.query(query, [req.params.idHutang], (error, result) => {
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
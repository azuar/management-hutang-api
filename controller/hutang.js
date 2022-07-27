const express = require("express");
const connection = require("../serverConfig");
const router = express.Router();

router.get("/hutang/:id", (req, res) => {
  try {
    let query = `SELECT * FROM hutang WHERE id_hutang = ?`;
    connection.query(query, [req.params.id], (error, result) => {
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

router.get("/hutangItems/:id", (req, res) => {
  try {
    let query = `SELECT * FROM items_hutang WHERE id_hutang = ?`;
    connection.query(query, [req.params.id], (error, result) => {
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

router.get("/hutang/pembeli/:idPembeli", (req, res) => {
  try {
    let query = `SELECT * FROM hutang WHERE id_pembeli = ?`;
    connection.query(query, [req.params.idPembeli], (error, result) => {
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

router.get("/hutang/warung/:idWarung", (req, res) => {
  try {
    let query = `SELECT * FROM hutang WHERE id_warung = ?`;
    connection.query(query, [req.params.idWarung], (error, result) => {
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

router.post("/tambahHutang", async (req, res) => {
  try {
    const data = req.body;
    let query = `INSERT INTO hutang VALUES (${data.id_hutang}, ${data.id_warung}, ${data.id_pembeli},'${data.nama_pembeli}', '${data.tanggal}', '${data.batas_pembayaran}', ${data.total_hutang})`;
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

router.post("/tambahItemHutang", async (req, res) => {
  try {
    const data = req.body;
    let query = `INSERT INTO items_hutang VALUES (${data.id_item}, ${data.id_hutang}, '${data.item_hutang}', ${data.harga})`;
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

router.post("/editHutang/:idHutang", async (req, res) => {
  try {
    const data = req.body;
    let query = `UPDATE hutang SET batas_pembayaran  = ?, total_hutang = ? WHERE id_hutang = ?`;
    connection.query(
      query,
      [data.batas_pembayaran, data.total_hutang, req.params.idHutang],
      (error, result) => {
        if (error) {
          return res.json(error);
        }

        res.json("Success");
      }
    );
  } catch (error) {
    res.send(error);
  }
});

router.post("/editItemHutang/:idHutang", async (req, res) => {
  try {
    const data = req.body;
    let queryGet = `SELECT * FROM items_hutang WHERE item_hutang = ? AND id_hutang = ?`;
    const item = connection.query(
      queryGet,
      [data.item_hutang, data.id_hutang],
      (error, result) => {
        if (error) {
          return res.json({
            errno: error.errno,
            message: error.message,
          });
        }

        if (result.length > 0) {
          let queryUpdateItem = `UPDATE items_hutang SET item_hutang  = ?, harga = ? WHERE id_item = ?`;
          connection.query(
            queryUpdateItem,
            [data.item_hutang, data.harga, result[0].id_item],
            (error, result) => {
              if (error) {
                return res.json(error);
              }

              res.json("Success");
            }
          );
        } else {
          let queryAddItem = `INSERT INTO items_hutang VALUES (${data.id_item}, ${data.id_hutang}, '${data.item_hutang}', ${data.harga})`;
          connection.query(queryAddItem, (error, result) => {
            if (error) {
              return res.json(error);
            }

            res.json("Success");
          });
        }
      }
    );
  } catch (error) {
    res.send(error);
  }
});

router.delete("/deleteItemHutang/:idItem", async (req, res) => {
  try {
    let query = `DELETE FROM items_hutang where id_item = ?`;
    connection.query(query, [req.params.idItem], (error, result) => {
      if (error) {
        return res.json({
          errno: error.errno,
          message: error.message,
        });
      }
      res.json("Deleted Successfully");
    });
  } catch (error) {
    res.json(error);
  }
});
router.delete("/deleteHutang/:idhutang", async (req, res) => {
  try {
    let queryHutang = `DELETE FROM hutang where id_hutang = ?`;
    connection.query(queryHutang, [req.params.idhutang], (error, result) => {
      if (error) {
        return res.json({
          errno: error.errno,
          message: error.message,
        });
      }
      res.json("Deleted Successfully");
    });
  } catch (error) {
    res.json(error);
  }
});

router.delete("/deleteItemByIdHutang/:idhutang", async (req, res) => {
  try {
    let queryItemHutang = `DELETE FROM items_hutang where id_hutang = ?`;
    connection.query(
      queryItemHutang,
      [req.params.idhutang],
      (error, result) => {
        if (error) {
          return res.json({
            errno: error.errno,
            message: error.message,
          });
        }
        res.json("Deleted Successfully");
      }
    );
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;

import express from "express";
import pool from "../db/db.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const { cart_id, headers, row_data, quantity, item_id } = req.body;
    const result = await pool.query(
      `INSERT INTO cart_items (cart_id,headers,row_data,quantity,item_id)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *`,
      [cart_id, headers, row_data, quantity, item_id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

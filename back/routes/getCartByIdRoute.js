import express from "express";
import pool from "../db/db.js";

const router = express.Router();

router.get("/:cart_id", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM cart_items
      WHERE cart_id = $1
      ORDER BY added_at DESC`,
      [req.params.cart_id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

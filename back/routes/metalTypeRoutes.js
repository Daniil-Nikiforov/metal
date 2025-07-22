import express from "express";
import pool from "../db/db.js";

const router = express.Router();

router.get("/:type", async (req, res) => {
  try {
    const { type } = req.params;

    const { rows } = await pool.query(
      `SELECT * FROM metal
      WHERE main_type = $1
      ORDER BY id`,
      [type]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

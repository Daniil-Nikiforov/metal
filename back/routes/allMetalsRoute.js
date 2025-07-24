import express from "express";
import pool from "../db/db.js";

const router = express.Router();

router.get("/metals", async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM metal`);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

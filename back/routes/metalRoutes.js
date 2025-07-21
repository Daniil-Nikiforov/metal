import express from "express";
import pool from "../db/db.js";

const router = express.Router();

router.get("/:subType", async (req, res) => {
  try {
    const { subType } = req.params;

    const { rows } = await pool.query(
      `SELECT * FROM metal
      WHERE sub_type = $1
      ORDER BY name`,
      [subType]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

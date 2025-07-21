import express from "express";
import pool from "../db/db.js";

const router = express.Router();
//Поиск отдельного товара по url_slug
router.get("/:url", async (req, res) => {
  try {
    const { url } = req.params;

    const { rows } = await pool.query(
      `SELECT * FROM metal
      WHERE url_slug = $1`,
      [url]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

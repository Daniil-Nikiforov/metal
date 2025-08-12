import express from "express";
import pool from "../db/db.js";

const router = express.Router();

router.get("/bar", async (req, res) => {
  const { query } = req.query;
  const decodedQuery = decodeURIComponent(query);

  try {
    // const { rows } = await pool.query(
    //   `
    //   SELECT * FROM metal
    //   WHERE name ILIKE $1 OR html_content ILIKE $1
    //   ORDER BY name`,
    //   [`%${decodedQuery}%`]
    // );
    const { rows } = await pool.query(
      `
      SELECT * FROM metal
      WHERE name ILIKE $1`,
      [`%${query}%`]
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

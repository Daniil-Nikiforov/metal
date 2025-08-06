import express from "express";
import pool from "../db/db.js";

const router = express.Router();

router.delete("/:itemId", async (req, res) => {
  const { itemId } = req.params;
  try {
    const { rows } = await pool.query(
      `DELETE FROM cart_items
      WHERE item_id = $1
      `,
      [itemId]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});
export default router;

const router = require("express").Router();

router.post("/register", async (req, res) => {
  res.send("register route hit");
});

module.exports = router;

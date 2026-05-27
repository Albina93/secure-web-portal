const router = require("express").Router();
const Bookmark = require("../models/Bookmark");
const { authMiddleware } = require("../utils/auth");

router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({
      user: req.user.id,
    });
    res.json(bookmarks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching bookmarks" });
  }
});

router.post("/", async (req, res) => {
  // pull title, url, description from req.body
  try {
    const { title, url, description } = req.body;
    // validate title and url are present
    if (!title || !url) {
      return res.status(400).json({ message: "Title and url are required" });
    }
    // create bookmark
    const newBookmark = await Bookmark.create({
      title,
      url,
      description,
      user: req.user.id,
    });
    res.status(201).json(newBookmark);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error creating bookmark" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    // find the bookmark by id and user
    const bookmark = await Bookmark.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!bookmark) {
      return res.status(404).json({ message: "No bookmark was found" });
    }
    res.json(bookmark);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching bookmark" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, url, description } = req.body;

    const updated = await Bookmark.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, url, description },
      { new: true, runValidators: true },
    );
    if (!updated) {
      return res.status(404).json({ message: "Bookmark not found" });
    }
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error updating bookmark" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Bookmark.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!deleted) {
      return res.status(404).json({ message: "Bookmark not found" });
    }
    res.json({ message: "Bookmark deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error deleting bookmark" });
  }
});

module.exports = router;

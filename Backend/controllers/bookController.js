const Book = require("../models/Book");

exports.createCustomBook = async (req, res) => {
  try {
    const { isbn_13, title, author_s, description, coverImage } = req.body;

    if (!title || !author_s) {
      return res.status(400).json({ message: "Book Information is required." });
    }

    const newBook = new Book({
      isbn_13,
      title,
      author_s,
      description,
      coverImage,
    });

    await newBook.save();

    res.status(200).json(newBook);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating custom book in bookCotnroller", error });
  }
};

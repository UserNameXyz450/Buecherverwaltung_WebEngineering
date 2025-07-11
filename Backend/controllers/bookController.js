const Book = require('../models/Book');

exports.createCustomBook = async(req, res) => {
    try {
        const { title, author_s, description, coverImage } = req.body;

    if(!title || !authors ) {
        return res.status(400).json({message: 'Book Information is required.'});
    }

    const newBook = new Book({
        title, author_s, description, coverImage
    });

    await newBook.save();

    res.status(200).json(newBook);
    } catch (error) {
        res.status(500).json({message: 'ERror creating custom book in bookCotnroller', error});
    }
}
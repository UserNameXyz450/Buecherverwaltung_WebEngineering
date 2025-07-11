const User = require('../models/User');

exports.addBookToList = async(req, res) => {
    const { category } = req.params;
    const { bookId } = req.body;
    const userId = req.user._id;

    if(!['tbr', 'currentlyReading', 'read'].includes(category)) {
        return res.status(400).json({ message: 'faulty parameter url thing.'});
    }

    try {
        await User.findUserAndUpdateBooks(userId, {
            $addToSet: { [category ]: bookId}
        });
    } catch (error) {
        res.status(500).json({message: 'Finding User or/and updating book list failed..'})
    }
}

//Abschnitt KI-generiert
exports.getLibrary = async(req, res) => {
    try {
        const userLibrary = await User.findById(req.user._id)
        .populate('tbr')
        .populate('currentReading')
        .populate({
            path: 'read',
            populate: {
                path: 'book'
            }
        });

        if(!userLibrary) {
            return res.status(400).json({message: 'issue getting user library'});
        }

        res.status(200).json({
            tbr: userLibrary.tbr,
            currentlyReading: userLibrary.currentlyReading,
            read: userLibrary.read
        });
    } catch (error) {
        res.status(500).json({message: 'Error in libraryController', error});
    }
    
}
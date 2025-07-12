const User = require('../models/User');

exports.addBookToList = async(req, res) => {
    const { listName } = req.params;
    const bookObject = req.body.bookObject;

    const userId = req.user._id;

    if(!['tbr', 'currentlyReading'].includes(listName)) {
        return res.status(400).json({ message: 'faulty parameter url thing.'});
    }

    if (!bookObject) {
        return res.status(400).json({message: "No Book Object"});
    }

    try {
        console.log(bookObject);
        console.log(req.body);
        await User.findByIdAndUpdate(userId, {
            $addToSet: { [listName]: bookObject}
        });

        res.status(200).json({message: `Book added to ${listName}`});
    } catch (error) {
        console.error("Error in addBookToList:", error);
        res.status(500).json({message: 'Finding User or/and updating book list failed..'})
    }
}

//Abschnitt KI-generiert
exports.getLibrary = async(req, res) => {
    try {
        const userLibrary = await User.findById(req.user._id)
        .populate('tbr')
        .populate('currentlyReading')
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
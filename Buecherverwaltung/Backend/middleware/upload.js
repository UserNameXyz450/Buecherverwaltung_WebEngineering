//File-Upload nicht möglich mit reinem Übergeben von JSON. Google sagt multer im backend und axios im frontend nutzen
const multer = require('multer');
const path = require('path');

//KI-generiert
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + path.extname(file.originalname);
        cb(null, 'profilePic-' + uniqueSuffix);
    }
});

//ab hier nicht mehr

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Nur Bilder sind erlaubt (mit Dateityp Endung .jpg/.png)'), false);
    }
};

const upload = multer(
    {
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 5
        },
        fileFilter: fileFilter
    }
);

module.exports = upload;
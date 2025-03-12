const multer = require('multer');
const path = require('path')
const storage = multer.diskStorage({

    destination: (req, file, callback) => {

        console.log(req, file);
        callback(null, './pictures/profileImage')
    },
    filename: (req, file, callback) => {
        console.log(req, file);
        const fileName = `image-${Date.now()}-dp-${path.extname(file.originalname)}`
        callback(null, fileName)

    }
})

const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        callback(null, true)
    }
    else {
        callback(null, false)
        return callback(new Error("only image format allowed"), false)
    }

}

const multerUpdateProfileConfig = multer({ storage, fileFilter })
module.exports = multerUpdateProfileConfig

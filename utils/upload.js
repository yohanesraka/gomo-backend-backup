const multer = require('multer');
const { newError, errorHandler } = require('./errorHandler');

// Multer Config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __basedir + '/public/static/images/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + req.dataAuth.id_user +'-' + uniqueSuffix + '-' + file.originalname)
    }
  })
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(newError(400, 'File type not supported', 'Multer Config'), false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})

module.exports = upload;
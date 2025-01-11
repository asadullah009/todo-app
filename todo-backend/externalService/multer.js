'use strict'
const multer = require('multer')
const path = require('path')

// Function to check file type
function checkFileType(file, cb) {
  const types =
    /application\/(pdf|vnd\.openxmlformats-officedocument\.wordprocessingml\.document|vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet|vnd\.ms-excel)|text\/csv|image\/(jpeg|png|gif)/

  const mimetype = types.test(file.mimetype.toLowerCase())
  if (mimetype) {
    return cb(null, true)
  } else {
    cb(new Error('Wrong File Type'))
  }
}

// Storage configuration for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/')
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname)
    const filename = Date.now() + '-' + file.fieldname + extname // Include field name in filename
    // Store filenames in request object for each file
    if (!req.uploadedFileNames) req.uploadedFileNames = {}
    req.uploadedFileNames[file.fieldname] = filename
    cb(null, filename)
  }
})

// Multer configuration to accept both image and profileImage
const uploadFilesLocally = multer({
  storage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb)
  }
}).fields([
  { name: 'image', maxCount: 1 },
  { name: 'profileImage', maxCount: 1 }
])

// Middleware to handle file upload and pass filenames to next
const uploadMiddleware = (req, res, next) => {
  uploadFilesLocally(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message })
    }
    // Proceed to the next middleware
    next()
  })
}

module.exports = multer


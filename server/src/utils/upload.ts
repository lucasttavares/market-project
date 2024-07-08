import multer from 'multer';
import fs from 'fs';

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      if (!fs.existsSync('upload_file')) {
        fs.mkdirSync('upload_file');
      }
      callback(null, 'upload_file');
    },
    filename(req, file, callback) {
      const fileName = `${new Date()
        .toISOString()
        .trim()}_${file.originalname.trim()}`;
      return callback(null, fileName);
    },
  }),
});

export default upload;

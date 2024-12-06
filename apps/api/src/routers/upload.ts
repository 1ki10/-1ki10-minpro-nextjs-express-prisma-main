import { Router } from 'express';
import { uploadImage } from '../controllers/upload';
import path from 'path';

const router = Router();

// Route untuk upload file
router.post('/', uploadImage);

// Route untuk mengakses file yang sudah diupload
router.get('/:filename', (req, res) => {
  const { filename } = req.params;
  res.sendFile(path.join(__dirname, '../../public/uploads', filename));
});

export default router;
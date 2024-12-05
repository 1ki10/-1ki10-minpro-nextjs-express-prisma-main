import { Router } from 'express';
import { uploadImage } from '../controllers/upload';

const router = Router();

router.post('/', uploadImage);

export default router;
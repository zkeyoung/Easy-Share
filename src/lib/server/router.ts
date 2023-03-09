import express, { Request, Response } from 'express';
import File from '../../entity/file';
import { cache } from '../cache';

const router = express.Router();

router.get('/:fileId', async (req: Request, res: Response) => {
  const { fileId } = req.params;
  try {
    const file: File = cache.get(fileId);
    if (!file) return res.sendStatus(404);
    res.download(file.path, file.name, (err) => {
      if (err && !res.headersSent) res.json(`${file.name} download failed`);
    });
  } catch (err) {
    res.json(err.message);
  }
});

export default router;
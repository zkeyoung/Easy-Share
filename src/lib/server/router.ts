import express, { Request, Response } from 'express';
import fs from 'node:fs/promises';
import File from '../../entity/file';
import { cache } from '../cache';

const router = express.Router();

router.get('/:fileId', async (req: Request, res: Response) => {
  const { fileId } = req.params;
  try {
    const file: File = cache.get(fileId);
    if (!file) return res.sendStatus(404);
    const fileHandler = await fs.open(file.path, 'r');
    const readStream = fileHandler.createReadStream();
    readStream.on('end', () => {
      fileHandler.close();
    })
    res.attachment(file.name);
    readStream.pipe(res);
  } catch (err) {
    res.json(err.message);
  }
});

export default router;
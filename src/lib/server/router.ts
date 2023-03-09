import { Notification } from 'electron';
import express, { Request, Response } from 'express';
import { CacheKey, Language } from '../../constant';
import File from '../../entity/file';
import Settings from '../../entity/settings';
import { cache } from '../cache';

const router = express.Router();

router.get('/:fileId', async (req: Request, res: Response) => {
  const { fileId } = req.params;
  try {
    const file: File = cache.get(fileId);
    if (!file) return res.sendStatus(404);

    if (Notification.isSupported()) {
      const { language }: Settings = cache.get(CacheKey.SETTINGS);
      new Notification({
        title: 'Easy Share',
        body: `${file.name} ${language === Language.enUS ? 'is being downloaded...' : '正在被下载...'}`,
      }).show();;
    }

    res.download(file.path, file.name, (err) => {
      if (err && !res.headersSent) res.json(`${file.name} download failed`);
    });
  } catch (err) {
    res.json(err.message);
  }
});

export default router;
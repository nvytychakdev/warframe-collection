import { Router } from 'express';
import { getWarframes } from './warframes';

export const router = Router();

router.use('/', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

router.get('/warframes', getWarframes);

import { RequestHandler } from 'express';
import Items from 'warframe-items';

export const getWarframes: RequestHandler = async (req, res) => {
  const excalPrime = new Items({
    category: ['Warframes'],
    i18n: false,
    ignoreEnemies: true,
  }).filter(
    (item) => 'productCategory' in item && item.productCategory !== 'MechSuits',
  );
  res.json(excalPrime);
};

import express from 'express';
import fs from 'fs';
import path from 'path';

import * as stencil from '../../dist/hydrate';

export function createGenerator(indexHtml: string) {
  return async (req: express.Request, res: express.Response) => {
    const name = req.query.name;
    if (!name)
      throw new Error('name is required, e.g. generate?name=something');

    const destUrl = `/packages/${name}`;

    const renderedHtml = await stencil.renderToString(indexHtml, {
      url: destUrl,
      removeBooleanAttributeQuotes: true
    });

    const destDir = path.join(__dirname, '../../www/packages', name);
    const destFile = path.join(destDir, 'index.html');

    await fs.promises.mkdir(destDir, { recursive: true }).catch(console.log);
    await fs.promises.writeFile(destFile, renderedHtml.html);

    res.redirect(destUrl);
  };
}

import express from 'express';
import fs from 'fs';
import path from 'path';

import { createGenerator } from './createGenerator';

const app = express();
const port = 3333;

const indexHtml = fs.readFileSync(path.resolve('./src/app/index.html'), 'utf8');

async function run() {
  app
    .use('/generate', createGenerator(indexHtml))
    .use(express.static(path.join(__dirname, '../../www/')));

  app.listen(port, () =>
    console.log(`server started at http://localhost:${port}/`)
  );
}

run();

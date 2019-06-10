const { convertFile } = require('convert-svg-to-png');
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');

(async () => {
  await convertToPNG('icon', 512);

  await imagemin(['./www/assets/*.png'], './www/assets/', {
    plugins: [
      imageminPngquant()
    ]
  });
})();

async function convertToPNG(name, size) {
  await convertFile(`./src/app/assets/${name}.svg`, {
    width: size,
    height: size,
    outputFilePath: `./www/assets/${name}-${size}x${size}.png`
  });
}

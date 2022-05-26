const { createCanvas, loadImage, registerFont } = require('canvas');

export default async function imageFromText(text) {
  // width and height
  registerFont(`E:/projects/e-quran/public/fonts/quran3.ttf`, {
    family: 'Quran',
  });
  const image = await loadImage(
    `${process.env.NEXT_PUBLIC_PORT}quran/background.jpg`
  );
  const width = 280;
  const height = 180;
  const canvas = createCanvas(width, height);

  const context = canvas.getContext('2d');

  // Background color
  context.drawImage(image, 0, 0, width, height);

  context.font = 'bolder 62px Quran';
  context.textAlign = 'center';

  // Set text color
  context.fillStyle = '#022930';

  // Write "KindaCode.com"
  context.fillText(text, width / 2, height / 2);

  return canvas.toDataURL('image/png');
}

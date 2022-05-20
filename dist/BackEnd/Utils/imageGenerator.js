"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { createCanvas, loadImage, registerFont } = require('canvas');
async function imageFromText(text) {
    // width and height
    registerFont(`E:/projects/e-quran/public/fonts/quran3.ttf`, {
        family: 'Quran',
    });
    const image = await loadImage(`${process.env.NEXT_PUBLIC_PORT}quran/background.jpg`);
    const width = 180;
    const height = 100;
    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');
    // Background color
    context.drawImage(image, 0, 0, width, height);
    context.font = 'bolder 144px Quran';
    context.textAlign = 'center';
    // Set text color
    context.fillStyle = '#022930';
    // Write "KindaCode.com"
    context.fillText(text, width / 2, height / 2);
    return canvas.toDataURL('image/png');
}
exports.default = imageFromText;

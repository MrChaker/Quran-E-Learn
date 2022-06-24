const imageDrawer = async (canvasRef: HTMLCanvasElement, text?: string) => {
  const width = 280;
  const height = 180;
  const canvas = canvasRef;
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');

  const image = await loadImage(
    `${process.env.NEXT_PUBLIC_PORT}quran/background.jpg`
  );
  context?.drawImage(image, 0, 0, width, height);

  if (context != undefined) {
    context.font = 'bolder 82px othmani';
    context.textAlign = 'center';
    context.translate(0, 20);
    context.fillStyle = '#022930';
  }

  context?.fillText(text ?? '', width / 2, height / 2);

  return canvas.toDataURL('image/png');
};

function loadImage(path: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    function cleanup() {
      image.onload = null;
      image.onerror = null;
    }

    image.onload = () => {
      cleanup();
      resolve(image);
    };
    image.onerror = (err) => {
      cleanup();
      reject(err);
    };

    image.src = path;
  });
}

export default imageDrawer;

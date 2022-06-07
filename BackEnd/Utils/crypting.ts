export const crypt = (string: string, key?: string) => {
  if (!string) return '';
  let i = 0;
  let crypted: string = '';
  while (i < string.length) {
    crypted += String.fromCharCode(
      string.charCodeAt(i) + (key ? key.charCodeAt(i % key.length) % 26 : 0)
    );
    i++;
  }
  return crypted;
};

export const deCrypt = (string: string, key?: string) => {
  if (!string) return '';

  let i = 0;
  let text: string = '';
  while (i < string.length) {
    text += String.fromCharCode(
      string.charCodeAt(i) - (key ? key.charCodeAt(i % key.length) % 26 : 0)
    );
    i++;
  }
  return text;
};

import { crypt, deCrypt } from '../BackEnd/Utils/crypting';

describe('crypting functions', () => {
  it('crypt', () => {
    let message = 'chaker15669';
    let crypted = crypt(message, '');
    let text = deCrypt(crypted, '');
    expect(text).toEqual(message);
  });
});

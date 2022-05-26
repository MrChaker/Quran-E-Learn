import {
  findAllByLabelText,
  fireEvent,
  getByTestId,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import { CheckPass, dataIsValid } from '../FrontEnd/components/auth/functions';

describe('login form validations', () => {
  let inputMock: HTMLInputElement;
  let inputMock2: HTMLInputElement;
  let inputMock3: HTMLInputElement;
  let inputMock4: HTMLInputElement;

  let labelMock: HTMLLabelElement;
  beforeAll(() => {
    inputMock = document.createElement('input');
    inputMock.value = '12345678';
    inputMock2 = document.createElement('input');
    inputMock3 = document.createElement('input');
    inputMock4 = document.createElement('input');

    labelMock = document.createElement('label');
  });
  /* it('test password confirmation err', () => {
    for (let i = 1; i < 20; i++) {
      inputMock2.value = `${inputMock2.value}${i}`;
      //CheckPass sees if two inputs have same value if not it sets the given errLabel text to err message
      CheckPass(inputMock, { input: inputMock2, errLabel: labelMock });
      expect(labelMock.innerText).toBe<string>(
        inputMock.value == inputMock2.value ? ' كلمتي السّر غير متشابهتين ' : ''
      );
    }
  }); */

  it('valide', () => {
    inputMock.value = 'chak@gmail.com';
    inputMock2.value = 'chak@gmail.com';

    const b = dataIsValid(
      [],
      [
        {
          input: inputMock,
          errLabel: labelMock,
          errMessage: 'errorr',
          options: {
            validation: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          },
        },
        {
          input: inputMock2,
          errLabel: labelMock,
          errMessage: 'errorr',
          options: {
            validation: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          },
        },
      ]
    );
    expect(b).toBe<boolean>(true);
  });

  it('email validation', () => {
    const cases: { case: string; validity: boolean }[] = [
      { case: '', validity: true },
      { case: '12@gmail.com', validity: true },
      { case: 'name@gmail.com', validity: true },
      { case: 'faac', validity: false },
    ];
    for (let i = 0; i < cases.length; i++) {
      labelMock.innerText = '';
      inputMock.value = cases[i].case;
      const b = dataIsValid(
        [],
        [
          {
            input: inputMock,
            errLabel: labelMock,
            errMessage: 'errorr',
            options: {
              validation: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            },
          },
        ]
      );
      expect(labelMock.innerText).toBe<string>(
        cases[i].validity ? '' : 'errorr'
      );
    }
  });
});

import Swal from 'sweetalert2';
import { ReturnType } from '../../../BackEnd/Utils/authErrors';
import { crypt } from '../../../BackEnd/Utils/crypting';
import { InputWithError, SignEvent } from './types';

type DataToPost = {
  name?: string;
  email: string;
  password: string;
  phone?: string;
  sex?: string;
};
export const emailSign = async (
  e: SignEvent,
  validated: boolean,
  dataToPost: DataToPost,
  API_URL: string,
  confirmation: HTMLDivElement | null,
  errLabels?: HTMLLabelElement[],
  failLogLabel?: HTMLLabelElement
) => {
  e.preventDefault();
  if (confirmation) confirmation.style.display = 'none';
  console.log(validated);
  if (validated) {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToPost),
    });

    const result = await res.json();
    if (result.err) {
      Swal.fire('لقد حدث خطأ ، حاول مرة اخرى');
    }
    result.SignErrors?.forEach((Serr: ReturnType) => {
      if (errLabels)
        switch (Serr.field) {
          case 'Email':
            errLabels[0].innerText = Serr.message;
            break;
          case 'Name':
            errLabels[1].innerText = Serr.message;
            break;
          case 'Phone':
            errLabels[2].innerText = Serr.message;
            break;
        }
    });
    if (result.LogError && failLogLabel) {
      failLogLabel.innerText = result.LogError;
    }
    if (result.success) {
      if (!result.confirmed && confirmation) {
        confirmation.style.display = 'block';
      } else {
        localStorage.setItem(
          'currentUser',
          crypt(
            `{"info": {}, "isAuthenticated": true}`,
            process.env.NEXT_PUBLIC_CRYPT
          )
        );
        location.assign(result.isAdmin ? '/admin' : '/dashboard');
      }
    }
  }
};

export const CheckPass = (
  password: HTMLInputElement,
  passwordToConfirm: InputWithError
) => {
  if (passwordToConfirm.input.value != password.value) {
    passwordToConfirm.errLabel.innerText = ' كلمتي السّر غير متشابهتين ';
    return false;
  } else {
    passwordToConfirm.errLabel.innerText = '';
    return true;
  }
};

export const CheckLength = (password: InputWithError) => {
  if (password.input.value.length < 8) {
    if (password.input.value.length == 0) {
      password.errLabel.innerText = 'ادخل كلمة السّر  ';
    } else {
      password.errLabel.innerText = ' كلمة السّر قصيرة ';
    }
    return false;
  } else {
    password.errLabel.innerText = '';
    return true;
  }
};

export const dataIsValid = (
  requiredInputs?: InputWithError[],
  validInputs?: InputWithError[]
) => {
  let b = true;
  requiredInputs?.forEach((RI) => {
    if (RI.input.value == '') {
      RI.errLabel.innerText = RI.errMessage || 'املئ هذه الخانة ';
      b = false;
    } else {
      RI.errLabel.innerText = '';
    }
  });
  validInputs?.forEach((VI) => {
    if (!VI.options?.validation.test(VI.input.value)) {
      if (VI.input.value != '')
        VI.errLabel.innerText = VI.errMessage || 'error';
      b = false;
    } else {
      VI.errLabel.innerText = '';
    }
  });

  return b;
};

export const logout = (): void => {
  localStorage.setItem(
    'currentUser',
    crypt(
      '{ "info": null, "isAuthenticated": false}',
      process.env.NEXT_PUBLIC_CRYPT
    )
  );
  location.assign('/auth/logout');
};

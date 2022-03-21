import { MutableRefObject } from "react";
import Swal from "sweetalert2";
import { InputWithError, SignEvent } from "./types";


type DataToPost = {
  name?: string,
  email: string,
  password: string,
  sex?: string
}
export const emailSign = async (e: SignEvent, validated: boolean, dataToPost: DataToPost, emailLabel: HTMLLabelElement, API_URL: string )=>{
  e.preventDefault();
  if( validated ){
      const res = await fetch(API_URL, {
          method : "POST",
          headers:{
               'Content-Type' : 'application/json'
          },
          body : JSON.stringify(dataToPost)
      });

      const result = await res.json();
      if ( result.err ) { Swal.fire('لقد حدث خطأ ، حاول مرة اخرى') }
      emailLabel.innerText = result.emailErr || '';
      if ( result.success ){
          location.assign('/')
      }
  }else{

  }
}

export const CheckPass = ( password: HTMLInputElement ,passwordToConfirm: InputWithError )=>{
  if (passwordToConfirm.input.value != password.value ){
    passwordToConfirm.errLabel.innerText = ' كلمتي السّر غير متشابهتين '
    return false
  }else{
    passwordToConfirm.errLabel.innerText = ''
    return true
  }
}

export const CheckLength = (password: InputWithError)=>{
    if ( password.input.value.length < 8 ){
        if ( password.input.value.length == 0 ){
            password.errLabel.innerText = 'ادخل كلمة السّر  '
        }else{
            password.errLabel.innerText = ' كلمة السّر قصيرة '
        }
        return false
    }else{
        password.errLabel.innerText = '';
        return true
    }
}



export const dataIsValid = ( requiredInputs?: InputWithError[], validInputs?: InputWithError[] )=>{
    let b = true ;
    requiredInputs?.forEach((RI)=>{
      if ( RI.input.value == '' ){
        RI.errLabel.innerText = RI.errMessage || 'error' ;
        b = false
      }else{
        RI.errLabel.innerText = '' ;
        b = true
      }
    })
    validInputs?.forEach((VI)=>{
      if ( !VI.options?.validation.test(VI.input.value) ){
        VI.errLabel.innerText = VI.errMessage || 'error';
        b = false 
      }else{
        VI.errLabel.innerText = '' ;
        b = true
      }
    })
    
    return b
}
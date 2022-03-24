
import { findAllByLabelText, fireEvent, getByTestId, render, screen, waitFor } from '@testing-library/react'

import { CheckPass } from "../FrontEnd/components/auth/functions"

describe('Header',  () => {
  
    let inputMock: HTMLInputElement ;
    let inputMock2: HTMLInputElement ;

    let labelMock: HTMLLabelElement ;
    beforeAll(()=>{
      inputMock = document.createElement('input');
      inputMock.value = "12345678"
      inputMock2 = document.createElement('input');
      labelMock = document.createElement('label');
      
    })
    it('renders a heading', async () => {
      for( let i = 1 ; i < 20; i++){
          inputMock2.value = `${inputMock2.value}${i}`
          CheckPass(inputMock, { input: inputMock2, errLabel: labelMock });
          if( inputMock.value == inputMock2.value){
            expect(labelMock.innerText).toBe<string>('')
          }else{
            expect(labelMock.innerText).toBe<string>(' كلمتي السّر غير متشابهتين ')
          }
      }
      
    })
})
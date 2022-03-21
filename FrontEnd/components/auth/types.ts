export type InputWithError = {
  input: HTMLInputElement,
  errLabel: HTMLLabelElement,
  errMessage?: string,
  options?:{
    validation: RegExp
  }
}

export interface SignEvent extends Event{
  target: SignEventTarget;
}

export interface SignEventTarget extends EventTarget{
  Name?: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
  sex?: HTMLInputElement
}
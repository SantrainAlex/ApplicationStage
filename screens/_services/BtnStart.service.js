import { Subject } from "rxjs";

const subject = new Subject();

export const BtnStartService = {
  sendBtnStart: (message) => subject.next({ text: message }),
  clearBtnStart: () => subject.next(),
  getBtnStart: () => subject.asObservable(),
};

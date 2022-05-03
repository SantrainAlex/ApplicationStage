import { Subject } from "rxjs";

const subject = new Subject();

export const startService = {
  sendstart: (message) => subject.next({ text: message }),
  clearstart: () => subject.next(),
  getstart: () => subject.asObservable(),
};

import { Subject } from "rxjs";

const subject = new Subject();

export const stopService = {
  sendstop: (message) => subject.next({ text: message }),
  clearstop: () => subject.next(),
  getstop: () => subject.asObservable(),
};

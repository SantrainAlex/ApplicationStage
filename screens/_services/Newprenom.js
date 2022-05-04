import { Subject } from "rxjs";

const subject = new Subject();

export const NewPrenomSelectService = {
  sendNewPrenomSelectService: (message) => subject.next({ Nom: message }),
  clearNewPrenomSelectService: () => subject.next(),
  getNewPrenomSelectService: () => subject.asObservable(),
};

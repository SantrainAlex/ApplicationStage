import { Subject } from "rxjs";

const subject = new Subject();

export const NomSelectService = {
  sendNomSelectService: (message) => subject.next({ Nom: message }),
  clearNomSelectService: () => subject.next(),
  getNomSelectService: () => subject.asObservable(),
};

import { Subject } from "rxjs";

const subject = new Subject();

export const NomAjtSelectService = {
  sendNomAjtSelectService: (message) => subject.next({ Nom: message }),
  clearNomAjtSelectService: () => subject.next(),
  getNomAjtSelectService: () => subject.asObservable(),
};

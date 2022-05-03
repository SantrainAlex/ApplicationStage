import { Subject } from "rxjs";

const subject = new Subject();

export const NbrTourSelectService = {
  sendNbrTourKmSelectService: (message) => subject.next({ km: message }),
  clearNbrTourSelectService: () => subject.next(),
  getNbrTourSelectService: () => subject.asObservable(),
};

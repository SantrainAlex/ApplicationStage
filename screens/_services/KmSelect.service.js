import { Subject } from "rxjs";

const subject = new Subject();

export const KmSelectService = {
  sendKmSelectService: (message) => subject.next({ km: message }),
  clearKmSelectService: () => subject.next(),
  getKmSelectService: () => subject.asObservable(),
};

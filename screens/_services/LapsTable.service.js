import { Subject } from "rxjs";

const subject = new Subject();

export const LapsTableService = {
  sendLapsTableService: (laps, timer) =>
    subject.next({ Number: laps, Number: timer }),
  clearLapsTableService: () => subject.next(),
  getLapsTableService: () => subject.asObservable(),
};

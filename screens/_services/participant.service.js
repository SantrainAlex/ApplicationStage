import { Subject } from "rxjs";

const subject = new Subject();

export const participantService = {
  sendparticipant: (message) => subject.next({ text: message }),
  clearparticipant: () => subject.next(),
  getparticipant: () => subject.asObservable(),
};

export class Note {
  constructor(public title: string, public text: string) {}
}
export interface Note {
  id: number;
  title: string;
  text: string;
}

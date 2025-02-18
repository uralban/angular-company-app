import {BehaviorSubject} from "rxjs";

export class ObservableList<T> {

  private list:T[];
  readonly subject: BehaviorSubject<T[]>;

  constructor(list: T[]) {
    this.list = list;
    this.subject = new BehaviorSubject(this.list);
  }
  public get() {
    return this.subject;
  }

  public add(item: T) {
    this.list.push(item);
    debugger;
    this.subject.next(this.list);
  }

  public push(items: T[]) {
    this.list.push(...items);
    this.subject.next(this.list);
  }

  public replaceAll(list: T[]) {
    this.list = [... list];
    this.subject.next(this.list);
  }
}

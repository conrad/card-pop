import { observable } from 'mobx';

export class PlaidLinkModel {

  readonly id: number;
  @observable public env: string;
  @observable public clientKey: boolean;
  @observable public publicKey: string;
  @observable public accessToken: string;

  constructor(text: string, completed: boolean = false) {
    this.id = TodoModel.generateId();
    this.env = env;
    this.publicKey = publicKey;
    this.accessToken = accessToken;
  };

  static nextId = 1;
  static generateId() {
    return this.nextId++;
  }
}

export default TodoModel;

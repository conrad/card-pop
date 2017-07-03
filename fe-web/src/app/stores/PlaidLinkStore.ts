import { observable, computed, action } from 'mobx';
import { PlaidLinkModel } from '../models';

export class PlaidLinkStore {

  constructor(publicKey: string) {
    this.publicKey = publicKey;
    this.setPublicToken = this.setPublicToken.bind(this);
    // this.deleteTodo = this.deleteTodo.bind(this);
    // this.editTodo = this.editTodo.bind(this);
    // this.completeAll = this.completeAll.bind(this);
    // this.clearCompleted = this.clearCompleted.bind(this);
  }

  @observable
  public publicKey: string;

  @action
  setPublicKey(publicKey: string): void {
    this.publicToken = publicToken;
  }
  
  @action
  setPublicToken(publicToken: string): void {
    this.publicToken = publicToken;
  }

  @computed

}

export default PlaidLinkStore;

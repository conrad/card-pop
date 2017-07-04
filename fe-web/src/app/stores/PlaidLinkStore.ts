import { observable, computed, action } from 'mobx';

export class PlaidLinkStore {

  constructor(publicKey: string, env: string) {
    this.publicKey = publicKey;
    this.env = env;
    this.publicToken = '';
    this.setPublicKey = this.setPublicKey.bind(this);
    this.setPublicToken = this.setPublicToken.bind(this);
  }

  @observable
  public publicKey: string;

  @observable
  public publicToken: string;

  @observable
  public env: string;

  @action
  setPublicKey(publicKey: string): void {
    this.publicKey = publicKey;
  }

  @action
  setPublicToken(publicToken: string): void {
    this.publicToken = publicToken;
  }
}

export default PlaidLinkStore;

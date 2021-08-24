import LockConnector from '../src/connector';

export default class Connector extends LockConnector {
  async connect() {
    let provider;
    if (window['kardiachain']) {
      provider = window['kardiachain'];
      try {
        await window['kardiachain'].enable();
      } catch (e) {
        console.error(e);
        if (e.code === 4001) return;
      }
    } else if (window['web3']) {
      provider = window['web3'].currentProvider;
    }
    return provider;
  }

  async isLoggedIn() {
    if (!window['kardiachain']) return false;
    if (window['kardiachain'].selectedAddress) return true;
    await new Promise((r) => setTimeout(r, 400));
    return !!window['kardiachain'].selectedAddress;
  }
}

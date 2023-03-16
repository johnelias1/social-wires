const GENTLY_KEY_PREFIX = '@Gently:';
const gentlyStorage: Storage = window.sessionStorage;

export class SessionStorageModel {
  // the promise returned from sync function
  static syncPromise = null;

  // set item with the key
  static setItem(
    key: string,
    value: string,
    isGently: boolean = false
  ): string {
    gentlyStorage.setItem(isGently ? GENTLY_KEY_PREFIX + key : key, value);
    return gentlyStorage.getItem(key) || '';
  }

  // get item with the key
  static getItem(key: string, isGently: boolean = false): string {
    return (
      gentlyStorage.getItem(isGently ? GENTLY_KEY_PREFIX + key : key) || ''
    );
  }

  // remove item with the key
  static removeItem(key: string, isGently: boolean = false): void {
    gentlyStorage.removeItem(isGently ? GENTLY_KEY_PREFIX + key : key);
  }

  // clear out the storage
  static clear(): void {
    gentlyStorage.clear();
  }
  // If the storage operations are async(i.e AsyncStorage)
  // Then you need to sync those items into the memory in this method
  //static sync(): Promise<void> {
  // if (!MyStorage.syncPromise) {
  //   MyStorage.syncPromise = new Promise((res, rej) => {});
  // }
  // return MyStorage.syncPromise;
  //}
}

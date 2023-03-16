const MYSTORAGE_KEY_PREFIX = '@Gently:';
//let dataMemory = {};
const myStorage: Storage = window.sessionStorage;

export class MyStorage {
  // the promise returned from sync function
  static syncPromise = null;
  // set item with the key
  static setItem(key: string, value: string) {
    myStorage.setItem(MYSTORAGE_KEY_PREFIX + key, value);
    //dataMemory[key] = value;
    //return dataMemory[key];
  }
  // get item with the key
  static getItem(key: string): string {
    /*const keys = Object.getOwnPropertyNames(myStorage);
    let found = keys.filter(value => {
      return value.indexOf(key);
    });
    if (!keys.length) return undefined;
    return Object.prototype.hasOwnProperty.call(dataMemory, found[0]) ? dataMemory[found[0]] : undefined;*/
    let response = null;
    for (let index = 0; index < myStorage.length; index++) {
      const name = myStorage.key(index);
      if (name?.indexOf(key) != -1) {
        response = myStorage.getItem(name || '');
      }
    }
    return response || '';
  }

  /*static test() {
    return myStorage;
  }*/

  // remove item with the key
  static removeItem(key: string): void {
    myStorage.removeItem(MYSTORAGE_KEY_PREFIX + key);
    //delete dataMemory[key];
  }

  // clear out the storage
  static clear(): void {
    myStorage.clear();
  }
  // If the storage operations are async(i.e AsyncStorage)
  // Then you need to sync those items into the memory in this method
  /*static sync(): Promise<void> {
    if (!MyStorage.syncPromise) {
      MyStorage.syncPromise = new Promise((res, rej) => {
        try {
          for (let index = 0; index < myStorage.length; index++) {
            const key = myStorage.key(index);
            if (key.startsWith(MYSTORAGE_KEY_PREFIX)) {
              const value = myStorage.getItem(key);
              myStorage
            }
          }
          res('');
        } catch (error) {
          rej(error)
        }


        myStorage.getAllKeys((errKeys, keys) => {
          if (errKeys) rej(errKeys);
          const memoryKeys = keys.filter((key) => key.startsWith(MYSTORAGE_KEY_PREFIX));
          myStorage.multiGet(memoryKeys, (err, stores) => {
            if (err) rej(err);
            stores.map((result, index, store) => {
              const key = store[index][0];
              const value = store[index][1];
              const memoryKey = key.replace(MYSTORAGE_KEY_PREFIX, '');
              dataMemory[memoryKey] = value;
            });
            res('');
          });
        });
      });
    }
    return MyStorage.syncPromise;
  }*/
}

import AsyncStorage, {
  AsyncStorageStatic,
} from "@react-native-async-storage/async-storage";

class CustomStorage {
  private _storage: AsyncStorageStatic;

  constructor() {
    this._storage = AsyncStorage;
  }

  async getItem(key: string): Promise<string | null> {
    console.log(key)
    return await this._storage.getItem(key);
  }

  async setItem(key: string, value: string) {
    await this._storage.setItem(key, value);
  }

  async removeItem(key: string) {
    await this._storage.removeItem(key);
  }
}

export default new CustomStorage();

export * from "./db/init";
export * from "./db/users";
export * from "./db/projects";

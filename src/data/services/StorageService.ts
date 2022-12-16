const BaseStorage = {
    get<T>(storage: Storage, key: string, defaultValue: T): T | string {
        const value = storage.getItem(key);
        if (value === null) {
            return defaultValue;
        }

        try {
            return JSON.parse(value);
        } catch (error) {
            return value;
        }
    },
    set<T>(storage: Storage, key: string, value: T) {
        if (typeof value !== 'string') {
            storage.setItem(key, JSON.stringify(value));
        } else {
            storage.setItem(key, value);
        }
    },
    clear(storage: Storage, key: string) {
        storage.removeItem(key);
    },
    clearAll(storage: Storage) {
        storage.clear();
    },
};

export const LocalStorage = {
    get<T>(key: string, defaultValue: T): T | string {
        return BaseStorage.get<T>(localStorage, key, defaultValue);
    },
    set<T>(key: string, value: T) {
        BaseStorage.set<T>(localStorage, key, value);
    },
    clear(key: string) {
        BaseStorage.clear(localStorage, key);
    },
    clearAll() {
        BaseStorage.clearAll(localStorage);
    },
};

export const SessionStorage = {
    get<T>(key: string, defaultValue: T): T | string {
        return BaseStorage.get<T>(sessionStorage, key, defaultValue);
    },
    set<T>(key: string, value: T) {
        BaseStorage.set<T>(sessionStorage, key, value);
    },
    clear(key: string) {
        BaseStorage.clear(sessionStorage, key);
    },
    clearAll() {
        BaseStorage.clearAll(sessionStorage);
    },
};

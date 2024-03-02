import AsyncStorage from "@react-native-async-storage/async-storage";

export enum AsyncStorageKeys {
    authToken = "authToken",
    userId = "userId"
}

export const userData = {
    userID: ''
}


export const saveValue = async (key: AsyncStorageKeys, value: any) => {
    try {
        const jsonValue = JSON.stringify(value);

        await AsyncStorage.setItem(key.toString(), jsonValue);

    } catch (e) {
        console.log(e);
    }
};


export const getValue = async (key: AsyncStorageKeys) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : undefined;
    } catch (e) {
        console.log(e);
    }
};


export const removeValue = async (key: AsyncStorageKeys) => {
    try {
        const jsonValue = await AsyncStorage.removeItem(key);
    } catch (e) {
        console.log(e);
    }
};

export const removeAll = async () => {
    try {
        const jsonValue = await AsyncStorage.clear();
    } catch (e) {
        console.log(e);
    }
};

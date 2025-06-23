import AsyncStorage from '@react-native-async-storage/async-storage';
const AUTH_KEY = 'auth_token';

export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem(AUTH_KEY, token);
  } catch (e) {
    console.error('Error saving token', e);
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(AUTH_KEY);
  } catch (e) {
    console.error('Error getting token', e);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(AUTH_KEY);
  } catch (e) {
    console.error('Error removing token', e);
  }
};

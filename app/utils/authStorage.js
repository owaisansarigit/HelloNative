// utils/authStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_KEY = 'auth_token';

// ✅ Save token
export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem(AUTH_KEY, token);
  } catch (e) {
    console.error('Error saving token', e);
  }
};

// ✅ Get token
export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(AUTH_KEY);
  } catch (e) {
    console.error('Error getting token', e);
    return null;
  }
};

// ✅ Remove token (logout)
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(AUTH_KEY);
  } catch (e) {
    console.error('Error removing token', e);
  }
};

import { useLocalStorage } from '@vueuse/core';

const ACCESS_TOKEN_KEY = 'access_token';

const accessToken = useLocalStorage(ACCESS_TOKEN_KEY, '');

export const getAccessToken = () => accessToken.value;

export const setAccessToken = (token: string) => {
  accessToken.value = token;
};

export const clearAccessToken = () => {
  accessToken.value = '';
};

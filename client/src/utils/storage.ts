import {
    LOCAL_ACCESS_KEY,
    LOCAL_REFRESH_KEY
  } from './constants';

export const setAccessToken = (value: string) => localStorage.setItem(LOCAL_ACCESS_KEY, value)
export const getAccessToken = () => localStorage.getItem(LOCAL_ACCESS_KEY)
export const setRefreshToken = (value: string) => localStorage.setItem(LOCAL_REFRESH_KEY, value)
export const getRefreshToken = () => localStorage.getItem(LOCAL_REFRESH_KEY)
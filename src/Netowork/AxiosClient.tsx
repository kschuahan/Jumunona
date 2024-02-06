import axios, {AxiosInstance} from 'axios';
import {BASE_URL} from './Constants';
import {localEnum} from './ApiEnum';

var instance: AxiosInstance;
export const axiosClient = (authToken: string | undefined) => {
  if (instance == null) {
    instance = axios.create({
      baseURL: BASE_URL(localEnum.development),
    });
  }
  instance.defaults.headers.post['Content-Type'] = 'application/json';
  if (authToken !== '') {
    instance.defaults.headers.common.Authorization = 'Bearer ' + authToken;
  }

  console.log('headers------------', instance.defaults.headers);

  return instance;
};

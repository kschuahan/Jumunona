import axios from "axios"
import { apiErrorHandling, apiSucessErrorHandling } from "./ApiErrorHandling"
import { axiosClient } from "./AxiosClient"

import { Alert, Platform } from "react-native"
import { AsyncStorageKeys, getValue } from "../utils/AsyncStorage"
import { FileModal } from "../utils/FileUpload"


// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjIzYWQ0MmExYWZmYjIyZTU1NjAyNiIsImlhdCI6MTcwNjE4MzIwMSwiZXhwIjoxNzA4Nzc1MjAxfQ.AjJCJKGKqt2ZtjldKb0QGg8CaNJaakYxIMcYz7DB3Qc'

export const getAPICall = async (endPoint: any, onResponse: any,
  item: any = undefined, authToken = true) => {

    const token = await getValue(AsyncStorageKeys.authToken)
    // console.log("token", token)
  await axiosClient(authToken ? token : undefined).get(endPoint, { params: item })
    .then((response: any) => {

      apiSucessErrorHandling(response, (isSuccess: boolean) => {
        // console.log("suc", isSuccess, response.data);
        onResponse({ isSuccess: isSuccess, data: isSuccess ? response.data : response.message })
      })
    }).catch((error: any) => {
      apiErrorHandling(error, ((message: any) => {
        console.log("suc", error.message);
        onResponse({ isSuccess: false, data: message })
      }))
    })
}

export const postAPICall = async (item: any, endPoint: any, authToken = true, onResponse: any) => {

  // let token = await getValue(AsyncStorageKeys.authToken)
   const token = await getValue(AsyncStorageKeys.authToken)
   console.log("token", token)
  await axiosClient(authToken ? token : undefined).post(endPoint, item).then((response: any) => {
    console.log("ffffff", response);
    apiSucessErrorHandling(response, (isSuccess: boolean) => {
      console.log("suc", isSuccess, response.data);
      onResponse({ isSuccess: isSuccess, data: isSuccess ? response.data : response.data.message ? response.data.message : response.data })
    })
  }).catch((error: any) => {
    apiErrorHandling(error, ((message: any) => {
      console.log("suc error", error.message);
      onResponse({ success: false, data: message })
    }))
  })
}

export const putAPICall = async (item: any, endPoint: any, authToken = true, onResponse: any) => {

  // let token = await getValue(AsyncStorageKeys.authToken)
   const token = await getValue(AsyncStorageKeys.authToken)
   console.log("token", token)
  await axiosClient(authToken ? token : undefined).put(endPoint, item).then((response: any) => {
    console.log("ffffff", response);
    apiSucessErrorHandling(response, (isSuccess: boolean) => {
      console.log("suc", isSuccess, response.data);
      onResponse({ isSuccess: isSuccess, data: isSuccess ? response.data : response.data.message ? response.data.message : response.data })
    })
  }).catch((error: any) => {
    apiErrorHandling(error, ((message: any) => {
      console.log("suc error", error.message);
      onResponse({ success: false, data: message })
    }))
  })
}

export const postMultipartData = async (file: FileModal, item: any, endPoint: any, authToken = true, onResponse) => {

  let token = await getValue(AsyncStorageKeys.authToken)

  let formData = createFormData(file, item)


  await axiosClient("").post(endPoint, formData, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    }
  }).then((response: any) => {
    console.log("ffffff", response);
    apiSucessErrorHandling(response, (isSuccess: boolean) => {
      console.log("suc", isSuccess, response.data);
      onResponse({ isSuccess: isSuccess, data: isSuccess ? response.data : response.data.message ? response.data.message : response.data })
    })
  }).catch((error: any) => {
    apiErrorHandling(error, ((message: any) => {
      console.log("suc error", error.message);
      onResponse({ success: false, data: message })
    }))
  })
}


export const createFormData = (file: FileModal, body: any) => {
  const data = new FormData();

  if (file != undefined) {
    console.log(file.uri)
    data.append('profileImage', {
      name: file.title,
      uri: Platform.OS === 'android' ? file.uri : file.uri.replace('file://', ''),
      type: "*/*"
    });
  }

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};
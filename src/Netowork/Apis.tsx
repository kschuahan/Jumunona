import axios from "axios"
import { apiErrorHandling, apiSucessErrorHandling } from "./ApiErrorHandling"
import { axiosClient } from "./AxiosClient"

import { Alert, Platform } from "react-native"


const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjIzYWQ0MmExYWZmYjIyZTU1NjAyNiIsImlhdCI6MTcwNjE4MzIwMSwiZXhwIjoxNzA4Nzc1MjAxfQ.AjJCJKGKqt2ZtjldKb0QGg8CaNJaakYxIMcYz7DB3Qc'

export const getAPICall = async (endPoint: any, onResponse: any,
  item: any = undefined, authToken = true) => {

  await axiosClient(authToken ? token : undefined).get(endPoint, { params: item })
    .then((response: any) => {

      apiSucessErrorHandling(response, (isSuccess: boolean) => {
        console.log("suc", isSuccess, response.data);
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

// export const postMultipartData = async (file: FileModal, item: any, endPoint: any, authToken = true, onResponse) => {

//   let token = await getValue(AsyncStorageKeys.authToken)

//   let formData = createFormData(file, item)


//   await axiosClient("").post(endPoint, formData, {
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'multipart/form-data',
//     }
//   }).then(response => {
//     console.log("fffffdsfljskfjklsjdlfjlsjfdjsdjfklsdflff", response);
//     apiSucessErrorHandling(response, (isSuccess: boolean) => {
//       console.log("suc", isSuccess, response.data);
//       onResponse({ isSuccess: isSuccess, data: isSuccess ? response.data : response.message })
//       if (!isSuccess) {
//         Alert.alert(strings.message, response.data)
//       }
//     })
//   }).catch(error => {
//     apiErrorHandling(error, ((message: any) => {
//       console.log("suc fsdfklsjdfljslfd dfsdfsdf f sdfsdferror", error.message);
//       onResponse({ success: false, data: message })
//       if (error.response) {
//         Alert.alert(strings.message, error.response.data)
//       }
//     }))
//   })
// }


// export const createFormData = (file: FileModal, body: any) => {
//   const data = new FormData();

//   if (file != undefined) {
//     console.log(file.uri)
//     data.append('file', {
//       name: file.title,
//       uri: Platform.OS === 'android' ? file.uri : file.uri.replace('file://', ''),
//       type: "*/*"
//     });
//   }

//   Object.keys(body).forEach(key => {
//     data.append(key, body[key]);
//   });

//   return data;
// };
import { Alert } from "react-native"
import { RouteNames } from "../utils/RouteNames";
import { AppString } from "../utils/AppStrings";




export const apiErrorHandling = (status: any, onClick) => {
    console.log(status.response, " ", status);

    var message = ''
    try {
        if (status.response != undefined) {

            switch (status.response.status) {

                case 404: {
                    // if (status.response.data.response.status == "ERROR" || status.response.data.response.status == "Error") {
                    //     message = status.response.data.response.message
                    //     break
                    // }
                    message = 'Not Found'
                    break
                }
                case 401: {
                    message = AppString.something_is_wrong
                    break
                }
                case 413: {

                    message = status.response.data
                    break
                }
                case 400: {
                    message = status.response.data ? status.response.data : AppString.check_your_internet_connection
                    break
                }
                default: {
                    message = AppString.something_is_wrong
                    break
                }
            }
        } else {
            message = AppString.check_your_internet_connection
        }

        if (message != '' && onClick == undefined) {
            Alert.alert(AppString.alert, message)
        } else {
            onClick(message)
        }
    } catch (error) {

        if (onClick == undefined) {
            Alert.alert(AppString.alert, AppString.check_your_internet_connection)
        } else {
            onClick(AppString.check_your_internet_connection)
        }

    }
}


export const apiSucessErrorHandling = (response: any, onSucess: any, isToast = true) => {

    console.log(response);

    var message = ''
    try {
        if (response.data != undefined) {
            if (response.data.data != undefined) {

                onSucess(true)

                // switch (response.data.status) {
                //     case "ERROR": {
                //         message = response.data.message
                //         onSucess(false)
                //         break
                //     }
                //     case "OK": {
                //         if (isToast) {
                //             // notifyMessage(response.data.message)
                //         }
                //         break
                //     }
                // }
            } else {
                if (response.status == 200) {
                    message = response.data.message
                    onSucess(false)
                } else {
                    message = response.statusText
                    onSucess(false)
                }
            }
        }

        if (message != '' && onSucess == undefined) {
            Alert.alert(AppString.alert, message)
        }

    } catch (error) {
        console.log("catch Error ", error);
        if (onSucess == undefined) {
            Alert.alert(AppString.alert, AppString.something_is_wrong)
        } else {

            onSucess(false)
        }

    }
}
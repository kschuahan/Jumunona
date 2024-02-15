import { Alert } from "react-native";
import { AppString } from "./AppStrings";





export const ConfirmationDialog = (onClick,
    message = "Are you sure you want to delete product from cart") => {

    Alert.alert(
        AppString.alert,
        message,
        [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => {
                    onClick()
                },
            },
        ],
        { cancelable: false },
    );
}




export const OkDialog = (
    message = "Are you sure you want to delete product from cart") => {

    Alert.alert(
        AppString.alert,
        message,
        [
            {
                text: 'OK',
                onPress: () => {
                },
            },
        ],
        { cancelable: false },
    );
}
import { Alert, Keyboard, Share } from "react-native";
import { imagesUrl } from "./AppIcons";
import { useEffect, useState } from "react";


export const onShare = async (data: any = imagesUrl.shoes) => {
    try {
        const result = await Share.share({
            message: `Shoes \n${data}`
            
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    } catch (error: any) {
        Alert.alert(error.message);
    }
};

export const formatPhoneNumber = (phone: string) => {
    let prefixLength = 4;
    let suffixLength = 2;

    let prefix = phone.substring(0, prefixLength);
    let suffix = phone.slice(-suffixLength);
    let nbStars = phone.length - (prefixLength + suffixLength);

    let formattedPhone = prefix + "*".repeat(nbStars) + suffix;

    return formattedPhone
  }



  export const useKeyboardVisible = () => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => setKeyboardVisible(true),
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => setKeyboardVisible(false),
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    return isKeyboardVisible;
}
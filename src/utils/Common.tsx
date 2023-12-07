import { Alert, Share } from "react-native";
import { imagesUrl } from "./AppIcons";


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
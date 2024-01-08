import { View } from "react-native"
import { styles } from "../../utils/AppStyles"
import { CustomHeader } from "../../components/Header"
import { AppString } from "../../utils/AppStrings"


export const ReturnSucessfullyScreen = ({ navigation }) => {

    return <View style={[styles.container, { padding: 0 }]}>
        <CustomHeader navigation={navigation} title={AppString.return_details} />

    </View>
}
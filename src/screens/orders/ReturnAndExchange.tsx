import { FlatList, View } from "react-native"
import { CustomHeader } from "../../components/Header"
import { styles } from "../../utils/AppStyles"
import { AppString } from "../../utils/AppStrings"






export const ReturnAndExchangeScreen = ({ navigation }) => {

    return <View style={[styles.container, { padding: 0 }]}>
        <CustomHeader navigation={navigation} title={AppString.return_exchange} />

        <FlatList data={[1, 2, 3, 4]}
            style={{ marginTop: 5, paddingHorizontal: 6 }}
            renderItem={({ item, index }) =>
                <ItemContainer item={item} />
            }
        />
    </View>
}


const ItemContainer = ({ item }) => {
    return <View>

    </View>
}
import { styles } from "../../utils/AppStyles"
import { TouchableOpacity, ScrollView, View, Text } from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect } from "react";
import { AppString } from "../../utils/AppStrings";

const ProductDetailScreen = ({navigation}) => {

    useEffect(() => {

        navigation.setOptions({
            headerTitle: AppString.notification_Settings,
            headerRight: (() => <TouchableOpacity style={{ alignItems: "center" }}>
                <Ionicons name="ellipsis-horizontal-outline" size={24} />
            </TouchableOpacity>),

            headerLeft: () => (
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }} style={{ alignItems: "center" }}>
                    <Ionicons name="chevron-back-outline" size={24} />
                </TouchableOpacity>
            )
        })
    }, [])

    return (
      <View style={styles.container}>

        <Text>Hello world</Text>
      </View>
    )
}

export default ProductDetailScreen
import { useEffect, useState } from "react"
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Switch } from "react-native"
import { styles } from "../../utils/AppStyles"
import { colors } from "../../utils/AppColors"
import { AppString } from "../../utils/AppStrings"
import { imagesUrl } from "../../utils/AppIcons"
import { fontFamilty } from "../../utils/Fonts"
import { SafeAreaView } from "react-native-safe-area-context"
import Ionicons from "@expo/vector-icons/Ionicons";

const SystemPermissionsScreen = ({ navigation }) => {

    useEffect(() => {

        navigation.setOptions({
            headerTitle: AppString.system_permissions,
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
        <View style={[styles.container]}>
            <View style={{ borderRadius: 13, backgroundColor: colors.white, padding: 10 }}>
                <ListView title={AppString.camera_and_alblum} desc={AppString.take_photo_select_photo_upload_photo} />
                <SeparatorView />
                <ListView title={AppString.location} desc={AppString.using_your_locations_currect_curriencies_and_privacies_will_beProvided} />

                <SeparatorView />
                <ListView title={AppString.photo_and_contacts} desc={AppString.implement_function_telephone} />


            </View>
        </View>
    )
}



const SeparatorView = () => {
    return <View style={{ height: 1, marginVertical: 10, backgroundColor: colors.darkWhite }} />
}

const ListView = ({ title = "", desc = "" }) => {

    const [switchOn, setSwitchOn] = useState(true)
    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignContent: "space-between", alignItems: "center" }}>
            <View style={{ flexDirection: "column", justifyContent: "space-between", width: "83%" }} >
                <Text
                    style={[
                        styles.textStyle,
                        { fontSize: 16, fontFamily: fontFamilty.bold, paddingBottom: 7 },
                    ]}
                >
                    {title}
                </Text>

                <Text
                    style={[
                        styles.textStyle,
                        { fontSize: 14, fontFamily: fontFamilty.regular, color: "#9C9C9C" },
                    ]}
                >
                    {desc}
                </Text>
            </View>
            <View style={{ padding: 10 }}>
                <Switch
                    trackColor={{ false: colors.lightGrey, true: '#65C468' }}
                    thumbColor={colors.white}
                    ios_backgroundColor={colors.lightGrey}
                    onValueChange={() => {
                        setSwitchOn(!switchOn)
                    }}
                    value={switchOn}

                />
            </View>
        </View>
    )
}

export default SystemPermissionsScreen
import React, { useEffect } from "react"
import { TouchableOpacity, View, Image, Text } from "react-native"
import { AppString } from "../../../utils/AppStrings"
import Ionicons from "@expo/vector-icons/Ionicons";
import { styles } from "../../../utils/AppStyles";
import { colors } from "../../../utils/AppColors";
import { appIcons } from "../../../utils/AppIcons";
import { fontFamilty } from "../../../utils/Fonts";
import { ScrollView } from "react-native-virtualized-view";

export const AboutUsScreen = ({ navigation }) => {
    useEffect(() => {

        navigation.setOptions({
            headerTitle: AppString.about_us,

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
        <View
            style={
                [styles.container,
                {
                    backgroundColor: colors.white,
                    marginTop: 3
                }]
            }
        >
            <AppDetailView />
            <EstimateView
                onClick={() => {

                }}
            />
            <DescriptionView />
        </View>
    )
}

const AppDetailView = ({ }) => {

    return (
        <View style={{ flexDirection: "column", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
            <Image
                source={appIcons.imgLogo}
                style={{ width: 70, height: 70, marginTop: 50, borderRadius: 15 }}
            />
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    fontFamily: "SegoeUIBold",
                    marginTop: 16
                }}
            >
                {AppString.AppName}
            </Text>
            <Text
                style={{
                    fontSize: 16,
                    fontFamily: fontFamilty.regular,
                    marginTop: 6,
                    paddingTop: 0,
                    color: "#090909"
                }}
            >
                Version 1.0.1
            </Text>
        </View>
    )
}
const EstimateView = ({ onClick }) => {

    return (
        <View style={{ flexDirection: "column", marginTop: 27, paddingLeft: 4, marginRight: -10 }}>
            <Separator />
            <TextWithIcon
                onClick={onClick}
            />
            <Separator />
        </View>
    )
}

const Separator = () => {
    return <View style={{ height: 1, backgroundColor: colors.darkWhite }} />
}


const TextWithIcon = ({ onClick }) => {

    return (
        <TouchableOpacity
            onPress={onClick}
            style={[
                styles.profile,
                { marginTop: undefined, alignItems: "center", paddingVertical: 16, paddingRight: 10 },
            ]}
        >
            <Text
                style={[
                    styles.textStyle,
                    { fontSize: 16, fontFamily: fontFamilty.bold },
                ]}
            >
                {AppString.estimate}
            </Text>
            <Ionicons
                name={"chevron-forward-outline"}
                color="#2E2E2E"
                size={15}
            />
        </TouchableOpacity>
    );
}

const DescriptionView = () => {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Text
                style={{
                    fontSize: 16,
                    fontFamily: "SegoeUIBold",
                    marginTop: 16
                }}
            >
                Brief introduction about the company {'\n'}
                Brief introduction of the company{'\n'}
                {'\n'}
                A brief introduction to the company's transportation{'\n'}
                Brief introduction of company transportation{'\n'}
                {'\n'}
                A brief introduction to company protection{'\n'}
                Brief introduction of company guarantee
            </Text>
        </ScrollView>
    )
}

export default AboutUsScreen;
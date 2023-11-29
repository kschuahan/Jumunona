import { LinearGradient } from "expo-linear-gradient"
import { useEffect, useState } from "react"
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native"
import { colors } from "../../utils/AppColors"
import { AppString } from "../../utils/AppStrings"
import { styles } from "../../utils/AppStyles"
import Ionicons from "@expo/vector-icons/Ionicons";

const ChangePassswordScreen = ({navigation}) => {


    useEffect(() => {

        navigation.setOptions({
            headerTitle: AppString.change_password,
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
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")

    return (
        <ScrollView>
            <View
                style={[style.container, { backgroundColor: colors.white, borderRadius: 13 }]}
            >
                <Text
                    style={[styles.textStyle, { marginBottom: 6, fontFamily: "SegoeUIBold", fontSize: 17 }]}
                >
                    {AppString.new_password}
                </Text>

                <View
                    style={{ flexDirection: "row", marginBottom: 14 }}
                >

                    <TextInput
                        placeholder={AppString.create_new_password}
                        style={style.passwordTextInput}
                        value={email}
                        onChangeText={ (text) => {
                            setEmail(text)
                        }}
                    ></TextInput>
                </View>

                <Text
                    style={[styles.textStyle, { marginBottom: 6, fontFamily: "SegoeUIBold", fontSize: 17 }]}
                >
                    {AppString.confrim_new_password}
                </Text>
                <View
                    style={{ flexDirection: "row"}}
                >

                    <TextInput
                        placeholder={AppString.enter_your_pass_again}
                        style={style.passwordTextInput}
                        value={email}
                        onChangeText={ (text) => {
                            setEmail(text)
                        }}
                    ></TextInput>
                </View>
            </View>

            <TouchableOpacity
                onPress={() => {

                }}
                style={style.confirmButton}
            >
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={["#FE8C00", "#FC4A1A"]}
                    style={styles.buttonGradient}
                >
                    <Text
                        style={{ fontSize: 18, color: "#fff", fontFamily: "SegoeUIBold" }}
                    >
                        {AppString.confirm}
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default ChangePassswordScreen
const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 14,
        margin: 10
    },
    passwordTextInput: {
        width: "100%",
        backgroundColor: "#f5f5f5",
        height: 34,
        borderRadius: 24,
        paddingHorizontal: 16,
        fontFamily: "SegoeUI",
        fontSize: 14,
    },
    confirmButton: {
        flex: 1,
        width: "100%",
        paddingTop: 10,
        paddingBottom: 12,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: "space-between",
        fontFamily: "SegoeUIBold",
    },
    buttonGradient: {
        elevation: 4,
        height: 38,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 24,
    },
});
import { LinearGradient } from "expo-linear-gradient"
import { useEffect, useState } from "react"
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native"
import { colors } from "../../utils/AppColors"
import { AppString } from "../../utils/AppStrings"
import { styles } from "../../utils/AppStyles"
import Ionicons from "@expo/vector-icons/Ionicons";

const ChangePhoneScreen = ({navigation}) => {


    useEffect(() => {

        navigation.setOptions({
            headerTitle: AppString.change_phone_number,
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
    const [phone, setPhone] = useState("")
    const [otp, setOtp] = useState("")

    return (
        <ScrollView>
            <View
                style={[style.container, { backgroundColor: colors.white, borderRadius: 13 }]}
            >
                <Text
                    style={[styles.textStyle, { marginBottom: 6, fontFamily: "SegoeUIBold", fontSize: 17 }]}
                >
                    {AppString.enter_new_number}
                </Text>

                <View
                    style={{ flexDirection: "row", marginBottom: 14 }}
                >
                    <LinearGradient
                        colors={["#ff7600", "#ffc500"]}
                        start={{ x: 0.4, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                            width: "24%",
                            height: 34,
                            borderRadius: 24,
                            paddingLeft: 8,
                        }}
                    >
                        <Text style={style._992}>+992</Text>
                    </LinearGradient>

                    <TextInput
                        placeholder={AppString.enter_your_new_nubmer}
                        style={style.mobileTextInput}
                        value={phone}
                        onChangeText={ (text) => {
                            setPhone(text)
                        }}
                    ></TextInput>
                </View>

                <Text
                    style={[styles.textStyle, { marginBottom: 6, fontFamily: "SegoeUIBold", fontSize: 17 }]}
                >
                    {AppString.confirmation_code}
                </Text>
                <View
                    style={{ flexDirection: "row" }}
                >
                    <TextInput
                        placeholder={AppString.enter_new_number}
                        style={style.passwordTextInput}
                        value={otp}
                        onChangeText={ (text) => {
                            setOtp(text)
                        }}
                    ></TextInput>
                    <TouchableOpacity 
                        style={{
                            width: "35%",
                            height: 34,
                            paddingLeft: 8,
                            marginLeft: -30,
                            opacity: (phone.length == 0 ? 0.5 : 1)
                        }} onPress={() => {

                        }}
                        disabled= {phone.length == 0}
                    >
                        <LinearGradient
                            colors={["#FE8C00", "#FC4A1A"]}
                            start={{ x: 0.4, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={{ flex: 1, borderRadius: 24, }}
                        
                        >
                            <Text style={style._992}>{AppString.get_code}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity
                onPress={() => {

                }}
                style={style.loginButton}
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

export default ChangePhoneScreen
const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 14,
        margin: 10
    },
    _992: {
        color: "#ffffff",
        paddingTop: 7,
        paddingLeft: 8,
        fontFamily: "SegoeUI",
        fontSize: 14,
    },
    mobileTextInput: {
        width: "84%",
        backgroundColor: "#f5f5f5",
        height: 34,
        borderRadius: 24,
        marginLeft: -30,
        paddingHorizontal: 16,
        fontFamily: "SegoeUI",
        fontSize: 14,
    },
    passwordTextInput: {
        width: "73%",
        backgroundColor: "#f5f5f5",
        height: 34,
        borderTopLeftRadius: 24,
        borderBottomLeftRadius: 24,
        paddingHorizontal: 16,
        fontFamily: "SegoeUI",
        fontSize: 14,
    },
    loginButton: {
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
import { Modal, TouchableOpacity, StyleSheet, View, Text, TextInput } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { styles } from "../utils/AppStyles";
import { AppString } from "../utils/AppStrings";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../utils/AppColors";


export const VerifyDeleteAccountDialog = ({ isShow = false, onConfirm, onCancel }) => {

   
    const [number, setNumber] = useState("")
    const [otp, setOtp] = useState("")

    return <Modal transparent={true} animationType={'slide'} visible={isShow} onRequestClose={onCancel} >
        <View style={[styles.botton_view, { backgroundColor: 'rgba(0, 0,0, .7 )' }]}>
            <View style={[styles.bottom_sheet, { paddingHorizontal: 10 }]}>
                <Text style={[styles.textStyle, { marginTop: 10, fontFamily: "SegoeUIBold", fontSize: 17 }]}>{AppString.verify_phone_no}</Text>
                <TextInput
                    placeholder={AppString.enter_phone}
                    style={style.textInput}
                    onChangeText={(text: String) => {
                        setNumber(text)
                    }}
                    value={number}
                />
                <Text style={[styles.textStyle, { marginTop: 10, fontFamily: "SegoeUIBold", fontSize: 17 }]}>{AppString.confirmation_code}</Text>

                <View style={{ flexDirection: "row" }}>
                    <TextInput
                        placeholder={AppString.enter_sms_code}
                        style={style.otpText}
                        value={otp}
                        onChangeText={(text: String) => {
                            setOtp(text)
                        }}
                    />
                    <TouchableOpacity style={style.sendOTPButton}>
                        <LinearGradient
                            colors={["#ff7600", "#ffc500"]}
                            start={{ x: 0.4, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={[
                                style.leftSideGradient,
                                {
                                    justifyContent: "center",
                                    alignItems: "center",
                                    paddingRight: 10,
                                },
                            ]}
                        >
                            <Text
                                style={{
                                    color: "#ffffff",
                                    paddingLeft: 12,
                                    fontFamily: "SegoeUI",
                                    fontSize: 14,
                                }}
                            >
                                {AppString.get_code}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between",  }}>
                <TouchableOpacity
                    onPress={onCancel}
                    style={{ marginVertical: 16,  width: "45%"  }}
                >
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        colors={["#FE8C00", "#FC4A1A"]}
                        style={{
                            elevation: 4,
                            height: 46,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 23,

                        }}
                    >
                        <Text
                            style={{ fontSize: 16, color: colors.white, paddingHorizontal: 20, fontFamily: "SegoeUIBold" }}
                        >
                            {AppString.cancel}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onConfirm}
                    style={{ marginVertical: 16,  elevation: 4,
                        height: 46,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 23, borderWidth: 1, borderColor: colors.endOrange, width: "45%" }}
                >
                        <Text
                            style={{ fontSize: 16, color: colors.endOrange, paddingHorizontal: 20, fontFamily: "SegoeUIBold" }}
                        >
                            {AppString.confirm}
                        </Text>
                    
                </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
}


const style = StyleSheet.create({
    textInput: {
        width: "100%",
        backgroundColor: "#f5f5f5",
        height: 34,
        borderRadius: 24,
        marginVertical: 10,
        padding: 10,
        fontFamily: "SegoeUI",
        fontSize: 14,
    },
    leftSideGradient: {
        width: "40%",
        height: 34,
        borderRadius: 24,
    },
    sendOTPButton: {
        width: "100%",
        height: 34,
        borderRadius: 24,
        marginLeft: -115,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        paddingTop: 20
    },
    otpText: {
        width: "65%",
        backgroundColor: "#f5f5f5",
        padding: 10,
        height: 34,
        borderRadius: 24,
        marginVertical: 10,
        fontFamily: "SegoeUI",
        fontSize: 14,
    }
})
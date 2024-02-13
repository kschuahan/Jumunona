import { Text, TextInput, TouchableOpacity, View, ScrollView, StyleSheet, Pressable, Alert } from "react-native"
import { colors } from "../../utils/AppColors"
import { RouteNames } from "../../utils/RouteNames";
import { useEffect, useState } from "react";
import { styles } from "../../utils/AppStyles";
import { AppString } from "../../utils/AppStrings";
import { CustomHeader } from "../../components/Header";
import LinearGradient from "react-native-linear-gradient";
import DatePicker from "react-native-date-picker";
import CheckmarkCircle from '../../../assets/Icons/CircleOrange.svg';
import EllipsisHorizontalNormal from '../../../assets/Icons/CircleGrey.svg';
import { postAPICall, putAPICall } from "../../Netowork/Apis";
import { ProfileAPIs } from "../../Netowork/Constants";
import { CenterProgressView } from "../../components/Dialogs";
import moment from "moment";

// MALE : 'MALE',
// FEMALE : 'FEMALE',
// OTHER : 'OTHER',
// PNS : 'PREFFER NOT TO SAY'

export const genderOptions = [AppString.male, AppString.female, AppString.other, AppString.prefer_not_to_say]
export const apiGenderOption = ["MALE", "FEMALE", "OTHER", "PREFFER NOT TO SAY"]
export const EditProfileDetailScreen = ({ navigation, route }) => {

    useEffect(() => {
        console.log(route.params.profileData)
        if (route.params.profileData) {
            let profileData = route.params.profileData
            setName(profileData.userName)
            setDob(profileData.dob)
            setGender(profileData.gender)
            let apiGender = genderOptions.findIndex(element => element == profileData.gender) 
            if (apiGender >= 0 && apiGender < apiGenderOption.length) {
                setApiGenderString(apiGenderOption[apiGender])
            }
            let momentObj = moment(profileData.dob, 'DD-MM-YYYY')

            console.warn("dob", profileData.dob)
            if (momentObj.toDate() ) {
              

               setDate(momentObj.toDate())
            }
        }
    }, []);

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    const [gender, setGender] = useState("")
    const [dob, setDob] = useState("")

    const [nameErr, setNameErr] = useState("")
    const [genderErr, setGenderErr] = useState("")
    const [dobErr, setDobErr] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const [apiGenderString, setApiGenderString] = useState("")
   

    const updateProfile = () => {
        setIsLoading(true)
        console.warn(apiGenderString)
        putAPICall(
            {
                userName: name,
                gender: apiGenderString,
                dob: dob
            },
            ProfileAPIs.updateProfile,
            true,
            (res: any) => {
                setIsLoading(false)
                if (res.isSuccess) {
                    Alert.alert("", res.data.message.toString(), [{
                        text: 'OK',
                        onPress: () => {navigation.goBack()},
                        style: 'default',
                      }])
                } else {
                    Alert.alert("", res.data.toString())
                }
            }
        ).catch ( error =>
            Alert.alert("", error.toString())
         )
    }

    const validate = () => {
        var isValid = true
        if (name.trim().length == 0) {
            setNameErr("Enter valid name.")
            isValid = false
        } else {
            setNameErr("")
        }
        if (dob.trim().length == 0) {
            setDobErr("Please select date of birth.")
            isValid = false
        } else {
            setDobErr("")
        }
        if (gender.trim().length == 0) {
            setGenderErr("Please select gender.")
            isValid = false
        } else {
            setGenderErr("")
        }
        return isValid
    }

    return (
        <View style={[styles.container, { padding: 0 }]}>
            <CustomHeader navigation={navigation} title={RouteNames.setting} />
            <ScrollView style={styles.container}>
                <View style={{ backgroundColor: colors.white, padding: 10, borderRadius: 13, gap: 13 }}>
                    <TextInputView text={name} placeholder={AppString.add_name} err={nameErr} setText={(text: string) => {
                        setName(text)
                    }} />
                    <TouchableOpacity
                        onPress={() => {
                            console.warn(open)
                            setOpen(true)
                        }}
                        style={style.dobText}
                    >
                        <Text style={{ color: dob.trim().length > 0 ? colors.balc111111 : colors.grayC9C9C9 }}>
                            {dob.trim().length > 0 ? dob : AppString.add_dob}
                        </Text>
                       
                    </TouchableOpacity>
                    {
                            dobErr.length > 0
                                ? <Text
                                    style={{
                                        color: colors.lightRed,
                                        fontSize: 14,
                                        fontWeight: '400',
                                        paddingStart: 8
                                    }}>
                                    {dobErr}
                                </Text>
                                : null
                        }

                    <Text style={{ color: colors.balc111111, fontSize: 16, fontWeight: "bold", paddingLeft: 8 }}>
                        {AppString.select_gender} :
                    </Text>
                    <View style={{ paddingHorizontal: 8, gap: 13, paddingBottom: 13, }}>
                        {
                            genderOptions.map((it, index) =>
                                <RadioOption isSelected={gender == it} text={it} onTap={() => {
                                    setGender(it)
                                    setApiGenderString(apiGenderOption[index])
                                    console.warn(apiGenderString)
                                }} />
                            )
                        }
                        {
                            genderErr.length > 0
                                ? <Text
                                    style={{
                                        color: colors.lightRed,
                                        fontSize: 14,
                                        fontWeight: '400',
                                        paddingStart: 8
                                    }}>
                                    {genderErr}
                                </Text>
                                : null
                        }
                    </View>


                </View>
                <TouchableOpacity
                    onPress={() => {
                        if(validate()) {
                            updateProfile()
                        }
                    }}
                    style={{ marginTop: 14 }}
                >
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        colors={["#ffc500", "#FC4A1A"]}
                        style={styles.buttonGradient}
                    >
                        <Text
                            style={{ fontSize: 16, color: "#fff", fontWeight: "bold" }}
                        >
                            {AppString.save}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </ScrollView>
            <DatePicker
                modal
                open={open}
                maximumDate={new Date()}
                date={date}
                mode={"date"}
                textColor={colors.lightOrange}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                    const month = date.getMonth()
                    const day = date.getDate()
                    const year = date.getFullYear()
                    setDob(day + "/" + month + "/" + year)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
           {isLoading ?  <CenterProgressView /> : null }
        </View>
    )
}

const TextInputView = ({ editable = true, text, placeholder, err, setText }) => {
    return (
        <View style={{ width: '100%' }}>
            <TextInput
                placeholder={placeholder}
                onChangeText={text => {
                    setText(text)
                }}
                value={text}
                style={style.textInput}
                editable={editable}
                aria-disabled={!editable}
            />
            {
                err.length > 0
                    ? <Text
                        style={{
                            color: colors.lightRed,
                            fontSize: 14,
                            fontWeight: '400',
                            paddingStart: 8
                        }}>
                        {err}
                    </Text>
                    : null
            }
        </View>
    )
}

const RadioOption = ({ isSelected = false, text, onTap }) => {
    return (
        <TouchableOpacity style={{ flexDirection: "row", gap: 8, alignItems: "center" }} onPress={onTap}>
            {
                isSelected ? <CheckmarkCircle /> : <EllipsisHorizontalNormal />
            }
            <Text style={[styles.textStyle, { fontSize: 15, fontWeight: "400" }]}>{text} </Text>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    textInput: {
        backgroundColor: '#f5f5f5',
        height: 36,
        borderRadius: 24,
        paddingLeft: 16,
        fontFamily: 'SegoeUI',
        fontSize: 14,
        paddingVertical: 0
    },
    dobText: {
        backgroundColor: '#f5f5f5',
        height: 36,
        borderRadius: 24,
        paddingLeft: 16,
        fontFamily: 'SegoeUI',
        fontSize: 14,
        justifyContent: "center"
    }
})
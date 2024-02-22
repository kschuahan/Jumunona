import { Alert, Platform, Text, TextInput, TouchableOpacity, View } from "react-native"
import { styles } from "../../utils/AppStyles"
import { BackLogo, LogoTitle } from "../../components/Header";
import { AppString } from "../../utils/AppStrings";
import { useEffect, useState } from "react";

import ChevronBackOutlineIcon from '../../../assets/Icons/chevronBackOutline.svg';
import { colors } from "../../utils/AppColors";
import RadioOff from '../../../assets/Icons/RadioOff.svg';
import RadioOn from '../../../assets/Icons/RadionOn.svg';
import ChevronFwdOutline from '../../../assets/Icons/chevronForwardOutline.svg';
import DeleteAddressIcon from '../../../assets/Icons/DeleteAddress.svg';

import LinearGradient from "react-native-linear-gradient";
import { AlertWithConirm, CenterProgressView, DeleteAddress } from "../../components/Dialogs";
import { SelectResionalScreen } from "./SelectResionalScreen";
import { postAPICall } from "../../Netowork/Apis";
import { AddressAPIs } from "../../Netowork/Constants";




export const EditAndAddAddressScreen = ({ navigation, route }) => {

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [region, setRegion] = useState('')
    const [address, setAddress] = useState('')
    const [isDefault, setIsDefault] = useState(false)
    const [show, setShow] = useState(false)
    const [showRegion, setShowRegion] = useState(false)
    const [addressId, setAddressId] = useState('')
    const [loading, setLoading] = useState(false)

    const [nameErr, setNameErr] = useState('')
    const [addressErr, setAddressErr] = useState('')
    const [phoneErr, setPhoneErr] = useState('')
    const [regionErr, setRegionErr] = useState('')

    
    useEffect(() => {
        if (route.params && route.params.address) {
            const data = route.params.address
            setName(data.name)
            setAddress(data.addressDetail)
            console.warn(address)
            setPhone(data.phone)
            setRegion(data.state)
            setIsDefault(data.defaultAddress)
            setAddressId(data._id)
        }
    }, [])

    const validate = () => {
        let isValid = true
        if (name.trim().length < 3) {
            setNameErr("Enter valid name")
            isValid = false
        } else {
            setNameErr("")
        }
        if (address.trim().length < 3) {
            setAddressErr("Enter valid address")
            isValid = false
        } else {
            setAddressErr("")
        }
        if (phone.trim().length < 8) {
            setPhoneErr("Enter valid phone")
            isValid = false
        } else {
            setPhoneErr("")
        }
        if (region.trim().length < 1) {
            setRegionErr("Enter valid region")
            isValid = false
        } else {
            setRegionErr("")
        }
        return isValid
    }

    const saveAddress = () => {

        setLoading(true)
        postAPICall({
            updateAdress: addressId.length > 0,
            city: "jaipur",
            state: region,
            country: "rajasthan",
            address: address,
            defaultAddress: isDefault,
            name: name,
            phone: phone,
            addressId: addressId.length > 0 ? addressId : null
        },
            AddressAPIs.addAddress,
            true,
            (res: any) => {
                setLoading(false)
                if (res.isSuccess && res.data && res.data.message) {
                    AlertWithConirm("", res.data.message, () => {
                        navigation.goBack()
                    })
                } else {
                    Alert.alert("", res.data.toString())
                }
                console.warn(res.data.data)
               
            })
    }

    return (
    <View
        style = {[styles.container, {padding: 0}]}
    >

        <CustomHeader navigation={navigation} route={route} onRighButtonClick={() => { setShow(true)}} />
   
    
    <View style={{ paddingHorizontal: 16, paddingVertical: 13 }}>

        <TextInputData value={name} errText={nameErr} onChangeText={(it: string) => {
            setName(it)
        }} />
        <TextInputData placeholder="Номер телефона" value={phone} errText={phoneErr} onChangeText={(it: string) => {
            setPhone(it)
        }} keybordType="numeric" />
        <TextInputData placeholder="Регион" value={region}  errText={regionErr} onChangeText={(it: string) => {
            setRegion(it)
        }} isForward={true} OnClick={() => {
            console.warn("hello")
            setShowRegion(true)
        }} />
        <TextInputData ml={true} placeholder="Улица, дом, квартира" hight={75} value={address} errText={addressErr} onChangeText={(it: string) => {
            setAddress(it)
        }} />


        <View style={{ marginBottom: 33, justifyContent: 'space-between', marginTop: 13, flexDirection: 'row', width: '100%', alignItems: 'center' }}>
            <Text style={[styles.textStyle, { fontSize: 16, fontWeight: '500' }]}>{AppString.default}</Text>

            <TouchableOpacity onPress={() => {
                setIsDefault(!isDefault)
            }}>
                {
                    isDefault ? <RadioOn /> : <RadioOff />
                }
            </TouchableOpacity>
        </View>

        <CommonButton onClick={() => {
            if (validate()) {
                saveAddress()
            }

        }} />

        <DeleteAddress isShow={show} onCancel={() => {
            setShow(false)
        }} onConfirm={() => {
            addressList.splice(route.params.index, 1)
            setShow(false)
            navigation.goBack()

        }} />
        <SelectResionalScreen isShow={showRegion} onClose={() => {
            setShowRegion(false)
        }} onConfirm={(city: string) => {
            setRegion(city)
            setShowRegion(false)

        }} />
    </View>
    <CenterProgressView isShow={loading} />
    </View>
    )
}



const CommonButton = ({
    text = AppString.save,
    endColor = colors.endOrange,
    startorange = colors.startOrange,
    onClick,
}) => {
    return (
        <TouchableOpacity onPress={onClick}>
            <LinearGradient
                colors={[startorange, endColor]}
                start={{ x: 0.4, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                    borderRadius: 20,
                    height: 45,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text
                    style={[
                        styles.textStyle,
                        { color: colors.white, fontWeight: 'bold', fontSize: 16, marginStart: 9 },
                    ]}>
                    {text}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};


const TextInputData = ({ placeholder = "Имя получателя", value = '', errText = '',
    onChangeText, keybordType = "default", br = 23, mb = 13, ml = false, hight = 40, isForward = false, OnClick = () => { } }) => {

    return <View style = {{marginBottom: mb}}>
        
        {!isForward ? 
        <TextInput
            value={value}
            placeholder={placeholder}
            onChangeText={onChangeText}
            multiline={ml}
            placeholderTextColor={'#979797'}
            editable={!isForward}
            style={{
                paddingHorizontal: 12,
                paddingStart: keybordType == 'numeric' ? 50 : 12,
                width: '100%', height: hight, borderRadius: br,
                backgroundColor: 'white',
                fontSize: 16, color: colors.black,
                textAlignVertical: ml ? 'top' : undefined,
                paddingVertical: ml ? 10 : undefined
                
            }}
            keyboardType={keybordType}
        /> :
        <TouchableOpacity  onPress={OnClick}  style = {{
            paddingHorizontal: 12,
            paddingStart:  12,
            width: '100%', height: hight,
            backgroundColor: 'white',
            paddingVertical: ml ? 10 : undefined,
            justifyContent: "center",
            borderRadius: br,
        }}>
            <Text
            style={{
                fontSize: 16, color: (value.length > 0 ?  colors.black : "#979797"),               
            }}
            >
                {value.length > 0 ? value : placeholder}
            </Text>
            </TouchableOpacity>
        }

        {keybordType == 'numeric' ? <Text style={[styles.textStyle, {
            fontSize: 16, color: '#707070',
            position: 'absolute', start: 10, top: 10
        }]}>+86</Text> : null}
        {isForward ? <ChevronFwdOutline width={10} height={10} style={{
            position: 'absolute', end: 10, top: 16
        }} /> : null}
       

   
    {
              errText.length > 0
               ? <Text
              style={{
                color: colors.lightRed,
                fontSize: 14,
                fontWeight: '400',
                marginTop: 3,
                marginStart: 10
              }}>
              {errText}
            </Text>
            : null

            }
    </View>
}

const CustomHeader = ({ navigation, route, onRighButtonClick }) => {

   return ( <View
        style={{
            elevation: 2,
            paddingHorizontal: 13,
            paddingEnd: 12,
            backgroundColor: colors.white,
            borderTopEndRadius: 0,
            borderTopStartRadius: 0,
            paddingTop: Platform.OS == 'ios' ? 20 : 20,
            paddingBottom: 5,
            marginBottom: 4
        }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <BackLogo navigation={navigation} />
            <LogoTitle title={AppString.changeAddress} />
            {route.params ? <TouchableOpacity onPress={onRighButtonClick} style={{ alignItems: 'center' }}>
                <DeleteAddressIcon />
            </TouchableOpacity> : null
}
        </View>
    </View>
   )
}
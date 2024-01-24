import { Platform, Text, TextInput, TouchableOpacity, View } from "react-native"
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
import { addressList } from "./MyAddressesScreen";
import { DeleteAddress } from "../../components/Dialogs";
import { SelectResionalScreen } from "./SelectResionalScreen";




export const EditAndAddAddressScreen = ({ navigation, route }) => {

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [resign, setResign] = useState('')
    const [address, setAddress] = useState('')
    const [isDefault, setIsDefault] = useState(false)
    const [show, setShow] = useState(false)
    const [showResion, setShowResion] = useState(false)

    useEffect(() => {
        if (route.params) {
            const data = route.params.data
            setName(data.name)
            setAddress(data.address)
            setPhone(data.mobile)
            setResign(data.reasion)

            setIsDefault(data.isDefault)
        }
    }, [])

    return (
    <View
        style = {[styles.container, {padding: 0}]}
    >

        <CustomHeader navigation={navigation} route={route} onRighButtonClick={() => { setShow(true)}} />
   
    
    <View style={{ paddingHorizontal: 16, paddingVertical: 13 }}>

        <TextInputData value={name} onChangeText={(it: string) => {
            setName(it)
        }} />
        <TextInputData placeholder="Номер телефона" value={phone} onChangeText={(it: string) => {
            setPhone(it)
        }} keybordType="numeric" />
        <TextInputData placeholder="Регион" value={resign} onChangeText={(it: string) => {
            setResign(it)
        }} isForward={true} OnClick={() => {
            setShowResion(true)
        }} />
        <TextInputData ml={true} placeholder="Улица, дом, квартира" hight={75} value={address} onChangeText={(it: string) => {
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
            if (route.params) {
                const index = route.params.index
                addressList[index].address = address
                addressList[index].mobile = phone
                addressList[index].name = name
                addressList[index].reasion = resign

                addressList[index].isDefault = isDefault
                navigation.goBack()
            } else {
                addressList.push({
                    id: addressList.length + 1,
                    type: 'work',
                    name: name,
                    mobile: phone,
                    address: address,
                    isDefault: isDefault,
                    reasion: resign
                })
                navigation.goBack()

            }

        }} />

        <DeleteAddress isShow={show} onCancel={() => {
            setShow(false)
        }} onConfirm={() => {
            addressList.splice(route.params.index, 1)
            setShow(false)
            navigation.goBack()

        }} />
        <SelectResionalScreen isShow={showResion} onClose={() => {
            setShowResion(false)
        }} onConfirm={(city: string) => {
            setResign(city)
            setShowResion(false)

        }} />
    </View>
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


const TextInputData = ({ placeholder = "Имя получателя", value = '',
    onChangeText, keybordType = "default", br = 23, mb = 13, ml = false, hight = 40, isForward = false, OnClick = () => { } }) => {

    return <TouchableOpacity disabled={!isForward} onPress={OnClick}>
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
                backgroundColor: 'white', marginBottom: mb,
                fontSize: 16, color: colors.black,
                textAlignVertical: ml ? 'top' : undefined,
                paddingVertical: ml ? 10 : undefined
            }}
            keyboardType={keybordType}
        />

        {keybordType == 'numeric' ? <Text style={[styles.textStyle, {
            fontSize: 16, color: '#707070',
            position: 'absolute', start: 10, top: 8
        }]}>+86</Text> : null}
        {isForward ? <ChevronFwdOutline width={10} height={10} style={{
            position: 'absolute', end: 10, top: 16
        }} /> : null}

    </TouchableOpacity>
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
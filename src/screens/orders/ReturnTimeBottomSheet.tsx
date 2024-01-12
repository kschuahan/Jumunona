

import { Image, Modal, Pressable, Text, TouchableOpacity, View, TextInput, FlatList } from "react-native"
import { colors } from "../../utils/AppColors"
import { styles } from "../../utils/AppStyles"
import CloseIcon from '../../../assets/Icons/closeIcon.svg';
import { fontFamily } from "../../utils/Fonts";
import { imagesUrl } from "../../utils/AppIcons";
import { } from "react-native-gesture-handler";
import { useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import { AppString } from "../../utils/AppStrings";
import CheckmarkCircle from '../../../assets/Icons/CircleOrange.svg';
import EllipsisHorizontalNormal from '../../../assets/Icons/CircleGrey.svg';

import HelpIcon from '../../../assets/Icons/HelpIcon.svg';


export const ReturnTimeBottonSheet = ({ isShow = false, onClose, data = [], title = '' }) => {

    const [select, setSelect] = useState(0)
    return (
        <Modal
            transparent={true}
            animationType={'slide'}
            visible={isShow}
            onRequestClose={onClose}
        >
            <Pressable onPress={onClose}
                style={[
                    styles.botton_view,
                    { backgroundColor: 'rgba(0, 0,0, .7 )', justifyContent: 'flex-end' },
                ]}>
                <Pressable
                    style={{
                        paddingHorizontal: 12,
                        backgroundColor: colors.white,
                        borderTopLeftRadius: 13,
                        borderTopRightRadius: 13,
                        paddingTop: 10,
                        width: '100%',
                        flex: data.length > 8 ? 0.7 : undefined
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: "center"
                        }}>
                        <View></View>
                        <View>

                            <Text
                                style={{
                                    fontSize: 17,
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    color: colors.black
                                }}
                            >
                                {AppString.select_return_time}
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={{ marginEnd: 12 }}

                            onPress={() => {
                                onClose();
                            }}>
                            <CloseIcon width={15} height={15} />
                        </TouchableOpacity>
                    </View>
                    <LinearGradient
                        colors={["#FE8C00", '#FC4A1A']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                            height: 46,
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 6,
                            borderTopRightRadius: 12,
                            borderTopLeftRadius: 12,
                            marginTop: 8.5

                        }}>
                        <HelpIcon />
                        <Text style={[styles.textStyle, {
                            fontWeight: 'bold',
                            fontSize: 17, color: '#F6FFC5', marginStart: 6
                        }]}>{AppString.officeial_return_service}</Text>
                    </LinearGradient>

                    <View style={{
                        borderColor: '#FD6C0C',
                        borderBottomRightRadius: 12,
                        borderBottomLeftRadius: 12,
                        borderWidth: 1,
                        borderTopWidth: 0, marginTop: -2
                    }}>




                        <Text style={[styles.textStyle, {
                            fontSize: 17, color: '#010A11', textAlign: 'center', marginVertical: 15
                        }]}>{AppString.request_can_be_cancel_anytime}</Text>

                        <View style={{
                            flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                            marginBottom: 15, gap: 20
                        }}>
                            <SlectButton select={select == 0} onClick={() => {
                                setSelect(0)
                            }} />
                            <SlectButton time="14:00 - 18:00" select={select == 1} onClick={() => {
                                setSelect(1)
                            }} />


                        </View>

                    </View>

                    <OKButton onClick={onClose} />
                </Pressable>
            </Pressable >
        </Modal >

    )
}


const SlectButton = ({ time = '09:00 - 12:00', select = true, onClick }) => {

    return <TouchableOpacity onPress={onClick} style={{
        height: 57, width: 154, borderRadius: 5,
        borderColor: select ? '#FD6C0C' : '#F6F7F9', borderWidth: 1,
        backgroundColor: select ? '#FDF9FA' : '#F6F7F9',
        justifyContent: 'center', alignItems: 'center'
    }}>

        <Text style={[styles.textStyle, {
            fontSize: 17, color: select ? '#FD6C0C' : '#696A6C',
            fontWeight: select ? '500' : '400'
        }]}>{time}</Text>

    </TouchableOpacity>
}


const OKButton = ({
    text = "OK",
    endColor = colors.endOrange,
    startorange = colors.startOrange,
    onClick,
}) => {
    return (
        <TouchableOpacity onPress={onClick} style={{ marginVertical: 30 }}>
            <LinearGradient
                colors={[startorange, endColor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                    borderRadius: 18,
                    height: 36,
                    justifyContent: 'center',
                    alignItems: 'center',

                }}>
                <Text
                    style={[
                        styles.textStyle,
                        { color: colors.white, fontWeight: '400', fontSize: 16, paddingHorizontal: 19 },
                    ]}>
                    {text}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};
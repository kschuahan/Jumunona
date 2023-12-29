import { AppState, FlatList, Modal, Pressable, Text, TouchableOpacity, View } from "react-native"
import { colors } from "../../utils/AppColors"
import { styles } from "../../utils/AppStyles"
import { AppString } from "../../utils/AppStrings"

import CloseIcon from '../../../assets/Icons/closeIcon.svg';
import ChevronFwdOutline from '../../../assets/Icons/chevronForwardOutline.svg';
import { useState } from "react";
import LinearGradient from "react-native-linear-gradient";


const cities = [
    'Sogd',
    'Khujand',
    'Eva',
    'ул. Гёте'
]


export const SelectResionalScreen = ({ isShow = false, onClose, onConfirm }) => {

    const [select, setSelect] = useState(0)
    return <Modal
        transparent={true}
        animationType={'slide'}
        visible={isShow}
        onRequestClose={onClose}>
        <Pressable onPress={onClose}
            style={[
                styles.botton_view,
                { backgroundColor: 'rgba(0, 0,0, .7 )', justifyContent: 'flex-end' },
            ]}>
            <Pressable
                style={{
                    paddingHorizontal: 10,
                    backgroundColor: colors.white,
                    borderTopLeftRadius: 26,
                    borderTopRightRadius: 26,
                    width: '100%',
                    flex: 0.79,
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                        marginTop: 6,
                        justifyContent: 'space-between'
                    }}>
                    <Text />

                    <Text
                        style={[
                            styles.textStyle,
                            {
                                fontSize: 21,
                                color: colors.black,
                                textAlign: 'center',
                                fontWeight: 'bold'
                            },
                        ]}>
                        {AppString.select_your_region}
                    </Text>
                    <TouchableOpacity
                        style={{ marginTop: 4, marginEnd: 4 }}
                        onPress={() => {
                            onClose();
                        }}>
                        <CloseIcon width={12} height={12} />
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={{ marginTop: 30, marginHorizontal: 10 }}
                    showsVerticalScrollIndicator={false}
                    data={cities}
                    renderItem={({ item, index }) =>
                        <TouchableOpacity onPress={() => {
                            setSelect(index)
                        }} style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: index == 0 ? 4 : -1 }}>
                                    <View style={{ height: 7, width: 7, borderRadius: 3.5, backgroundColor: colors.ornageE75F2B }} />
                                    {index != cities.length - 1 ? <View style={{ height: 32.5, width: 2, backgroundColor: colors.ornageE75F2B }} />
                                        : null}
                                </View>
                                <Text
                                    style={[
                                        styles.textStyle,
                                        {
                                            fontSize: 15,
                                            color: index == select ? colors.lightOrange : '#343434',
                                            marginStart: 20,
                                            marginTop: index == 0 ? -4 : -8
                                        },
                                    ]}>
                                    {item}
                                </Text>
                            </View>
                            <ChevronFwdOutline width={10} height={10} style={{
                            }} />
                        </TouchableOpacity>
                    }
                />

                <OKButton onClick={() => {
                    onConfirm(cities[select])
                }} />

            </Pressable>
        </Pressable>
    </Modal>
}



const OKButton = ({
    text = "OK",
    endColor = colors.endOrange,
    startorange = colors.startOrange,
    onClick,
}) => {
    return (
        <TouchableOpacity onPress={onClick} style={{ marginBottom: 38 }}>
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
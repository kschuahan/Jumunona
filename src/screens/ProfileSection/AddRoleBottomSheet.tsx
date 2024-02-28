import { Image, Modal, Pressable, Text, TouchableOpacity, View,
     TextInput, FlatList, Dimensions } from "react-native"
import { colors } from "../../utils/AppColors"
import { styles } from "../../utils/AppStyles"
import CloseIcon from '../../../assets/Icons/closeIcon.svg';
import { fontFamily } from "../../utils/Fonts";
import { appIcons, imagesUrl } from "../../utils/AppIcons";
import { } from "react-native-gesture-handler";
import { useMemo, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import { AppString } from "../../utils/AppStrings";
import CheckmarkCircle from '../../../assets/Icons/CircleOrange.svg';
import EllipsisHorizontalNormal from '../../../assets/Icons/CircleGrey.svg';
import Sholder from '../../../assets/Icons/Sholder.svg';
import Chest from '../../../assets/Icons/Chest.svg';
import West from '../../../assets/Icons/West.svg';

import Leg from '../../../assets/Icons/Leg.svg';

import Foot from '../../../assets/Icons/Foot.svg';




export const AddRoleBottomSheet = ({ data, isShow = false, onClose }) => {

    const [select, setSelect] = useState(0)
    const bodyData = useMemo(() => {
        return data.data.data
    }, [data])
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
                    { backgroundColor: 'rgba(0, 0,0, .7 )' },
                ]}>
                <Pressable
                    style={{
                        backgroundColor: colors.white,
                        borderRadius: 15,
                        padding: 10,
                        width: '95%',
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: "center"
                        }}>
                        <FlatList data={bodyData}
                            horizontal
                            style={{ marginStart: 4 }}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item, index }) =>
                                <TouchableOpacity onPress={() => {
                                    setSelect(index)
                                }} style={{ marginEnd: 10 }}>
                                    <Text style={[styles.textStyle,
                                    {
                                        color: select == index ? colors.lightOrange : '#999999',
                                        fontSize: 15, fontWeight: '500'
                                    }]}>{item.key}</Text>
                                </TouchableOpacity>
                            } />
                        <View>

                        </View>
                        <TouchableOpacity
                            style={{ marginEnd: 6 }}

                            onPress={() => {
                                onClose();
                            }}>
                            <CloseIcon width={12} height={12} />
                        </TouchableOpacity>
                    </View>


                    <Text style={[styles.textStyle,
                    {
                        color: '#333333',
                        fontSize: 16, fontWeight: '500', marginTop: 6
                    }]}>{bodyData[select].title}</Text>
                    <Text style={[styles.textStyle,
                    {
                        color: '#333333',
                        fontSize: 14
                    }]}>{bodyData[select].description}</Text>



                    <Image source={{ uri: bodyData[select].image[0] }}
                        style={{
                            marginTop: 15, borderRadius: 13,
                            height: 207, width: '100%',
                        }}  resizeMode="contain"/>

                </Pressable>
            </Pressable >
        </Modal >

    )
}


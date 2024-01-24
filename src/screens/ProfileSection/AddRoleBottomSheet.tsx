import { Image, Modal, Pressable, Text, TouchableOpacity, View, TextInput, FlatList } from "react-native"
import { colors } from "../../utils/AppColors"
import { styles } from "../../utils/AppStyles"
import CloseIcon from '../../../assets/Icons/closeIcon.svg';
import { fontFamily } from "../../utils/Fonts";
import { appIcons, imagesUrl } from "../../utils/AppIcons";
import { } from "react-native-gesture-handler";
import { useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import { AppString } from "../../utils/AppStrings";
import CheckmarkCircle from '../../../assets/Icons/CircleOrange.svg';
import EllipsisHorizontalNormal from '../../../assets/Icons/CircleGrey.svg';
import Sholder from '../../../assets/Icons/Sholder.svg';
import Chest from '../../../assets/Icons/Chest.svg';
import West from '../../../assets/Icons/West.svg';

import Leg from '../../../assets/Icons/Leg.svg';

import Foot from '../../../assets/Icons/Foot.svg';


const data = [
    {
        title: 'Как измерить ширину плеч:',
        subTitle: 'С поднятыми руками и опущенными плечами используйте рулетку для измерения расстояния между левым и правым плечом в самом широком месте.',
        Image: Sholder
    },
    {
        title: 'Как измерить обхват груди:',
        subTitle: 'Измерьте обхват груди, поместив рулетку плоско на самую высокую точку груди, удерживая ее горизонтально с переди и сзади, при этом поддерживая двухпалечное расстояние.',
        Image: Chest
    },
    {
        title: 'Как измерить талию:',
        subTitle: 'Расположите рулетку на самой узкой части талии и измерьте обхват талии параллельно земле.',
        Image: West
    },
    {
        title: 'Как измерить бедра:',
        subTitle: 'Измерьте обхват бедер, положив рулетку плоско на самую полную часть бедер, убедившись, что она параллельна земле.',
        Image: Leg
    },
    {
        title: 'Как измерить стопу:',
        subTitle: 'На листе бумаги нарисуйте контур стопы и, используя линейку, измерьте расстояние от кончика пятки до кончика пальца.',
        Image: Foot
    }
]


export const AddRoleBottomSheet = ({ isShow = false, onClose }) => {

    const [select, setSelect] = useState(0)
    const Icon = data[select].Image
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
                        <FlatList data={["Бедро", "Грудь", "Талия", "Бедро", "Ступня"]}
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
                                    }]}>{item}</Text>
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
                    }]}>{data[select].title}</Text>
                    <Text style={[styles.textStyle,
                    {
                        color: '#333333',
                        fontSize: 14
                    }]}>{data[select].subTitle}</Text>



                    <Icon style={{ marginTop: 15 }} />

                </Pressable>
            </Pressable >
        </Modal >

    )
}


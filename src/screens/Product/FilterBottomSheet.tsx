import {
    Modal,
    View,
    Image,
    Text,
    TouchableOpacity,
    FlatList,
    Pressable,
    Dimensions,
} from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { AppString } from '../../utils/AppStrings';
import { styles } from '../../utils/AppStyles';
import { appIcons, imagesUrl } from '../../utils/AppIcons';
import { colors } from '../../utils/AppColors';
import { fontFamily } from '../../utils/Fonts';
import CloseIcon from '../../../assets/Icons/closeIcon.svg';
import ShieldCheckmarkIcon from '../../../assets/Icons/sheildCheckmark.svg';
import Policy from '../../../assets/Icons/Policy.svg';

import ScaleIcon from '../../../assets/Icons/PhoneData.svg';
import AddCircleOutline from '../../../assets/Icons/AddCircle.svg';
import ChevronFwdOutline from '../../../assets/Icons/ForwardOrange.svg';
import ResizeIcon from '../../../assets/Icons/resizeIcon.svg';
import RemoveCircleOutline from '../../../assets/Icons/removeCircleOutline.svg';
import { CommonButton } from './ProductSearchResultScreen';

import DropDownGrey from '../../../assets/Icons/DropDownGrey.svg';
import DropDown from '../../../assets/Icons/DropDownMenu.svg';

const datas = [
    {
        title: 'Brand',
        data: ['GAP', 'GAP', 'GAP']
    },
    {
        title: 'Category',
        data: ['连帽', '加厚', '拉链款']
    },
    {
        title: 'Size',
        data: ['36', '38', '39', '40', '42']
    },
    {
        title: 'Style',
        data: ['连帽', '加厚', '拉链款']
    },
    {
        title: 'Skirt Length',
        data: ['36 cm', '38 cm', '39 cm']
    },
    {
        title: '适用性别',
        data: ['36 cm', '38 cm', '39 cm']
    },
    {
        title: '袖长',
        data: ['36 cm', '38 cm', '39 cm']
    },
    {
        title: '材质',
        data: ['36 cm', '38 cm', '39 cm']
    },
    {
        title: '工艺',
        data: ['36 cm', '38 cm', '39 cm']
    },
    {
        title: '袖型',
        data: ['36 cm', '38 cm', '39 cm']
    },
    {
        title: '衣门襟',
        data: ['36 cm', '38 cm', '39 cm']
    },
]

const FilterBottomSheet = ({ isShow = false, onClose }) => {

    return (
        <Modal
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
                        borderTopLeftRadius: 13,
                        borderTopRightRadius: 13,
                        width: '100%',
                        flex: 0.79,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingTop: 9,
                        }}>
                        <View />
                        <Text
                            style={[
                                styles.textStyle,
                                {
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    color: colors.balc111111,
                                },
                            ]}>
                            {AppString.filter}
                        </Text>
                        <TouchableOpacity
                            style={{ marginEnd: 7.11, marginTop: 6 }}
                            onPress={() => {
                                onClose();
                            }}>
                            <CloseIcon width={15} height={15} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        contentContainerStyle={{ paddingBottom: 100 }}
                        showsVerticalScrollIndicator={false}>
                        {/* //contries */}
                        <View>
                            <ItemDatas isIcon={true} onClick={() => {

                            }} />
                            <PriceRange onClick={() => {

                            }} />

                            <FlatList
                                data={datas}
                                scrollEnabled={false}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item, index }) =>
                                    <ItemDatas textmt={30} title={item.title} data={item.data} onClick={() => {

                                    }} />
                                }
                            />













                        </View>
                    </ScrollView>


                    <View
                        style={{
                            backgroundColor: colors.white,
                            position: 'absolute',
                            bottom: 0,
                            width: Dimensions.get('window').width,
                            paddingVertical: 12,
                            paddingTop: 6,
                            paddingHorizontal: 10,
                            borderTopStartRadius: 13,
                            borderTopEndRadius: 13,
                            shadowColor: colors.black,
                            elevation: 10,
                            height: 78,
                            borderBlockColor: colors.whiteF7F7F7,
                        }}>
                        <View style={{

                            justifyContent: 'center', alignItems: 'center',
                            flexDirection: 'row', paddingHorizontal: 10, marginTop: 6
                        }}>
                            <CommonButton startorange='#FCD82F' endColor='#FDCA30'
                                text={AppString.reset} onClick={() => {
                                    onClose()
                                }} />
                            <CommonButton startorange='#FE8C00'
                                endColor='#FC4A1A'
                                text={AppString.ready}
                                borderBottomStartRadius={0} borderBottomEndRadius={20}
                                borderTopEndRadius={20} borderTopStartRadius={0}
                                onClick={() => {
                                    onClose()

                                }} />
                        </View>
                    </View>
                </Pressable>
            </Pressable>
        </Modal >
    );
};


const PriceRange = ({ onClick, data = ['0-60', '60-168', '168-379'], }) => {
    const [selectUpdate, setSelectUpdate] = useState(-1)

    return <View style={{ marginTop: 20 }}>
        <TitleText text={"Диапазон цен"} />
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, alignItems: 'center', gap: 10 }}>
            <PriceMaxMIN onClick={() => { }} />
            <View style={{ backgroundColor: colors.greyCCCCCC, width: 12, height: 1 }} />
            <PriceMaxMIN onClick={() => { }} text='Максимальный' />

        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {data.map((item, index) =>
                <TouchableOpacity
                    onPress={() => {
                        setSelectUpdate(index)
                        onClick()
                    }}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 10,
                        borderRadius: 20,
                        height: 40,
                        paddingHorizontal: 20,
                        marginEnd: 13,
                        backgroundColor: selectUpdate == index ? colors.orangeFDF1EC : "#F6F6F6",
                        borderColor:
                            selectUpdate == index ? colors.lightOrange : '#F6F6F6',
                        borderWidth: 1
                    }}>

                    <Text style={[styles.textStyle, {
                        fontSize: 12,
                        color: '#0F0F0F'
                    }]}>{item}</Text>
                    <Text style={[styles.textStyle, {
                        color: '#969696'
                    }]}>Выбор {index == 0 ? '30' : '60'}%</Text>
                </TouchableOpacity>)}
        </View>
    </View>
}



const PriceMaxMIN = ({ selectUpdate = false, text = 'Минимальный', onClick }) => {

    return <TouchableOpacity onPress={onClick} style={{
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 18,
        height: 35,
        width: 165,
        paddingHorizontal: 15,
        justifyContent: 'center',
        backgroundColor: selectUpdate ? colors.orangeFDF1EC : "#F6F6F6",
        borderColor:
            selectUpdate ? colors.lightOrange : '#F6F6F6',
        borderWidth: 1
    }}>
        <Text style={[styles.textStyle, {
            fontSize: 15,
            color: '#7E7E7E'
        }]}>{text}</Text>
    </TouchableOpacity>
}

const ItemDatas = ({ isIcon = false, onClick,
    data = ['Китай', 'Таджикистан', 'Турция'],
    title = 'Страна', textmt = 12, borderRadius = 18 }) => {
    const [selectUpdate, setSelectUpdate] = useState(-1)
    const [select, setSelect] = useState(isIcon)

    return <View>
        {<View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
            <TitleText text={title} mt={textmt} />
            <TouchableOpacity onPress={() => {
                setSelect(!select)
            }} style={{
                justifyContent: 'center', alignItems: 'center',
                height: 20, width: 20, marginEnd: 4
            }} >
                {!isIcon ? select ? <DropDown height={10} width={10} /> :
                    <DropDownGrey height={10} width={10} /> : null}
            </TouchableOpacity>

        </View>
        }
        {select ? <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {data.map((item, index) =>
                <TouchableOpacity
                    onPress={() => {
                        setSelectUpdate(index)
                        onClick()
                    }}
                    style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginTop: 10,
                        borderRadius: borderRadius,
                        height: 35,
                        paddingHorizontal: 15,
                        marginEnd: 13,
                        backgroundColor: selectUpdate == index ? colors.orangeFDF1EC : "#F6F6F6",
                        borderColor:
                            selectUpdate == index ? colors.lightOrange : '#F6F6F6',
                        borderWidth: 1
                    }}>

                    {isIcon ? <Image source={appIcons.china} style={{ height: 15, width: 15, borderRadius: 8 }} />
                        : null}
                    <Text style={[styles.textStyle, {
                        fontSize: 14,
                        color: colors.balc111111, marginStart: isIcon ? 4 : undefined
                    }]}>{item}</Text>

                </TouchableOpacity>)}
        </View> : null}

    </View>

}


const TitleText = ({ text = 'Страна', mt = 12 }) => {

    return <Text
        style={[
            styles.textStyle,
            {
                fontSize: 16,
                fontWeight: 'bold',
                color: colors.balc111111,
                marginTop: mt
            },
        ]}>
        {text}
    </Text>
}

export default FilterBottomSheet;

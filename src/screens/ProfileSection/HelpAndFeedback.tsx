import { FlatList, Text, TouchableOpacity, View } from "react-native"
import { styles } from "../../utils/AppStyles"
import { CustomHeader } from "../../components/Header"
import { AppString } from "../../utils/AppStrings"
import { colors } from "../../utils/AppColors"
import { IconWithText } from "./WalletScreen"
import { useState } from "react"

import DropDownGrey from '../../../assets/Icons/DropDownGrey.svg';
import DropDown from '../../../assets/Icons/DropDownMenu.svg';


import Dislike from '../../../assets/Icons/Dislike.svg';
import Unlike from '../../../assets/Icons/Unlike.svg';
import Like from '../../../assets/Icons/Like.svg';
import DislikeActive from '../../../assets/Icons/DislikeActive.svg';

const data = [
    {
        title: 'Написанный вопрос',
        subTitle: 'Ваш друг или подруга должны зарегистрироваться используя ваш реферальный код для привязки'
    },
    {
        title: '购物车内商品无法删除',
        subTitle: ''
    },
    {
        title: '积分怎么算',
        subTitle: ''
    },
    {
        title: '购物车内商品无法删除',
        subTitle: ''
    },
    {
        title: '积分怎么算',
        subTitle: ''
    },
    {
        title: '购物车内商品无法删除',
        subTitle: ''
    },
    {
        title: '积分怎么算',
        subTitle: ''
    },
    {
        title: '购物车内商品无法删除',
        subTitle: ''
    },
    {
        title: '积分怎么算',
        subTitle: ''
    }
]


export const HelpAndFeedbackScreen = ({ navigation }) => {
    const [select, setSelect] = useState(0)
    const [like, setLike] = useState(-1)
    const [selectType, setSelectSelect] = useState(0)



    return <View style={[styles.container, { padding: 0 }]}>

        <CustomHeader navigation={navigation} title={AppString.feedback_and_help} />



        <View style={{
            backgroundColor: colors.white, padding: 10,
            borderRadius: 13, marginTop: 6, marginHorizontal: 10
        }}>
            <FlatList data={["Как оплатить", "Возврат", "Правило", "Замена"]}
                showsHorizontalScrollIndicator={false}
                horizontal
                renderItem={({ item, index }) =>
                    <TouchableOpacity style={{ marginEnd: 10 }} onPress={() => {
                        setSelectSelect(index)
                    }}>
                        <Text
                            style={[
                                styles.textStyle,
                                {
                                    fontSize: selectType == index ? 19 : 17,
                                    color: selectType == index ? colors.black : "#969696"
                                },
                            ]}>
                            {item}
                        </Text>
                    </TouchableOpacity>


                } />

            <FlatList data={data}
                showsVerticalScrollIndicator={false}
                style={{ marginTop: 20}}
                renderItem={({ item, index }) => {


                    return <View>
                        <TouchableOpacity onPress={() => {
                            setSelect(index)
                        }} style={{
                            justifyContent: 'space-between',
                            alignItems: 'center', flexDirection: 'row',
                            marginVertical: 2
                        }}>

                            <View>
                                <Text
                                    style={[
                                        styles.textStyle,
                                        { fontSize: 17, color: '#313131' },
                                    ]}>
                                    {item.title}
                                </Text>

                                {select == index ?
                                    <View>
                                        <Text
                                            style={[
                                                styles.textStyle,
                                                {
                                                    color: '#969696',
                                                    fontSize: 17,
                                                    marginTop: 10
                                                },
                                            ]}>
                                            Написанный ответ
                                        </Text>
                                        <View style={{
                                            justifyContent: 'center', alignItems: 'center',
                                            flexDirection: 'row', marginTop: 15, gap: 30
                                        }}>
                                            <IconWithText title="Помогло" Icon={like == 0 ? Like : Unlike} onClick={() => {
                                                setLike(0)
                                            }} />
                                            <IconWithText title="Не помогло" Icon={like == 1 ? DislikeActive : Dislike} onClick={() => {
                                                setLike(1)

                                            }} />
                                        </View>
                                    </View>
                                    : null}
                            </View>

                            <TouchableOpacity disabled={true} >
                                {select == index ? <DropDown height={10} width={10} /> : <DropDownGrey height={10} width={10} />}
                            </TouchableOpacity>

                        </TouchableOpacity>

                        {
                            index == data.length - 1 ? null : <View style={{ height: 1, backgroundColor: colors.whiteF6F6F6, marginVertical: 10 }} />
                        }
                    </View>
                }} />


        </View>

    </View>
}






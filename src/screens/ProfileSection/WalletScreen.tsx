import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { styles } from "../../utils/AppStyles"
import { BackLogo, LogoTitle, MenuLogo } from "../../components/Header"
import { AppString } from "../../utils/AppStrings"
import { colors } from "../../utils/AppColors"
import { imagesUrl } from "../../utils/AppIcons"
import CopyGrey from '../../../assets/Icons/CopyGrey.svg';
import Team from '../../../assets/Icons/Team.svg';

import DropDownGrey from '../../../assets/Icons/DropDownGrey.svg';
import DropDown from '../../../assets/Icons/DropDownMenu.svg';

import { useState } from "react"

import Dislike from '../../../assets/Icons/Dislike.svg';
import Unlike from '../../../assets/Icons/Unlike.svg';
import Like from '../../../assets/Icons/Like.svg';
import DislikeActive from '../../../assets/Icons/DislikeActive.svg';

const data = [
    {
        title: 'Как заработать?',
        subTitle: 'Ваш друг или подруга должны зарегистрироваться используя ваш реферальный код для привязки'
    },
    {
        title: 'Сколько я получу за одного человека?',
        subTitle: ''
    },
    {
        title: 'Как тратить J coin?',
        subTitle: ''
    },
    {
        title: 'Что такое моя команда?',
        subTitle: ''
    },
    {
        title: 'Чем отличается основная и вторичная?',
        subTitle: ''
    },
    {
        title: '购物车内商品无法删除',
        subTitle: ''
    },
]

export const WalletScreen = ({ navigation }) => {

    const [select, setSelect] = useState(0)


    return <View style={[styles.container]}>
        <View style={{
            justifyContent: 'space-between', height: 48,
            alignItems: 'center', flexDirection: 'row', paddingHorizontal: 8
        }}>
            <BackLogo navigation={navigation} />
            <LogoTitle title={AppString.wallet} />
            <MenuLogo onClick={() => {

            }} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>

            <Profile />

            <View style={{
                justifyContent: 'center',
                alignItems: 'center', flexDirection: 'row', gap: 40, marginTop: 15, marginStart: 30
            }}>
                <Count />
                <Count title="123" subTitle="Моя команда>" />

            </View>
            <InviteFriend />

            <View style={{ backgroundColor: colors.white, padding: 10, borderRadius: 13, marginTop: 12 }}>
                <Text
                    style={[
                        styles.textStyle,
                        { fontSize: 19, fontWeight: 'bold', marginBottom: 10 },
                    ]}>
                    {'Как приглашать друзей'}
                </Text>
                {
                    data.map((item, index) => {
                        const [like, setLike] = useState(-1)

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

                                    {select == index ? <View>
                                        <Text
                                            style={[
                                                styles.textStyle,
                                                {
                                                    color: '#969696',
                                                    fontSize: 17,
                                                    marginTop: 10
                                                },
                                            ]}>
                                            Ваш друг или подруга должны зарегистрироваться используя ваш реферальный код для привязки
                                        </Text>
                                        <View style={{
                                            justifyContent: 'center', alignItems: 'center',
                                            flexDirection: 'row', marginTop: 15, gap: 30
                                        }}>
                                            <IconWithText Icon={like == 0 ? Like : Unlike} onClick={() => {
                                                setLike(0)
                                            }} />
                                            <IconWithText title="Unhelpful" Icon={like == 1 ? DislikeActive : Dislike} onClick={() => {
                                                setLike(1)

                                            }} />
                                        </View>
                                    </View>
                                        : null}
                                </View>

                                <TouchableOpacity disabled={true} >
                                    {select == index ? <DropDown height={8} width={8} /> : <DropDownGrey height={8} width={8} />}
                                </TouchableOpacity>

                            </TouchableOpacity>

                            {
                                index == data.length - 1 ? null : <View style={{ height: 1, backgroundColor: colors.whiteF6F6F6, marginVertical: 10 }} />
                            }
                        </View>
                    })
                }
            </View>
        </ScrollView>
    </View>
}


export const IconWithText = ({ title = 'Helpful', Icon = Unlike, onClick }) => {

    return <TouchableOpacity onPress={onClick}
        style={{ alignItems: 'center', flexDirection: 'row', gap: 10 }}>

        <Icon />
        <Text
            style={[
                styles.textStyle,
                { fontSize: 13, color: '#A2A2A2' },
            ]}>
            {title}
        </Text>
    </TouchableOpacity>
}


const InviteFriend = () => {

    return <View style={{
        justifyContent: 'space-between', backgroundColor: colors.white,
        alignItems: 'center', flexDirection: 'row',
        marginTop: 15, padding: 10, borderRadius: 13
    }}>

        <View style={{
            backgroundColor: colors.white,
            alignItems: 'center', flexDirection: 'row',
            width: '76%', marginEnd: 10
        }}>
            <Team height={25} width={25} />

            <View style={{ paddingHorizontal: 8, }}>
                <Text
                    style={[
                        styles.textStyle,
                        { fontSize: 16, fontWeight: 'bold' },
                    ]}>
                    Пригласить друзей
                </Text>

                <Text
                    style={[
                        styles.textStyle,
                        {
                            color: '#979797',
                            fontSize: 14,
                        },
                    ]}>
                    Зарабатывайте, приглашая друзей!
                </Text>
            </View>
        </View>

        <TouchableOpacity style={{
            justifyContent: 'center', alignItems: 'center',
            backgroundColor: '#EB4B3A', height: 25, width: 77, borderRadius: 13
        }}>
            <Text
                style={[
                    styles.textStyle,
                    { fontSize: 12, color: colors.white },
                ]}>
                {"Пригласить"}
            </Text>
        </TouchableOpacity>
    </View>
}


const Count = ({ title = "321", subTitle = "Баланс>" }) => {

    return <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text
            style={[
                styles.textStyle,
                { fontSize: 30, fontWeight: '500' },
            ]}>
            {title}
        </Text>
        <Text
            style={[
                styles.textStyle,
                { fontSize: 13, fontWeight: 'bold' },
            ]}>
            {subTitle}
        </Text>
    </View>
}


const Profile = () => {

    return <View
        style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 10
        }}>
        <Image
            source={{ uri: imagesUrl.profile }}
            style={{ height: 70, width: 70, borderRadius: 35, marginStart: 9 }}
        />
        <View style={{ paddingHorizontal: 8, gap: 2 }}>
            <Text
                style={[
                    styles.textStyle,
                    { fontSize: 21, fontWeight: 'bold' },
                ]}>
                User name
            </Text>

            <Text
                style={[
                    styles.textStyle,
                    {
                        color: '#979797',
                        fontSize: 12,
                    },
                ]}>
                Мой реферальный код: Hemant <CopyGrey />
            </Text>
        </View>
    </View>
}
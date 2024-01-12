import { Dimensions, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { CustomHeader } from "../../components/Header"
import { styles } from "../../utils/AppStyles"
import { AppString } from "../../utils/AppStrings"
import React, { useState } from "react"
import { colors } from "../../utils/AppColors"
import ChevronFwdOutlineIcon from '../../../assets/Icons/chevronForwardOutline.svg';
import CameraReturn from '../../../assets/Icons/CameraReturn.svg';
import LinearGradient from "react-native-linear-gradient"
import { RegionBottonSheet } from "./RegionBottonSheet"
import { ReturnTimeBottonSheet } from "./ReturnTimeBottomSheet"
import { RouteNames } from "../../utils/RouteNames"
import App from "../../../App"
import { ColorSizeBottonSheet } from "./ColorSizeBottomSheet"

const deliveryStatus = ['Товар не получен', 'Товар получен']
const resion_for_return = ['Несоблюдение сроков отправки', 'Доставка не получена', 'Отсутствует информация о трекинге']

const returnForReasonForPurcase = ['7-дней возврат без причин',
    'Не соответствует описанию',
    'Задержка в доставке',
    'Плохое качество',
    'Неверный товар, отправленный продавцом',
    'Проблема с качеством изготовления',
    'Отсутствуют детали',
    'Не нравится',
    'Неверный товар, отправленный продавцом',
    'Отсутствуют детали'
]


const reasonForExchange = ['Размер не подходит',
    'Продавец отправил неверный товар',
    'Проблема с качеством изготовления',
    'Поврежденный или пачканный товар',
    'Плохое качество'
]


export const RefundScreen = ({ navigation, route }) => {
    const title = route.params.title
    const [note, setNote] = useState("")
    const [showDeliveryStatus, setShowDeliveryStatus] = useState(false)
    const [showRegisonForReturn, setshowRegisonForReturn] = useState(false)
    const [showReturnTime, setshowReturnTime] = useState(false)
    const [showColorSize, setshowColorSize] = useState(false)

    return <View style={[styles.container, { padding: 0 }]}>
        <CustomHeader navigation={navigation} title={title} />

        <ScrollView showsVerticalScrollIndicator={false}>

            <View style={{
                marginHorizontal: 6, marginTop: 9,
                backgroundColor: colors.white, borderRadius: 13, padding: 10, paddingBottom: 4, paddingTop: 6
            }}>
                {title == AppString.refund ? <View>
                    <TextWithIcon
                        title={AppString.delivery_status}
                        value={AppString.select}
                        onClick={() => {
                            setShowDeliveryStatus(true)
                        }}
                    />
                    <View style={{ height: 1, backgroundColor: '#EDEDED' }} />
                </View> : null}


                <TextWithIcon
                    title={AppString.resion_for_return}
                    value={AppString.select}
                    onClick={() => {
                        setshowRegisonForReturn(true)
                    }}
                />


                {
                    title == AppString.exchange_for_goods ? <View>
                        <View style={{ height: 1, backgroundColor: '#EDEDED' }} />

                        <TextWithIcon
                            title={AppString.substitution}
                            value={AppString.select}
                            onClick={() => {
                                setshowColorSize(true)
                            }}
                        />
                    </View> : null
                }

                <View style={{ height: 1, backgroundColor: '#EDEDED' }} />

                {
                    title == AppString.exchange_for_goods ? <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10
                        }}>

                        <View
                            style={{
                                flexDirection: "column", width: '78%'
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 17,
                                    color: colors.black14100D
                                }}
                            >
                                {'Valijon'} <Text
                                    style={{
                                        fontSize: 12,
                                        fontWeight: '400',
                                        color: colors.grey9D9D9D
                                    }}
                                >86-18620791015</Text>
                            </Text>
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: '400',

                                    color: colors.grey9D9D9D
                                }}
                            >
                                {'Address of Xian Village Street, Tianhe, Guangzhou City, Guangdong Province'}
                            </Text>
                        </View>
                        <TouchableOpacity style={{
                            borderColor: '#9E9E9E',
                            height: 29,
                            width: 81,
                            justifyContent: 'center',
                            alignItems: 'center',

                        }}
                            onPress={() => {
                                navigation.navigate(RouteNames.changeAddress)

                            }}
                        >
                            <Text style={[styles.textStyle, { fontSize: 14, color: '#FF7600' }]}>{AppString.change}</Text>
                        </TouchableOpacity>
                    </View> : null
                }

                {title != AppString.exchange_for_goods ? <TextWithIcon
                    title={AppString.refund_amount}
                    value={'280с.'}
                    onClick={() => { }}
                    isClick={false}
                    disabled={true}
                /> : null}
            </View>
            {
                title != AppString.refund ? <View style={{
                    marginHorizontal: 6, marginTop: 9,
                    backgroundColor: colors.white, borderRadius: 13, padding: 10, paddingBottom: 6, paddingTop: 6
                }}>

                    <TextWithIcon
                        title={AppString.select_return_time}
                        value={AppString.select}
                        onClick={() => {
                            setshowReturnTime(true)
                        }}
                        isStar={false}
                    />
                </View> : null

            }

            <View style={{
                marginHorizontal: 6, marginTop: 9,
                backgroundColor: colors.white, borderRadius: 13, padding: 10, paddingVertical: 13
            }}>
                <Text
                    style={[
                        styles.textStyle,
                        { fontSize: 17, color: colors.black121212, fontWeight: 'bold' },
                    ]}>{AppString.additional_description}</Text>


                <View style={{
                    marginTop: 10,
                    borderRadius: 5,
                    backgroundColor: colors.whiteF6F6F6,
                }}>
                    <View>
                        <TextInput
                            value={note}
                            placeholder="Дополнительное описание помогает продавцам лучше справляться с проблемами послепродаж"
                            placeholderTextColor={'#979797'}
                            maxLength={200}
                            style={{
                                height: 80,

                                borderRadius: 13,
                                textAlign: "auto",
                                padding: 13,
                                paddingVertical: 10,
                                fontWeight: '400',
                                fontSize: 15,
                                verticalAlign: 'top',

                            }}
                            onChangeText={(text) => {
                                setNote(text)
                            }}
                            multiline={true}

                        />
                        <Text style={[styles.textStyle, {
                            fontSize: 14, color: '#CACACA'
                            , position: 'absolute', bottom: -10, end: 12
                        }]}>{`${note.length}/200`}</Text>

                    </View>
                    <TouchableOpacity disabled={true} style={{
                        borderWidth: 1,
                        borderColor: '#9A9A9A', borderStyle: 'dashed',
                        height: 69, width: 71, justifyContent: 'center', alignItems: 'center',
                        borderRadius: 8, marginHorizontal: 10, marginBottom: 10
                    }}>

                        <CameraReturn />
                        <Text
                            style={[
                                styles.textStyle,
                                { fontSize: 10, color: '#9A9A9A' },
                            ]}>{"Загрузить\n(макс 3)"}</Text>

                    </TouchableOpacity>

                </View>



            </View>


            {title == AppString.exchange_for_goods ? <TouchableOpacity onPress={() => {
                navigation.navigate(RouteNames.term_of_use)
            }} style={{ marginHorizontal: 10, marginTop: 10 }}>
                <Text
                    style={[
                        styles.textStyle,
                        { fontSize: 12, color: '#999999' },
                    ]}>
                    Обмен только по той же цене, подробности
                    <Text
                        style={[
                            styles.textStyle,
                            { fontSize: 12, color: '#FF7600' },
                        ]}> см. в правилах</Text>
                </Text>
            </TouchableOpacity> : null}
        </ScrollView>

        <BottomView navigation={navigation} enable={note != ''} />
        <RegionBottonSheet data={showDeliveryStatus ? deliveryStatus
            : title == AppString.purchase_return ? returnForReasonForPurcase :
                title == AppString.exchange_for_goods ? reasonForExchange : resion_for_return
        } title={showDeliveryStatus ? AppString.delivery_status :
            title == AppString.exchange_for_goods ? AppString.reason_for_exchange : AppString.resion_for_return}
            isShow={showDeliveryStatus || showRegisonForReturn} onClose={(item: string) => {
                setShowDeliveryStatus(false)
                setshowRegisonForReturn(false)
            }} />

        <ReturnTimeBottonSheet isShow={showReturnTime} onClose={(item: string) => {
            setshowReturnTime(false)
        }} />
        <ColorSizeBottonSheet isShow={showColorSize} onClose={(item: string) => {
            setshowColorSize(false)
        }} />
    </View>
}



const BottomView = ({ navigation, enable = false }) => {
    return <View
        style={{
            backgroundColor: colors.white,
            position: 'absolute',
            bottom: 0,
            width: Dimensions.get('window').width,
            justifyContent: 'space-between',
            paddingVertical: 12,
            paddingHorizontal: 10,
            paddingTop: 10,
            flexDirection: 'row',
            borderTopStartRadius: 13,
            borderTopEndRadius: 13,
            shadowColor: colors.black,
            elevation: 10,
            height: 67,
            borderBlockColor: colors.whiteF7F7F7,
            borderBottomWidth: 1
        }}>

        <CommonButton
            text={AppString.send_request}
            enable={enable}
            onClick={() => {
                navigation.goBack()
                // navigation.navigate(RouteNames.cartConfirmOrder)
            }}
        />

    </View>
}



const CommonButton = ({
    text = AppString.pay,
    endColor = colors.endOrange,
    startorange = colors.startOrange,
    enable = false,
    onClick,
}) => {
    return (
        <TouchableOpacity disabled={!enable} style={{ width: '100%' }} onPress={onClick}>
            <LinearGradient
                colors={[enable ? startorange : '#E7E7E7', enable ? endColor : '#E7E7E7']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                    borderRadius: 20,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%'
                }}>
                <Text
                    style={[
                        styles.textStyle,
                        { color: enable ? colors.white : '#979797', fontWeight: '400', fontSize: 16, paddingHorizontal: 19 },
                    ]}>
                    {text}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};


const TextWithIcon = ({ title = AppString.address, value = '',
    onClick, isClick = true, disabled = false, isStar = false }) => {
    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onClick}
            style={[
                styles.profile,
                {
                    marginTop: undefined,
                    alignItems: 'center',

                    paddingVertical: 10,
                },
            ]}>
            <Text
                style={[
                    styles.textStyle,
                    { fontSize: 16, color: colors.black121212 },
                ]}>
                {title}{isStar ? <Text
                    style={[
                        styles.textStyle,
                        { fontSize: 16, color: colors.lightOrange },
                    ]}>
                    {'*'}
                </Text> : null}
            </Text>

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text
                    style={[
                        styles.textStyle,
                        {
                            fontSize: disabled ? 20 : 16,
                            fontWeight: disabled ? 'bold' : '400',
                            color: disabled ? colors.balc111111 : '#A5A5A5',
                        },
                    ]}>
                    {value}
                </Text>
                {isClick ? <ChevronFwdOutlineIcon
                    color={colors.greyCCCCCC}
                    width={12}
                    height={12}
                    style={{ marginTop: 2 }}
                /> : null}
            </View>
        </TouchableOpacity>
    );
};
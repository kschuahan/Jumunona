import { ScrollView, View, FlatList, Text, TouchableOpacity, Image } from "react-native"
import { CustomHeader } from "../../components/Header"
import { styles } from "../../utils/AppStyles"
import { AppString } from "../../utils/AppStrings"
import { colors } from "../../utils/AppColors"
import { appIcons } from "../../utils/AppIcons"
import CopyIcon from '../../../assets/Icons/CopyIcon.svg';
import ChatIcon from '../../../assets/Icons/ChatGreen.svg';
import { RouteNames } from "../../utils/RouteNames"
import LinearGradient from "react-native-linear-gradient"

export const ExchangeDetailScreen = ({ navigation, route }) => {

    const returnInProgress = route.params.returnInProgress != undefined ? route.params.returnInProgress : true
    const returnCanceled = route.params.returnCanceled != undefined ? route.params.returnCanceled : true

    return (
        <View style={[styles.container, { padding: 0 }]}>
            <CustomHeader navigation={navigation} title={AppString.exchange_detail} />

            <ScrollView showsVerticalScrollIndicator={false}
                style={{
                    paddingHorizontal: 6,
                    paddingVertical: 9,
                    
                }}
            >
                { returnInProgress ? 
                <ReturnState />
               : <ReturnCompleteCancelView returnCompleted = {returnCanceled} />

            }
            <RefundInformation onClick={() => {
                navigation.push(RouteNames.chat_screen);

            }} />
            </ScrollView>

        </View>
    )
}

const ReturnState = () => {
    const states = ["Запрос отправлен", "Обработка запроса", "Вернуть товар", "Обработка возврата", "Возврат завершен"]
    const currentState = 3
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colors.white,
                paddingHorizontal: 12,
                paddingTop: 17,
                borderRadius: 13
            }}
        >
            <FlatList
                scrollEnabled={false}
                data={states}
                renderItem={({ item, index }) =>
                    <View
                        style={{
                            flexDirection: "row",


                        }}
                    >
                        <View
                            style={{
                                flexDirection: "column",
                                gap: 5,
                                alignItems: "center",
                                paddingTop: 5,
                            }}
                        >
                            <View
                                style={{
                                    width: 10, height: 10, borderRadius: 5,
                                    backgroundColor: (index == currentState ? colors.lightOrange : index < currentState ? colors.white : colors.greyCCCCCC),
                                    borderColor: (index <= currentState ? colors.lightOrange : colors.greyCCCCCC),
                                    borderWidth: 1
                                }}
                            ></View>
                            {index == states.length - 1 ? null :
                                <View
                                    style={{
                                        width: 1,
                                        flex: 1,
                                        minHeight: 21,
                                        backgroundColor: (index < currentState ? colors.lightOrange : colors.greyCCCCCC)
                                    }}
                                >
                                </View>
                            }

                        </View>

                        <View
                            style={{
                                paddingStart: 7, paddingBottom: 19,
                            }}
                        >
                            <Text
                                style={{
                                    color: (index == currentState ? colors.lightOrange : index < currentState ? colors.black121212 : "#999999"),
                                    fontSize: 17,
                                    fontWeight: (index == currentState ? "bold" : "400")
                                }}
                            >
                                {item}
                                {
                                    index == currentState ?
                                        <Text
                                            style={{
                                                color: colors.balc111111,
                                                fontSize: 17,
                                                fontWeight: "400"
                                            }}
                                        >
                                            {" "} Осталось 8 дней
                                        </Text>
                                        : null
                                }
                            </Text>

                            {
                                index == currentState ?
                                    <View
                                        style={{
                                            paddingVertical: 9,
                                            gap: 9
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: colors.lightOrange,
                                                fontSize: 17,
                                                fontWeight: "400"
                                            }}
                                        >
                                            Если продавец принимает возвращенный товар, ваш возврат будет обработан.
                                        </Text>
                                        <Text
                                            style={{
                                                color: "#999999",
                                                fontSize: 17,
                                                fontWeight: "400"
                                            }}
                                        >
                                            Если продавец отклоняет возврат, вы можете изменить запрос на возврат. Если продавец не обрабатывает возврат в установленный срок, возврат будет обработан автоматически.
                                        </Text>
                                    </View>

                                    : null
                            }

                        </View>
                    </View>
                }
            />
        </View>
    )
}


const RefundInformation = ({ onClick }) => {

    return <View style={{
         marginTop: 9,
        backgroundColor: colors.white, borderRadius: 13, padding: 10,  marginBottom: 100
    }}>

        <Text style={[styles.textStyle,
        { fontSize: 17, fontWeight: 'bold' }]}>{AppString.refund_information}</Text>

        <TouchableOpacity
            disabled={true}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                marginTop: 8,
                marginBottom: 15

            }}>

            <Image
                source={appIcons.shoeImageURL}
                style={{ width: 92, height: 92, borderRadius: 13, }}
            />
            <View
                style={{
                    justifyContent: 'space-between',
                    height: 86,
                    paddingStart: 9.5,
                    width: "75%"
                }}>
                <View >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignContent: "space-between"
                        }}
                    >
                        <Text style={{ fontSize: 15, fontWeight: '600', color: colors.balc111111, width: "80%", maxHeight: 30 }} numberOfLines={1}>
                            若过度长的话只显示第一行
                        </Text>
                        <Text style={{ fontSize: 16, fontWeight: '400', color: colors.balc111111 }} numberOfLines={2}>
                            368c.
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignContent: "space-between",
                            paddingTop: 6
                        }}
                    >
                        <Text style={{ fontSize: 14, fontWeight: '400', color: colors.grayAAAAAA, width: "80%", maxHeight: 30 }} numberOfLines={2}>
                            White; 38
                        </Text>
                        <Text style={{ fontSize: 14, fontWeight: '400', color: colors.grayAAAAAA }} numberOfLines={2}>
                            x1
                        </Text>
                    </View>
                </View>


            </View>


        </TouchableOpacity>

        <TextWithIcon />
        <TextWithIcon title={AppString.refund_amount} subTitle="368с." />

        <TextWithIcon title={AppString.request_time} subTitle="2021-11-30 13:06:43" />

        <TextWithIcon title={AppString.order_id} subTitle="1231231231321321321321" isOrderId={true} />

        <TouchableOpacity onPress={onClick} style={{
            justifyContent: 'center', alignItems: 'center',
            flexDirection: 'row', gap: 4, marginTop: 6
        }}>
            <ChatIcon />
            <Text style={[styles.textStyle, { fontSize: 15, color: '#666666' }]}>
                {AppString.contact_to_seller}
            </Text>
        </TouchableOpacity>
    </View>
}



const TextWithIcon = ({ title = AppString.resion_for_return, subTitle = "Плохое качество",
    mb = 10, isOrderId = false }) => {

    return <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between', alignItems: 'center', marginBottom: 10
    }}>

        <Text style={[styles.textStyle,
        { color: colors.balc111111, fontSize: 15 }]}>{title}</Text>
        <Text style={[styles.textStyle,
        { color: '#9C9C9C', fontSize: 15 }]}>{subTitle}
            {isOrderId ? <TouchableOpacity>
                <CopyIcon />
            </TouchableOpacity> : null}
        </Text>

    </View>
}

const ReturnCompleteCancelView = ({returnCompleted = false}) => {
    
    return (
        <LinearGradient
                        colors={returnCompleted ? [colors.startOrange, colors.endOrange] : ["#A4A4A4", "#C2C2C2"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                            borderRadius: 13,
                            paddingHorizontal: 18, 
                            paddingVertical: 14
                        }}>
             <Text style={[styles.textStyle, { fontSize: 18, color: colors.white, fontWeight: "bold", paddingBottom: 6 }]}>
             {returnCompleted ? "Обмен успешно завершен" : "Обмен отменён" }
            </Text>
            <Text style={[styles.textStyle, { fontSize: 13, color: colors.white, fontWeight: "400", paddingBottom: 14 }]}>
            2021-11-30 13:06
            </Text>
            <Text style={[styles.textStyle, { fontSize: 16, color: colors.white, fontWeight: "400" }]}>
             {returnCompleted ? "Новый товар получен и завершен" : "Вы отменили свой запрос на обмен, обмен закрыт" }
            </Text>
        </LinearGradient>
    )
}
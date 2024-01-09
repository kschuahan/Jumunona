import { Image, TouchableOpacity, View } from "react-native"
import { styles } from "../../utils/AppStyles"
import { CustomHeader } from "../../components/Header"
import { AppString } from "../../utils/AppStrings"
import { ScrollView } from "react-native-virtualized-view"
import { colors } from "../../utils/AppColors"
import { Text } from "react-native"
import { appIcons } from "../../utils/AppIcons"
import ChatIcon from '../../../assets/Icons/ChatGreen.svg';
import { RouteNames } from "../../utils/RouteNames"
import CopyIcon from '../../../assets/Icons/CopyIcon.svg';


export const ReturnSucessfullyScreen = ({ navigation }) => {

    return <View style={[styles.container, { padding: 0 }]}>
        <CustomHeader navigation={navigation} title={AppString.return_details} />

        <ScrollView showsVerticalScrollIndicator={false}>

            <RefundDetails />

            <RefundInformation onClick={() => {
                navigation.push(RouteNames.chat_screen);

            }} />
        </ScrollView>

    </View>
}


const RefundInformation = ({ onClick }) => {

    return <View style={{
        marginHorizontal: 6, marginTop: 9,
        backgroundColor: colors.white, borderRadius: 13, padding: 10
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

const RefundDetails = () => {
    return <View style={{
        marginHorizontal: 6, marginTop: 5,
        backgroundColor: colors.white, borderRadius: 13, padding: 10
    }}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

            <Text style={[styles.textStyle,
            { color: colors.lightOrange, fontSize: 18, fontWeight: 'bold' }]}>{AppString.reefund_completed}</Text>
            <Text style={[styles.textStyle,
            { color: colors.lightOrange, fontSize: 24, fontWeight: 'bold' }]}>{"162"}
                <Text style={[styles.textStyle,
                { color: colors.lightOrange, fontSize: 20, fontWeight: 'bold' }]}>с.</Text></Text>

        </View>

        <Text style={[styles.textStyle,
        { color: colors.grey, fontSize: 14, marginTop: -6 }]}>{'2021-11-30 13:06'}</Text>

        <Text style={[styles.textStyle,
        { fontSize: 15, marginVertical: 6 }]}>{'Возврат 100 J'}</Text>

        <Text style={[styles.textStyle,
        { fontSize: 15, }]}>{'Возврат на банковскую карту (Alif 5050)'}</Text>

    </View>
}
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { CustomHeader } from "../../components/Header"
import { styles } from "../../utils/AppStyles"
import { AppString } from "../../utils/AppStrings"
import { colors } from "../../utils/AppColors"
import { appIcons, imagesUrl } from "../../utils/AppIcons"
import App from "../../../App"
import ReturnIcon from '../../../assets/Icons/ReturnIcon.svg';

import ChevronFwdOutline from '../../../assets/Icons/chevronForwardOutline.svg';
import ExchangeIcon from '../../../assets/Icons/ExchangeIcon.svg';
import ForwardIcon from '../../../assets/Icons/ForwardIcon.svg';
import { RouteNames } from "../../utils/RouteNames"





export const SelectReturnReason = ({ navigation }) => {

    return <View style={[styles.container, { padding: 0 }]}>
        <CustomHeader navigation={navigation} title={AppString.select_return_type} />

        <ScrollView showsVerticalScrollIndicator={false}>
            <Product />
            <SelectService navigation={navigation} />

        </ScrollView>

    </View>
}

const SelectService = ({ navigation }) => {

    return <View style={{
        marginHorizontal: 9, marginTop: 9,
        backgroundColor: colors.white, borderRadius: 13, padding: 10, paddingBottom: 13, paddingTop: 6
    }}>
        <Text style={{
            fontSize: 17, fontWeight: 'bold', color: colors.balc111111,
        }} numberOfLines={1}>
            {AppString.select_service_type}
        </Text>

        <IconWithText onClick={() => {
            navigation.navigate(RouteNames.refund, { title: AppString.refund })
        }} mt={6} />

        <IconWithText Icon={ForwardIcon} title={AppString.I_want_to_return_the_monwy_and_gooda}
            subTitle="Получил товар и нужно вернуть полученный товар" onClick={() => {
                navigation.navigate(RouteNames.refund, { title: AppString.purchase_return })
            }} />
        <IconWithText Icon={ExchangeIcon} title={AppString.I_want_to_exchange_item}
            subTitle="Получил и нужно заменить полученный товар" onClick={() => {
                navigation.navigate(RouteNames.refund, { title: AppString.exchange_for_goods })
            }} />
    </View>

}


const IconWithText = ({ Icon = ReturnIcon, title = AppString.I_want_to_return_the_monwy,
    subTitle = 'Не получил товар, или договорился с продавцом о согласии не возвращать товар, а вернуть деньги',
    onClick, mt = 5 }) => {

    return <TouchableOpacity onPress={onClick} style={{ flexDirection: 'row', width: '100%', marginTop: mt }}>

        <Icon style={{ marginTop: 10 }} />
        <View style={{ marginStart: 10, width: '92%' }}>

            <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}><Text style={{
                fontSize: 17, fontWeight: 'bold', color: colors.balc111111,
            }} numberOfLines={1}>
                {title}
            </Text>
                <ChevronFwdOutline width={12} height={12} style={{ marginEnd: 2, marginTop: 10 }} />

            </View>
            <Text style={{
                fontSize: 14, fontWeight: '400', color: '#A5A5A5',
            }} >
                {subTitle}
            </Text>
        </View>
    </TouchableOpacity>
}

const Product = () => {

    return <View style={{
        marginHorizontal: 9, marginTop: 5,
        backgroundColor: colors.white, borderRadius: 13, padding: 10, paddingVertical: 13
    }}>

        <Text style={{
            fontSize: 17, fontWeight: 'bold', color: colors.balc111111,
        }} numberOfLines={1}>
            {AppString.purchase_return}
        </Text>

        <TouchableOpacity
            disabled={true}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                marginTop: 10

            }}>

            <Image
                source={appIcons.shoeImageURL}
                style={{ width: 91, height: 91, borderRadius: 13, }}
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
                        <Text style={{ fontSize: 14, fontWeight: '600', color: '#0F0F0F', width: "80%", maxHeight: 30 }} numberOfLines={1}>
                            若过度长的话只显示第一行
                        </Text>
                        <Text style={{ fontSize: 14, fontWeight: '400', color: colors.balc111111 }} numberOfLines={2}>
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

    </View>
}
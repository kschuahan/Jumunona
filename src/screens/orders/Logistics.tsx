import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { CustomHeader } from "../../components/Header"
import { styles } from "../../utils/AppStyles"
import { AppString } from "../../utils/AppStrings"
import { appIcons } from "../../utils/AppIcons"
import { colors } from "../../utils/AppColors"
import CheckIcon from '../../../assets/Icons/CheckIcon.svg';
import CheckOrange from '../../../assets/Icons/CheckWithOrnage.svg';
import ProfileIcon from '../../../assets/Icons/ProfileIcon.svg';

import { RatingView } from "../Product/ProductDetailScreen"
import CopyGrey from '../../../assets/Icons/CopyGrey.svg';
import MobileIcon from '../../../assets/Icons/MobileIcon.svg';
import DropDownGrey from '../../../assets/Icons/DropDownGrey.svg';
import DeliveryGrey from '../../../assets/Icons/DeliveryGrey.svg';
import DeliveryOrnage from '../../../assets/Icons/DeliveryIcon.svg';
import FileIcons from '../../../assets/Icons/FilesIcons.svg';

import { useState } from "react"
import { RelatedProducts } from "./MyOrders"
import { RouteNames } from "../../utils/RouteNames"



export const LogisticsScreen = ({ navigation }) => {

    return <View style={[styles.container, { padding: 0 }]}>
        <CustomHeader navigation={navigation} title={AppString.review} />

        <ScrollView showsVerticalScrollIndicator={false}>
            <Feedback onClick={() => {
                navigation.navigate(RouteNames.review)
            }} />
            <TrackLogisstics />
            <RelatedProducts onclick={() => {
                navigation.navigate(RouteNames.product_detail)
            }} />
        </ScrollView>

    </View>
}


const TrackLogisstics = () => {

    const [show, setShow] = useState(false)

    return <View style={{
        marginHorizontal: 6, marginTop: 9,
        backgroundColor: colors.white, borderRadius: 13, padding: 10, paddingVertical: 15
    }}>

        <View style={{
            flexDirection: 'row', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: 15
        }}>

            <Text style={[styles.textStyle,
            { color: '#393939', fontSize: 14, marginStart: 10 }]}>{'YT865422354862'}</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, paddingEnd: 10 }}>

                <TouchableOpacity>
                    <CopyGrey />
                </TouchableOpacity>
                <TouchableOpacity>
                    <MobileIcon />
                </TouchableOpacity>
            </View>


        </View>
        <IconWithText subTitle="Будем рады вам снова!" />

        <IconWithText Icon={ProfileIcon} title="Доставляется" time="02-27 15:44" lineHight={16} />
        {
            show ? <View>
                <IconWithText Icon={DeliveryGrey} title="Прибыл в {название города}"
                    time="02-29 15:44" lineHight={22} />
                <IconWithText Icon={DeliveryGrey} title="Прибыл в Ташкент"
                    time="02-27 15:44" lineHight={22} isIcon={false} />
                <IconWithText Icon={DeliveryGrey} title="Прибыл в Астану"
                    time="02-27 15:44" lineHight={22} isIcon={false} />
                <IconWithText Icon={DeliveryGrey} title="Прибыл в Урумчи"
                    time="02-27 15:44" lineHight={22} isIcon={false} />

                <IconWithText Icon={DeliveryGrey} title="Отправлено в {название города}"
                    time="02-27 15:44" lineHight={22} isIcon={false} />
                <IconWithText Icon={DeliveryGrey} title="Транзитный склад"
                    time="02-27 15:44" lineHight={22} isIcon={false} />
                <IconWithText Icon={DeliveryGrey} title="Прибыл в Гуанчжоу"
                    time="02-27 15:44" lineHight={22} isIcon={false} />

                <IconWithText Icon={DeliveryOrnage} title="Отправлено в Гуанчжоу"
                    time="02-29 15:44" lineHight={22} matop={-5} />
                <IconWithText Icon={FileIcons} title="Заказ размещен"
                    time="02-27 15:44" lineHight={22} isLine={false} />
            </View> : null
        }

        <TouchableOpacity onPress={() => {
            setShow(!show)
        }} style={{
            alignSelf: 'center', flexDirection: 'row', gap: 4,
            justifyContent: 'center', alignItems: 'center'
        }}>
            <Text style={[styles.textStyle, { color: '#A0A0A0', fontSize: 13 }]}>
                {AppString.all_information}
            </Text>
            <DropDownGrey height={8} width={8} style={{ marginTop: 4 }} />
        </TouchableOpacity>
    </View>

}


const IconWithText = ({ isLine = true,
    title = 'Подтверждено получение',
    subTitle = '',
    time = '02-29 15:44',
    Icon = CheckOrange,
    lineHight = 35, isIcon = true, matop = undefined }) => {

    return <View style={{ flexDirection: 'row', marginTop: !isIcon ? -10 : matop }}>

        <View style={{ justifyContent: 'center', alignItems: 'center', width: 24, }}>
            {isIcon ? <Icon height={24} width={24} /> : <View style={{
                backgroundColor: '#CCCCCC',
                borderRadius: 2.5, width: 5, height: 5
            }} />}
            {<View style={{
                backgroundColor: isLine ? '#E6E6E6' : colors.white, width: 1,
                height: lineHight
            }} />}
        </View>
        <View style={{ marginStart: 8 }}>
            <Text style={[styles.textStyle,
            { color: '#3F3F3F', fontSize: isIcon ? 15 : 13, fontWeight: isIcon ? 'bold' : '400' }]}>{title}  <Text style={[styles.textStyle,
            { color: '#3F3F3F', fontSize: 13, }]}>{time}</Text>
            </Text>
            <Text style={[styles.textStyle,
            { color: '#3F3F3F', fontSize: 13, }]}>{subTitle}</Text>
        </View>
    </View>
}

const Feedback = ({ onClick }) => {

    return <View style={{
        marginHorizontal: 6, marginTop: 5,
        backgroundColor: '#FBFCFD', borderRadius: 13
    }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 14 }}>

            <Image
                source={appIcons.shoeImageURL}
                style={{ width: 24, height: 24, borderRadius: 2, }}
            />
            <Text style={[styles.textStyle,
            { color: '#383839', fontSize: 17, marginStart: 10 }]}>{AppString.recieved}</Text>

        </View>

        <View style={{
            marginTop: 5,
            backgroundColor: colors.white, borderRadius: 13,
            flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 16,
        }}>

            <CheckIcon />
            <View style={{
                paddingHorizontal: 6, width: '90%'
            }}>

                <Text style={[styles.textStyle,
                { color: '#111111', fontSize: 16, marginStart: 10 }]}>{AppString.your_feedback_help_us_to_improve}</Text>

                <Text style={[styles.textStyle,
                { color: '#999999', fontSize: 13, marginStart: 10 }]}>{'Tianhe District, Guangzhou City, Guangdong Province Room 5450, District G1, Building 88, 186****1015'}</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6, gap: 10 }}>
                    <RatingView rating={0} size={18} />


                    <TouchableOpacity onPress={onClick} style={{
                        height: 18, width: 65, borderRadius: 3, backgroundColor: '#FDF1EC',
                        justifyContent: 'center', alignItems: 'center'
                    }}>

                        <Text style={[styles.textStyle,
                        { color: colors.lightOrange, fontSize: 13 }]}>{AppString.estimate}</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    </View>
}
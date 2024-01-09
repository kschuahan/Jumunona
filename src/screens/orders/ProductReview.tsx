import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { CustomHeader } from "../../components/Header"
import { AppString } from "../../utils/AppStrings"
import { styles } from "../../utils/AppStyles"
import { colors } from "../../utils/AppColors"
import { appIcons } from "../../utils/AppIcons"
import { RatingView } from "../Product/ProductDetailScreen"

import LightStarOrange from '../../../assets/Icons/LightStarOrange.svg';
import CameraIcon from '../../../assets/Icons/CameraIcon.svg';
import HeartRed from '../../../assets/Icons/heartRed.svg';

import QuesGrey from '../../../assets/Icons/QuesGrey.svg';
import QuesRed from '../../../assets/Icons/QuesRed.svg';
import OrangeCheck from '../../../assets/Icons/CircleOrange.svg';
import LinearGradient from "react-native-linear-gradient"
import EmptyStar from '../../../assets/Icons/EmptyStar.svg';
import { useState } from "react"
import { HelpPopup, LeaveCommentPopup } from "../../components/Dialogs"


export const ProductReviewScreen = ({ navigation }) => {


    return <View style={[styles.container, { padding: 0 }]}>
        <CustomHeader navigation={navigation} title={AppString.details} />

        <ScrollView showsVerticalScrollIndicator={false}>

            <LineWithText />
            <RatingWithDesign />
            <RatingSubmitDesign />

        </ScrollView>
        <BottomView navigation={navigation} />
    </View>

}


const RatingSubmitDesign = () => {

    const [rating, setRating] = useState(0)

    return <View style={{
        marginHorizontal: 9, marginTop: 11,
        backgroundColor: colors.white, borderRadius: 13, height: 39, paddingHorizontal: 10,
        flexDirection: 'row', alignItems: 'center',
    }}>


        <Text style={{
            fontSize: 15, fontWeight: '500',
            color: colors.balc111111
        }} numberOfLines={1}>
            {AppString.delivery}
        </Text>
        <View>
            <RatingView disabled={false} onClick={(start: number) => {
                setRating(start + 1)
            }} rating={rating} size={18} ms={15} Icon={LightStarOrange} EmptyStar={EmptyStar} />
        </View>
    </View>
}

const BottomView = ({ navigation }) => {
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
            text={AppString.publish}
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
    onClick,
}) => {
    return (
        <TouchableOpacity style={{ width: '100%' }} onPress={onClick}>
            <LinearGradient
                colors={[startorange, endColor]}
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
                        { color: colors.white, fontWeight: '400', fontSize: 16, paddingHorizontal: 19 },
                    ]}>
                    {text}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const RatingWithDesign = () => {

    const [helpShow, setHelpShow] = useState(false)
    const [leaveCommentShow, setleaveComment] = useState(false)

    return <View style={{
        marginHorizontal: 9, marginTop: 11,
        backgroundColor: colors.white, borderRadius: 13, padding: 10, paddingVertical: 13
    }}>

        <TouchableOpacity
            disabled={true}
            style={{
                flexDirection: 'row',
                width: '100%',
                marginBottom: 15,
                alignItems: 'center'
            }}>

            <Image
                source={appIcons.shoeImageURL}
                style={{ width: 51, height: 51, borderRadius: 3, }}
            />

            <View style={{ marginStart: 8 }}>

                <Text style={{
                    fontSize: 15, fontWeight: '600',
                    color: colors.balc111111, maxHeight: 30
                }} numberOfLines={1}>
                    若过度长的话只显示第一行
                </Text>



                <Text style={{
                    fontSize: 14, fontWeight: '400',
                    color: colors.grayAAAAAA, width: "80%", maxHeight: 30
                }} numberOfLines={2}>
                    Grey; 36
                </Text>



            </View>


        </TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

            <Text style={[styles.textStyle,
            {
                color: colors.black, fontSize: 15, fontWeight: '500'
            }]}>{AppString.rating}</Text>
            <RatingView rating={5} size={18} ms={15} Icon={LightStarOrange} />
            <Text style={[styles.textStyle,
            {
                marginStart: 15, color: colors.lightOrange, fontSize: 15, fontWeight: '500'
            }]}>{AppString.great}</Text>

        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, gap: 15 }}>

            <TouchableOpacity disabled={true} style={{
                borderWidth: 1,
                borderColor: colors.lightOrange, borderStyle: 'dashed',
                height: 25, width: 125, justifyContent: 'center', alignItems: 'center', borderRadius: 13
            }}>
                <Text style={[styles.textStyle,
                {
                    color: colors.lightOrange, fontSize: 15
                }]}>{AppString.quality}</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={true} style={{
                borderWidth: 1,
                borderColor: colors.lightOrange, borderStyle: 'dashed',
                height: 25, width: 189, justifyContent: 'center', alignItems: 'center', borderRadius: 13
            }}>
                <Text style={[styles.textStyle,
                {
                    color: colors.lightOrange, fontSize: 15
                }]}>{AppString.experince_of_uses}</Text>
            </TouchableOpacity>
        </View>

        <Text style={[styles.textStyle,
        {
            color: '#AFAFAF', fontSize: 14, marginTop: 10
        }]}>{AppString.quality + ":"}</Text>


        <Text style={[styles.textStyle,
        {
            color: '#AFAFAF', fontSize: 14, marginTop: 10
        }]}>{AppString.experience}</Text>


        <TouchableOpacity style={{

            height: 96,
            width: 96,
            borderRadius: 8,
            backgroundColor: '#FAFAFA', marginTop: 100,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <CameraIcon />

            <Text style={[styles.textStyle,
            {
                color: '#AFAFAF', fontSize: 14
            }]}>{AppString.photo}</Text>

        </TouchableOpacity>

        <TouchableOpacity onPress={() => setleaveComment(true)}  style={{
            height: 29,
            borderRadius: 8,
            backgroundColor: '#FCF7F1',
            marginTop: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 10
        }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, }}>
                <HeartRed />
                <Text style={[styles.textStyle,
                {
                    color: '#E9472C', fontSize: 13
                }]}>{AppString.recieved_bonus_for_feedback}</Text>
            </View>

            <QuesRed />

        </TouchableOpacity>


        <TouchableOpacity onPress={() => setHelpShow(true)} style={{
            height: 29,
            marginTop: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 10
        }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, }}>
                <OrangeCheck height={16} width={16} />
                <Text style={[styles.textStyle,
                {
                    color: '#999999', fontSize: 13
                }]}>{AppString.publicly}</Text>
            </View>

            <QuesGrey />

        </TouchableOpacity>

        <HelpPopup isShow={helpShow} onCancel={() => {
            setHelpShow(false)
        }} />
         <LeaveCommentPopup isShow={leaveCommentShow} onCancel={() => {
            setleaveComment(false)
        }} />
    </View>
}


const LineWithText = () => {

    return <View style={{
        flexDirection: 'row', justifyContent: 'center',
        alignItems: 'center', gap: 4, marginTop: 9
    }}>
        <View
            style={{
                height: 1,
                width: 25,
                borderRadius: 0.5,
                backgroundColor: colors.lightOrange,
            }}
        />

        <Text style={[styles.textStyle,
        {
            color: colors.lightOrange, fontSize: 12,
        }]}>{AppString.your_review_help_others_make_a_choice}</Text>

        <View
            style={{
                height: 1,
                width: 24,
                borderRadius: 0.5,
                backgroundColor: colors.lightOrange,
            }}
        />
    </View>
}
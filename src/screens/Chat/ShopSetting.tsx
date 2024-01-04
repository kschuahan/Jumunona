import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Switch, Image } from 'react-native';
import { styles } from '../../utils/AppStyles';
import { colors } from '../../utils/AppColors';
import { AppString } from '../../utils/AppStrings';
import { fontFamily } from '../../utils/Fonts';
import EllipsisHorizontalIcon from '../../../assets/Icons/ellipsis-horizontal.svg';
import ChevronBackOutlineIcon from '../../../assets/Icons/chevronBackOutline.svg';
import ChevronFwdOutlineIcon from '../../../assets/Icons/chevronForwardOutline.svg';
import { CustomHeader } from '../../components/Header';
import { appIcons, imagesUrl } from '../../utils/AppIcons';
import CheckGrey from '../../../assets/Icons/CheckGrey.svg';
import Star from '../../../assets/Icons/Star.svg';
import Cube from '../../../assets/Icons/Cube.svg';
import Profile from '../../../assets/Icons/Profile.svg';
import ShopGrey from '../../../assets/Icons/ShopGreys.svg';
import App from '../../../App';
import { ClearChatPopup } from '../../components/Dialogs';
import { RouteNames } from '../../utils/RouteNames';


const ShopSettings = ({ navigation }) => {

    const [show, isShow] = useState(false)
    useEffect(() => {
        navigation.setOptions({
            headerTitle: AppString.notification_Settings,
            headerRight: () => (
                <TouchableOpacity style={{ alignItems: 'center' }}>
                    <EllipsisHorizontalIcon width={24} height={24} />
                </TouchableOpacity>
            ),

            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                    style={{ alignItems: 'center' }}>
                    <ChevronBackOutlineIcon width={15} height={15} />
                </TouchableOpacity>
            ),
        });
    });

    return (
        <View style={[styles.container, { padding: 0 }]}>
            <CustomHeader navigation={navigation} title={AppString.settings} />

            <View style={[styles.container]}>

                <View
                    style={{
                        borderRadius: 13, backgroundColor: colors.white, padding: 10,
                        paddingHorizontal: 0,
                    }}>

                    <ShopProfile navigation={navigation} />
                </View>

                <NotificationButtons />

                <TouchableOpacity
                    onPress={() => {
                        isShow(true)
                    }}
                    style={{
                        borderRadius: 13, backgroundColor: colors.white, padding: 10,
                        marginTop: 10, paddingBottom: 6
                    }}>
                    <Text
                        style={[
                            styles.textStyle,
                            { fontSize: 16, paddingBottom: 7 },
                        ]}>
                        {AppString.clear_chat_history}
                    </Text>
                </TouchableOpacity>

            </View>

            <ClearChatPopup isShow={show} onConfirm={() => {
                isShow(false)
            }} onCancel={() => {
                isShow(false)

            }} />
        </View>
    );
};



const NotificationButtons = () => {

    return <View
        style={{
            borderRadius: 13, backgroundColor: colors.white, padding: 10,
            marginTop: 10, paddingVertical: 0
        }}>

        <ListView title={AppString.top_of_the_list} />
        <ListView title={AppString.mute_notification_sound} />

    </View>
}




const ListView = ({ title = '' }) => {
    const [switchOn, setSwitchOn] = useState(true);
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 10
            }}>
            <View
                style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    width: '83%',
                }}>
                <Text
                    style={[
                        styles.textStyle,
                        { fontSize: 16, paddingBottom: 7 },
                    ]}>
                    {title}
                </Text>


            </View>
            <View >
                <Switch
                    trackColor={{ false: colors.lightGrey, true: '#65C468' }}
                    thumbColor={colors.white}
                    ios_backgroundColor={colors.lightGrey}
                    onValueChange={() => {
                        setSwitchOn(!switchOn);
                    }}
                    value={switchOn}
                />
            </View>
        </View>
    );
};

const ShopProfile = ({ navigation }) => {

    return <View>
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingStart: 13, paddingTop: 5,
                paddingEnd: 13
            }}>
            <Image
                style={{ width: 55, height: 55, borderRadius: 27 }}
                source={{ uri: imagesUrl.shoes }}
            />
            <View
                style={{
                    flex: 1,
                    alignContent: 'flex-start',
                    flexDirection: 'column',
                    marginTop: -8,
                    paddingStart: 10,
                    gap: 3,
                }}>
                <Text style={[styles.textStyle, { fontSize: 17, fontWeight: '500' }]}>
                    {' '}
                    <Image
                        source={appIcons.china}
                        style={{
                            width: 15,
                            height: 15,
                        }}
                        resizeMode="cover"
                    />{' '}
                    Shop Name
                </Text>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginStart: 5,
                        alignContent: 'center'
                    }}>
                    <Star style={{ marginEnd: 3.5 }} />
                    <Text style={[styles.textStyle, { fontSize: 11, marginEnd: 19.5 }]}>
                        4.5
                    </Text>

                    <Cube style={{ marginEnd: 3.5 }} />
                    <Text style={[styles.textStyle, { fontSize: 11, marginEnd: 19.5 }]}>
                        2 505
                    </Text>

                    <Profile style={{ marginEnd: 3.5 }} />
                    <Text style={[styles.textStyle, { fontSize: 11, marginEnd: 19.5 }]}>
                        50 000
                    </Text>
                </View>
            </View>
            <TouchableOpacity style={{
                backgroundColor: '#FDF1EC', height: 30, width: 76,
                borderRadius: 15, justifyContent: 'center', alignItems: 'center'
            }}>
                <Text style={[styles.textStyle, { color: colors.lightOrange, fontSize: 13 }]}>{AppString.subscribe}</Text>
            </TouchableOpacity>
        </View>
        <SeparatorView />
        <TouchableOpacity onPress={() => {
            navigation.navigate(RouteNames.shopHomeScreen)

        }} style={{
            justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: '100%',
            paddingHorizontal: 13, paddingTop: 6
        }}>
            <Text style={[styles.textStyle, { fontSize: 16 }]}>{AppString.goto_the_store}</Text>
            <ShopGrey height={15} width={15} />

        </TouchableOpacity>
    </View>
}


const SeparatorView = () => {
    return (
        <View
            style={{ height: 0.8, marginTop: 12, backgroundColor: colors.darkWhite }}
        />
    );
};
export default ShopSettings;

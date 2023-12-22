import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { styles } from '../../utils/AppStyles';
import { colors } from '../../utils/AppColors';
import { AppString } from '../../utils/AppStrings';
import { fontFamily } from '../../utils/Fonts';
import EllipsisHorizontalIcon from '../../../assets/Icons/ellipsis-horizontal.svg';
import ChevronBackOutlineIcon from '../../../assets/Icons/chevronBackOutline.svg';
import ChevronFwdOutlineIcon from '../../../assets/Icons/chevronForwardOutline.svg';
import { CustomHeader } from '../../components/Header';

const ChatSettings = ({ navigation }) => {
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
            <CustomHeader navigation={navigation} title={AppString.chatSettings} />

            <View style={[styles.container, { paddingTop: 6 }]}>

                <View
                    style={{ borderRadius: 13, backgroundColor: colors.white, padding: 10, paddingHorizontal: 5.5 }}>
                    <HeaderView />
                    <SeparatorView />
                    <ListView
                        title={AppString.message_notifications}
                        desc={'Включая напоминания о неоплаченных заказах, рекомендации по продуктам и другие новости'}
                    />
                    <SeparatorView />
                    <ListView
                        title={'Уведомления от платформы'}
                        desc={
                            "Подтверждение адреса заказа, инструкции и т. д."
                        }
                    />
                </View>
            </View>
        </View>
    );
};

const HeaderView = ({ }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                <Text
                    style={[
                        styles.textStyle,
                        { fontSize: 16, fontFamily: fontFamily.bold, paddingBottom: 7 },
                    ]}>
                    {AppString.notifications}
                </Text>

                <Text
                    style={[
                        styles.textStyle,
                        { fontSize: 14, fontFamily: fontFamily.regular, color: '#9C9C9C' },
                    ]}>
                    {AppString.receive_msg_notification}
                </Text>
            </View>
            <ChevronFwdOutlineIcon color={colors.extraGrey} width={12} height={12} />
        </View>
    );
};

const SeparatorView = () => {
    return (
        <View
            style={{ height: 1, marginVertical: 10, backgroundColor: colors.darkWhite }}
        />
    );
};

const ListView = ({ title = '', desc = '' }) => {
    const [switchOn, setSwitchOn] = useState(true);
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'space-between',
                alignItems: 'center',
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
                        { fontSize: 16, fontFamily: fontFamily.bold, paddingBottom: 7 },
                    ]}>
                    {title}
                </Text>

                <Text
                    style={[
                        styles.textStyle,
                        { fontSize: 14, fontFamily: fontFamily.regular, color: '#9C9C9C' },
                    ]}>
                    {desc}
                </Text>
            </View>
            <View style={{ padding: 10 }}>
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

export default ChatSettings;

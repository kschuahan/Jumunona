import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    TextInput,
    Platform,
} from 'react-native';
import { BackLogo, LogoTitle } from '../../../components/Header';
import { colors } from '../../../utils/AppColors';
import { useState } from 'react';
import OrangeCheck from '../../../../assets/Icons/OrnageCheck.svg';
import EditIcon from '../../../../assets/Icons/editIcon.svg';
import { AppString } from '../../../utils/AppStrings';
import SearchIcon from '../../../../assets/Icons/searchIcon.svg';

import { Card } from 'react-native-paper';
import { appIcons, imagesUrl } from '../../../utils/AppIcons';
import { styles } from '../../../utils/AppStyles';
import CheckmarkCircle from '../../../../assets/Icons/CircleOrange.svg';
import EllipsisHorizontalNormal from '../../../../assets/Icons/CircleGrey.svg';

let isEditableButton = false;

export const SubscribersScreen = ({ navigation }) => {

    const [isEditable, setIsEditable] = useState(false)

    const [isCheck, setIsCheck] = useState(false)
    return (
        <View style={style.container}>
            <Header isEditable={isEditable} navigation={navigation} onEditPress={() => {
                isEditableButton = !isEditable
                setIsEditable(!isEditable)
            }}
            />

            <FlatList

                data={[1, 2, 3, 4, 5,1, 2, 3, 4, 5,1, 2, 3, 4, 5,]}
                renderItem={({ item, index }) =>
                    <ShopNameItem isEditable={isEditable} />
                }
                showsVerticalScrollIndicator={false}
            />
            { isEditable ? <BottomView /> : null }
        </View>

    )
}


const Header = ({ isEditable, navigation, onEditPress }) => {

    const [search, setSearch] = useState('');

    return (
        <Card
            style={{
                elevation: 2,
                paddingHorizontal: 13,
                paddingEnd: 12,
                borderRadius: 13,
                backgroundColor: colors.white,
                borderTopEndRadius: 0,
                borderTopStartRadius: 0,
                paddingTop: Platform.OS == 'ios' ? 20 : 20,
                paddingBottom: 5,
                marginBottom: 4
            }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <BackLogo navigation={navigation} />
                <LogoTitle title={AppString.subscription} />
                <TouchableOpacity
                    onPress={onEditPress}
                >
                    {isEditable ? <OrangeCheck height={16} width={16} /> : <EditIcon height={16} width={16} style={{ borderColor: '#666666' }} />}
                </TouchableOpacity>
            </View>

            <View style={style.searcContainer}>
                <SearchIcon />
                <TextInput
                    value={search}
                    placeholder={AppString.name_of_shop}
                    style={[style.searchTextInput, {

                    }]}
                    placeholderTextColor={colors.grey}
                    onChangeText={text => {
                        setSearch(text);
                    }}

                >

                </TextInput>
            </View>
        </Card>
    )
}

const ShopNameItem = ({ isEditable }) => {

    const [isSelected, setIsSelected] = useState(false)
    if (!isEditable && isSelected) {
        setIsSelected(false)
    }
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                marginHorizontal: 15,
                marginVertical: 13,
                gap: 13
            }}
        >
            {isEditable ?
                <TouchableOpacity
                    onPress={() => {
                        setIsSelected(!isSelected)
                    }}
                    style={{ alignSelf: "center" }}
                >
                    {isSelected ? <CheckmarkCircle /> : <EllipsisHorizontalNormal />}

                </TouchableOpacity>
                : null}
            <Image source={{ uri: imagesUrl.shoes }} style={{ width: 36, height: 36, borderRadius: 18 }} />
            <View style={{
                gap: 4
            }}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        gap: 4,
                        alignItems: "center",

                    }}
                >
                    <Image
                        source={appIcons.china}
                        style={{ width: 15, height: 15 }}
                    />
                    <Text
                        style={[styles.textStyle, { fontSize: 16, fontWeight: "400", color: colors.balc111111 }]}
                    >
                        Shop Name
                    </Text>
                </View>
                <Text
                    style={[styles.textStyle, { fontSize: 12, fontWeight: "400", color: colors.grayAAAAAA }]}
                >
                    Подписались 14 дней назад
                </Text>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        elevation: 5,
        shadowColor: '#0000000D',
        borderBottomEndRadius: 13,
        borderBottomStartRadius: 13,
        width: '100%',
        height: 60,
        marginBottom: 9,
        justifyContent: 'space-between',

    },

    searchTextInput: {
        fontWeight: '400',
        fontSize: 15,
        paddingVertical: 0,
        borderRadius: 17
    },

    searcContainer: {
        flexDirection: "row",
        gap: 7,
        backgroundColor: colors.whiteF6F6F6,
        alignItems: "center",
        height: 34,
        paddingHorizontal: 10,
        borderRadius: 17,
        marginTop: 10

    }
});


const BottomView = ( ) => {
    return (
        <View
            style={{
                height: 80,
                paddingTop: 10,
                paddingLeft: 25,
                paddingRight: 11,
                borderTopLeftRadius: 13,
                borderTopRightRadius: 13,
                shadowColor: "#0000000D",
                shadowOpacity: 1,
                shadowOffset: { width: 0, height: -3 },
                backgroundColor: colors.white,

            }}
        >
            <View
                style = {{
                    alignItems: "center",
                    flexDirection: 'row',
                    justifyContent: "space-between"
                }}
            >
                <Text
                    style={[styles.textStyle, { fontSize: 14, fontWeight: "400", color: "#727272" }]}
                >
                    0 выбрано
                </Text>

                <TouchableOpacity
                  style = {{
                    height: 34,
                    borderRadius: 17,
                    borderWidth: 1,
                    borderColor: colors.lightOrange,
                    paddingLeft: 16,
                    paddingRight: 10,
                    justifyContent: "center"
                  }}
                >
                     <Text
                    style={[styles.textStyle, { fontSize: 14, fontWeight: "400", color: colors.lightOrange, }]}
                >
                   Отписаться
                </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}
import { FlatList, Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { styles } from "../../utils/AppStyles"
import { BackLogo, LogoTitle, MenuLogo } from "../../components/Header"
import { AppString } from "../../utils/AppStrings"
import { colors } from "../../utils/AppColors"
import { imagesUrl } from "../../utils/AppIcons"

import { useState } from "react"
import { Card } from "react-native-paper"
import CreateOutline from '../../../assets/Icons/EditItem.svg';
import ChevronBackOutline from '../../../assets/Icons/chevronBackOutline.svg';
import SearchIcon from '../../../assets/Icons/searchIcon.svg';

import CheckmarkOutline from '../../../assets/Icons/CheckOrange.svg';


import CheckmarkCircle from '../../../assets/Icons/CircleOrange.svg';
import EllipsisHorizontalNormal from '../../../assets/Icons/CircleGrey.svg';

const data = [
    {
        title: 'Сегодня',
        product: [1, 2, 3, 4, 5, 6]
    },
    {
        title: '29.01.2022',
        product: [1, 2, 3]
    }
]

export const HistoryScreen = ({ navigation }) => {

    const [select, setSelect] = useState(0)


    return <View style={[styles.container, { padding: 0 }]}>
        <Card
            style={{
                elevation: 2,
                paddingHorizontal: 13,
                backgroundColor: colors.white,
                borderTopEndRadius: 0,
                borderTopStartRadius: 0,
                marginBottom: 5,
                paddingTop: Platform.OS == 'ios' ? 20 : 25,
                paddingBottom: 5,
            }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                    style={{ alignItems: 'center' }}>
                    <ChevronBackOutline width={15} height={15} />
                </TouchableOpacity>
                <Text
                    style={[
                        styles.textStyle,
                        { fontSize: 21, fontWeight: 'bold' },
                    ]}>
                    {AppString.story} <Text
                        style={[
                            styles.textStyle,
                            { fontSize: 21 },
                        ]}>
                        {'(281)'}
                    </Text>
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        //setSelect(!select)
                    }}
                    style={{ alignItems: 'center' }}>
                    {select ? (
                        <CheckmarkOutline
                            width={19}
                            height={14}
                            color={colors.lightOrange}
                        />
                    ) : (
                        <CreateOutline
                            width={15}
                            height={15}
                            color={colors.black666666}
                        />
                    )}
                    {/* <Ionicons
              name={select ? 'checkmark-outline' : 'create-outline'}
              color={select ? colors.lightOrange : colors.black666666}
              size={24}
            /> */}
                </TouchableOpacity>
            </View>
            <SearchView />
        </Card>


        <FlatList data={data} showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) =>
                <ProductItem items={item} onClick={() => {

                }} />
            } />
    </View>
}


const ProductItem = ({ items, onClick }) => {
    const [select, setSelect] = useState(false);


    return <View style={{ marginStart: 8 }}>
        <Text
            style={[
                styles.textStyle,
                { fontSize: 16, fontWeight: '500', color: '#111111', marginStart: 10 },
            ]}>
            {items.title}

        </Text>

        <FlatList
            style={{ marginTop: 8 }}
            data={items.product}
            keyExtractor={item => {
                return item.toString();
            }}
            numColumns={3}
            renderItem={({ item, index }) => (
                <TouchableOpacity
                    style={{
                        flex: 1 / 3,
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        marginBottom: 20,
                    }}>
                    <Image
                        source={{ uri: imagesUrl.shoes }}
                        style={{ height: 117, width: 117, borderRadius: 5 }}
                    />
                    <Text
                        style={[
                            styles.textStyle,
                            { fontSize: 17, color: colors.lightOrange, marginTop: 2 },
                        ]}>
                        {'v369'}
                    </Text>
                    {select ? (
                        <TouchableOpacity
                            onPress={() => { }}
                            style={{ position: 'absolute', end: 10, top: 2 }}>
                            {item.isSelected ? (
                                <CheckmarkCircle
                                    width={17}
                                    height={17}
                                    color={colors.endOrange}
                                />
                            ) : (
                                <EllipsisHorizontalNormal
                                    width={17}
                                    height={17}
                                    color={colors.white}
                                />
                            )}
                            {/* <Ionicons
                    name={
                      item.isSelected ? 'checkmark-circle' : 'ellipse-outline'
                    }
                    size={17}
                    color={item.isSelected ? colors.endOrange : colors.white}
                  /> */}
                        </TouchableOpacity>
                    ) : null}
                </TouchableOpacity>
            )}
        />

    </View>
}



const SearchView = () => {
    const [search, setSearch] = useState('');

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                backgroundColor: colors.whiteF7F7F7,
                borderRadius: 19,
                marginTop: 8,
            }}>
            <SearchIcon
                width={17}
                height={17}
                style={{ marginStart: 15 }}
                color={colors.grey}
            />
            <TextInput
                value={search}
                placeholder={AppString.city_name}
                style={style.searchTextInput}
                placeholderTextColor={colors.grey}
                onChangeText={text => {
                    setSearch(text);
                }}
            />
        </View>
    );
};



const style = StyleSheet.create({
    searchTextInput: {
        height: 33,
        width: '100%',
        marginStart: 11,
        fontSize: 15,
        paddingVertical: 0,
        fontWeight: '400'
    },
});


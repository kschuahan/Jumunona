import { FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { styles } from "../../utils/AppStyles"
import { Card } from "react-native-paper"
import { BackLogo, MenuLogo } from "../../components/Header"
import { colors } from "../../utils/AppColors"
import { onShare } from "../../utils/Common"
import { RouteNames } from "../../utils/RouteNames"
import Share from '../../../assets/Icons/Share.svg';

import CartIcon from '../../../assets/Icons/Carts.svg';
import EllipsisHorizontal from '../../../assets/Icons/ellipsis-horizontal.svg';
import ChevronBackOutline from '../../../assets/Icons/chevronBackOutline.svg';
import SearchIcon from '../../../assets/Icons/searchIcon.svg';
import { useState } from "react"
import { AppString } from "../../utils/AppStrings"

import Star from '../../../assets/Icons/Star.svg';
import Cube from '../../../assets/Icons/Cube.svg';
import Profile from '../../../assets/Icons/Profile.svg';
import { appIcons, imagesUrl } from "../../utils/AppIcons"


const sortBy = [
    { id: 1, desc: 'Все' },
    { id: 2, desc: 'Хиты' },
    { id: 3, desc: 'Цена' },
];



const data = [
    {
        id: 1,
        imageURL: appIcons.shoeImageURL,
        desc: '600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
    },
    {
        id: 2,
        imageURL: appIcons.shoeImageURL,
        desc: '600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
    },
    {
        id: 3,
        imageURL: appIcons.shoeImageURL,
        desc: '600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
    },
    {
        id: 4,
        imageURL: appIcons.shoeImageURL,
        desc: '600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
    },
    {
        id: 5,
        imageURL: appIcons.shoeImageURL,
        desc: '600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
    },
    {
        id: 6,
        imageURL: appIcons.shoeImageURL,
        desc: '600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
    },
    {
        id: 7,
        imageURL: appIcons.shoeImageURL,
        desc: '600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
    },
    {
        id: 8,
        imageURL: appIcons.shoeImageURL,
        desc: '600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
    },
    {
        id: 9,
        imageURL: appIcons.shoeImageURL,
        desc: '600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
    },
    {
        id: 10,
        imageURL: appIcons.shoeImageURL,
        desc: '600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
    },
];
var currentOffset = 0;

export const ShopsScreen = ({ navigation }) => {
    const [isShopShow, setIsShopShow] = useState(true);

    return <View style={[styles.container, { padding: 0 }]}>
        <ToolbarWithSearch navigation={navigation} onClick={() => { }} isShow={isShopShow} />
        <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
                // console.log(event.nativeEvent.contentOffset.y);
                setIsShopShow(event.nativeEvent.contentOffset.y < 180)
            }}

            style={{ marginHorizontal: 7.5 }}
            renderItem={({ item, index }) =>
                <TouchableOpacity
                    style={{
                        borderRadius: 12,
                        backgroundColor: '#ffffff',
                        marginHorizontal: 4.5,
                        marginBottom: 10,
                        flex: 0.5,
                        borderColor: '#f1f1f1',
                        marginTop: 5,
                    }}
                    onPress={() => {
                        navigation.navigate(RouteNames.product_detail);
                    }}>
                    <Image
                        source={appIcons.shoeImageURL}
                        style={{
                            height: 255,
                            paddingHorizontal: 1,
                            width: 'auto',
                            borderRadius: 13,
                            backgroundColor: '#f1f1f1',

                            marginBottom: 8,
                        }}
                    />

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            paddingLeft: 7,
                        }}>
                        <Image
                            source={appIcons.china}
                            style={{ height: 15, width: 15, marginTop: 3 }}
                        />
                        <Text
                            style={{
                                marginLeft: 4,
                                fontSize: 13,
                                fontWeight: '500',
                                color: colors.black
                            }}
                            numberOfLines={1}>
                            Футболка
                        </Text>
                    </View>
                    <View
                        style={{ flexDirection: 'row', paddingLeft: 8, marginTop: 4 }}>
                        <View style={{ flexDirection: 'row', width: '30%' }}>
                            <Text
                                style={{
                                    fontSize: 17,
                                    color: '#ff7600',
                                    fontWeight: '500',
                                }}>
                                999
                            </Text>
                            <Text
                                style={{
                                    paddingTop: 6,
                                    color: '#ff7600',
                                    fontSize: 12,
                                    fontWeight: '500',
                                }}>
                                c.
                            </Text>
                        </View>
                        <Text
                            numberOfLines={1}
                            style={{
                                width: '70%',
                                color: '#AAAAAA',
                                paddingTop: 3,
                            }}>
                            {item.desc}
                        </Text>
                    </View>
                </TouchableOpacity>}
        />
    </View>
}


const ToolbarWithSearch = ({ navigation, onClick, isShow = true }) => {
    const [selectedSortBy, setSortBy] = useState(1);

    return <Card
        style={{
            elevation: 0,
            paddingHorizontal: 6,
            paddingEnd: 6,
            borderRadius: 13,
            backgroundColor: colors.white,
            borderTopEndRadius: 0,
            borderTopStartRadius: 0,
            paddingTop: Platform.OS == 'ios' ? 20 : 20,
            paddingBottom: 5,
            marginBottom: 4
        }}>
        <View style={{
            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%',
            paddingEnd: 6
        }}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    marginStart: 6
                }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                    style={{ alignItems: 'center', marginEnd: 10 }}>
                    <ChevronBackOutline width={15} height={15} />
                </TouchableOpacity>

                <SearchView />
            </View>
            <View style={{
                flexDirection: 'row', gap: 15, alignItems: 'center', marginStart: -25
            }}>
                <TouchableOpacity
                    onPress={() => {
                        onShare();
                    }}
                >
                    <Share />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    navigation.navigate(RouteNames.cartScreen)
                }} >
                    <CartIcon />
                </TouchableOpacity>
                <TouchableOpacity >
                    <EllipsisHorizontal width={24} height={24} />
                </TouchableOpacity>
            </View>
        </View>

        {isShow ? <ShopView /> : null}
        <FlatList
            style={{ marginTop: 6, marginStart: 15 }}
            showsHorizontalScrollIndicator={false}
            data={sortBy}
            horizontal
            keyExtractor={item => {
                return item.id.toString();
            }}
            renderItem={({ item }) => {
                return (
                    <View style={{ flex: 1, marginRight: 20 }}>
                        <TouchableOpacity onPress={() => setSortBy(item.id)}>
                            <Text
                                style={{
                                    fontWeight: '400',
                                    fontSize: 16,
                                    color: selectedSortBy === item.id ? '#ff7600' : colors.black,
                                }}>
                                {item.desc}
                            </Text>
                        </TouchableOpacity>
                    </View>
                );
            }}
        />
    </Card>
}


const ShopView = () => {


    return <View
        style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 5,
            paddingEnd: 13,
            backgroundColor: '#F0F0F0',
            borderRadius: 8,
            height: 54,
            marginTop: 9
        }}>

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
            backgroundColor: colors.white, height: 30, width: 97,
            borderRadius: 15, justifyContent: 'center', alignItems: 'center'
        }}>
            <Text style={[styles.textStyle, { color: colors.lightOrange, fontSize: 13 }]}>{'Подписаться'}</Text>
        </TouchableOpacity>
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
                backgroundColor: colors.whiteF6F6F6,
                borderRadius: 19,
                width: '75%'
            }}>
            {/* <Ionicons
          name="search"
          size={17}
          style={{marginStart: 15}}
          color={colors.grey}
        /> */}
            <SearchIcon width={15} height={15} style={{ marginStart: 15 }}
            />

            <TextInput
                value={search}
                placeholder={'Suggested category'}
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
        marginStart: 4,
        fontWeight: "400",
        fontSize: 15,
        padding: 0,
        width: '80%'
    },
    primaryCategoriesContent: {
        paddingTop: 8,
        paddingLeft: 16,
        flex: 0.9,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 12,
    },
    button: {
        marginTop: 10,
        marginBottom: 12,
        height: 27,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
        borderRadius: 100,
        borderWidth: 0.8,
        borderColor: colors.lightOrange,
    },
});
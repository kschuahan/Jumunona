import { styles } from "../../utils/AppStyles"
import { TouchableOpacity, ScrollView, View, Text, FlatList, Image, StyleSheet, Pressable, TextInput } from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useRef, useState } from "react";
import { AppString } from "../../utils/AppStrings";
import { fontFamilty } from "../../utils/Fonts";
import { colors } from "../../utils/AppColors";
import { appIcons, imagesUrl, productImages } from "../../utils/AppIcons";
import MasonryList from "@react-native-seoul/masonry-list";
import { dimensions } from "../../utils/sizes";
import { LinearGradient } from "expo-linear-gradient";
import { onShare } from "../../utils/Common";
const shoeImageURL = appIcons.shoeImageURL
const china = appIcons.china
const reviewFilter = [

    { id: 1, desc: "Don't lose color(8)" },
    { id: 2, desc: "Good Fabric(12)" },
    { id: 3, desc: "Soft Soul(1)" },
]
interface Product {
    id: number;
    imageURL: string | any;
    desc: string;
}
const data: Product[] = [
    {
        id: 1,
        imageURL: shoeImageURL,
        desc: "600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    },
    {
        id: 2,
        imageURL: shoeImageURL,
        desc: "600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    },
    {
        id: 3,
        imageURL: shoeImageURL,
        desc: "600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    },
    {
        id: 4,
        imageURL: shoeImageURL,
        desc: "600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    },
    {
        id: 5,
        imageURL: shoeImageURL,
        desc: "600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    },
    {
        id: 6,
        imageURL: shoeImageURL,
        desc: "600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    }
];

const imagesArray = [1, 2, 3, 4, 5]

export const ProductDetailScreen = ({ navigation }) => {

    const [activeIndex, setActiveIndex] = useState(0);
    const handleViewableItemsChanged = useRef(({ viewableItems, changed }) => {
        if (changed && changed.length > 0) {
            console.log("Visible items are", viewableItems[0].index);
            console.log("Changed in this iteration", changed[0]);
            setActiveIndex(changed[0].index);
        }
    });
    useEffect(() => {

        navigation.setOptions({
            headerTitle: "",

            headerRight: (() =>
                <View style={{ flexDirection: 'row', gap: 30, }}>

                    <TouchableOpacity onPress={() => {
                        onShare()
                    }} style={{ alignItems: "center", marginStart: -20 }}>
                        <Ionicons name="arrow-redo-outline" size={24} />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ alignItems: "center", marginStart: -20 }}>
                        <Ionicons name="cart-outline" size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: "center", marginStart: -20 }}>
                        <Ionicons name="ellipsis-horizontal-outline" size={24} />
                    </TouchableOpacity>

                </View>),
            headerLeft: () =>
            (
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack()
                    }} style={{ alignItems: "center", marginStart: -25 }}>
                        <Ionicons name="chevron-back-outline" size={24} />
                    </TouchableOpacity>

                    <SearchView />
                </View>
            ),
            headerStyle: {
                backgroundColor: colors.white,

            },

            headerShadowVisible: true,

        })
    }, [])

    return (<View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[styles.container, { padding: undefined }]}>
                <View>
                    <FlatList style={{ flexGrow: 0 }}
                        horizontal={true}
                        snapToAlignment='center'
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        data={productImages}
                        decelerationRate={'normal'}
                        scrollEventThrottle={16}
                        onViewableItemsChanged={handleViewableItemsChanged.current}
                        viewabilityConfig={{
                            viewAreaCoveragePercentThreshold: 50, waitForInteraction: true,
                            minimumViewTime: 5
                        }}
                        renderItem={({ item }) => <TouchableOpacity onPress={() => {
                            //navigation.navigate(routes.image_view, { image: item })
                        }} style={[{ padding: 0 }]}>
                            <Image source={{ uri: item }}
                                style={{
                                    width: dimensions.width, height: 375,

                                }} resizeMode="cover" />


                        </TouchableOpacity>} />
                    <Text style={[styles.textStyle, {
                        position: 'absolute', bottom: 10,
                        end: 10, color: colors.white, paddingVertical: 7, paddingHorizontal: 13
                        , backgroundColor: 'rgba(0, 0,0, .6 )',
                        fontSize: 10, borderRadius: 12
                    }]}>
                        {(activeIndex + 1) + "/" + productImages.length}
                    </Text>
                </View>

                <ProductDetails />
                <ProductDesclamenation />
                <ReviewsSection />
                <ShopView />
                <ProductImages />
                <RelatedProducts />
            </View>

        </ScrollView >

        <View style={{
            backgroundColor: colors.white, position: 'absolute',
            bottom: 0, width: dimensions.width,
            justifyContent: 'space-between', alignItems: 'center',
            paddingBottom: 34, paddingTop: 6,
            flexDirection: 'row',
            borderTopStartRadius: 13, borderTopEndRadius: 13
        }}>

            <View style={{ flexDirection: 'row', marginStart: 36, gap: 40 }}>

                <TouchableOpacity style={{ alignItems: "center", marginStart: -20 }}>
                    <Ionicons name="archive-outline" size={24} color={colors.startOrange} />
                </TouchableOpacity>

                <TouchableOpacity style={{ alignItems: "center", marginStart: -20 }}>
                    <Ionicons name="chatbubble-ellipses-outline" size={24} />
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: "center", marginStart: -20 }}>
                    <Ionicons name="heart-outline" size={24} />
                </TouchableOpacity>

            </View>

            <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap' }}>
                <CommonButton startorange={colors.yellowStart} endColor={colors.yellowEnd} onClick={() => {

                }} />
                <CommonButton text={AppString.buy} onClick={() => {

                }} />
            </View>

        </View>
    </View>
    )
}
// MARK: - Review Section
const ReviewsSection = ({ }) => {
    return (
        <View style={{ borderRadius: 13, backgroundColor: colors.white, paddingHorizontal: 10, paddingVertical: 10 }}>
            <TextWithIcon title={AppString.review} onClick={() => { }} />
            <FlatList
                data={reviewFilter}
                horizontal
                keyExtractor={(item) => {
                    return item.id.toString();
                }}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <View style={{ flex: 1, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, backgroundColor: "#FCEDE8", marginEnd: 10, marginBottom: 10 }}>
                            <TouchableOpacity
                                onPress={() => { }}
                            >
                                <Text
                                    style={{
                                        fontSize: 15,
                                        color: colors.lightOrange,
                                        fontFamily: fontFamilty.regular,
                                    }}
                                >
                                    {item.desc}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />
            <ReviewUser />

        </View>
    )
}

const ReviewUser = ({ }) => {
    return (
        <View>
            <FlatList
                data={[1, 2]}
                scrollEnabled={false}
                renderItem={({ item, index }) =>
                    <View style={{ paddingVertical: 10 }}>

                        <View style={{ flexDirection: "row" }}>
                            <Image
                                style={{ width: 40, height: 40, borderRadius: 20 }}
                                source={{ uri: imagesUrl.profile }}
                            />
                            <View style={{ flex: 1, alignContent: "flex-start", flexDirection: "column", paddingStart: 8 }}>

                                <Text
                                    style={[
                                        styles.textStyle,
                                        { fontSize: 14, fontFamily: fontFamilty.regular },
                                    ]}
                                >
                                    user****ame
                                </Text>

                                <Text
                                    style={[
                                        styles.textStyle,
                                        { fontSize: 14, fontFamily: fontFamilty.regular, color: "#999999" },
                                    ]}
                                >
                                    26.10.2022
                                </Text>
                            </View>
                            <RatingView rating={4} />
                        </View>
                        <Text
                            style={[
                                styles.textStyle,
                                { fontSize: 14, fontFamily: fontFamilty.regular, paddingTop: 8 },
                            ]}
                        >
                            Very good quality多能显示2行------------------------ 第二行------------------------------------------------ ...
                        </Text>

                        {index != 0 ? <FlatList
                            data={[1, 2, 3, 4, 5]}
                            renderItem={({ item }) =>
                                <View style={{ marginHorizontal: 1 }}>
                                    <Image source={{ uri: imagesUrl.shoes }} style={{ width: 81, height: 81, borderRadius: 6 }} />
                                </View>
                            }
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        /> : null}
                    </View>
                }
            />



        </View>
    )
}




const CommonButton = ({ text = AppString.add_to_cart, endColor = colors.endOrange,
    startorange = colors.startOrange, onClick }) => {

    return (
        <TouchableOpacity onPress={onClick}>
            <LinearGradient
                colors={[startorange, endColor]}
                start={{ x: 0.4, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                    borderRadius: 1000,
                    marginEnd: 10,
                    height: 38,
                    paddingHorizontal: 19,
                    justifyContent: 'center'
                }}
            >
                <Text
                    style={[
                        styles.textStyle,
                        { color: colors.white, fontFamily: "SegoeUI", fontSize: 14 },
                    ]}
                >
                    {text}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}


const ProductDesclamenation = () => {

    return <View style={{
        marginTop: 12, marginHorizontal: 9, backgroundColor: colors.white, borderRadius: 12,
        paddingTop: 7, paddingEnd: 6, paddingStart: 12, marginBottom: 10
    }}>
        <Text style={[styles.textStyle, {
            fontSize: 14, alignSelf: 'flex-end',
            marginEnd: 42, paddingBottom: 2
        }]}>
            {"Выбран: 7 дюймовый"}
        </Text>
        <TextWithIcon icon="qr-code-outline" title="6 цветов на выбор" onClick={() => {

        }} />
        <TextWithIcon icon="checkmark-circle-outline" title="Доставка • Возврат • Цена" onClick={() => {

        }} />
        <TextWithIcon icon="triangle-outline" title="Бренд • Материал • Метод обработки" onClick={() => {

        }} />
        <TextWithIcon icon="triangle-outline" title="Ширина плеч • Ширина груди • Длина рукава" onClick={() => {

        }} />
    </View>
}



const TextWithIcon = ({ title = AppString.address, padding = 4,
    icon = "chevron-forward-outline", onClick }) => {

    return (
        <TouchableOpacity
            onPress={onClick}
            style={[
                styles.profile,
                { marginTop: undefined, alignItems: "center", paddingBottom: 16 },
            ]}
        >
            <Text
                style={[
                    styles.textStyle,
                    { fontSize: 14, fontWeight: "400", fontFamily: fontFamilty.regular, width: "95%" },
                ]}
            > {title}

            </Text>
            <Ionicons
                name={icon}
                color={colors.extraGrey}
                size={15}
            />
        </TouchableOpacity>
    );
}


export const RatingView = ({ rating = 3 }) => {
    const ratingArray = [1, 2, 3, 4, 5]
    return (
        <View>
            <FlatList
                data={ratingArray}
                scrollEnabled={false}
                horizontal
                keyExtractor={(item) => {
                    return item.toString();
                }}
                renderItem={({ item }) => {
                    return (
                        <Ionicons name={"star"} size={20} color={rating >= item ? colors.lightOrange : colors.extraGrey} />
                    )
                }}
            />

        </View>
    )
}

// MARK: - Shop Detail

const ShopView = ({ }) => {
    return (
        <View style={{ borderRadius: 13, backgroundColor: colors.white, padding: 10, marginTop: 10 }}>
            <View style={{ flexDirection: "row" }}>
                <Image
                    style={{ width: 55, height: 55, borderRadius: 22.5 }}
                    source={{ uri: imagesUrl.shoes }}
                />
                <View style={{ flex: 1, alignContent: "flex-start", flexDirection: "column", paddingStart: 8 }}>

                    <Text
                        style={[
                            styles.textStyle,
                            { fontSize: 14, fontFamily: fontFamilty.regular },
                        ]}
                    >
                        Shop name name
                    </Text>

                    <View style={{ flexDirection: "row", alignItems: "center" }}>

                        <Ionicons name={"star"} size={10} color={colors.lightOrange} style={{ paddingHorizontal: 3 }} />
                        <Text
                            style={[
                                styles.textStyle,
                                { fontSize: 11, fontFamily: fontFamilty.regular },
                            ]}
                        >
                            4.5
                        </Text>

                        <Ionicons name={"cube"} size={10} style={{ paddingLeft: 10, paddingRight: 3 }} />
                        <Text
                            style={[
                                styles.textStyle,
                                { fontSize: 11, fontFamily: fontFamilty.regular },
                            ]}
                        >
                            2505
                        </Text>

                        <Ionicons name={"person"} size={10} style={{ paddingLeft: 10, paddingRight: 3 }} />
                        <Text
                            style={[
                                styles.textStyle,
                                { fontSize: 11, fontFamily: fontFamilty.regular },
                            ]}
                        >
                            2505
                        </Text>
                    </View>
                </View>
                <Ionicons name={"checkmark-circle"} size={20} style={{ paddingLeft: 10, paddingRight: 3 }} color={"#F0F0F0"} />
            </View>
            <TextWithIcon title={AppString.featured} onClick={() => { }} />
            <ShopFeaturedProduct />
        </View>
    )
}

const ShopFeaturedProduct = () => {
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => {
                return item.id.toString();
            }}
            scrollEnabled={false}
            numColumns={3}
            renderItem={({ item }) => {
                return (
                    <Pressable
                        style={{
                            borderRadius: 12,
                            backgroundColor: "#ffffff",
                            marginHorizontal: 4,
                            marginVertical: 4,
                            width: "31%",
                            height: 160,
                            borderColor: "#f1f1f1",
                            marginTop: 8,
                        }}
                    >
                        <Image
                            source={item.imageURL}
                            style={{
                                height: 105,
                                paddingHorizontal: 1,
                                width: "100%",
                                borderRadius: 12,
                                backgroundColor: "#f1f1f1",

                                marginBottom: 8,
                            }}
                        />

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                paddingLeft: 7,
                            }}
                        >

                            <Text
                                style={{
                                    marginLeft: 4,
                                    fontSize: 15,
                                    fontFamily: "SegoeUI",
                                }}
                                numberOfLines={1}
                            >
                                Название това...
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row", paddingLeft: 8 }}>

                            <Text
                                style={{
                                    fontSize: 17,
                                    color: "#ff7600",
                                    fontFamily: "SegoeUI",
                                }}
                            >
                                999c.
                            </Text>
                        </View>
                    </Pressable>
                );
            }}
        />
    )
}

const ProductImages = ({ }) => {
    return (
        <View>
            <Text
                style={{
                    fontSize: 14,
                    color: "#666666",
                    fontFamily: "SegoeUI",
                    paddingVertical: 15,
                    alignSelf: "center"
                }}
            >
                Детали
            </Text>
            {
                imagesArray.map((item, index) =>
                    <View style={{ paddingBottom: 10, marginHorizontal: -20 }}>
                        <Image source={{ uri: imagesUrl.shoes }} style={{ width: "100%", height: 400, }} />
                    </View>
                )
            }

        </View>
    )
}




const RelatedProducts = () => {
    return (
        <View style={{ marginBottom: 100 }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <View style={{ height: 1, width: 50, borderRadius: 0.5, backgroundColor: colors.endOrange }} />
                <View style={{ height: 2, width: 2, borderRadius: 1, backgroundColor: colors.endOrange }} />


                <Text
                    style={{
                        fontSize: 14,
                        color: colors.lightOrange,
                        fontFamily: "SegoeUI",
                        paddingVertical: 15,
                        paddingHorizontal: 5,
                        alignSelf: "center"
                    }}
                >
                    Детали
                </Text>
                <View style={{ height: 2, width: 2, borderRadius: 1, backgroundColor: colors.endOrange }} />
                <View style={{ height: 1, width: 50, borderRadius: 0.5, backgroundColor: colors.endOrange }} />
            </View>
            <FlatList
                data={data}
                keyExtractor={(item) => {
                    return item.id.toString();
                }}
                scrollEnabled={false}
                numColumns={2}
                renderItem={({ item }) => {
                    return (
                        <Pressable
                            style={{
                                borderRadius: 12,
                                backgroundColor: "#ffffff",
                                marginHorizontal: 4,
                                marginVertical: 4,
                                width: "49%",
                                height: 326,
                                borderColor: "#f1f1f1",
                                marginTop: 8,
                            }}
                        >
                            <Image
                                source={item.imageURL}
                                style={{
                                    height: 265,
                                    paddingHorizontal: 1,
                                    width: "auto",
                                    borderRadius: 12,
                                    backgroundColor: "#f1f1f1",

                                    marginBottom: 8,
                                }}
                            />

                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "flex-start",
                                    paddingLeft: 7,
                                }}
                            >
                                <Image
                                    source={china}
                                    style={{ height: 15, width: 15, marginTop: 3 }}
                                />
                                <Text
                                    style={{
                                        marginLeft: 4,
                                        fontSize: 15,
                                        fontFamily: "SegoeUI",
                                    }}
                                    numberOfLines={1}
                                >
                                    Футболка
                                </Text>
                            </View>
                            <View style={{ flexDirection: "row", paddingLeft: 8 }}>
                                <View style={{ flexDirection: "row", width: "30%" }}>
                                    <Text
                                        style={{
                                            fontSize: 17,
                                            color: "#ff7600",
                                            fontFamily: "SegoeUI",
                                        }}
                                    >
                                        999
                                    </Text>
                                    <Text
                                        style={{
                                            paddingTop: 6,
                                            color: "#ff7600",
                                            fontSize: 12,
                                            fontFamily: "SegoeUI",
                                        }}
                                    >
                                        c.
                                    </Text>
                                </View>
                                <Text
                                    numberOfLines={1}
                                    style={{
                                        width: "70%",
                                        color: "#AAAAAA",
                                        paddingTop: 3,
                                        fontFamily: "SegoeUI",
                                    }}
                                >
                                    {item.desc}
                                </Text>
                            </View>
                        </Pressable>
                    );
                }}
            />
        </View>
    )
}

const ProductDetails = () => {

    return <View style={{
        marginTop: 12, marginHorizontal: 9, backgroundColor: colors.white, borderRadius: 12,
        paddingVertical: 7, paddingEnd: 6, paddingStart: 12
    }}>
        <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', width: "100%" }}>
            <View style={{ flexDirection: "row", gap: 6 }}>
                <Text style={[styles.textStyle, { fontSize: 21, color: colors.lightOrange }]}>
                    {"178с."}
                </Text>
                <Text style={[styles.textStyle, { fontSize: 21, color: colors.greyCCCCCCE3, textDecorationLine: 'line-through' }]}>
                    {"178с."}
                </Text>
            </View>
            <RatingView />
        </View>
        <View style={{ flexDirection: "row", gap: 6, marginTop: 2, width: '100%' }}>
            <Image source={{ uri: imagesUrl.profile }}
                style={{
                    width: 15, height: 15,
                    borderRadius: 12, marginTop: 5
                }} resizeMode="cover" />

            <Text style={[styles.textStyle, { fontSize: 16, fontFamily: fontFamilty.bold, width: "95%" }]}>
                {"ORT Product name子子子子子子子子子子子子男 子子子子子子子子"}
            </Text>

        </View>

        <Text style={[styles.textStyle, {
            fontSize: 13, color: colors.grey, alignSelf: 'flex-end',
            marginTop: -20, paddingBottom: 6
        }]}>
            {"продано 15"}
        </Text>
    </View>
}



const style = StyleSheet.create({
    searchTextInput: {
        height: 33,
        width: '73%',
        marginStart: 11,
        fontFamily: "SegoeUI",
        fontSize: 15,
    },
    primaryCategoriesContent: {
        paddingTop: 8,
        paddingLeft: 16,
        flex: 0.9,
        backgroundColor: "#ffffff",
        borderTopLeftRadius: 12,
    },

});



const SearchView = () => {
    const [search, setSearch] = useState("")

    return <View style={{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start',
        backgroundColor: colors.whiteF6F6F6, borderRadius: 19
    }}>
        <Ionicons name="search" size={17} style={{ marginStart: 15 }} color={colors.grey} />
        <TextInput
            value={search}
            placeholder={"Футболки"}
            style={style.searchTextInput}
            placeholderTextColor={colors.grey}
            onChangeText={(text) => {
                setSearch(text)
            }}
        />
    </View>
}


export default ProductDetailScreen

import { styles } from "../../utils/AppStyles"
import { TouchableOpacity, ScrollView, View, Text, FlatList, Image, StyleSheet, Pressable } from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect } from "react";
import { AppString } from "../../utils/AppStrings";
import { fontFamilty } from "../../utils/Fonts";
import { colors } from "../../utils/AppColors";
import { appIcons, imagesUrl } from "../../utils/AppIcons";
import MasonryList from "@react-native-seoul/masonry-list";
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

    useEffect(() => {

        navigation.setOptions({
            headerTitle: AppString.notification_Settings,
            headerRight: (() => <TouchableOpacity style={{ alignItems: "center" }}>
                <Ionicons name="ellipsis-horizontal-outline" size={24} />
            </TouchableOpacity>),

            headerLeft: () => (
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }} style={{ alignItems: "center" }}>
                    <Ionicons name="chevron-back-outline" size={24} />
                </TouchableOpacity>
            )
        })
    }, [])

    return (
        <ScrollView style={styles.container}>
            <ReviewsSection />
            <ShopView />
            <ProductImages />
            <RelatedProducts />
        </ScrollView>

    )
}

// MARK: - 

// MARK: - Review Section
const ReviewsSection = ({ }) => {
    return (
        <View style={{ borderRadius: 13, backgroundColor: colors.white, paddingHorizontal: 10, paddingBottom: 10 }}>
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
        </View>
    )
}

const TextWithIcon = ({ title = "", padding = 13, onClick }) => {

    return (
        <TouchableOpacity
            onPress={onClick}
            style={[
                styles.profile,
                { marginTop: undefined, alignItems: "center", paddingVertical: padding },
            ]}
        >
            <Text
                style={[
                    styles.textStyle,
                    { fontSize: 16, fontFamily: fontFamilty.regular },
                ]}
            >
                {title}
            </Text>
            <Ionicons
                name={"chevron-forward-outline"}
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
        <View>
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
            <View style={{height: 1, width: 50, borderRadius: 0.5, backgroundColor: colors.endOrange}} />
           <View style={{height: 2, width: 2, borderRadius: 1, backgroundColor: colors.endOrange}} />

         
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
            <View style={{height: 2, width: 2, borderRadius: 1, backgroundColor: colors.endOrange}} />
            <View style={{height: 1, width: 50, borderRadius: 0.5, backgroundColor: colors.endOrange}} />
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
export default ProductDetailScreen

const style = StyleSheet.create({
    primaryCategoriesContent: {
        paddingTop: 8,
        paddingLeft: 16,
        flex: 0.9,
        backgroundColor: "#ffffff",
        borderTopLeftRadius: 12,
    },

})
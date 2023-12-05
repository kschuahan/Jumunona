import { styles } from "../../utils/AppStyles"
import { TouchableOpacity, ScrollView, View, Text, TextInput, StyleSheet, FlatList, Image } from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef, useState } from "react";
import { AppString } from "../../utils/AppStrings";
import { colors } from "../../utils/AppColors";
import { imagesUrl, productImages } from "../../utils/AppIcons";
import { dimensions } from "../../utils/sizes";
import { fontFamilty } from "../../utils/Fonts";
import { LinearGradient } from "expo-linear-gradient";

const ProductDetailScreen = ({ navigation }) => {
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

                    <TouchableOpacity style={{ alignItems: "center", marginStart: -20 }}>
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
        paddingTop: 7, paddingEnd: 6, paddingStart: 12, marginBottom: 100
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
            >
                <Ionicons
                    name={icon}
                    color={colors.extraGrey}
                    size={15}
                />  {title}

            </Text>
            <Ionicons
                name={"chevron-forward-outline"}
                color={colors.extraGrey}
                size={15}
            />
        </TouchableOpacity>
    );
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
            <Text style={[styles.textStyle, { fontSize: 21, color: colors.lightOrange }]}>
                {""}
            </Text>
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
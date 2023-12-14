import { TextInput, Text, TouchableOpacity, View, StyleSheet, FlatList, Pressable, Image } from "react-native"
import { colors } from "../../utils/AppColors"
import { useEffect, useState } from "react"
import Ionicons from "@expo/vector-icons/Ionicons";
import { styles } from "../../utils/AppStyles";
import { dimensions } from "../../utils/sizes";
import MasonryList from "@react-native-seoul/masonry-list";
import { appIcons, imagesUrl } from "../../utils/AppIcons";
import { RouteNames } from "../../utils/RoutesNames";
const shoeImageURL = require("../../../assets/shoe.jpg");

const data = [
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
    },
    {
        id: 7,
        imageURL: shoeImageURL,
        desc: "600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    },
    {
        id: 8,
        imageURL: shoeImageURL,
        desc: "600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    },
    {
        id: 9,
        imageURL: shoeImageURL,
        desc: "600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    },
    {
        id: 10,
        imageURL: shoeImageURL,
        desc: "600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    },
];
export const ProductSearchResultScreen = ({ navigation }) => {

    useEffect(() => {

        navigation.setOptions({
            headerTitle: "",

            headerRight: (() =>
                <View style={{ flexDirection: 'row', gap: 30, }}>

                    <TouchableOpacity style={{ alignItems: "center", marginStart: -20 }}>
                        <Ionicons name="ellipsis-horizontal-outline" size={24} />
                    </TouchableOpacity>

                </View>),
            headerLeft: () =>
            (
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginEnd: 110 }}>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack()
                    }} style={{ alignItems: "center" }}>
                        <Ionicons name="chevron-back-outline" size={24} />
                    </TouchableOpacity>

                    <SearchView />
                </View>
            ),
            headerStyle: {
                backgroundColor: "#F6F6F6",

            },


            headerShadowVisible: false,

        })
    }, [])

    const sortBy = [
        { id: 1, desc: "Все" },
        { id: 2, desc: "Хиты" },
        { id: 3, desc: "Цена" },
    ];
    const filter = [
        { id: 1, desc: "Country" },
        { id: 2, desc: "Brand" },
        { id: 3, desc: "Material" },
        { id: 4, desc: "Style" },
        { id: 5, desc: "Sleeve Length" },
    ];

    const [selectedSortBy, setSortBy] = useState(1);


    return (
        <View style={style.container}>
            <View style={{
                flexDirection: "row", backgroundColor: colors.white, alignItems: "center",
                paddingStart: 20, paddingEnd: 21, paddingTop: 6,
                borderTopStartRadius: 13, borderTopEndRadius: 13
            }}>
                <FlatList
                    style={style.primaryCategoriesContent}
                    showsHorizontalScrollIndicator={false}
                    data={sortBy}
                    horizontal
                    keyExtractor={(item) => {
                        return item.id.toString();
                    }}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ flex: 1, marginRight: 52 }}>
                                <TouchableOpacity
                                    onPress={() => setSortBy(item.id)}
                                >
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            color:
                                                selectedSortBy === item.id
                                                    ? "#ff7600"
                                                    : "#666666",
                                        }}
                                    >
                                        {item.desc}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                />
                <Ionicons name="funnel-outline" size={15} color={colors.black666666} />
            </View>

            <View style={{
                backgroundColor: colors.white, paddingTop: 15.5,
                paddingHorizontal: 8, width: dimensions.width
            }}>
                <FlatList
                    data={filter}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    keyExtractor={(item) => {
                        return item.id.toString();
                    }}
                    renderItem={({ item }) => {
                        return (

                            <TouchableOpacity
                                onPress={() => { }}
                                style={{
                                    flexDirection: "row", alignItems: "center",
                                    justifyContent: 'center',
                                    paddingStart: 10.5, paddingEnd: 18.4, marginRight: 8,
                                    backgroundColor: "#F6F6F6", borderRadius: 20, height: 32

                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 13,
                                        color: colors.black666666,
                                    }}
                                >
                                    {item.desc}
                                </Text>
                                <Ionicons name="caret-down-outline" size={8} style={{ marginLeft: 4 }} />
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>

            <View style={style.productsGrid}>
                <MasonryList
                    data={data}
                    keyExtractor={(item) => {
                        return item.id;
                    }}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    style={{ marginHorizontal: 4 }}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                style={{
                                    borderRadius: 12,
                                    backgroundColor: "#ffffff",
                                    marginHorizontal: 4.5,
                                    marginBottom: 20,
                                    width: "auto",

                                    borderColor: "#f1f1f1",
                                    marginTop: 8,
                                }}
                                onPress={() => {
                                    navigation.navigate(RouteNames.product_detail)
                                }}
                            >
                                <Image
                                    source={item.imageURL}
                                    style={{
                                        height: 265,
                                        paddingHorizontal: 1,
                                        width: "auto",
                                        borderRadius: 13,
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
                                        source={appIcons.china}
                                        style={{ height: 15, width: 15, marginTop: 3 }}
                                    />
                                    <Text
                                        style={{
                                            marginLeft: 4,
                                            fontSize: 13,
                                            fontWeight: '500'
                                        }}
                                        numberOfLines={1}
                                    >
                                        Футболка
                                    </Text>
                                </View>
                                <View style={{ flexDirection: "row", paddingLeft: 8, marginTop: 4 }}>
                                    <View style={{ flexDirection: "row", width: "30%" }}>
                                        <Text
                                            style={{
                                                fontSize: 17,
                                                color: "#ff7600",
                                                fontWeight: '500'
                                            }}
                                        >
                                            999
                                        </Text>
                                        <Text
                                            style={{
                                                paddingTop: 6,
                                                color: "#ff7600",
                                                fontSize: 12,
                                                fontWeight: '500'

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
                                        }}
                                    >
                                        {item.desc}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
        </View>
    )
}


const SearchView = () => {
    const [search, setSearch] = useState("")

    return <View style={{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start',
        backgroundColor: colors.white, borderRadius: 19, width: '93%', marginStart: 10
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



const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F6F6F6",
        alignSelf: 'center'
    },

    primaryCategoriesContent: {
        paddingTop: 8,

        backgroundColor: "#ffffff",
        borderTopLeftRadius: 13,
    },

    productsGrid: {
        width: dimensions.width,
        flex: 1,
        marginBottom: 4,
        backgroundColor: "#FFFFFF",
    },
    searchTextInput: {
        height: 33,
        flex: 1,
        marginStart: 11,
        fontFamily: "SegoeUI",
        fontSize: 15,
    },
});
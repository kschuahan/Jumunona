import { View, TouchableOpacity, Text, FlatList, StyleSheet, TextInput, Image, SafeAreaView, ScrollView } from "react-native";
import { colors } from "../../utils/AppColors";
import { fontFamilty } from "../../utils/Fonts";
import { AppString } from "../../utils/AppStrings";
import { styles } from "../../utils/AppStyles";
import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { onShare } from "../../utils/Common";
import { dimensions } from "../../utils/sizes";
import { imagesUrl } from "../../utils/AppIcons";
import { RatingView, ReviewUser } from "./ProductDetailScreen";

const reviewFilter = [

    { id: 1, desc: "Don't lose color(8)" },
    { id: 2, desc: "Good Fabric(12)" },
    { id: 3, desc: "Soft Soul(1)" },
]
const filterOptions = [
    { id: 1, desc: "Все" },
    { id: 2, desc: "Изображение" },
    { id: 3, desc: "Хорошие" },
    { id: 4, desc: "Средние" },
    { id: 5, desc: "Плохие" }
];

export const ProudctReviewsScreen = ({ navigation }) => {

    const [selectedFactory, setSelectedFactory] = useState(1);

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

            headerShadowVisible: false,

        })
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ paddingHorizontal: 2 }}>
                <FlatList
                    style={style.primaryCategoriesContent}
                    data={filterOptions}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => {
                        return item.id.toString();
                    }}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ paddingHorizontal: 4.5 }}>
                                <TouchableOpacity
                                    onPress={() => setSelectedFactory(item.id)}
                                >
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            color:
                                                selectedFactory === item.id
                                                    ? "#ff7600"
                                                    : "black",
                                        }}
                                    >
                                        {item.desc}{item.id != 1 ? '(' : ''}<Text
                                            style={{
                                                fontSize: 14,
                                                color:
                                                    selectedFactory === item.id
                                                        ? "#ff7600"
                                                        : colors.grey,
                                            }}
                                        >
                                            {item.id != 1 ? item.id : ''}
                                        </Text>{item.id != 1 ? ')' : ''}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                />

            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                    data={reviewFilter}
                    horizontal

                    keyExtractor={(item) => {
                        return item.id.toString();
                    }}
                    style={{ flexWrap: "wrap", marginVertical: 9, marginStart: 9 }}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => { }} style={{ backgroundColor: colors.white, marginEnd: 13, borderRadius: 20 }}>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        color: colors.balc111111,
                                        paddingHorizontal: 12,
                                        textAlign: "center",
                                        paddingVertical: 10
                                    }}
                                >
                                    {item.desc}
                                </Text>
                            </TouchableOpacity>
                        );
                    }}
                />
                <View style={{ flex: 1, paddingVertical: 12, backgroundColor: colors.white, borderTopRightRadius: 13, borderTopLeftRadius: 13 }}>
                    <FlatList
                        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                        scrollEnabled={false}
                        keyExtractor={(item) => {
                            return item.toString();
                        }}
                        style={{ paddingHorizontal: 13, borderRadius: 13, height: "100%", }}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <ReviewUser />
                            );
                        }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

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

const style = StyleSheet.create({
    searchTextInput: {
        height: 33,
        width: '73%',
        marginStart: 11,
        fontFamily: "SegoeUI",
        fontSize: 15,
    },
    primaryCategoriesContent: {
        backgroundColor: colors.white,
        borderBottomLeftRadius: 13,
        borderBottomRightRadius: 13,
        paddingHorizontal: 10,
        paddingBottom: 10,
        flexWrap: "wrap"
    },
});


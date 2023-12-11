import { View, TouchableOpacity, Text, FlatList, StyleSheet, TextInput, Image, SafeAreaView } from "react-native";
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
    { id: 2, desc: "Изображение(14)" },
    { id: 3, desc: "Хорошие(2)" },
    { id: 4, desc: "Средние(8)" },
    { id: 5, desc: "Плохие(1)" }
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

            headerShadowVisible: true,

        })
    }, [])

    return (
        <SafeAreaView style = {{flex: 1}}>
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
                            <View style={{ paddingHorizontal: 10 }}>
                                <TouchableOpacity
                                    onPress={() => setSelectedFactory(item.id)}
                                >
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            color:
                                                selectedFactory === item.id
                                                    ? "#ff7600"
                                                    : "black",
                                            fontFamily: "SegoeUI",
                                        }}
                                    >
                                        {item.desc}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                />

            </View>
            <View>
                <FlatList
                    data={reviewFilter}
                    horizontal
                    keyExtractor={(item) => {
                        return item.id.toString();
                    }}
                    style={{ flexWrap: "wrap", marginVertical: 12, }}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => { }} style={{ backgroundColor: colors.white, marginRight: 10, borderRadius: 20 }}>
                                <Text
                                    style={{
                                        fontSize: 15,
                                        color: colors.black,
                                        fontFamily: fontFamilty.regular,
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
            </View>
            <View style= {{flex: 1, paddingVertical: 12,  backgroundColor: colors.white}}>
                <FlatList
                    data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}

                    keyExtractor={(item) => {
                        return item.toString();
                    }}
                    style={{padding: 12, borderRadius: 13, height: "100%",  }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <ReviewUser />
                        );
                    }}
                />
            </View>
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
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        padding: 10,
        flexWrap: "wrap"
    },
});


import { View, Text, FlatList, TouchableOpacity, Image, Pressable } from "react-native"
import { CustomHeader } from "../../components/Header"
import { AppString } from "../../utils/AppStrings"
import { styles } from "../../utils/AppStyles"
import GrayCautionIcon from '../../../assets/Icons/GrayCaution.svg';
import { ScrollView } from "react-native-virtualized-view";
import { colors } from "../../utils/AppColors";
import CautionIcon from '../../../assets/Icons/Caution.svg';
import MasonryList from '@react-native-seoul/masonry-list';
import { appIcons, chestImages, hipImages, shoulderImages, waistImages } from "../../utils/AppIcons";
import { useState } from "react";
import CheckmarkCircle from '../../../assets/Icons/CircleOrange.svg';
import EllipsisHorizontalNormal from '../../../assets/Icons/CircleGrey.svg';

const basicData = [
    {
        name: "Имя",
        value: "Я"
    },
    {
        name: "Пол",
        value: "Женский"
    },
    {
        name: "Возраст",
        value: "1992"
    },
    {
        name: "Рост",
        value: "182 CM"
    },
    {
        name: "Вес",
        value: "75 КГ"
    },
]

const data = [
    {
        name: AppString.chest,
        images: chestImages
    },
    {
        name: AppString.shoulder_width,
        images: shoulderImages
    },
    {
        name: AppString.hip,
        images: hipImages
    },
    {
        name: AppString.waist,
        images: waistImages
    },
   
]
export const EditBodyDataScreen = ({ navigation }) => {
    return (
        <View style={[styles.container, { padding: 0 }]}>
            <CustomHeader navigation={navigation} title={AppString.change_body_data} />
            <ScrollView style={{ paddingHorizontal: 12 }}>
                <View
                    style={{ flexDirection: "row", marginTop: 16, marginBottom: 6, gap: 5 }}
                >
                    <GrayCautionIcon style={{ marginTop: 2 }} />
                    <Text
                        style={[styles.textStyle, { color: "#989898", fontWeight: "400", fontSize: 13 }]}
                    >
                        Для того чтобы гарантировать получение правильного размера и избежать неудобств, связанных с ошибками в измерениях, мы подберем для вас подходящий размер на основе данных о вашем теле.
                    </Text>
                </View>
                {/* Basic Detail  */}
                <Text
                    style={[styles.textStyle, { color: "#14100D", fontWeight: "500", fontSize: 17, marginHorizontal: 10, marginBottom: 6 }]}
                >
                    {AppString.basic_data}
                </Text>
                <BasicDataFlatList />
                <Text
                    style={[styles.textStyle, { color: "#14100D", fontWeight: "500", fontSize: 17, marginHorizontal: 10, marginBottom: 6, marginTop: 22 }]}
                >
                    {AppString.please_fill_body_info}
                </Text>
                <BodyInforView />
            </ScrollView>
        </View>
    )
}


const BasicDataFlatList = ({ }) => {

    const [male, setMale] = useState(false)

    return (
        <FlatList
            style={{
                backgroundColor: colors.white,
                paddingHorizontal: 12,
                borderRadius: 13
            }}
            data={basicData}
            renderItem={({ item, index }) =>
                <View
                    style={{
                        marginVertical: 13,
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >
                    <Text
                        style={[styles.textStyle, { color: "#333333", fontWeight: "500", fontSize: 15 }]}
                    >
                        {item.name}
                    </Text>
                    {
                        item.name == "Пол" ?
                            <View style={{ flexDirection: "row", gap: 10 }}>
                                <TouchableOpacity style={{
                                    flexDirection: "row",
                                    gap: 4
                                }}
                                onPress={() => {
                                    setMale(true)
                                }}
                                >

                                    {male ? <CheckmarkCircle /> : <EllipsisHorizontalNormal />}
                                    <Text
                                        style={[styles.textStyle, { color: "#111111", fontWeight: "400", fontSize: 15 }]}
                                    >
                                        {AppString.male}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    flexDirection: "row",
                                    gap: 4
                                }}
                                onPress={() => {
                                    setMale(false)
                                }}
                                >

                                    {!male ? <CheckmarkCircle /> : <EllipsisHorizontalNormal />}
                                    <Text
                                        style={[styles.textStyle, { color: "#111111", fontWeight: "400", fontSize: 15 }]}
                                    >
                                        {AppString.female}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <TouchableOpacity 
                                onPress={ () => {}}
                            >
                            <Text
                                style={[styles.textStyle, { color: "#111111", fontWeight: "400", fontSize: 15 }]}
                            >
                                {item.value}
                            </Text>
                            </TouchableOpacity>
                    }
                </View>
            }
            scrollEnabled={false}
        />



    )
}

const BodyInforView = ({ }) => {

    return (
        <FlatList
            style={{
                backgroundColor: colors.white,
                paddingHorizontal: 12,
                borderRadius: 13
            }}
            data={data}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) =>
                <View>

                    <View
                        style={{
                            marginVertical: 13,
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}
                    >
                        <Text
                            style={[styles.textStyle, { color: "#333333", fontWeight: "500", fontSize: 15 }]}
                        >
                            {item.name}{" "}
                            <CautionIcon width={15} height={15} style={{ alignSelf: "center" }} />
                        </Text>
                        <Text
                            style={[styles.textStyle, { color: "#111111", fontWeight: "400", fontSize: 15 }]}
                        >
                            Я
                        </Text>


                    </View>
                    <ImagesView images={item.images}/>
                </View>
            }
        />
    )
}

const ImagesView = ({ images}) => {

    const [selectedItem, setSeleced] = useState<number>()

    return (<FlatList
        data={images}
        keyExtractor={item => {
            return item.toString();
        }}
        style={{ marginHorizontal: 7 }}
        numColumns={3}
        renderItem={({ item, index }) => {
            console.warn(item)
            return <Pressable style={{ flex: 1 / 3 }} onPress={() => { setSeleced(index) }}>
                <Image source={item} style={{ height: 105, width: "95%", marginEnd: 10, marginVertical: 10 }} resizeMode="stretch" />
                {selectedItem == index ?
                    <View style={{ position: "absolute", height: 105, width: "95%", marginVertical: 10, backgroundColor: 'rgba(255, 118, 0, 0.08)', borderRadius: 13, borderColor: colors.lightOrange, borderWidth: 1, }} />
                    : null}
            </Pressable>
        }}

    />
    )
}
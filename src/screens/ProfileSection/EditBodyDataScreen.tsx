import { View, Text, FlatList, TouchableOpacity, Image, Pressable, Dimensions } from "react-native"
import { CustomHeader } from "../../components/Header"
import { AppString } from "../../utils/AppStrings"
import { styles } from "../../utils/AppStyles"
import GrayCautionIcon from '../../../assets/Icons/GrayCaution.svg';
import { ScrollView } from "react-native-virtualized-view";
import { colors } from "../../utils/AppColors";
import CautionIcon from '../../../assets/Icons/Caution.svg';
import { chestImages, hipImages, shoulderImages, waistImages } from "../../utils/AppIcons";
import { useState } from "react";
import CheckmarkCircle from '../../../assets/Icons/CircleOrange.svg';
import EllipsisHorizontalNormal from '../../../assets/Icons/CircleGrey.svg';
import { AgeBottomSheet } from './AgeBottomSheet';
import { AddRoleBottomSheet } from './AddRoleBottomSheet';
import LinearGradient from "react-native-linear-gradient";


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

    const [ageShow, setAgeShow] = useState(false)
    const [addRoleShow, setAddRoleShow] = useState(false)
    return (
        <View style={[styles.container, { padding: 0 }]}>
            <CustomHeader navigation={navigation} title={AppString.change_body_data} />
            <ScrollView style={{ paddingHorizontal: 12 , marginBottom: 60}}>
                <View
                    style={{ flexDirection: "row", marginTop: 16, marginBottom: 6, gap: 6 }}
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
                <BasicDataFlatList onShowAgeDropdown={() => {
                    setAgeShow(true)
                }} />
                <Text
                    style={[styles.textStyle, { color: "#14100D", fontWeight: "500", fontSize: 17, marginHorizontal: 10, marginBottom: 6, marginTop: 22 }]}
                >
                    {AppString.please_fill_body_info}
                </Text>
                <BodyInforView onDetailClick={() => { setAddRoleShow(true) }} />
            </ScrollView>

            <BottomButton onClick={() => {navigation.goBack()}} />
            <AgeBottomSheet isShow={ageShow} onClose={() => {
                setAgeShow(false)
            }} />
            <AddRoleBottomSheet isShow={addRoleShow} onClose={() => {
                setAddRoleShow(false)
            }} />
        </View>
    )
}


const BasicDataFlatList = ({ onShowAgeDropdown }) => {

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
                                onPress={() => {
                                    if (item.name == "Возраст") {
                                        onShowAgeDropdown()
                                    }
                                }}
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

const BodyInforView = ({ onDetailClick }) => {

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
                            <TouchableOpacity onPress={onDetailClick} >
                                <CautionIcon width={15} height={15} />
                            </TouchableOpacity>
                        </Text>
                        <Text
                            style={[styles.textStyle, { color: "#111111", fontWeight: "400", fontSize: 15 }]}
                        >
                            Я
                        </Text>


                    </View>
                    <ImagesView images={item.images} />
                </View>
            }
        />
    )
}

const ImagesView = ({ images }) => {

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

const BottomButton = ({ onClick }) => {

    return (<View
        style={{
            backgroundColor: colors.white,
            position: 'absolute',
            bottom: 0,
            width: Dimensions.get('window').width,
            paddingVertical: 12,
            paddingTop: 6,
            paddingHorizontal: 10,
            borderTopStartRadius: 13,
            borderTopEndRadius: 13,
            shadowColor: colors.black,
            elevation: 10,
            borderBlockColor: colors.whiteF7F7F7,
        }}>

        <TouchableOpacity onPress={onClick}>
            <LinearGradient
                colors={[colors.startOrange, colors.endOrange,
                ]}
                start={{ x: 0.4, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                    borderRadius: 20,
                    height: 40,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                <Text
                    style={[
                        styles.textStyle,
                        { color: colors.white, fontWeight: '400', fontSize: 16, marginStart: 9 },
                    ]}>
                    {AppString.save}
                </Text>
            </LinearGradient>
        </TouchableOpacity>

    </View>
    )
}
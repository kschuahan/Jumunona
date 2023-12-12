import { Modal, View, Image, Text, TouchableOpacity, FlatList, Pressable } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AppString } from "../../utils/AppStrings";
import { styles } from "../../utils/AppStyles";
import { appIcons, imagesUrl } from "../../utils/AppIcons";
import { colors } from "../../utils/AppColors";
import { fontFamilty } from "../../utils/Fonts";


const SelectProductSizeColorScreen = ({ isShow = false, onClose }) => {

    const [number, setNumber] = useState("")
    const [otp, setOtp] = useState("")

    return <Modal transparent={true} animationType={"slide"} visible={isShow} onRequestClose={onClose} >
        <View style={[styles.botton_view, { backgroundColor: 'rgba(0, 0,0, .7 )', justifyContent: "flex-end" }]}>
            <View style={{
                paddingHorizontal: 10, backgroundColor: colors.white, borderTopLeftRadius: 13,
                borderTopRightRadius: 13, width: "100%", flex: 0.8
            }}>
                <View
                    style={{ flexDirection: "row", justifyContent: "space-between", paddingTop: 5 }}
                >
                    <View
                        style={{ flexDirection: "row", justifyContent: "space-between", alignContent: "space-between", }}
                    >
                        <Image
                            source={{ uri: imagesUrl.shoes }}
                            style={{ height: 65, width: 65, borderRadius: 10, margin: 3 }}
                        />

                        <Text
                            style={[
                                styles.textStyle,
                                { fontSize: 21, fontFamily: "SegoeUI", color: colors.endOrange },
                            ]}
                        >
                            178с.
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        onClose()
                    }} >
                        <Ionicons name={"close"} size={25} />
                    </TouchableOpacity>

                </View>
                <ScrollView style={{ paddingBottom: 40, }} showsVerticalScrollIndicator={false}>
                    <CancelReturnPolicyView onClick={() => { }} />
                    <PhoneDataScreen onClick={() => { }} />
                    <ColorOptions />
                    <SizeAndBuyingForView />
                    <View style={{ height: 1, marginVertical: 10, backgroundColor: colors.darkWhite }} />
                    <QuanityView />

                </ScrollView>

                <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: 35, paddingBottom: 20 }}>
                    <CommonButton startorange={colors.yellowStart} endColor={colors.yellowEnd} onClick={() => {

                    }} />
                    <CommonButton text={AppString.buy} onClick={() => {

                    }} />
                </View>
            </View>
        </View>
    </Modal >
}


const CancelReturnPolicyView = ({ onClick }) => {

    return (
        <View

            style={[
                styles.profile,
                {
                    marginTop: 9, alignItems: "center", paddingVertical: 4,
                    paddingHorizontal: 6, backgroundColor: "#F6F6F6", borderRadius: 8,
                    justifyContent: "flex-start"
                },
            ]}
        >
            <Ionicons
                name={"shield-checkmark"}
                color={"#CCCCCC"}
                size={25}
            />
            <Text
                style={[
                    styles.textStyle,
                    { fontSize: 14, fontWeight: "400", fontFamily: fontFamilty.regular, paddingStart: 8 },
                ]}
            >
                Доставка Возврат - Цена - Отмена заказа
            </Text>

        </View>
    );
}

const PhoneDataScreen = ({ onClick }) => {

    return (
        <View

            style={[
                styles.profile,
                {
                    marginTop: 13, alignItems: "center", paddingVertical: 5, paddingHorizontal: 6,
                    backgroundColor: "#FDF1EC", borderRadius: 8,
                },
            ]}
        >
            <Ionicons
                name={"bandage-outline"}
                color={colors.endOrange}
                size={22}
            />
            <Text
                style={[
                    styles.textStyle,
                    { fontSize: 14, paddingStart: 4, fontWeight: "400", fontFamily: fontFamilty.regular },
                ]}
            >
                Доставка Возврат - Цена - Отмена заказа
            </Text>
            <Ionicons
                name={"chevron-forward-outline"}
                color={colors.endOrange}
                size={22}
            />
        </View>
    );
}

const ColorOptions = ({ }) => {
    const [selectedColor, setSelectedColor] = useState(1)
    return (
        <View >
            <Text style={[styles.textStyle, { paddingVertical: 10, fontSize: 14 }]}>Цвет (5)</Text>

            <FlatList
                data={[1, 2, 3, 4, 5]}
                renderItem={({ item }) =>

                    <View style={{ marginEnd: 8 }}>
                        <TouchableOpacity onPress={() => {
                            setSelectedColor(item)
                        }} >
                            <View style={{ marginHorizontal: 1, justifyContent: "center", flexDirection: "column", alignContent: "center", }}>
                                <Image source={{ uri: imagesUrl.shoes }} style={{ width: 109, height: 111, borderRadius: 7 }} />
                                <View style={{ width: 109, height: 42, justifyContent: "center", backgroundColor: "#F6F6F6", borderRadius: 7 }}>
                                    <Text style={[styles.textStyle, { textAlign: "center", alignSelf: "center" }]}> light gray</Text>
                                </View>
                            </View>
                            {selectedColor == item ?
                                <View style={{
                                    position: "absolute", backgroundColor: "rgba(255, 118, 0, 0.08)",
                                    width: "100%", height: "100%", borderRadius: 7,
                                    borderColor: colors.endOrange, borderWidth: 1
                                }} />
                                : null
                            }
                        </TouchableOpacity>
                    </View>
                }
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

const SizeAndBuyingForView = ({ }) => {

    const [selectedSize, setSelecteSize] = useState(false)
    const users = ["Vali", "Name 2", "+ Add"]
    const sizes = ["24", "25", "26", "27", "28", "29", "30", "31", "32"]
    const [selectedItem, setSelecteItem] = useState("")
    return (
        <View >
            <View style={{ flexDirection: "row", justifyContent: "flex-start" }} >
                <TouchableOpacity onPress={() => {
                    setSelecteSize(false)
                }}>
                    <View style={{ flexDirection: "column", justifyContent: "flex-start" }}>
                        <Text style={[styles.textStyle, { paddingVertical: 10, fontSize: 14, color: !selectedSize ? colors.endOrange : colors.black }]}>Для</Text>
                        {!selectedSize ? <View style={{ height: 2, backgroundColor: colors.endOrange }} /> : null}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setSelecteSize(true)
                }}>
                    <View style={{ flexDirection: "column", justifyContent: "flex-start", marginStart: 8 }}>
                        <Text style={[styles.textStyle, { paddingVertical: 10, fontSize: 14, color: selectedSize ? colors.endOrange : colors.black }]}>Размер</Text>
                        {selectedSize ? <View style={{ height: 2, backgroundColor: colors.endOrange }} /> : null}
                    </View>
                </TouchableOpacity>
            </View>
            <FlatList
                data={selectedSize ? sizes : users}
                horizontal
                renderItem={({ item }) =>

                    <View style={{ margin: 8 }}>

                        <TouchableOpacity onPress={() => {
                            setSelecteItem(item)
                        }} >
                            <View style={{ paddingHorizontal: 16, paddingVertical: 5, justifyContent: "center", backgroundColor: "#F6F6F6", borderRadius: 15 }}>
                                <Text style={[styles.textStyle, { textAlign: "center", alignSelf: "center" }]}> {item}</Text>
                            </View>

                        </TouchableOpacity>
                        {selectedItem == item ?
                            <View style={{ position: "absolute", backgroundColor: "rgba(255, 118, 0, 0.08)", width: "100%", height: "100%", borderRadius: 15, borderColor: colors.endOrange, borderWidth: 1 }} />
                            : null
                        }
                    </View>
                }
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

const QuanityView = ({ }) => {
    const [quantiy, setQuantity] = useState(1)
    const maxQuantity = 9
    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 5 }}>
            <Text style={[styles.textStyle, { textAlign: "center", fontSize: 14, alignSelf: "center" }]}> Количество</Text>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <TouchableOpacity onPress={() => {
                    if (quantiy > 1) {
                        setQuantity(quantiy - 1)
                    }
                }}
                >
                    <Ionicons
                        name={"remove-circle-outline"}
                        color={quantiy > 1 ? colors.endOrange : "#F1F1F1"}
                        size={30}

                    />
                </TouchableOpacity>
                <Text style={[styles.textStyle, { alignSelf: "center", fontSize: 17, paddingRight: 8 }]}> {quantiy.toString()}</Text>
                <TouchableOpacity onPress={() => {
                    if (quantiy < maxQuantity) {
                        setQuantity(quantiy + 1)
                    }
                }}
                >
                    <Ionicons
                        name={"add-circle"}
                        color={quantiy < maxQuantity ? colors.endOrange : "#F1F1F1"}
                        size={30}
                    />
                </TouchableOpacity>


            </View>
        </View>
    )
}


const CommonButton = ({ text = AppString.add_to_cart, endColor = colors.endOrange,
    startorange = colors.startOrange, onClick }) => {

    return (
        <TouchableOpacity onPress={onClick} style={{ flex: 0.5 }}>
            <LinearGradient
                colors={[startorange, endColor]}
                start={{ x: 0.4, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                    borderRadius: 1000,
                    marginEnd: 10,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: "center"
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

export default SelectProductSizeColorScreen
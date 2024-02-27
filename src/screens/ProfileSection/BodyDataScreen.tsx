import { View, Text, FlatList, TouchableOpacity, Pressable } from "react-native"
import { CustomHeader } from "../../components/Header"
import { styles } from "../../utils/AppStyles"
import { AppString } from "../../utils/AppStrings"
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer"
import { colors } from "../../utils/AppColors"
import MaleIcon from "../../../assets/Icons/MaleIcon.svg"
import PlusIcon from "../../../assets/Icons/Plus.svg"
import FemaleIcon from "../../../assets/Icons/Female.svg"
import CheckmarkCircle from '../../../assets/Icons/CircleOrange.svg';
import EllipsisHorizontalNormal from '../../../assets/Icons/CircleGrey.svg';

import DeleteIcon from "../../../assets/Icons/DeleteWithWhiteBG.svg"
import { useEffect, useMemo, useState } from "react"
import { RouteNames } from "../../utils/RouteNames"
import { getAPICall } from "../../Netowork/Apis"
import { CommonModal } from "../HomeScreen"
import { BodyDataAPI } from "../../Netowork/Constants"
import { ProgressView, RetryWhenErrorOccur } from "../../components/Dialogs"
import { useIsFocused } from "@react-navigation/native"


const sizeTypes = [
    "Male", "Male", "Male", "Female"
]
export const BodyDataScreen = ({ navigation }) => {

    const [isDeleting, setDelete] = useState(false)



    const [data, setData] = useState<CommonModal>()
    const [loading, setLoading] = useState(false)
    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            callAPI()
        }
    }, [isFocused
    ])

    const callAPI = () => {
        setLoading(true)
        getAPICall(BodyDataAPI.getBodyData,
            (res: CommonModal) => {
                setData(res)
                setLoading(false)
            }
        )
    }


    return (
        <View style={[styles.container, { padding: 0 }]}>
            <CustomHeader navigation={navigation} title={AppString.body_data} />

            {data?.isSuccess && data.data && data.data.data ? <View>
                <Text
                    style={[styles.textStyle, { color: "#000103", fontWeight: "600", margin: 17, }]}
                >
                    Оптимальный размер будет выбран на основе ваших данных о теле
                </Text>

                <FlatList
                    style={{ paddingHorizontal: 8, marginBottom:190 }}
                    showsVerticalScrollIndicator={false}
                    data={data.data.data}
                    ListEmptyComponent={
                        <Text style={[styles.textStyle, {
                            color: colors.lightOrange,
                            paddingVertical: 100,
                            fontSize: 16, fontWeight: 'bold', textAlign: 'center'
                        }]}>No body data found</Text>
                    }
                    renderItem={({ item, index }) => {

                        return (
                            <SizeDetailView type={item} isDeleting={isDeleting} onViewDetail={() => {
                                navigation.navigate(RouteNames.editBodyData)
                            }} />
                        )
                    }


                    }
                    ListFooterComponent={<AddSizeView onClick={() => {
                        navigation.navigate(RouteNames.editBodyData)

                    }} />}
                />
                {
                    isDeleting ?

                        <DeleteButton onDelete={() => { }} onCancel={() => {
                            setDelete(false)
                        }} />
                        :
                        <View style={{ marginBottom: 40, marginTop: 10, alignSelf: "center", flexDirection: "row" }} >
                            <TouchableOpacity
                                onPress={() => {
                                    setDelete(true)
                                }}
                            >
                                <DeleteIcon />

                            </TouchableOpacity>
                        </View>
                }
            </View> : loading ?
                <ProgressView />
                :
                <RetryWhenErrorOccur data={data} onClick={() => {
                    setData(undefined)
                    callAPI()

                }} />}
        </View>
    )
}

const SizeDetailView = ({ type, isDeleting, onViewDetail }) => {

    const [isSelected, setIsSelected] = useState(false)
    if (!isDeleting && isSelected) {
        setIsSelected(false)
    }

    return (<Pressable
        style={{ backgroundColor: colors.white, paddingHorizontal: 8, paddingTop: 20, paddingBottom: 6, borderRadius: 13, marginBottom: 15 }}
    >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 4 }}>

                {isDeleting ?
                    <TouchableOpacity
                        onPress={() => {
                            setIsSelected(!isSelected)
                        }}
                        style={{ alignSelf: "center" }}
                    >
                        {isSelected ? <CheckmarkCircle /> : <EllipsisHorizontalNormal />}

                    </TouchableOpacity>
                    : null}
                <Text
                    style={[styles.textStyle, { color: (isSelected ? colors.lightOrange : "#000103"), fontSize: 16, fontWeight: "bold", }]}
                >
                    {type.name}
                </Text>
                {type.gender == "Мужской" ? <MaleIcon /> : <FemaleIcon />}
            </View>

            <TouchableOpacity
                onPress={onViewDetail}

                style={{ paddingHorizontal: 10, borderColor: "#DCDCDC", borderWidth: 1, borderRadius: 12, height: 24, justifyContent: "center" }}
            >
                <Text
                    style={[styles.textStyle, { color: "#080808", fontSize: 13, fontWeight: "400", }]}
                >
                    Изменить
                </Text>

            </TouchableOpacity>
        </View>
        <SizeDetailFlatList item={type} />
    </Pressable>
    )
}

const SizeDetailFlatList = ({ item }) => {

    const sizeDetails = useMemo(() => {

        let sholder = "0"
        let chest = "0"
        let foot = "0"
        let waistline = "0"
        let hip = "0"


        item.bodyMeasurment.forEach((it: any, index: number) => {
            console.log(it);
            
            const type = it.name.toString().toLowerCase()
            if (type == 'shoulders'.toLowerCase()) {
                sholder = it.value
            } else if (type == 'chest'.toLowerCase()) {
                chest = it.value
            }
            else if (type == 'Foot'.toLowerCase()) {
                foot = it.value
            }
            else if (type == 'Hip'.toLowerCase()) {
                hip = it.value
            } else if (type == 'waistline'.toLowerCase()) {
                waistline = it.value
            }

        })

        const data = [
            {
                name: "Height",
                value: `${item.height}CM`
            },
            {
                name: "Weight",
                value: `${item.weight}KG`
            },
            {
                name: "Age",
                value: item.age
            },
            {
                name: "Shoulder",
                value: `${sholder}CM`
            },
            {
                name: "Chest",
                value: `${chest}CM`
            },
            {
                name: "Waistline",
                value: `${waistline}CM`
            },
            {
                name: "Foot",
                value: `${foot}CM`
            },
            {
                name: "Hip",
                value: `${hip}CM`
            },

        ]

        return data
    }, [item])



    return (
        <FlatList
            style={{
                paddingHorizontal: 8, marginTop: 12,
                backgroundColor: "#EFEFEF", borderRadius: 8
            }}
            showsHorizontalScrollIndicator={false}
            scrollEnabled
            horizontal
            data={sizeDetails}
            renderItem={({ item, index }) =>
                <View
                    style={{
                        paddingVertical: 15,
                        paddingHorizontal: 8,
                        gap: 12,
                    }}
                >


                    <Text
                        style={[styles.textStyle, { color: "#010101", fontSize: 17, fontWeight: "400", }]}
                    >
                        {item.value}
                    </Text>
                    <View
                        style={{
                            flexDirection: "row"
                        }}
                    >
                        <Text
                            style={[styles.textStyle, { color: "#999999", fontSize: 17, fontWeight: "400", }]}
                        >
                            {item.name}
                        </Text>
                        <View
                            style={{
                                backgroundColor: "#DADADA",
                                width: 1,
                                marginStart: 13,

                            }}
                        />
                    </View>
                </View>
            }
        />
    )
}

const AddSizeView = ({ onClick }) => {
    return (
        <View
            style={{ backgroundColor: colors.white, paddingHorizontal: 8, paddingTop: 20, paddingBottom: 6, borderRadius: 13, marginBottom: 15, height: 125, justifyContent: "center" }}
        >

            <TouchableOpacity
                onPress={onClick}
                style={{
                    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6
                }}
            >
                <Text
                    style={[styles.textStyle, { color: "#040404", fontSize: 16, fontWeight: "bold", }]}
                >
                    Добавить новую роль
                </Text>
                <PlusIcon />
            </TouchableOpacity>

        </View>
    )
}

const DeleteButton = ({ onDelete, onCancel }) => {
    return (


        <View style={{ marginBottom: 40, marginTop: 10, alignSelf: "center", flexDirection: "row", gap: 13 }} >
            <TouchableOpacity
                style={{ paddingHorizontal: 30, height: 44, justifyContent: "center", borderRadius: 22, backgroundColor: colors.white }}
                onPress={onDelete}
            >
                <Text
                    style={[styles.textStyle, { color: colors.lightOrange, fontSize: 17, fontWeight: "400", }]}
                >
                    Удалить
                </Text>

            </TouchableOpacity>
            <TouchableOpacity
                style={{ paddingHorizontal: 30, height: 44, justifyContent: "center", borderRadius: 22, backgroundColor: colors.white }}
                onPress={onCancel}
            >
                <Text
                    style={[styles.textStyle, { color: colors.black, fontSize: 17, fontWeight: "400", }]}
                >
                    Отмена
                </Text>

            </TouchableOpacity>
        </View>
    )
}
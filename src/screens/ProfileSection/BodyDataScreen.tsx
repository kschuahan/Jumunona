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
import { useState } from "react"
import { RouteNames } from "../../utils/RouteNames"

const sizesDetail = [
    {
        name: "Height",
        value: "178cm"
    },
    {
        name: "Weight",
        value: "71kg"
    },
    {
        name: "Age",
        value: "28"
    },
    {
        name: "Shoulder",
        value: "54cm"
    },
    {
        name: "Chest",
        value: "60cm"
    },
    {
        name: "Waistline",
        value: "70cm"
    },
]

const sizeTypes = [
    "Male", "Male", "Male", "Female", "Add New"
]
export const BodyDataScreen = ({ navigation }) => {

    const [isDeleting, setDelete] = useState(false)
    return (
        <View style={[styles.container, { padding: 0 }]}>
            <CustomHeader navigation={navigation} title={AppString.body_data} />

            <Text
                style={[styles.textStyle, { color: "#000103", fontWeight: "600", margin: 17, }]}
            >
                Оптимальный размер будет выбран на основе ваших данных о теле
            </Text>

            <FlatList
                style={{ paddingHorizontal: 8 }}
                showsVerticalScrollIndicator={false}
                data={sizeTypes}
                renderItem={({ item, index }) =>
                    { 

                        return (
                            item !=  "Add New" ?
                   <SizeDetailView type = {item} isDeleting = {isDeleting} onViewDetail={ () => {
                        navigation.navigate(RouteNames.editBodyData)
                   }}/> 
                   : <AddSizeView /> 
                        )
                }
                }
            />
            {
                isDeleting ? 

                <DeleteButton onDelete={() => {}} onCancel={() => {
                    setDelete(false)
                }} /> 
                :
                <View style = {{marginBottom: 40, marginTop: 10,  alignSelf: "center", flexDirection: "row"}} >
                <TouchableOpacity
                    onPress={() => {
                        setDelete(true)
                    }}
                >
                    <DeleteIcon />

                </TouchableOpacity>
                </View>
            }
            
        </View>
    )
}

const SizeDetailView = ({ type, isDeleting, onViewDetail }) => {

    const [isSelected, setIsSelected] = useState(false)
    if (!isDeleting && isSelected) {
        setIsSelected(false)
    }

    return (<Pressable
        onPress={onViewDetail}
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
                    style={[styles.textStyle, { color: ( isSelected ? colors.lightOrange : "#000103" ), fontSize: 16, fontWeight: "bold", }]}
                >
                   {type == "Male" ? "Я" : "Жена" }
                </Text>
                {type == "Male" ? <MaleIcon /> :  <FemaleIcon />}
            </View>

            <TouchableOpacity
                style={{ paddingHorizontal: 10, borderColor: "#DCDCDC", borderWidth: 1, borderRadius: 12, height: 24, justifyContent: "center" }}
            >
                <Text
                    style={[styles.textStyle, { color: "#080808", fontSize: 13, fontWeight: "400", }]}
                >
                    Изменить
                </Text>

            </TouchableOpacity>
        </View>
        <SizeDetailFlatList />
    </Pressable>
    )
}

const SizeDetailFlatList = ({ }) => {
    return (
        <FlatList
            style={{ paddingHorizontal: 8, marginTop: 12, backgroundColor: "#EFEFEF", borderRadius: 8 }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={sizesDetail}
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

const AddSizeView = ({}) => {
    return (
       <View
            style={{ backgroundColor: colors.white, paddingHorizontal: 8, paddingTop: 20, paddingBottom: 6, borderRadius: 13, marginBottom: 15, height: 125 , justifyContent:"center"}}
        >

            <TouchableOpacity
                style = {{
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

const DeleteButton = ({onDelete, onCancel}) => {
    return (


        <View style = {{marginBottom: 40, marginTop: 10,  alignSelf: "center", flexDirection: "row", gap: 13}} >
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
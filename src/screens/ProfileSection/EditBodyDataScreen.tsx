import { View, Text, FlatList, TouchableOpacity, Image, Pressable, Dimensions, TextInput, Alert } from "react-native"
import { CustomHeader } from "../../components/Header"
import { AppString } from "../../utils/AppStrings"
import { styles } from "../../utils/AppStyles"
import GrayCautionIcon from '../../../assets/Icons/GrayCaution.svg';
import { ScrollView } from "react-native-virtualized-view";
import { colors } from "../../utils/AppColors";
import CautionIcon from '../../../assets/Icons/Caution.svg';
import { chestImages, hipImages, shoulderImages, waistImages } from "../../utils/AppIcons";
import { useEffect, useState } from "react";
import CheckmarkCircle from '../../../assets/Icons/CircleOrange.svg';
import EllipsisHorizontalNormal from '../../../assets/Icons/CircleGrey.svg';
import { AgeBottomSheet } from './AgeBottomSheet';
import { AddRoleBottomSheet } from './AddRoleBottomSheet';
import LinearGradient from "react-native-linear-gradient";
import { getAPICall, postAPICall } from "../../Netowork/Apis";
import { RouteNames } from "../../utils/RouteNames";
import { BodyDataAPI } from "../../Netowork/Constants";
import { CommonModal } from "../HomeScreen";
import { CenterProgressView, ProgressView, RetryWhenErrorOccur } from "../../components/Dialogs";
import { refresh } from "@react-native-community/netinfo";


const basicData = [
    {
        name: "Имя",
        value: "",
        unit: ""
    },
    {
        name: "Пол",
        value: AppString.male,
        unit: ""
    },
    {
        name: "Возраст",
        value: "1995",
        unit: ""
    },
    {
        name: "Рост",
        value: "",
        unit: "CM"
    },
    {
        name: "Вес",
        value: "",
        unit: "КГ"
    },
]

let selectedBodyData: { name: string; image: string; value: string; }[] = []

export const EditBodyDataScreen = ({ navigation }) => {

    const [addRoleShow, setAddRoleShow] = useState(false)
    const [bodyData, setBodyData] = useState<any[]>()
    const [data, setData] = useState<CommonModal>()
    const [loading, setLoading] = useState(false)
    const [overlayLoading, setOverlayLoading] = useState(false)
    useEffect(() => {
        getImages()
    }, [])

    const getImages = () => {
        setLoading(true)
        getAPICall(BodyDataAPI.getBodyImages,
            (res: CommonModal) => {
                if (res.isSuccess && res.data && res.data.data) {
                    setBodyData(res.data.data)
                    selectedBodyData = res.data.data.map (it => { 
                    return {
                        name: it.type.toString() ?? '',
                        image: '',
                        value: ''
                    }
                        
                    }) 
                }
                setData(res)
                setLoading(false)
            }
        )
    }

    const validate = () => {
        console.warn(basicData)
        let isValid = true
        basicData.forEach( it => {
          if (isValid) {
            if (it.value.trim().length == 0) {
                isValid = false
                Alert.alert("", `Please enter ${it.name} value`)
                return false
            } else {
                if ((it.name == "Рост" || it.name == "Вес" ) && !isNaN(it.value)) {
                    isValid = false
                    Alert.alert("", `Please enter ${it.name} value`)
                    return false
                }
            }
        }
        })
        selectedBodyData.forEach( it => {
            if (it.image.length == 0  && isValid) {
                isValid = false
                Alert.alert("", `Please select image for ${it.name}`)
                return false
            }
            if (!isNaN(it.value)   && isValid) {
                isValid = false
                Alert.alert("", `Please enter ${it.name} value`)
                return false
            
            }
        })
        return isValid
    }

    const addBodyData = () => {
        setOverlayLoading(true)
        postAPICall(
            createAddBodyDataRequest(),
            BodyDataAPI.addBodyData,
            true,
            (res: any) => {
                setOverlayLoading(false)


            }
        )
    }

    const createAddBodyDataRequest = () => {
        return {
            name: basicData[0].value,
            gender: basicData[1].value,
            age:  basicData[2].value,
            height:  basicData[3].value,
            weight:  basicData[4].value,
            bodyMeasurment: selectedBodyData
        }
    }

    return (
        <View style={[styles.container, { padding: 0 }]}>
            <CustomHeader navigation={navigation} title={AppString.change_body_data} />
            {data?.isSuccess && data.data && data.data.data ?
                <ScrollView style={{ paddingHorizontal: 12, marginBottom: 60 }}>
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
                    <BasicDataFlatList/>
                    <Text
                        style={[styles.textStyle, { color: "#14100D", fontWeight: "500", fontSize: 17, marginHorizontal: 10, marginBottom: 6, marginTop: 22 }]}
                    >
                        {AppString.please_fill_body_info}
                    </Text>
                    <BodyInforView bodyData={bodyData} onDetailClick={() => { setAddRoleShow(true) }} />
                </ScrollView>
                :
                loading ?
                    <ProgressView />
                    :
                    <RetryWhenErrorOccur data={data} onClick={() => {
                        setData(undefined)
                        getImages()

                    }} />
            }
                {data?.isSuccess && data.data && data.data.data ?
            <BottomButton onClick={() => { if (validate()) {
                addBodyData()
            }} } /> : null }
         
            <AddRoleBottomSheet isShow={addRoleShow} onClose={() => {
                setAddRoleShow(false)
            }} />
            <CenterProgressView isShow={overlayLoading} />
        </View>
    )
}


const BasicDataFlatList = ({  }) => {

    const [male, setMale] = useState(true)
   const [refresh, setRefresh] = useState(false)
   const [ageShow, setAgeShow] = useState(false)

    return (
        <View>
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
                        marginVertical: 8,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignContent: "center",
                        alignItems: "center"
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
                                        let index = basicData.findIndex(it => it.name == "Пол")
                                        if (index > -1) {
                                            basicData[index].value = AppString.male
                                            setRefresh(!refresh)
                                        }
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
                                        let index = basicData.findIndex(it => it.name == "Пол")
                                        if (index > -1) {
                                            basicData[index].value = AppString.female
                                            setRefresh(!refresh)
                                        }
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
                            : item.name == "Возраст" ?
                                <TouchableOpacity
                                    onPress={() => {
                                        if (item.name == "Возраст") {
                                           setAgeShow(true)
                                        }
                                    }}
                                >
                                    <Text
                                        style={[styles.textStyle, { color: "#111111", fontWeight: "400", fontSize: 15 }]}
                                    >
                                        {item.value}
                                    </Text>
                                </TouchableOpacity>
                                :
                                <View style = {{flexDirection: "row", alignItems: "center", gap: 4}}>
                                <TextInput
                                    value={item.value}
                                    style={[styles.textStyle, {
                                        width: 100, height: 30, borderRadius: 10, borderColor: colors.grayAAAAAA, borderWidth: 1, paddingHorizontal: 8, textAlign: "right"
                                    }]}
                                    onChangeText={(text: string) => {
                                        item.value = text
                                        setRefresh(!refresh)
                                    }}
                                    keyboardType={item.name == "Имя" ? "ascii-capable" : "number-pad"}
                                />
                                {
                                    item.unit.length > 0 ?
                                    <Text
                                    style={[styles.textStyle, { color: "#111111", fontWeight: "400", fontSize: 15 }]}
                                >
                                    {item.unit}
                                </Text> : null
                                }
                                </View>
                    }
                </View>
            }
            scrollEnabled={false}
        />
           <AgeBottomSheet isShow={ageShow} onClose={(item: string) => {
                if (item) {
                    let index = basicData.findIndex(it => it.name == "Возраст")
                    if (index > -1) {
                        basicData[index].value = item
                        setRefresh(!refresh)
                    }
                }
                setAgeShow(false)
            }} />
        </View>
    )
}

const BodyInforView = ({ bodyData, onDetailClick }) => {

    return (
        <FlatList
            style={{
                backgroundColor: colors.white,
                paddingHorizontal: 12,
                borderRadius: 13
            }}
            data={bodyData}
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
                            {item.type}{" "}
                            <TouchableOpacity onPress={onDetailClick} >
                                <CautionIcon width={15} height={15} />
                            </TouchableOpacity>
                        </Text>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>

                            <TextInput
                                value={item.value}
                                style={[styles.textStyle, {
                                    width: 100, height: 30, borderRadius: 10, borderColor: colors.grayAAAAAA, borderWidth: 1, paddingHorizontal: 8, textAlign: "right"
                                }]}
                                onChangeText={(text: string) => {
                                    item.value = text
                                    selectedBodyData[index].value = text
                                }}
                            />
                            <Text
                                style={[styles.textStyle, { color: "#111111", fontWeight: "400", fontSize: 15 }]}
                            >
                                CM
                            </Text>
                        </View>
                    </View>
                    <ImagesView images={item.images} parentIndex={index} />
                </View>
            }
        />
    )
}

const ImagesView = ({ images, parentIndex }) => {

    const [selectedItem, setSeleced] = useState<number>()
    const [refresh, setRefresh] = useState(false)
    return (<FlatList
        data={images}
        keyExtractor={item => {
            return item.toString();
        }}
        style={{ marginHorizontal: 7 }}
        numColumns={3}
        renderItem={({ item, index }) => {
            return <Pressable style={{ flex: 1 / 3 }} onPress={() => { 
            selectedBodyData[parentIndex].image = item 
            setSeleced(index)
            setRefresh(!refresh)
             }}>
                <Image source={{ uri: item }} style={{ height: 105, width: "95%", marginEnd: 10, marginVertical: 10 }} resizeMode="stretch" />
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

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
        unit: "",
        hint: 'Введите прозвище/отношение/имя роли'
    },
    {
        name: "Пол",
        value: AppString.male,
        unit: "",
        hint: 'Пожалуйста, выберите'
    },
    {
        name: "Возраст",
        value: "1995",
        unit: "",
        hint: 'Пожалуйста, выберите'
    },
    {
        name: "Рост",
        value: "",
        unit: "CM",
        hint: 'Пожалуйста, введите рост'
    },
    {
        name: "Вес",
        value: "",
        unit: "КГ",
        hint: 'Пожалуйста, введите вес'
    },
]

let selectedBodyData: { type: string; name: string; image: string; value: string; }[] = []

export const EditBodyDataScreen = ({ navigation, route }) => {

    const [addRoleShow, setAddRoleShow] = useState(false)
    const [bodyData, setBodyData] = useState<any[]>()
    const [data, setData] = useState<CommonModal>()
    const [bodyDataInfo, setBodyDataInfo] = useState<CommonModal>()

    const [loading, setLoading] = useState(false)
    const [overlayLoading, setOverlayLoading] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [updatingId, setUpdatingId] = useState('')
    useEffect(() => {
        selectedBodyData=[]
        setIsUpdating(route.params.isUpdating)
        console.warn(route.params)
        if (route.params.isUpdating) {
            if (route.params.data) {
                let data = route.params.data
                setUpdatingId(data._id)

                console.log("body data", data)
                console.log(data.bodyMeasurment)
                basicData[0].value = data.name
                basicData[1].value = data.gender
                basicData[2].value = data.age
                basicData[3].value = data.height
                basicData[4].value = data.weight
            }
        }else{
            basicData[0].value = ""
            basicData[1].value = ""
            basicData[2].value = "1995"
            basicData[3].value = ""
            basicData[4].value = ""
        }    
        getImages()
    }, [])

    const callAPI = () => {
        setOverlayLoading(true)
        getAPICall(BodyDataAPI.getBodyMeasurementGuide,
            (res: CommonModal) => {
                setBodyDataInfo(res)
                if (!res.isSuccess) {
                    Alert.alert("", res.data.message ? res.data.message.toString() : res.data.toString())
                } else {
                    setAddRoleShow(true)
                }
                setOverlayLoading(false)
            }
        )
    }

    const getImages = () => {
        setLoading(true)
        getAPICall(BodyDataAPI.getBodyImages,
            (res: CommonModal) => {

                if (res.isSuccess && res.data && res.data.data) {

                    if (route.params && route.params.isUpdating) {
                        let data = route.params.data
                        // console.warn(data)
                        let bodyData = data.bodyMeasurment
                        selectedBodyData = res.data.data.map(it => {
                            // console.warn(bodyData)
                            let index = bodyData.findIndex(item => it.type.toString().toLowerCase() == item.name.toString().toLowerCase())
                            if (index > -1) {
                                return {
                                    type: it.bodyMeasurement,
                                    name: it.type.toString().toLowerCase(),
                                    image: bodyData[index].image,
                                    value: bodyData[index].value
                                } 
                            } else {
                                return {
                                    type: it.bodyMeasurement,
                                    name: it.type.toString().toLowerCase(),
                                    image: it.image,
                                    value: it.value
                                }
                            }
                        })

                        res.data.data.forEach((it, index) => {
                            let ind = bodyData.findIndex(item => it.type.toString().toLowerCase() == item.name.toString().toLowerCase())
                            if (ind > -1) {
                                res.data.data[index].value = bodyData[ind].value
                            }
                        })

                        console.log("selected Body data", selectedBodyData)
                    } else {
                        selectedBodyData = res.data.data.map(it => {
                            return {
                                type: it.bodyMeasurement,
                                name: it.type,
                                image: '',
                                value: ''
                            }

                        })
                    }
                    setBodyData(res.data.data)
                }
                setData(res)
                setLoading(false)
            }
        )
    }

    const validate = () => {
        let isValid = true
        basicData.forEach(it => {
            if (isValid) {
                if (it.value.toString().trim().length == 0) {
                    isValid = false
                    Alert.alert("", `Please enter ${it.name} value`)
                    return false
                }
            }
        })
        selectedBodyData.forEach(it => {
            if (isValid) {
                if (it.image.toString().length == 0) {
                    isValid = false
                    Alert.alert("", `Please select image for ${it.type}`)
                    return false
                }
                if (isNaN(it.value)) {
                    isValid = false
                    Alert.alert("", `Please enter ${it.type} value`)
                    return false
                }
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
                if (res.isSuccess) {
                    navigation.goBack()
                } else {
                    Alert.alert("", res.data && res.data.message ?
                        res.data.message.toString() : res.data.toString())

                }
            }
        )
    } 

    const updateBodyData = () => {
        setOverlayLoading(true)
        console.warn( createUpdateBodyDataRequest());
        
        postAPICall(
            createUpdateBodyDataRequest(),
            BodyDataAPI.upadateBodyData,
            true,
            (res: any) => {
                setOverlayLoading(false)
                if (res.isSuccess) {
                    navigation.goBack()
                }
            }
        )
    }

    const createAddBodyDataRequest = () => {
        return {
            name: basicData[0].value,
            gender: basicData[1].value,
            age: basicData[2].value,
            height: basicData[3].value,
            weight: basicData[4].value,
            bodyMeasurment: selectedBodyData
        }
    }
    const createUpdateBodyDataRequest = () => {
        return {
            bodyDataId: updatingId,
            name: basicData[0].value,
            gender: basicData[1].value,
            age: basicData[2].value,
            height: basicData[3].value,
            weight: basicData[4].value,
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
                    <BasicDataFlatList />
                    <Text
                        style={[styles.textStyle, { color: "#14100D", fontWeight: "500", fontSize: 17, marginHorizontal: 10, marginBottom: 6, marginTop: 22 }]}
                    >
                        {AppString.please_fill_body_info}
                    </Text>
                    <View style={{ paddingBottom: 100 }}>
                        <BodyInforView bodyData={bodyData}
                            onDetailClick={() => {

                                if (bodyDataInfo?.isSuccess) {
                                    setAddRoleShow(true)

                                } else {
                                    callAPI()
                                }

                            }} />

                    </View>
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
                <BottomButton onClick={() => {

                    // console.warn(isUpdating)
                    if (validate()) {

                        if (isUpdating) {

                            updateBodyData()
                        } else {
                            addBodyData()
                        }
                    }
                }} /> : null}

            {bodyDataInfo && bodyDataInfo.data && bodyDataInfo.data.data ?
                <AddRoleBottomSheet data={bodyDataInfo} isShow={addRoleShow} onClose={() => {
                    setAddRoleShow(false)
                }} /> : null}
            <CenterProgressView isShow={overlayLoading} />
        </View>
    )
}


const BasicDataFlatList = ({ }) => {

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
                            style={[styles.textStyle, {
                                color: "#333333", fontWeight: "500", fontSize: 15
                            }]}
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
                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>

                                        <TextInput
                                            value={item.value}
                                            style={[styles.textStyle, {
                                                height: 30,
                                                paddingHorizontal: 8, textAlign: "right", padding: 0
                                                , fontSize: 13
                                            }]}
                                            placeholderTextColor={'#999999'}
                                            numberOfLines={1}
                                            placeholder={item.hint}
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
    const [refresh, setRefresh] = useState(false)

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
                            justifyContent: "space-between",
                        }}
                    >
                        <Text
                            style={[styles.textStyle, {
                                color: "#333333",
                                fontWeight: "500", fontSize: 15,
                                textTransform: 'capitalize',
                            }]}
                        >
                            {item.bodyMeasurement}{" "}
                            <TouchableOpacity onPress={onDetailClick} >
                                <CautionIcon width={15} height={15} />
                            </TouchableOpacity>
                        </Text>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>

                            <TextInput
                                value={item.value}
                                style={[styles.textStyle, {
                                    height: 30,
                                    paddingHorizontal: 8,
                                    textAlign: "right", padding: 0
                                    , fontSize: 13
                                }]}
                                maxLength={3}
                                placeholderTextColor={'#999999'}
                                keyboardType="number-pad"
                                placeholder="Пожалуйста, введите"
                                onChangeText={(text: string) => {
                                    item.value = text
                                    selectedBodyData[index].value = text
                                    setRefresh(!refresh)
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
                {selectedBodyData[parentIndex].image == item ?
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

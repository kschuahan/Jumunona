import { Modal, View, Image, Text, TouchableOpacity, FlatList, Pressable } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import React, { useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AppString } from "../../utils/AppStrings";
import { styles } from "../../utils/AppStyles";
import { appIcons, imagesUrl, productImages } from "../../utils/AppIcons";
import { colors } from "../../utils/AppColors";
import { fontFamilty } from "../../utils/Fonts";
import { dimensions } from "../../utils/sizes";
import ImageViewer from "react-native-image-zoom-viewer";
import { Colors } from "react-native/Libraries/NewAppScreen";


const ProductImageScreeen = ({ isShow = false, onClose, pos = 1 }) => {

    const [activeIndex, setActiveIndex] = useState(0);
    const images = [{
        // Simplest usage.
        url: imagesUrl.shoes,

    }, {
        url: imagesUrl.shoes,

    }
        , {
        url: imagesUrl.shoes,

    }
        , {
        url: imagesUrl.shoes,

    }
        , {
        url: imagesUrl.shoes,

    }
    ]

    return (

        <Modal visible={isShow} transparent={true} animationType="slide" onRequestClose={onClose}>
            <ImageViewer  imageUrls={images} index={pos} />
            <TouchableOpacity style={{
                position: 'absolute', top: 30, start: 16,
                backgroundColor: colors.black333333, borderRadius: 20, height: 29, width: 29, 
                alignItems: 'center', justifyContent:'center'
            }} onPress={onClose}>
                <Ionicons
                    name={"close"}
                    color={colors.white}
                    size={18}

                /></TouchableOpacity>
        </Modal>
    )
}

export default ProductImageScreeen
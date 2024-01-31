import {Modal, Pressable, SafeAreaView, StatusBar, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {imagesUrl} from '../../utils/AppIcons';
import {colors} from '../../utils/AppColors';
import ImageViewer from 'react-native-image-zoom-viewer';
import CloseIcon from '../../../assets/Icons/CloseBlackCircle.svg';

const ProductImageScreeen = ({isShow = false, onClose, pos = 1}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [
    {
      // Simplest usage.
      url: imagesUrl.shoes,
    },
    {
      url: imagesUrl.shoes,
    },
    {
      url: imagesUrl.shoes,
    },
    {
      url: imagesUrl.shoes,
    },
    {
      url: imagesUrl.shoes,
    },
  ];

  return (
    <Modal
      visible={isShow}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <SafeAreaView style={{flex:1, backgroundColor: colors.black}}>
     <StatusBar barStyle={"light-content"} />
      
      <TouchableOpacity
        style={{
          start: 16,
          backgroundColor: colors.black333333,
          borderRadius: 20,
          height: 29,
          width: 29,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1
        }}
        onPress={onClose}>
        <CloseIcon color={colors.white} width={29} height={29} />
      </TouchableOpacity>
      <ImageViewer style={{marginTop: -60}} imageUrls={images} index={pos} />
      </SafeAreaView>
    </Modal>
  );
};

export default ProductImageScreeen;

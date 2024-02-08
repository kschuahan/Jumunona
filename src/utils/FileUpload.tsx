import { CameraOptions, ImageLibraryOptions, launchCamera, launchImageLibrary } from "react-native-image-picker";

export const cameraLaunch = (isImage = true, onSelect) => {
    let options: CameraOptions = {
        mediaType: isImage ? "photo" : "video",
        saveToPhotos: true,
        includeBase64: false,

    };
    launchCamera(options, (res) => {
        console.log('Response = ', res);
        if (res.assets != undefined) {
            const source = { uri: res.assets };
            onSelect(true, res.assets?.[0])

            console.log('response', JSON.stringify(res));
        }
        else if (res.didCancel) {
            console.log('User cancelled image picker');
        } else {
            onSelect(false, res.errorMessage)
            console.log('ImagePicker Error: ', res.errorMessage);
        }
    });
}

export const selectFile = (isImage = true, onSelect) => {
    var options: ImageLibraryOptions = {
        selectionLimit: 1,
        mediaType: isImage ? "photo" : "video",
        includeBase64: false

    };
    launchImageLibrary(options, res => {
        if (res.assets != undefined) {
            const source = { uri: res.assets };
            onSelect(true, res.assets?.[0])

            console.log('response', JSON.stringify(res));
        }
        else if (res.didCancel) {
            console.log('User cancelled image picker');
        } else {
            onSelect(false, res.errorMessage)
            console.log('ImagePicker Error: ', res.errorMessage);
        }
    });
};




export class FileModal {

    constructor(
        public title: string,
        public type: string,
        public uri: string,
        public fileId: number = 0,
        public fileName: string = ""
    ) { }
}


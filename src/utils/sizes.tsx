import { Dimensions } from 'react-native';

export var dimensions = Dimensions.get('window');


export const recalculateDimensions = () => {
    dimensions = Dimensions.get('window');
}




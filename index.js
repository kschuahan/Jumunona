import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { DefaultTheme, Provider } from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        secondaryContainer: 'transparent', // Use transparent to disable the little highlighting oval
    },
};




const Main = () => {

    return <Provider theme={theme}>
        <App />
    </Provider>
}

AppRegistry.registerComponent(appName, () => Main);

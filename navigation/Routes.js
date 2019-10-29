import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import InitialScreen from '../source/TwitterAuth';
import HomePage from '../source/HomePage';
import VideoPlayer from '../source/VideoPlayer';

const Routes = createStackNavigator(
    {
        FrontPageScreen: {
            screen: InitialScreen,
            navigationOptions: {
                gesturesEnabled: false,
                header: null,
                title: null
            }
        }, HomePageScreen: {
            screen: HomePage,
            navigationOptions: {
                gesturesEnabled: false,
                header: null,
                title: null
            }
        }, VideoPlayerScreen: {
            screen: VideoPlayer,
            navigationOptions: {
                gesturesEnabled: false,
                header: null,
                title: null
            }
        },
    },
    {
        initialRouteName: 'FrontPageScreen',
    }
);

// const AppRoutes = createAppContainer({
//     Screen111: {
//         screen: Screen111,
//         navigationOptions: { header: null }
//     },
// });
const AppRoutes = createAppContainer(Routes);
export default AppRoutes;

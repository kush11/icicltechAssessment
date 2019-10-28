import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Screen1 from '../source/TwitterAuth';
import HomePage from '../source/HomePage';
// import Screen3 from '../Screen3';

const Routes = createStackNavigator(
    {        
        FrontPageScreen: {
            screen: Screen1,
            navigationOptions: {
                gesturesEnabled: false,
                header: null,
                title: null
            }
        },HomePageScreen: {
            screen: HomePage,
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

import React from 'react';
import { View, Platform } from 'react-native';
import { Root } from 'native-base';
import AppRoute from './navigation/Routes';

const App = () => {
  return (
    <View style={{ flex: 1, paddingTop: (Platform.OS === 'ios') ? 18 : 0 }}>
      <Root>
        <AppRoute />
      </Root>
    </View>
  );
};

export default App;

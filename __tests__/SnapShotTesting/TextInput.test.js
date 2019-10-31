import 'react-native';
import React from 'react';
import TextInput from '../../source/TextInput';
import renderer from 'react-test-renderer';

test('TextInput snapshot ', () => {
    const snap = renderer.create(<TextInput/>).toJSON();
    expect(snap).toMatchSnapshot();
})


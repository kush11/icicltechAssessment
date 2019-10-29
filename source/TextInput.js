import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import UserContext from '../context/card';
const TextInputs = ({ placeholder, value, Title }) => {
  const [getName, setName] = useState();
  const [getAge, setAge] = useState();
  const [getHobbies, setHobbies] = useState();
  const [getDescription, setDescription] = useState();
  return (
    <UserContext.Consumer>
      {context => (
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{
            flex: 2,
            // borderWidth: 1, 
            justifyContent: 'center', alignItems: 'center'
          }}>
            <Text>{Title}:</Text>
          </View>
          <View style={{ flex: 7 }}>
            <TextInput
              style={{
                height: 40,
                margin: 5,
                borderBottomColor: 'gray',
                borderBottomWidth: 1
              }}
              placeholder={placeholder}
              // editable={false}              
              value={value ? value : null}
              onChangeText={
                (text) => {
                  if (placeholder === 'Enter your Age') {
                    setAge(text);
                    context.setUserAge(text);
                  }
                  if (placeholder === 'Enter your Hobby') {
                    setHobbies(text);
                    context.setUserHobbies(text);
                  }
                  if (placeholder === 'Write your shord Description about you') {
                    setDescription(text);
                    context.setUserDescription(text);
                  }
                  if (placeholder === 'Name') {
                    setName(text);
                    context.setUserName(text);
                  }

                }
              }
              keyboardType={placeholder === 'Enter your Age' ? 'number-pad' : 'default'}
            />
          </View>
        </View>
      )}
    </UserContext.Consumer>
  )
}

export default TextInputs;
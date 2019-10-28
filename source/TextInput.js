import React, {useState} from 'react';
import {View, TextInput, Text} from 'react-native';
import UserContext from '../context/card';
const TextInputs = ({placeholder}) =>{
    const [getName,setName] = useState();
    const [getAge,setAge] = useState();
    const [getHobbies,setHobbies] = useState();
    const [getDescription,setDescription] = useState();
    const userObject ={
        name:'',
        hobbies:'',
        age:'',
        description:''
    }
    return(
        <UserContext.Consumer>
            {context =>(
                <View>
                <TextInput
                          style={{
                            height:40,
                            margin:30,
                            borderBottomColor:'gray',
                            borderBottomWidth:1
                          }}
                          placeholder={placeholder}
                          onChangeText={
                              (text)=>{
                                  if(placeholder === 'Enter your Age'){
                                    setAge(text);
                                    // userObject.age(text);
                                    context.setUserAge(text);                                    
                                  }
                                  if(placeholder === 'Enter your Hobby'){
                                    setHobbies(text);
                                    // userObject.hobbies(text);
                                    context.setUserHobbies(text);
                                  }
                                  if(placeholder === 'Write your shord Description about you'){
                                    setDescription(text);
                                    // userObject.description(text);
                                    context.setUserDescription(text);
                                  }
                                  if(placeholder === 'Name')
                                  {
                                      setName(text);
                                    //   userObject.name(text);
                                      context.setUserName(text);
                                  }
                                  
                              }
                          }
                          keyboardType= {placeholder === 'Enter your Age' ? 'number-pad': 'default'}
                        />                        
            </View>
            )}        
        </UserContext.Consumer>
    )
}

export default TextInputs;
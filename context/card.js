import React from 'react';

export default React.createContext({
    name: '',
    image: '',
    age: '',
    hobbies: '',
    description: '',
    setUserName: name => {},
    setUserAge: age => {},
    setUserHobbies: hobbies => {},
    setUserDescription: description => {}
});
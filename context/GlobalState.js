import React, {Component} from 'react';
import CardConetxt from './card';
class GlobalState extends Component {
    state = {
        isLoggedIn:false,
        showModal:false,
        name:'',
        image:'',
        age:'',
        email:'',
        hobbies:'',
        description:''
      };
      
      setUserName = name =>{
        console.log('Settng user Nmae', name);
        this.setState({name});
      }
      setUserAge = age =>{
        console.log('Settng age age', age)
        this.setState({age});
      }
      setUserHobbies = hobbies =>{
        console.log('Settng hobbies hobbies', hobbies)
        this.setState({hobbies});
      }
      setUserDescription = description =>{
        console.log('Settng description description', description)
        this.setState({description});
      }
    render(){
        return(<CardConetxt.Provider 
            value={{
                name:this.state.name,
                image:this.state.image,
                age:this.state.age,         
                hobbies: this.state.hobbies,
                description:this.state.description,
                setUserName: this.setUserName,
                setUserAge:this.setUserAge,
                setUserDescription:this.setUserDescription,
                setUserHobbies:this.setUserHobbies,
              }}
            >
                {this.props.children};
            </CardConetxt.Provider>)        
    }
}
export default GlobalState;
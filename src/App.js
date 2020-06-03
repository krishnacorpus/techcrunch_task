import React, { Component } from 'react';
import classes from './App.module.css';
import axios from 'axios';
// import Dropdown from './components/Dropdown/Dropdown';

import App2 from './components/App2/App2';
// import { Button } from "semantic-ui-react";

// import {Button, Select }  from '@material-ui/core';
import SearchBox from './components/SearchBox';
let Types=[];

class App extends Component {
  
  
  state ={
    nameList :[],
    custom_data:[],
    trimmed_data:[]
  }
  

  

  
  componentDidMount(){
    console.log("[App] compDid Mount");
    axios.get(' https://develop.techcrunch.com/wp-json/tc/v1/investors-data/all ')
    .then( res =>{
      // console.log(res.data.investors.length);
      const names=[]
      let data=res.data.investors;
      let custom_data=[];
      for(var i = 0; i <res.data.investors.length; i++){
      let present = false;
      let p= {name:res.data.investors[i].meta.firstName};
      names.forEach(value=>{
        if(p['name'] === value['name']){
          present=true;
        }
      })
      if(present ==false){
        names.push(p)
      }
      
      
        let x={
          id:data[i].id,
          roundTypes:data[i].meta.roundTypes,
          firstName:data[i].meta.firstName,
          lastName:data[i].meta.lastName,
          firmName:data[i].meta.firmName,
        }
        custom_data.push(x)


      }

      this.setState({custom_data:custom_data});

      this.setState({nameList:names});
    })
  }

  
    // let TYPES =[]
// const dropdownOnChange = (target, values) => {
//   TYPES=values.value;

//   console.log(TYPES);
// };



hasSubArray(master, sub) {
  return sub.every((i => v => i = master.indexOf(v, i) + 1)(0));
}
  filterListHandler =(target, values) => {
    
      // console.log(values.value);
      Types=values.value;
      console.log(Types);

      console.log("in APP[filter RRRRRR]");
    };

    filterListHandler2 =() =>{

      // const {custom_data} =this.state;

      console.log("Filter Clicked");
      // let data=[...this.state.custom_data];
      // console.log(data[0].lastName);
      // console.log(custom_data);
      // console.log(this.state);
      
      // let updatedList=[...this.state.trimmed_data];
      // else{
      //   let  updatedList=[...this.state.custom_data];
        
      // }
      
      // console.log(updatedList[0].roundTypes,"MMMM");
      // console.log(updatedList[0].firstName);
      // console.log();
      // let myfilter=[updatedList[1].id];
      
      // let myfilter=["Looo"]
      // for (var i = 0; i < updatedList.length; i++){
      //   let check =this.hasSubArray(updatedList[i].roundTypes, Types)
      //   if(check){

      //     console.log("into this IFFFF");
      //     console.log(updatedList[i].roundTypes,updatedList[i].id)
      //     // myfilter.push(updatedList[i])
      //   }
      
      // }
      // console.log(myfilter,"dde");
      // this.setState({trimmed_data:myfilter})
      // this.renderListHandler();
      // console.log(this.state.trimmed_data,"frg");

      //   for(let j =0; j <updatedList[i].roundTypes.length; j++){

      //   }
      //   if(updatedList[i].roundTypes.includes() === name){
      // }
    }
  
 


  fetchListHandler =(name)=>{
    console.log('from fetchList');
      let data=[...this.state.custom_data];
      let trimmed_data=[]
      for (var i = 0; i <data.length; i++){
            if(data[i].firstName === name){
              let x={
                id:data[i].id,
                roundTypes:data[i].roundTypes,
                firstName:data[i].firstName,
                lastName:data[i].lastName,
                firmName:data[i].firmName,
              }
              trimmed_data.push(x)
              // this.setState()
            }
          }
      this.setState({trimmed_data:trimmed_data});
      
    
  }




  renderListHandler(){
    if (this.state.trimmed_data.length){
      const { trimmed_data}=this.state
      return(
        <div>
        {trimmed_data.map(item =>{
        // console.log(item.roundTypes,item.id);
              return(
                <div
                key={item.id}
                className={classes.item}>

                  <h1>
                  {item.firstName}-
                  <span>{item.lastName}</span>
                
                  </h1>



                  <span>
                    {item.roundTypes.map(i =>{
                      return (<h2 key={i} style={{display:'inline'}}>{i} |</h2>)
                    })}
                    
                  </span>
                  <p>{item.id}</p>
              </div>
              )
            })}
    </div>  
      )
    }
    // console.log('[renderList].....');
  }

  render(){
    
    return (
      <div className={classes.App}>
        <h1>Tech CruncH</h1>
        <SearchBox 
        selectedName ={this.fetchListHandler} 
        names={this.state.nameList}
        />
        <span>
        <App2  
        dropdownOnChange={this.filterListHandler}
        filterListHandler2={this.filterListHandler2}
        />

        {/* <Button 

        onClick={this.filterListHandler2}
        >Filter
        </Button> */}

        </span>
        {this.renderListHandler()}
      </div>
    );


  }
}

export default App;

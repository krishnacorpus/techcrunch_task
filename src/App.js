import React, { Component } from 'react';
import classes from './App.module.css';
import axios from 'axios';
// import Dropdown from './components/Dropdown/Dropdown';

import App2 from './components/App2/App2';
import SearchBox from './components/SearchBox';
let Types=[];
let show=false;
class App extends Component {

  state ={
    nameList :[],
    custom_data:[],
    trimmed_data:[],
    // filtered_data:[]
  }

  componentDidMount(){
    console.log("[App] compDid Mount");
    axios.get(' https://develop.techcrunch.com/wp-json/tc/v1/investors-data/all ')
    .then( res =>{
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

hasSubArray(master, sub) {
  return sub.every((i => v => i = master.indexOf(v, i) + 1)(0));
}

// for dropdown
  filterListHandler =(target, values) => {
    
      Types=values.value;
      // console.log(Types);
    };


    // for Filter button
    filterListHandler2 =() =>{
      let data=[...this.state.trimmed_data];
      let myfilter=[];
      for (var i = 0; i < data.length; i++){
      let check =this.hasSubArray(data[i].roundTypes,Types)
        if(check){
          myfilter.push(data[i])
        }
        
        // if (myfilter.length ==0){
        //   let x={
        //     firstName:"No Data Found",
        //   }
        //   myfilter.push(x)
        // }
        this.setState({trimmed_data:myfilter});
        }

    }
  
    // for searchbar
  fetchListHandler =(name)=>{
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
            }
          }
      this.setState({trimmed_data:trimmed_data});
  }




  renderListHandler(){
    let checkList=[]
    // if (this.state.filtered_data.length){
    //   checkList=[
    //     ...this.state.filtered_data
    //   ]
    //   this.setState({filtered_data:[]})
    //   // checkList=myList
    // }else{
    // }
      checkList=this.state.trimmed_data
      
    
    if (checkList.length){
      return(
        <div>
        {checkList.map(item =>{
              return(
                <div
                key={item.id}
                className={classes.item}>
                  <h1>{item.firstName}-<span>{item.lastName}</span></h1>
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
    else{
      return(<h2>No Data</h2>)
    }
  }

  render(){
    show = this.state.trimmed_data.length >0
    return (
      <div className={classes.App}>
        <h1>Tech CruncH</h1>
        <SearchBox 
        selectedName ={this.fetchListHandler} 
        names={this.state.nameList}
        />
        <span>
        <App2 
        show={show} 
        dropdownOnChange={this.filterListHandler}
        filterListHandler2={this.filterListHandler2}
        />
        </span>
        {this.renderListHandler()}
      </div>
    );
  }
}

export default App;

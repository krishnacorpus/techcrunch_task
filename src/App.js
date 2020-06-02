import React, { Component } from 'react';

import classes from './App.module.css';
import SearchBox from './components/SearchBox';
// import classes from './App.module.css';
import axios from 'axios';



const ROUND_TYPES = {

}
class App extends Component {

  state={
    nameList:[],
    custom_data:[],
    // pre:false,
    // early:false,
    // growth:false
  }
  

  componentDidMount(){
    console.log("[App] compDid Mount");

    axios.get(' https://develop.techcrunch.com/wp-json/tc/v1/investors-data/all ')
    .then( res =>{

      // console.log(res.data.investors.length);
      const names=[]
      for(var i = 0; i <res.data.investors.length; i++){
        let present = false;
        let p= {name:res.data.investors[i].meta.firstName};
        names.forEach(value=>{
          if(p['name'] === value['name']){
            present=true;
            // console.log(value['name']+'bhai');
          }
        })
        // console.log(p['name']);
        if(present ==false){
          names.push(p)
        }

      }
      // console.log(names);
      this.setState({nameList:names});
    })
   
  }

 

  fetchList =(name)=>{
    console.log('from fetchList');
    axios.get(' https://develop.techcrunch.com/wp-json/tc/v1/investors-data/all ')
    .then( res =>{
      // console.log(res.data.investors[0]);
      let data=res.data.investors;
      // console.log(data.length);
      let custom_data=[]
      for (var i = 0; i <data.length; i++){

            if(data[i].meta.firstName === name){
              let x={
                id:data[i].id,
                roundTypes:data[i].meta.roundTypes,
                firstName:data[i].meta.firstName,
                lastName:data[i].meta.lastName,
                firmName:data[i].meta.firmName,
              }
              custom_data.push(x)
              // this.setState()
            }
          }
this.setState({custom_data:custom_data})
    })
  }

  renderList(){
    if (this.state.custom_data.length){
      const { custom_data}=this.state
      // console.log(custom_data.roundTypes);
      return(
  <div>
       {custom_data.map(item =>{
      console.log(item.roundTypes,item.id);
            return(
              <div
              key={item.id}
              className={classes.item}>
                <h1>
                {item.firstName}-
                <span>{item.lastName}</span>
                {/* <span>  </span> */}
                </h1>
                <p>{item.id}</p>
            </div>
            )
          })}
  </div>  
      )
    }
    // console.log('[renderList].....');
  }


  // onCheckChange =(e) =>{

    
  //   this.setState({[e.target.name]:![e.target.name] })
  // }
  // filterList(){
  //   return
  // }

  render(){

    return(
      <div className={classes.App}>

        {/* <form onSubmit={this.filterList}>

          <span>

          <input name='pre' type='checkbox' checked={this.state.pre} onChange={this.onCheckChange} />Pre_seed
          <input name='early' type='checkbox' checked={this.state.early} onChange={this.onCheckChange} />Early
          <input name='growth' type='checkbox' checked={this.state.growth} onChange={this.onCheckChange} />Growth
            </span>


        </form> */}
{/* 

<form onSubmit={this.filterList}>
  <input type="checkbox" id="pre" name="pre"  checked={this.state.pre} value="pre"  onChange={this.onCheckChange}/>
  <label for="pre"> pre</label>
  <input type="checkbox" id="early" name="early"  checked={this.state.early}  onChange={this.onCheckChange} value="early" />
  <label for="early">early</label>
  <input type="checkbox" id="growth" name="growth"  checked={this.state.growth} onChange={this.onCheckChange} value="growth" />
  <label for="growth"> growth</label>
  <input type="submit" value="Submit" />
</form> */}


        <h1>Tech Crunch</h1>

        <SearchBox  selectedName ={this.fetchList} names={this.state.nameList}/>
        {this.renderList()}



      </div>
    )

  }
   
  
}

export default App;

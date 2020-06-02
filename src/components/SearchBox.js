

import React,{Component} from 'react';


import styles from './SearchBox.module.css';
class SearchBox extends Component{

    constructor(props){
        super(props)
        this.state = {
            suggestions: [],
            text: ''
        }
    }

    onTextChange = (e) => {
        const value = e.target.value;
        const names= this.props.names.map(item =>{
            return item['name']
        })

        let suggestions = [];
        if(value.length > 0){
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = names.sort().filter(v => regex.test(v))
        }

        this.setState(() => ({
            suggestions,
            text: value
        }))
    }


    selectedText(value) {
        this.setState(() => ({
            text: value,
            suggestions: [],
        }))

        this.props.selectedName(value);
    }

    renderSuggestions = () => {
        let { suggestions } = this.state;
        if(suggestions.length === 0){
            // console.log("Null Sugg");
            return null;
        }
    
        return (
            <ul >

                {
                    suggestions.map((item, index) => (<li key={index} onClick={() => this.selectedText(item)}>{item}</li>))
                }   
                {/* {
                suggestions.map((item, index) => (<li key={index} onClick={() => this.selectedText(item['name'])}>{item['name']}</li>))
                } */}
            </ul>)
                
    }
    
    render() {
        const { text, suggestions } = this.state;
        return(
            <div className={styles.container}>
                {/* <h2>Auto Completed</h2> */}
                <input id="query" type="text" onChange={this.onTextChange} value={text}/>
                <h2>
                {this.renderSuggestions()}
                </h2>
                <span>Suggestions: {suggestions.length}</span>
            </div>
        );
    }

}


export default SearchBox;

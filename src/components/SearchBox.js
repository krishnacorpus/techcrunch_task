
import React,{Component} from 'react';
import styles from './SearchBox.module.css';
class SearchBox extends Component{

    constructor(props){
        super(props)
        this.state = {
            suggestions: [],
            text: '',
            refere: ''
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
            text: '',
            refere:value,
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
                
            </ul>)
                
    }
    
    render() {
        const { text, suggestions ,refere} = this.state;
        return(
            <div className={styles.container}>
                <input id="query" type="text" onChange={this.onTextChange} value={text}/>
                <h2>
                {this.renderSuggestions()}
                </h2>
                <h2>
                List is rendered for {refere}
                </h2>
            </div>
        );
    }
}

export default SearchBox;

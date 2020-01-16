import React from 'react';
import './search.css';
import axios from 'axios';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            url: 'https://www.google.com'
        };
        this.myChangeHandler = this.myChangeHandler.bind(this);
    }

    async shoot() {
        try {
            const response = await axios.post(
                'http://localhost:8080/image/data/scrap',
                { url: this.state.url },
                {
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    }
                }
            )
            console.log(response.data)
        } catch (e) {
            alert(e)
        }
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    render() {
        return (
            <form>
                <div className='search-flex-table'>
                    <div>Entre com a URL: </div>
                    <div>&nbsp;</div>
                    <div><input type='text' size='100' maxLength='256' name='url' value={this.state.url} onChange={this.myChangeHandler} /></div>
                    <div>&nbsp;</div>
                    <div><button onClick={this.shoot.bind(this)}>{this.state.url}</button></div>
                    <br />
                </div>
            </form>
        );
    }
}

export default Search;
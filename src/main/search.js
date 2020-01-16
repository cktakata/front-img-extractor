import React from 'react';
import './search.css';
import io from 'socket.io-client';

class Search extends React.Component {
    state = {
        url: 'http://www.google.com',
        filename: []
    };

    constructor(props) {
        super(props);
        this.myChangeHandler = this.myChangeHandler.bind(this);

        this.socket = io.connect("http://localhost:8080");

        this.init();
    }

    init() {
        this.socket.on('msgToClient', function (message) {
            for (const img of message.data) {
                this.setState({ filename: [...this.state.filename, img] });
            }
        }.bind(this));
    }

    shoot() {
        try {
            const message = { "url": this.state.url };
            this.socket.emit('msgToServer', message);
        } catch (e) {
            console.log(e)
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
                <div>
                    <p>Imagens capturadas</p>
                    <ul>
                        {this.state.filename.map(file => <li>{file.filename}</li>)}
                        {this.state.filename.map(file => <img src={`data:image/png;base64,${file.thumb}`} alt="" />)}
                    </ul>
                </div>
            </form>
        );
    }
}

export default Search;
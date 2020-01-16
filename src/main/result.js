import React, { Component } from 'react';
import './result.css';
import socketIOClient from "socket.io-client";

const uri = 'http://localhost:8080';

class Result extends Component {
    constructor() {
        super();
        this.state = {
            response: false,
            endpoint: uri
        };
    }
    componentDidMount() {
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.on("msgToClient", data => this.setState({ response: data }));
    }
    render() {
        const { response } = this.state;
        return (
            <div style={{ textAlign: "center" }}>
                {response
                    ? <p>
                        The temperature in Florence is: {response} °F
                  </p>
                    : <p>Thumbnail data</p>}
            </div>
        );
    }

}

export default Result;
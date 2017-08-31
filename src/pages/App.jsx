import React, { Component } from 'react';
import HeaderMenu from '../components/HeaderMenu';
import LeftMenu from "../components/LeftMenu";

class App extends Component {
    render() {
        return (
            <div>
                <HeaderMenu />
                <div className="body-container">
                    <LeftMenu />
                    <div className="body-content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
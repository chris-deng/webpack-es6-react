import React, { Component } from 'react';

class Cata02 extends Component {
    render() {
        return (
            <div>
                一级目录二页面
                {this.props.children}
            </div>
        );
    }
}

export default Cata02;
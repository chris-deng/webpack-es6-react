import React, { Component } from 'react';

class Catalog extends Component {
    render() {
        return (
            <div>
                <p>catalog一级分类</p>
                <div>
                    {this.props.children || 'test'}
                </div>
            </div>
        );
    }
}

export default Catalog;
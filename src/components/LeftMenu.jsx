import React, { Component } from 'react';
import { Link } from 'react-router';
import LeftMenuData from '../config/leftMenu.json';

class LeftMenu extends Component {
    genLeftStruct(arr) {
        if (arr && arr.length === 0) return '';
        let rets = [];
        arr.map((item) => {
           if (item.subMenu && item.subMenu.length !== 0) {
                rets.push(
                    <li> {item.name}
                        <ul>
                            {this.genLeftStruct(item.subMenu)}
                        </ul>
                    </li>
                );
           } else {
               rets.push(<li><Link to={item.linkTo}>{item.name}</Link></li>)
           }
           return null;
        });
        return rets;
    }
    render() {
        const menudata = LeftMenuData.leftMenuList;
        return (
            <div className="left-menu">
                <ul>
                    {this.genLeftStruct(menudata)}
                </ul>
            </div>
        );
    }
}

export default LeftMenu;
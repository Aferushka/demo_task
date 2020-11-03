import React from 'react';
import 'fontsource-roboto';
import NavigationHead from '../common/components/NavigationHead';
import {BaseContainer} from "./index";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.children = props.children;
    }
    render() {
        return (
            <div className="home-app">
                <NavigationHead/>
                <BaseContainer children={this.children}/>
            </div>
        );
    }
}




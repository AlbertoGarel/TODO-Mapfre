import React, { Component } from 'react'

class NavSelector extends Component {
    constructor(props){
        super();
        this.state = {
        };
    }

    render(){

        return(
            <a id={this.props._id} href={this.props._href} onClick={this.props.onclick} className={this.props.classname}>
                {this.props.text}
            </a>
        )
    }

};
export default NavSelector;
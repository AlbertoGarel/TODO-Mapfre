import React, { Component } from 'react'

class NavSelector extends Component {
    constructor(props){
        super();
        this.state = {
        };
    }

    render(){

        return(
            <button type="button" id={this.props._id} onClick={this.props.onclick}
                    className={['btn btn-light  ', this.props.classname]}>
                {this.props.text}
            </button>
        )
    }

};
export default NavSelector;
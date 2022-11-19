import React, { Component } from 'react'

class Form extends Component {
    constructor(){
        super();
        this.state = {
            title: "",
            responsable: "",
            description: "",
            priority: "Baja",
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.onAddTodo(this.state)
    }

    handleInput(e){
        const {value, name} = e.target
        this.setState({
            [name]: value
        })
    }

    render(){
        return(
            <div>
                <div className="card">
                    <form className="card-body" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input
                            placeholder="Título aquí..."
                            onChange={ this.handleInput }
                            type="text"
                            name="title"
                            className="title"
                                />
                            </div>
                            <div className="form-group">
                                <input
                                placeholder="Responsable aquí..."
                                onChange={ this.handleInput }
                                type="text"
                                name="responsable"
                                className="responsable"
                                />
                            </div>
                            <div className="form-group">
                            <input
                            placeholder="Descripción aquí..."
                            onChange={ this.handleInput }
                            type="text"
                            name="description"
                            className="description"
                            />
                        </div>
                        <div className="form-group">
                            <select
                            onChange={ this.handleInput }
                            name="priority"
                            className="form-control"
                            >
                                <option>Baja</option>
                                <option>Media</option>
                                <option>Alta</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
export default Form
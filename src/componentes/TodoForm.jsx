import React, {Component} from 'react'

class Form extends Component {
    constructor() {
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

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.title === '' || this.state.title === ' ' ||
            this.state.description === '' || this.state.description === ' ' ||
            this.state.priority === '' || this.state.priority === ' ') {
            return
        }
        this.props.onAddTodo(this.state)
    }

    handleInput(e) {
        const {value, name} = e.target
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div className="modal fade" id="exampleModal3" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModal3Label" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModal3Label">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="card">
                                <form className="card-body" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <input
                                            placeholder="Título aquí..."
                                            onChange={this.handleInput}
                                            type="text"
                                            name="title"
                                            className="title w-100"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            placeholder="Responsable aquí..."
                                            onChange={this.handleInput}
                                            type="text"
                                            name="responsable"
                                            className="responsable w-100"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            placeholder="Descripción aquí..."
                                            onChange={this.handleInput}
                                            type="text"
                                            name="description"
                                            className="description w-100"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <select
                                            onChange={this.handleInput}
                                            name="priority"
                                            className="form-control"
                                        >
                                            <option>Baja</option>
                                            <option>Media</option>
                                            <option>Alta</option>
                                        </select>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                            Close
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Form
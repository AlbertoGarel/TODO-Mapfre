import React, {Component} from 'react';
import logo from './mapfre-logo.svg'
import './App.css';
import NavSelector from './componentes/NavSelector';

// import { todos } from './todos.json';

import TodoForm from './componentes/TodoForm'

// const json_import = require('./todos.json')
// const todos = json_import.todos;
let date = new Date();
const weekday = new Array(7);
weekday[0] = "Domingo";
weekday[1] = "Lunes";
weekday[2] = "Martes";
weekday[3] = "Miercoes";
weekday[4] = "Jueves";
weekday[5] = "Viernes";
weekday[6] = "Sábado";

let wd = weekday[(date.getDay())];

let month = new Array(12);
month[0] = "Ener";
month[1] = "Febrero";
month[2] = "Marzo";
month[3] = "Abril";
month[4] = "Mayo";
month[5] = "Junio";
month[6] = "Julio";
month[7] = "Agosto";
month[8] = "Septiembre";
month[9] = "Octubre";
month[10] = "Noviembre";
month[11] = "Diciembre";
let mth = month[date.getMonth()];

let yr = date.getFullYear();
let dn = date.getUTCDate();

let fecha = wd + ", " + dn + " de " + mth + " de " + yr;

export default class App extends Component {
    constructor(props) {
        super();
        this.state = {
            stored: JSON.parse(localStorage.getItem('@tareas-mapfreapp')) || [],
            todos: [],
            fecha
        }
        this.handleAddTodo = this.handleAddTodo.bind(this);
    }

    handleRemoveTodo(index) {
        if (window.confirm("Está seguro de eliminar?")) {
            let todos = JSON.parse(localStorage.getItem('@tareas-mapfreapp')).filter((e, i) => i !== index);
            localStorage.setItem('@tareas-mapfreapp', JSON.stringify(todos))
            this.setState({
                stored: todos
            })
            let selected = this.state.todos.filter((e, i) => i !== index);
            this.setState({
                todos: selected
            })
        }
    }


    handleAddTodo(todo) {
        const storage = JSON.parse(localStorage.getItem('@tareas-mapfreapp'))
        localStorage.setItem('@tareas-mapfreapp', JSON.stringify([...storage, todo]));
        this.setState({
            stored: [...storage, todo]
        })
        this.setState({
            todos: [...storage, todo]
        })
    }

    handleSelected(type) {
        switch (type) {
            case 'Baja':
                this.setState({
                    todos: this.state.stored.filter(i => i.priority === 'Baja')
                });
                break;
            case 'Media':
                this.setState({
                    todos: this.state.stored.filter(i => i.priority === 'Media')
                });
                break;
            case 'Alta':
                this.setState({
                    todos: this.state.stored.filter(i => i.priority === 'Alta')
                })
                break;
            case 'Todas':
                this.setState({
                    todos: [...this.state.stored]
                })
                break;
            default:
                this.setState({
                    todos: [...this.state.stored]
                })
        }
    }

    componentDidMount() {
        if (!this.state.stored) {
            localStorage.setItem('@tareas-mapfreapp', JSON.stringify([]));
        } else {
            this.setState({
                todos: [...this.state.stored]
            })
        }
    }

    handlerColorBadge(type) {
        switch (type) {
            case 'Baja':
                return ' badge-info'
            case 'Media':
                return ' badge-warning'
            case 'Alta':
                return ' badge-danger'
            default:
                return ' badge-warning'
        }
    }

    render() {
        const todose = this.state.todos.map((todo, i) => {
            return (
                <div key={i} className="col-sm-12 col-md-6 col-lg-4">
                    <div className="card mt-4">
                        <div className="card-header">
                            <h3>
                                {todo.title}
                            </h3>
                            <span className={["badge badge-pill ml-2", this.handlerColorBadge(todo.priority)]}>
                {todo.priority}
              </span>
                        </div>
                        <div className="card-body">
                            <p>
                                {todo.description}
                            </p>
                            <p>
                                {todo.responsable}
                            </p>
                        </div>
                        <div className="card-footer">
                            <button
                                className="btn btn-danger"
                                onClick={this.handleRemoveTodo.bind(this, i)}
                            >
                                Borrar
                            </button>
                        </div>
                    </div>
                </div>
            )
        });

        return (
            <div className="App">
                <nav className="navbar navbar-dark">
                    <img src={logo} className="App-logo image-fluid float-left" alt="logo"/>
                    <div className="med-screen">
                        <NavSelector
                            _href={''}
                            onclick={() => this.handleSelected('Baja')}
                            text={'P. BAJA'}
                            classname={"text-light m-3"}
                            _id={'Baja'}
                        />
                        <NavSelector
                            _href={''}
                            onclick={() => this.handleSelected('Media')}
                            text={'P. MEDIA'}
                            classname={"text-light m-3"}
                            _id={'Media'}
                        />
                        <NavSelector
                            _href={''}
                            onclick={() => this.handleSelected('Alta')}
                            text={'P. ALTA'}
                            classname={"text-light m-3"}
                            _id={'Alta'}
                        />
                        {this.state.stored.length && <NavSelector
                            _href={''}
                            onclick={() => this.handleSelected('Todas')}
                            text={'TODAS'}
                            classname={"todos text-dark badge-nav m-3"}
                            _id={'todos'}
                        />}
                    </div>
                    <h6 id="hora" className="text-light">{fecha}</h6>
                </nav>

                <div className="d-flex justify-content-between">
                    <div className="badge-warning m-2 d-flex justify-content-center p-1 rounded">
                        <span className="h4 mb-0 ml-3 mr-3">Pendientes</span>
                        {this.state.stored.length > 0 &&
                        <span className="badge badge-pill badge-light m-1 d-flex align-self-baseline">
                            {this.state.stored.length}
                        </span>}
                    </div>
                    <div>
                        <button type="button"
                                className="btn btn-primary text-white m-2 d-flex justify-content-center h4 mb-0 ml-3"
                                data-toggle="modal"
                                data-target="#exampleModal3">
                            CREAR ALERTA
                        </button>
                    </div>
                </div>

                <div className="container">
                    <div className="row mt-4">

                        <div className="col-md-4 text-center">
                            <img src={logo} className="App-logo" alt="logo"/>
                            <TodoForm onAddTodo={this.handleAddTodo}/>
                        </div>

                        <div className="col-12">
                            <div className="row pb-5">
                                {todose}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

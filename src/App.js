import React, {Component} from 'react';
import logo from './mapfre-logo.svg'
import './App.css';

// import { todos } from './todos.json';

import TodoForm from './componentes/TodoForm'

const json_import = require('./todos.json')
const todos = json_import.todos;
let date = new Date();
const weekday = new Array(7);
weekday[0] = "Lunes";
weekday[1] = "Martes";
weekday[2] = "Miercoes";
weekday[3] = "Jueves";
weekday[4] = "Viernes";
weekday[5] = "Sábado";
weekday[6] = "Domingo";
let wd = weekday[(date.getDay() - 1)];

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

var fecha = wd + ", " + dn + " de " + mth + " de " + yr;

export default class App extends Component {
    constructor(props) {
        super();
        this.state = {
            todos,
            fecha
        }
        this.handleAddTodo = this.handleAddTodo.bind(this);
    }

    handleRemoveTodo(index) {
        if (window.confirm("Está seguro de eliminar?")) {
            this.setState({
                todos: this.state.todos.filter((e, i) => {
                    return i !== index
                })
            })
        }
    }

    handleAddTodo(todo) {
        this.setState({
            todos: [...this.state.todos, todo]
        })
    }

    componentDidMount() {
        const local = localStorage.getItem('tareas');
        if(!local){
            console.log('no local')
            localStorage.setItem('tareas')
        }
    }

    render() {

        const todose = this.state.todos.map((todo, i) => {
            return (
                <div key={i} className="col-md-4">
                    <div className="card mt-4">
                        <div className="card-header">
                            <h3>
                                {todo.title}
                            </h3>
                            <span className="badge badge-pill badge-danger ml-2">
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
                        <a href="#!" onClick={() => alert('BAJA')} className="text-light m-3">
                            P. BAJA
                        </a>
                        <a href="#!" className="text-light m-3">
                            P. MEDIA
                        </a>
                        <a href="#!" className="text-light m-3">
                            P. ALTA
                        </a>
                        <a href="#!" className="text-dark badge-nav m-3">
                            TODAS
                        </a>
                    </div>
                    <h6 id="hora" className="text-light">{fecha}</h6>
                </nav>

                <div className="d-flex">
                    <div className="badge badge-pill badge-warning m-2 d-flex justify-content-center">
                        <span className="h4 mb-0 ml-3">Pendientes</span>
                        <span className="badge badge-pill badge-light ml-1 d-flex align-self-baseline">
              {this.state.todos.length}
            </span>
                    </div>
                </div>

                <div className="container">
                    <div className="row mt-4">

                        <div className="col-md-4 text-center">
                            <img src={logo} className="App-logo" alt="logo"/>
                            <TodoForm onAddTodo={this.handleAddTodo}></TodoForm>
                        </div>

                        <div className="col-md-8">
                            <div className="row">
                                {todose}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

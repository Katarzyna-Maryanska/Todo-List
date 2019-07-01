import React from 'react';
import shortid from "shortid";

class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        };
    }

    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onSubmit({
            id: shortid.generate(),
            text: this.state.text,
            comlete: false
        });
        this.setState({
            text: ""
        })

    };

    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <input
                    name="text"
                    value={this.state.text}
                    onChange={this.onChangeHandler} placeholder="Todo..."/>
                <button onClick={this.submitHandler}>Add todo</button>
            </form>
        )
    }
}

export default TodoForm
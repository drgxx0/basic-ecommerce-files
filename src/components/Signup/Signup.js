import React, { Component } from "react";

import "./Signup.css";

class Signup extends Component {

    state = {
        email: '',
        pass: '',
        name: '',
    }

    emptyValues = () => {
        this.emailRef.value = '';
        this.nameRef.value = '';
        this.passlRef.value = '';
    }

    processSubmit = () => {
        this.setState({
            email: '',
            pass: '',
            name: '',
        })
        this.emptyValues()
        this.nameRef.focus()
    }

    componentDidMount = () => {
        if(this.state.loading) {
            this.setState({
                loading: false
            })
        }
    }

    singingUp = () => {
      if (this.state.email && this.state.pass) {
        this.props.handleSignUp(this.state.email, this.state.pass, this.state.name);
        this.processSubmit()
      } else {
        console.log("Email and Password required");
      }
    };

    render() {
        const { signupError, loading, asterik } = this.props
        return (
            <React.Fragment>
                {loading ? <div className="spinner"></div> : <div className="form-signup">
                    <h1>Signup</h1>
                    <div className="form">
                        <span>Name: </span>
                        <input
                        type="text"
                        placeholder="Name"
                        ref={(name) => { this.nameRef = name; }}
                        style={
                            signupError ? { border: "1px solid red", outline: "none" } : null
                        }
                        onChange={(e) => this.setState({name: e.target.value})}
                        />
                        <span>Email: {asterik === 'email' ? <span style={{color: 'red'}}>*</span> : null}</span>
                        <input
                        type="text"
                        placeholder="Email"
                        ref={(email) => { this.emailRef = email; }}
                        style={
                            signupError ? { border: "1px solid red", outline: "none" } : null
                        }
                        onChange={(e) => this.setState({email: e.target.value})}
                        />
                        <br />
                        <span>Password: {asterik === 'pass' ? <span style={{color: 'red'}}>*</span> : null}</span>
                        <input
                        type="password"
                        placeholder="Password"
                        ref={(pass) => { this.passlRef = pass; }}
                        style={
                            signupError ? { border: "1px solid red", outline: "none" } : null
                        }
                        onChange={(e) => this.setState({pass: e.target.value})}
                        />
                        <div className="sendButton" onClick={this.singingUp}>
                        Sing Up
                        </div>
                        {signupError ? <p style={{ color: "red" }}>{signupError}</p> : null}
                    </div>
                </div>}
            </React.Fragment>
        )
    }
}
export default Signup;

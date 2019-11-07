import React from 'react'
import LoginForm from '../components/login'

import Router from 'next/router'

//Redux
import { connect } from "react-redux"

class Login extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        console.log(this.props)
        if (this.props.loggedIn == false) {
            Router.push('/login', '/login', { shallow: true });
        }
    }


    render() {
        return (
            <div className="center">
                <style jsx>{`
                .center {
                    height: 100vh;
                    width: 100%;
                    position: relative;
                    border: 3px solid green; 
                }
                .center .loginform {
                    margin: 0;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    -ms-transform: translate(-50%, -50%);
                    transform: translate(-50%, -50%);
                }
                `}</style>
                <div className="loginform"><LoginForm /></div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn
    }
}


export default connect(mapStateToProps)(Login)
import React from 'react'
import App, { Container } from 'next/app'
import MainLayout from '../components/mainlayout'
import axios from 'axios'
// import Login from '../components/login'

export default class MyApp extends App {

    constructor(props) {
        super(props)
        this.state = {
            logged: false
        }
    }

    static async getInitialProps({ Component, router, ctx }) {
        let pageProps = {}

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        return { pageProps }
    }

    // componentDidMount(){
    //     this.authen()
    // }

    // authen = () => {
    //     axios.post('http://localhost:1323/auth', config)
    //             .then(response => {
    //                 let result = response.data
    //                 console.log(result)

    //                 self.setState({ logged: true })
    //             })
    //             .catch(error => {
    //                 alert(error)
    //                 self.setState({ logged: false })
    //             });
    // } 

    setLoggedState = (data) => {
        this.setState({ logged: data })
    }


    isLoggedIn = () => {
        return this.state.logged
    }

    render() {
        const { Component, pageProps } = this.props
        return (
            // this.isLoggedIn() ? (
                <MainLayout>
                    <Component {...pageProps} />
                </MainLayout>
            // ) : <Login setLoggedState={this.setLoggedState} />
        )
    }
}
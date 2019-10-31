import React from 'react'
import App, { Container } from 'next/app'
import MainLayout from '../components/mainlayout'
import Login from './login'
//Redux

import { Provider, connect } from "react-redux";
import store from "../redux/store";
import withRedux from "next-redux-wrapper";

class MyApp extends App {

    constructor(props) {
        super(props)
    }

    static async getInitialProps({ Component, router, ctx }) {
        let pageProps = {}

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        return { pageProps }
    }

    isLoggedIn = () => {
        return false
    }

    render() {
        const { Component, pageProps, store } = this.props
        return (
            <Provider store={store}>
                {
                    this.isLoggedIn() ? (
                        <MainLayout>
                            <Component {...pageProps} />
                        </MainLayout>
                    ) : (
                            <Login />
                        )
                }
            </Provider>
        )
    }
}

export default withRedux(store)(MyApp);
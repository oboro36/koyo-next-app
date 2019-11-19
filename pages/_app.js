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

    //check login status from redux store
    isLoggedIn = store => store.getState('loggedIn').auth.loggedIn

    render() {
        const { Component, pageProps, store } = this.props
        // store.subscribe(() => {
        //     console.log(store.getState());
        // });
        return (
            <Provider store={store}>
                {
                    this.isLoggedIn(store) ? (
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
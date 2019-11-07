import React from 'react'
import App, { Container } from 'next/app'
import MainLayout from '../components/mainlayout'
import Login from './login'

//Redux
import withRedux from "next-redux-wrapper";
import { Provider, connect } from "react-redux";
import { makeStore } from "../redux/store";


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

    render() {
        const { Component, pageProps, store } = this.props

        store.subscribe(() => {
            console.log('loggedIn has changed to ', store.getState().auth.loggedIn)
            
        });

        return (
            <Provider store={store}>
                {
                    store.getState().auth.loggedIn ? (
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

export default withRedux(makeStore, { debug: true })(MyApp);
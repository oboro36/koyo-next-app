import React from 'react'
import App, { Container } from 'next/app'
import MainLayout from '../components/mainlayout'

import Login from './login'

export default class MyApp extends App {

    constructor(props) {
        super(props)
        this.state = {}
    }

    static async getInitialProps({ Component, router, ctx }) {
        let pageProps = {}

        console.log(router)

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        return { pageProps }
    }

    isLoggedIn = () => {
        let res = true
        return res
    }

    render() {
        const { Component, pageProps } = this.props
        return (
            this.isLoggedIn() ? (
                <MainLayout>
                    <Component {...pageProps} />
                </MainLayout>
            ) : (
                    <Login />
                )
        )
    }
}
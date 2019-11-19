import { Form, Icon, Input, Button, notification } from 'antd'
import { invokeApi } from '../base/axios'

import { bindActionCreators } from 'redux'
import { connect } from "react-redux"
import { setLoggedIn } from "../redux/actions"

import Router from 'next/router'

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const openNotification = type => {
    notification[type]({
        message: 'Authentication failed',
        description:
            'Please try another username or password.',
        duration: 3,
        onClick: () => {
            console.log('Notification Clicked!');
        },
    });
};

class LoginForm extends React.Component {

    constructor(props) {
        super(props)

    }

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.doLogin(values.username, values.password)
            }
        });
    };

    doLogin = (u, p) => {
        invokeApi('post', '/login?username=' + u + '&password=' + p,
            (res) => {
                console.log(res.data)
                this.doSetCookie(u, res.data.token)
            },
            (err) => {
                // alert(err)
                openNotification('error')
            }
        )
    }

    doSetCookie = (u, t) => {
        invokeApi('post', '/writecookie?username=' + u + '&token=' + t,
            async (res) => {
                console.log(res.data)
                try{
                    let result = await this.setLoggedIn()

                    result && Router.push('/')

                }catch(e){
                    alert(e)
                }
            },
            (err) => {
                alert(err)
            }
        )
    }

    doGetCookie = (u) => {
        invokeApi('post', '/readcookie?username=' + u,
            (res) => {
                console.log(res.data)
            },
            (err) => {
                alert(err)
            }
        )
    }

    setLoggedIn = () => {
        return new Promise((resolve,reject) =>{
            this.props.setLoggedIn(true)
            if(this.props.thisLoggedIn == true){
                resolve(true)
            }else{
                reject(new Error('Cannot setup login status'))
            }
        })
    }

    tryme = () => {
        console.log(this.props)
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        // Only show error after a field is touched.
        const usernameError = isFieldTouched('username') && getFieldError('username');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                        />,
                    )}
                </Form.Item>
                <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                        Log in
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button type="danger" htmlType="button" onClick={this.tryme}>
                        Try Me
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const mapStateToProps = (state) => ({
    thisLoggedIn: state.auth.loggedIn
})

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(
        {
            setLoggedIn,
        },
        dispatch,
    )
})

const WrappedLoginForm = Form.create({ name: 'horizontal_login' })(LoginForm)

export default connect(mapStateToProps, mapDispatchToProps)(WrappedLoginForm)
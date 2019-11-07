import { Form, Icon, Input, Button } from 'antd';
import { invokeApi } from '../base/axios'


//Redux
import { bindActionCreators } from 'redux'
import { connect } from "react-redux"
import * as allActions from "../redux/actions"

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class LoginForm extends React.Component {
    
    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        // Only show error after a field is touched.
        const usernameError = isFieldTouched('username') && getFieldError('username');
        const passwordError = isFieldTouched('password') && getFieldError('password');

        const handleSubmit = e => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    doLogin(values.username, values.password)
                }
            });
        };

        const doLogin = (u, p) => {
            invokeApi('post', '/login?username=' + u + '&password=' + p,
                (res) => {
                    console.log(res.data)
                    doSetCookie(u, res.data.token)
                },
                (err) => {
                    alert(err)
                }
            )
        }

        const doSetCookie = (u, t) => {
            invokeApi('post', '/writecookie?username=' + u + '&token=' + t,
                (res) => {
                    console.log(res.data)
                    this.props.setLoggedIn(true)
                },
                (err) => {
                    alert(err)
                }
            )
        }

        const doGetCookie = (u) => {
            invokeApi('post', '/readcookie?username=' + u,
                (res) => {
                    console.log(res.data)
                },
                (err) => {
                    alert(err)
                }
            )
        }

        return (
            <Form layout="inline" onSubmit={handleSubmit}>
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
                        rules: [{ required: true, message: 'Please input your Password!' }],
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
            </Form>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(allActions, dispatch)
}

const WrappedLoginForm = Form.create({ name: 'horizontal_login' })(LoginForm)

export default connect(null, mapDispatchToProps)(WrappedLoginForm)
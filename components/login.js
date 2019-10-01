import Link from 'next/link'
import { Form, Icon, Input, Button, Checkbox, Card, Layout } from 'antd';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Login extends React.Component {

    state = {
            visible: false,
            confirmLoading: false,
    }


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Layout style={{ margin: '15%' }}>
                <Card title="Login Menu" style={{ width: 300, textAlign: 'center' }}>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
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
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>Remember me</Checkbox>)}
                            <a className="login-form-forgot" href="">
                                Forgot password
                        </a>
                            <Link href="/">
                                <Button type="primary" htmlType="submit" onClick={this.setLoggedIn} className="login-form-button">
                                    Log in
                                </Button>
                            </Link>
                            Or <a href="">register now!</a>
                        </Form.Item>
                    </Form>
                </Card>
            </Layout>
        );
    }
}

const LoginForm = Form.create({ name: 'normal_login' })(Login);

export default LoginForm
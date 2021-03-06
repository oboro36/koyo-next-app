import { Layout, Menu, Icon, Row, Col, Avatar, Modal, Button, Breadcrumb } from 'antd';
import Router from 'next/router'
import Link from 'next/link'
const { Sider } = Layout;
const { SubMenu } = Menu;

import { bindActionCreators } from 'redux'
import { connect } from "react-redux"
import { setLoggedIn } from "../redux/actions"


class SideBar extends React.Component {

    constructor(props) {
        super(props)
        this.style = {
            backgroundColor: '#f0f2f5',
            display: 'flex',
            height: '100%',
            columnGap: '5px',
            justifyContent: 'space-around',
            alignItems: 'center',
            margin: '10px 10px 10px 10px',
            padding: '5px',
            borderRadius: '5px',
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     if (this.state.content != nextState.content) {
    //         console.log('content diff')
    //         return true
    //     } else if (this.state.collapsed != nextState.collapsed) {
    //         console.log('collapse diff')
    //         return true
    //     } else {
    //         console.log('other')
    //         return false
    //     }
    // }

    state = {
        //Modal
        ModalText: 'Please set up your settings below.',
        visible: false,
        confirmLoading: false,
        //Side Bar
        collapsed: false,
        content: 'main',
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({
            ModalText: 'Setting in process . . . ',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };

    onCollapse = collapsed => {
        this.setState({ collapsed })
        this.setState({ showUserInfo: !collapsed })
        this.props.doCollapse(collapsed)
    };

    handleMenuClick = (event) => {
        const pageName = event.item.props.name
        this.setContent(pageName)
        Router.push({ pathname: '/' + pageName })
        // Router.push({ pathname: '/' + pageName, query: { name: 'PALM' } })
    }

    setContent = (content) => {
        this.setState({ content: content })
    }

    doLogout

    render() {
        return (
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}
                style={{
                    overflow: 'hidden',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                }}
            >
                <div>
                    {/* <div className="logo"><img style={{ margin: ' 10px 0px 10px 0px', position: 'relative', left: '25%' ,width: '50%' }} src="static/logo.svg" /></div> */}
                    <div>
                        {this.state.collapsed ?
                            <div style={this.style}>
                                <Avatar icon="user" />
                            </div>
                            :
                            <div style={this.style}>
                                <Avatar icon="user" />
                                <span style={{ fontWeight: 'bold' }}> {this.props.loggedUser} </span>
                                <Button type="primary" shape="circle" icon="setting" size="default" onClick={this.showModal} />
                                {/* <Link href="/"> */}
                                    <Button type="danger" shape="circle" icon="logout" size="default" onClick={()=>{rou}} />
                                {/* </Link> */}
                            </div>
                        }
                    </div>
                    <Menu theme="dark" mode="inline" onClick={this.handleMenuClick}>
                        <Menu.Item key="1" name="main">
                            <Icon type="dashboard" theme="filled" />
                            <span>Dashboard</span>
                        </Menu.Item>
                        <Menu.Item key="2" name="about">
                            <Icon type="idcard" theme="filled" />
                            <span>About</span>
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                                    <Icon type="appstore" theme="filled" />
                                    <span>Utility</span>
                                </span>
                            }
                        >
                            <Menu.Item key="3">Site Data Compare</Menu.Item>
                            <Menu.Item key="4">Transfer File</Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
                <Modal
                    title="User Config"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <p>{this.state.ModalText}</p>
                </Modal>
            </Sider>
        )
    }
}

SideBar.getInitialProps = async ({ req }) => {
    return { isServer: !!req };
};

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(
        {
            setLoggedIn,
        },
        dispatch,
    )
})


export default connect(null, mapDispatchToProps)(SideBar)
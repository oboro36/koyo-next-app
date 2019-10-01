import { Layout, Menu, Icon, Row, Col, Avatar, Button, Breadcrumb } from 'antd';
import Router from 'next/router'
import Link from 'next/link'
const { Sider } = Layout;
const { SubMenu } = Menu;

class SideBar extends React.Component {

    constructor(props) {
        super(props)
        this.style = {
            backgroundColor: '#f0f2f5',
            display: 'flex',
            height: '100%',
            columnGap: '5px',
            justifyContent: 'center',
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
        collapsed: false,
        content: 'main',
    };

    onCollapse = collapsed => {
        this.setState({ collapsed })
        this.setState({ showUserInfo: !collapsed })
        this.props.doCollapse(collapsed)
    };

    handleMenuClick = (event) => {
        const pageName = event.item.props.name
        this.setContent(pageName)
        Router.push({ pathname: '/' + pageName, query: { name: 'PALM' } })
    }

    setContent = (content) => {
        this.setState({ content: content })
    }

    render() {
        return (
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}
                style={{
                    overflow: 'auto',
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
                                <span> Mr.Palm </span>
                                <Button type="primary" shape="circle" icon="setting" size="default" />
                                <Link href="/">
                                    <Button type="danger" shape="circle" icon="logout" size="default" />
                                </Link>
                            </div>
                        }
                    </div>
                    <Menu theme="dark" mode="inline" onClick={this.handleMenuClick}>
                        <Menu.Item key="1" name="main">
                            <Icon type="pie-chart" />
                            <span>Dashboard</span>
                        </Menu.Item>
                        <Menu.Item key="2" name="about">
                            <Icon type="file" />
                            <span>About</span>
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                                    <Icon type="user" />
                                    <span>Utility</span>
                                </span>
                            }
                        >
                            <Menu.Item key="3">Site Data Compare</Menu.Item>
                            <Menu.Item key="4">Transfer File</Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
            </Sider>
        )
    }
}

SideBar.getInitialProps = async ({ req }) => {
    return { isServer: !!req };
};

export default SideBar
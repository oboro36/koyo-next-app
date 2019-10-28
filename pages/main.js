import React from 'react'
import { Card, Table, Button } from 'antd'
import LoginForm from '../components/login'
import { invokeApi } from '../base/axios'

const columns = [
    {
        title: 'ID',
        dataIndex: 'ID',
        key: 'ID',
    },
    {
        title: 'User Name',
        dataIndex: 'UserName',
        key: 'UserName',
    },
];

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            dataSource: [
                {
                    ID: '01',
                    UserName: 'Zero One',
                },
                {
                    ID: '02',
                    UserName: 'Vulcan',
                }
            ]
        }
    }

    getPerson = () => {
        self = this

        this.setState({ loading: true })

        setTimeout(() => {
            invokeApi('post', '/alluser',
                (res) => {
                    let result = res.data
                    self.setState({ dataSource: result })
                    self.setState({ loading: false })
                },
                (err) => {
                    alert(err)
                    self.setState({ loading: false })
                }
            )
        }, 2000);
    }

    render() {
        return (
            <div>
                <Card>
                    <h1>Hello, Contents from "<strong>main.js</strong>" is being rendered as starter content</h1>
                </Card>
                <Card><LoginForm /></Card>
                <Card><Button type="primary" onClick={this.getPerson}>Get Data</Button></Card>
                <Card>
                    <Table
                        columns={columns}
                        dataSource={this.state.dataSource}
                        loading={this.state.loading}
                        rowKey="ID"
                    />
                </Card>
            </div>
        )
    }
}

export default Main
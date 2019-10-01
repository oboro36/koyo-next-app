import React from 'react'
import { Card, Table, Button } from 'antd'
import axios from 'axios'

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
];


class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            dataSource: [
                {
                    key: '1',
                    name: 'テストくん',
                    age: 18,
                    address: '東京都、江戸川区',
                },
                {
                    key: '2',
                    name: 'テストちゃん',
                    age: 15,
                    address: '東京都、江戸川区',
                }
            ]
        }
    }

    getPerson = () => {
        self = this

        this.setState({ loading: true })

        setTimeout(() => {
            let config = {
                mode: 'cors'
            }

            axios.post('http://localhost:1323/alluser', config)
                .then(response => {
                    // const result = response.data.result
                    // console.log(response.data)
                    let result = response.data

                    console.log(result)

                    // result.key = '1'
                    // let ret = [result]
                    // self.setState({ dataSource: ret })
                    self.setState({ loading: false })
                })
                .catch(error => {
                    alert(error)
                });
        }, 2000);
    }

    render() {
        return (
            <div>
                <Card>
                    <h1>Hello, Contents from "<strong>main.js</strong>" is being rendered as starter content</h1>
                </Card>
                <Card><Button type="primary" onClick={this.getPerson}>Try Me</Button></Card>
                <Card>
                    <Table
                        columns={columns}
                        dataSource={this.state.dataSource}
                        loading={this.state.loading}
                    />
                </Card>
            </div>
        )
    }
}

export default Main
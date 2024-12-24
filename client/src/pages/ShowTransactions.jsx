import React, { useEffect, useState } from "react";
import { Table, Layout } from 'antd';
import useEth from "../contexts/EthContext/useEth";
import VerticalMenu from "../components/VerticalMenu";
import CustomFooter from "../components/Footer";
import { useAuth } from "../contexts/AuthContext";

const { Header, Sider, Footer, Content } = Layout;

function ShowTransactions() {
    console.log("showing tranasctions");
    const {userDetails} = useAuth();
    const [transactions, setTransactions] = useState([]);


    useEffect(() => {
        const populateData = async () => {
            try{
                //make an api client call to get the transactions for the user
                const url = `${process.env.REACT_APP_API_URL}/getTransactions`;
                let response = await fetch(url, {  
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                if(response.ok) {
                    response = await response.json();
                    setTransactions(response.transactions);
                }
            }catch(err){
                console.error('Error getting transactions', err);
            }


        }

        populateData();
    }, []);

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'From',
            dataIndex: 'from',
            key: 'from',
        },
        {
            title: 'To',
            dataIndex: 'to',
            key: 'to',
        },
        {
            title: 'Purpose',
            dataIndex: 'purpose',
            key: 'purpose',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (text) => text / 10 ** 18,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
    ];


    return (
        <Layout >
            <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ color: 'white', fontSize: '24px' }}>Family Wallet</div>
                <div style={{ color: 'white' }}>{userDetails.id}</div>
            </Header>
            <Layout>
                <Sider width="15%" >
                    <VerticalMenu activeTab={'my_transactions'}/>
                </Sider>
                <Content style={{ height: '100%' }}>
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Table
                        style={{ flex: 1 }}
                        columns={columns}
                        dataSource={transactions}
                        rowKey={(record, index) => index}
                        pagination={false}
                        scroll={{ y: 'calc(100vh - 200px)' }} // Adjust the height calculation as needed
                        />
                    </div>
                </Content>
            </Layout>
            <Footer>
                <CustomFooter />
            </Footer>
        </Layout>
    );
}

export default ShowTransactions;
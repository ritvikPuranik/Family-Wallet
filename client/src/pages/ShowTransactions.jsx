import React, { useEffect, useState } from "react";
import { Table } from 'antd';
import CustomLayout from "./CustomLayout";


function ShowTransactions() {
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
            title: 'From Address',
            dataIndex: 'from',
            key: 'from',
        },
        {
            title: 'To Address',
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
            render: (text) => text,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
    ];

    const getContent = () =>{
        return (
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
        )
    }

    return (
        <CustomLayout activeTab={'my_transactions'} content={getContent}/>
    );
}

export default ShowTransactions;
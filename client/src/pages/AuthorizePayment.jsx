import React, { useEffect, useState } from 'react';
import { Table, Button, message } from 'antd';
import CustomLayout from './CustomLayout';

function AuthorizePayment() {
  const [pendingTransactions, setPendingTransactions] = useState([]);

  useEffect(() => {
    const populateData = async () => {
      try {
        let response = await fetch(`${process.env.REACT_APP_API_URL}/getTransactions?status=pending`, {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          response = await response.json();
          setPendingTransactions(response.transactions);
        }
      } catch (err) {
        console.error('Error getting transactions', err);
      }
    };

    populateData();
  }, []);

const handleAction = async (record, isApproved) => {
    try {
      console.log("record>", record);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/approveOrRejectTransaction`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ transactionId: record.id, isApproved }),
        });
        const result = await response.json();
        if (response.ok) {
            message.success(`${isApproved ? 'Approval' : 'Rejection'} successful!`);
            setPendingTransactions(prev => prev.filter(tx => tx.id !== record.id));
        } else {
            message.error(result.message || 'Something went wrong!');
        }
    } catch (error) {
        message.error('Network error!');
    }
};

  

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
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button style={{color: "green"}} type="link" onClick={() => handleAction(record, true)}>Approve</Button>
          <Button style={{color: "red"}} type="link" onClick={() => handleAction(record, false)}>Reject</Button>
        </span>
      ),
    },
  ];

  const getContent = () => (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Table
        style={{ flex: 1 }}
        columns={columns}
        dataSource={pendingTransactions}
        rowKey={(record) => record.id}
        pagination={false}
      />
    </div>
  );

  return (
    <CustomLayout activeTab={'authorize_payment'} content={getContent} />
  );
}

export default AuthorizePayment;

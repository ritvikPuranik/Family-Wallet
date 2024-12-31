import React, { useState } from "react";
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from "react-router-dom";
import CustomLayout from "./CustomLayout";
import { useAuth } from "../contexts/AuthContext";

function MakePayment() {
  console.log("make payment component");
  const navigate = useNavigate();
  const { account } = useAuth();
  const [loading, setLoading] = useState(false);
  console.log("account from context>", account);

  const onFinish = async (values) => {
    setLoading(true);
    console.log("values>", values);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/makePayment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (response.ok) {
        message.success('Payment successful!');
        navigate('/my_transactions');
      } else {
        if(response.status === 401){
            message.error('Unauthorized!');
            navigate('/login');
        }else{
        message.error(result.message || 'Something went wrong!');
        }

      }
    } catch (error) {
      message.error('Network error!');
    } finally {
      setLoading(false);
    }
  };

const getContent = () => (
    <Form style={{margin: '10px'}} onFinish={onFinish} layout="vertical">
        {/* <Form.Item
            name="from"
            label="From"
            initialValue={account}
        >
            <Input value={account} disabled />
        </Form.Item> */}
        <Form.Item
            name="to"
            label="To"
            rules={[{ required: true, message: 'Please input the recipient address!' }]}
        >
            <Input placeholder="Recipient Address" />
        </Form.Item>
        <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, message: 'Please input the amount!' }]}
        >
            <Input type="number" placeholder="Amount" />
        </Form.Item>
        <Form.Item
            name="purpose"
            label="Purpose"
            rules={[{ required: true, message: 'Please input the purpose!' }]}
        >
            <Input placeholder="Purpose" />
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
                Submit
            </Button>
        </Form.Item>
    </Form>
);

  return (
    <CustomLayout activeTab={'make_payment'} content={getContent} />
  );
}

export default MakePayment;

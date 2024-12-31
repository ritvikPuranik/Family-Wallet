import React, { useState } from "react";
import { Form, Input, Button, message, Select } from 'antd';
import { useNavigate } from "react-router-dom";
import CustomLayout from "./CustomLayout";

function AddMember() {
  console.log("Add member component");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    console.log("values>", values);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/addMember`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({...values, isParent: values.isParent === 'true'}),
      });
      const result = await response.json();
      if (response.ok) {
        message.success('Member added successfully!');
        navigate('/my_transactions');
      } else {
        if(response.status === 401){
            message.error('Unauthorized!');
            navigate('/login');
        }else if(response.status === 404){
            message.error(result.message || 'User not found');
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
        <Form.Item
            name="userId"
            label="User ID"
            rules={[{ required: true, message: 'Please provide the User ID of the memerb you want to add!' }]}
        >
            <Input placeholder="Provide the user ID of the new member" />
        </Form.Item>
        <Form.Item
            name="isParent"
            label="Is Parent"
            rules={[{ required: true, message: 'Please select if the user is a parent!' }]}
        >
            <Select placeholder="Select if the member is a parent">
                <Select.Option value="true">True</Select.Option>
                <Select.Option value="false">False</Select.Option>
            </Select>
        </Form.Item>
        
        <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
                Submit
            </Button>
        </Form.Item>
    </Form>
);

  return (
    <CustomLayout activeTab={'add_member'} content={getContent} />
  );
}

export default AddMember;

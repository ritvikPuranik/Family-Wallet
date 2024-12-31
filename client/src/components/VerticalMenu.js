import React from 'react';
import { useNavigate } from "react-router-dom";
import { SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import {useAuth} from '../contexts/AuthContext';


const VerticalMenu = (props) => {
  const navigate = useNavigate();
  const {userDetails} = useAuth();

  const items = [
    {
      key: 'common_features',
      type: 'group',
      children: [
        {
          key: 'my_transactions',
          label: 'My Transactions',
        },
        {
          key: 'make_payment',
          label: 'Make Payment',
        },
      ],
    },
    {
      type: 'divider',
    },
    ...(userDetails.isParent ? [
      {
        key: 'parental_controls',
        label: 'Parental Controls',
        icon: <SettingOutlined />,
        children: [
          {
            key: 'add_member',
            label: 'Add Member',
          },
          {
            key: 'authorize_payment',
            label: 'Authorize Payment',
          },
        ],
      },
    ] : []),
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      style: { marginTop: 'auto' },
    },
  ];

  const onClick = (e) => {
    if (e.key === 'logout') {
      fetch(`${process.env.REACT_APP_API_URL}/logout`, { method: 'POST', credentials: 'include' })
        .then(response => {
          if (response.ok) {
            navigate('/login');
          }
        })
        .catch(error => {
          console.error('Error logging out:', error);
        });
    } else {
      navigate(`/${e.key}`);
    }
  };
  return (
    <Menu
      onClick={onClick}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'top',
      }}
      defaultSelectedKeys={[props.activeTab]}
      mode="inline"
      items={items}
    />
  );
};
export default VerticalMenu;
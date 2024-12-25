import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from 'antd';
import useEth from "../contexts/EthContext/useEth";
import VerticalMenu from "../components/VerticalMenu";
import CustomFooter from "../components/Footer";
import { useAuth } from "../contexts/AuthContext";

const { Header, Sider, Footer, Content } = Layout;

function CustomLayout(props) {
    const navigate = useNavigate();
    const {activeTab, content} = props;
    const { userDetails, setUser } = useAuth();

    useEffect(() => {
        const checkSession = async () => {
          try {
            let response = await fetch(`${process.env.REACT_APP_API_URL}/isValidSession`, { method: 'GET', credentials: 'include' });
            if(response.status === 401){
                setUser(null);
                navigate('/login');
                return;
            }
            response = await response.json();
            if (response) {
              setUser(response.user);
            } else {
              setUser(null);
            }
          } catch (error) {
            console.error('Error checking session', error);
            setUser(null);
          }
        };
        checkSession();
      }, []);

    return (
        <Layout >
            <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ color: 'white', fontSize: '24px' }}>Family Wallet</div>
                <div style={{ color: 'white' }}>{userDetails.id}</div>
            </Header>
            <Layout>
                <Sider width="15%" >
                    <VerticalMenu activeTab={activeTab}/>
                </Sider>
                <Content style={{ height: '100%' }}>
                    {content()}
                </Content>
            </Layout>
            <Footer>
                <CustomFooter />
            </Footer>
        </Layout>
    );
}

export default CustomLayout;
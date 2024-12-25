import React, { useEffect, useState } from "react";
import { Layout } from 'antd';
import useEth from "../contexts/EthContext/useEth";
import VerticalMenu from "../components/VerticalMenu";
import CustomFooter from "../components/Footer";
import { useAuth } from "../contexts/AuthContext";

const { Header, Sider, Footer, Content } = Layout;

function CustomLayout(props) {
    const {activeTab, content} = props;
    const {userDetails} = useAuth();

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
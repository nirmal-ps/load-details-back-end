import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import LoanTable from './loan-table'
import { fetchDataGet } from '../support-functions/fetch'
import './layout.css'

const { Header, Content, Footer, Sider } = Layout;



export default class LayoutWrapper extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  handleMenuClick = (key) => {
    if (key.key === 'logout') {
      fetchDataGet('/api/user/logout/')
      .then(() => {
        this.props.updateUser({
            loggedIn: false,
            username: null
          })
      })
    }
  }
  
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }} id="lending-app">
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={this.handleMenuClick}>
            <Menu.Item key="1">
            <Icon type="dollar" />
              <span>Loan Details</span>
            </Menu.Item>
            <Menu.Item key="logout">
            <Icon type="logout" />
              <span>Log out</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360, marginTop: '16px' }}>
              <LoanTable/>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}></Footer>
        </Layout>
      </Layout>
    );
  }
}


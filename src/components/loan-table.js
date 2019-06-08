import React from 'react';
import { Table } from 'antd';
import { getColumns } from './columns'
import { fetchDataGet} from '../support-functions/fetch'

export default class Loantable extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            tableData: [],
            pagination : { total: 0, position: 'both'}
        }
    }
    componentDidMount() {
        this.fetchData(0, 10)
    }
    fetchData = (page , count) => {
      const { pagination } = this.state  
      this.setState({ loading: true, tableData: []} , () => {
          fetchDataGet(`/api/loan?page=${page}&count=${count}`)
          .then((data) => {
             
             this.setState({ tableData: data.data, 
                loading: false, 
                pagination: { ...pagination, total: parseInt(data.count)  } })
          })
      })
    }
    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
          pagination: pager,
        } , () => {
            this.fetchData(pager.current - 1, 10);
        });
        
      };
  
    render() {
        const { loading, tableData, pagination } = this.state
        
       
        
        return(
            <Table 
                columns={getColumns()} 
                dataSource={tableData}
                title={() => <h2>Loan Details</h2>}
                bordered
                loading={loading}
                size="small"
                scroll={{ x: 2500 }}
                onChange = { this.handleTableChange}
                pagination = {pagination}
            />
        )
        
        
        
    }
}
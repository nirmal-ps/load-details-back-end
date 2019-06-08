import React from 'react'
import LayoutWrapper from './layout';

export default class Home extends React.Component {
    
    render() {
      return(
        <LayoutWrapper {...this.props}/>
      )
    }
  }
  
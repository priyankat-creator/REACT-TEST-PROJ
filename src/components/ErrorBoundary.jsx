import React, { Component } from 'react'

import FallbackUI from './FallbackUI'

class ErrorBoundary extends Component {

  constructor(props){

    super(props);

    this.state = {

      hasError:false

    };

  }

  // updates UI state
  static getDerivedStateFromError(){

    return {

      hasError:true

    };

  }

  // optional logging
  componentDidCatch(error,errorInfo){

    console.log(
      "Error Boundary Caught:",
      error
    );

    console.log(errorInfo);

  }

  render(){

    if(this.state.hasError){

      return <FallbackUI />

    }

    return this.props.children;

  }

}

export default ErrorBoundary
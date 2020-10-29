import React from 'react'

export default (Page) =>
  class DefaultPage extends React.Component {
    static async getInitialProps({ req }) {
      const pageProps = Page.getInitialProps && Page.getInitialProps(req)
      let path = req ? req.pathname : ''
      path = ''
      return {
        ...pageProps,
        currentUrl: path
      }
    }

    render() {
      return <Page {...this.props} />
    }
  }

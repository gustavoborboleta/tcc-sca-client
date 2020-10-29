import Layout from 'components/Layout'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import AuthContext from '../contexts/auth'

import GlobalStyles from 'styles/global'
import theme from 'styles/theme'

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContext>
      <ThemeProvider theme={theme}>
        <Head>
          <title>SCA</title>
          <link rel="shortcut icon" href="/img/icon-512.png" />
          <link rel="apple-touch-icon" href="/img/icon-512.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta
            name="description"
            content="A simple project starter to work with TypeScript, React, NextJS and Styled Components"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
            integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"
            crossOrigin="anonymous"
          ></link>
        </Head>
        <GlobalStyles />

        <Layout
          isAuthenticated={pageProps.isAuthenticated}
          user={pageProps.loggedUser}
        >
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </AuthContext>
  )
}

export default App

import Document, { Html, Head, Main, NextScript } from 'next/document'

class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
            rel="stylesheet"
          />


          <meta name="msapplication-TileColor" content="#00CCFF" />
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </Head>
        <body className="debug-screens">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default CustomDocument

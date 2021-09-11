import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

const App = ({ children, title = '', description = '', keywords = '' }) => {
  const desc = description
      ? description.slice()
      : '前端武器库，前端程序员日常使用的工具'

  return (
    <div className="flex flex-col items-center overflow-hidden justify-start">
      <Head>
        <title>{`${title}_前端武器库`}</title>
        <meta name="description" content={desc} />
        <meta name="keywords" content={keywords} />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1"
        />

        {/* <meta property="og:url" content={`localhost:3000${router.saPath}`} /> */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content="" />
        <meta property="og:site_name" content="前端武器库" />
        <meta property="og:type" content="website" />
        <meta property="og:type" content="application" />
        <meta property="og:text" content="text" />
        <meta property="og:type" content="movie" />
      </Head>
      <Header />
      {children}
      <Footer/>
    </div>
  )
}

export default App
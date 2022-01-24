import '../styles/globals.css'
import {ContextProvider} from '../components/Context/Context'

function MyApp({ Component, pageProps }) {

  return(
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  )
 
}

export default MyApp

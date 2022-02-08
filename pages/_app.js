import '../styles/globals.css'
import {ContextProvider} from '../components/Context/Context'
import {useRouter} from 'next/router'
import {useState,useEffect} from 'react'
import Loader from '../components/Loader/Loader'

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    router.events.on("routeChangeError", () => setLoading(true));
    router.events.on("routeChangeStart", () => setLoading(true));
    router.events.on("routeChangeComplete", () => setLoading(false));

    return () => {
      router.events.off("routeChangeError", () => setLoading(true));
      router.events.off("routeChangeStart", () => setLoading(true));
      router.events.off("routeChangeComplete", () => setLoading(false));
    };
  }, [router.events]);

  return(
    <>
        {loading&&<Loader/>}
        <ContextProvider>
          <Component {...pageProps} />
        </ContextProvider>
    </>

  )
}

export default MyApp

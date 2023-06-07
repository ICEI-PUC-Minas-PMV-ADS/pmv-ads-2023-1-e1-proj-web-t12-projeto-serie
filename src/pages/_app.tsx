import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import ProgressBar from "@badrap/bar-of-progress";
import Router from 'next/router'
import { LocalProvider } from '@/hooks/useLocalStorage';

const progress = new ProgressBar({
  size: 4,
  color: "#f54c28",
  delay: 100
});

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)

export default function App({ Component, pageProps }: AppProps) {
  return(
  <LocalProvider>
   <Component {...pageProps} />
  </LocalProvider>
  )
}

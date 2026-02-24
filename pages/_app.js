import { Provider } from 'react-redux'
import store from '../redux/store'
import Navbar from '../components/Navbar'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Navbar />
      <Component {...pageProps} />
      <footer style={{
        textAlign: 'center',
        padding: '24px 16px',
        color: '#aaa',
        fontSize: '0.85rem',
        borderTop: '1px solid #eee',
        marginTop: '40px',
        background: 'white'
      }}>
       2026 ShopZone
      </footer>
    </Provider>
  )
}

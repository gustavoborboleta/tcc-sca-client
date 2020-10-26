import Main from 'components/Main'
import securePage from '../utils/auth/securePage'

function Home() {
  return <Main />
}

export default securePage(Home)

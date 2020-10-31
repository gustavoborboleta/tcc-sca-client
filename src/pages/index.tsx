import { useRouter } from 'next/router'

const Home = () => {
  const router = useRouter()
  router.push('/monitorings')
  return <></>
}

export default Home

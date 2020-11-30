import { useRouter } from 'next/router'
import Link from 'next/link'
import { ListGroup, ListGroupItem } from 'reactstrap'
import useSWR from 'swr'
import { strapi } from 'utils/auth/auth'
import Heading from '../../components/Heading'
import Button from '../../components/Button'

const fetcher = (url: string) => strapi.request('get', url).then((res) => res)

const Monitorings = () => {
  const router = useRouter()
  const { id } = router.query
  const { data, error } = useSWR(`/monitorings/${id}`, fetcher)

  if (error) return 'An error has occurred.'
  if (!data) return 'Loading...'

  return (
    <>
      <div className="py-5 d-flex justify-content-between">
        <div className="mx-1">
          <Heading color={'black'} lineLeft={true}>
            Monitoring
          </Heading>
        </div>
        <div>
          <Link href={`/monitorings`}>
            <Button className="mx-1" size="small">
              Back
            </Button>
          </Link>
        </div>
      </div>
      <ListGroup>
        <ListGroupItem>
          <h3>Date:</h3> {data.created_at}
        </ListGroupItem>
        <ListGroupItem>
          <h3>Humidity:</h3> {data.humidity}
        </ListGroupItem>
        <ListGroupItem>
          <h3>Pressure:</h3> {data.pressure}
        </ListGroupItem>
        <ListGroupItem>
          <h3>Sector:</h3> {data.mine.Name}
        </ListGroupItem>
        <ListGroupItem>
          <h3>Sector:</h3> {data.sector.Name}
        </ListGroupItem>
        <ListGroupItem>
          <h3>Details:</h3> {JSON.stringify(data.details, undefined, 2)}
        </ListGroupItem>
      </ListGroup>
    </>
  )
}

export default Monitorings

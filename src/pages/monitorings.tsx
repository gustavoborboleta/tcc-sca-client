import { Table } from 'reactstrap'
import useSWR from 'swr'
import Link from 'next/link'
import { strapi } from 'utils/auth/auth'
import Heading from '../components/Heading'

const fetcher = (url: string) => strapi.request('get', url).then((res) => res)

const Monitorings = () => {
  const { data, error } = useSWR('/monitorings', fetcher)

  if (error) return 'An error has occurred.'
  if (!data) return 'Loading...'

  return (
    <>
      <div className="py-5 mx-1">
        <Heading color={'black'} lineLeft={true}>
          Monitorings
        </Heading>
      </div>
      <Table hover>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Date</th>
            <th scope="col">Humidity</th>
            <th scope="col">Pressure</th>
            <th scope="col">Sector</th>
            <th scope="col">Mine</th>
          </tr>
        </thead>
        <tbody>
          {data.map((monitorings: any) => (
            <Link key={monitorings.id} href={`/monitorings/${monitorings.id}`}>
              <tr style={{ cursor: 'pointer' }}>
                <th scope="row">{monitorings.id}</th>
                <td>{monitorings.created_at}</td>
                <td>{monitorings.humidity}</td>
                <td>{monitorings.pressure}</td>
                <td>{monitorings.sector.Name}</td>
                <td>{monitorings.mine.Name}</td>
              </tr>
            </Link>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default Monitorings

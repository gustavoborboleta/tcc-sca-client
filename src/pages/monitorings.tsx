import { Table } from 'reactstrap'
import useSWR from 'swr'
import { strapi } from 'utils/auth/auth'

const fetcher = (url: string) => strapi.request('get', url).then((res) => res)

const Monitorings = () => {
  const { data, error } = useSWR('/monitorings', fetcher)

  if (error) return 'An error has occurred.'
  if (!data) return 'Loading...'
  console.log(data)

  return (
    <>
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
            <tr key={monitorings.id}>
              <th scope="row">{monitorings.id}</th>
              <td>{monitorings.created_at}</td>
              <td>{monitorings.humidity}</td>
              <td>{monitorings.pressure}</td>
              <td>{monitorings.sector.Name}</td>
              <td>{monitorings.mine.Name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default Monitorings

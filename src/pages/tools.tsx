import { Table } from 'reactstrap'
import useSWR from 'swr'
import { strapi } from 'utils/auth/auth'

const fetcher = (url: string) => strapi.request('get', url).then((res) => res)

const Tools = () => {
  const { data, error } = useSWR('/tools', fetcher)

  if (error) return 'An error has occurred.'
  if (!data) return 'Loading...'
  console.log(data)

  return (
    <>
      <Table hover>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </Table>
    </>
  )
}

export default Tools

import { useRouter } from 'next/router'
import { Table } from 'reactstrap'
import useSWR from 'swr'
import { strapi } from 'utils/auth/auth'
import Button from '../components/Button'

const fetcher = (url: string) => strapi.request('get', url).then((res) => res)

const Maintenance = () => {
  const { data, error } = useSWR('/tool-maintenances', fetcher)
  const router = useRouter()

  if (error) return 'An error has occurred.'
  if (!data) return 'Loading...'
  console.log(data)

  const onDelete = (id: number) => {
    console.log(id)
  }

  const goEdit = (id: number) => {
    router.push(`/maintenances/edit/${id}`)
  }

  return (
    <>
      <Table hover>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
            <th scope="col">Tool</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((maintenance: any) => (
            <tr key={maintenance.id}>
              <th scope="row">{maintenance.id}</th>
              <td>{maintenance.Date}</td>
              <td>{maintenance.Description}</td>
              <td>{maintenance.tool ? maintenance.tool.Name : null}</td>
              <td>
                <Button
                  onClick={() => goEdit(maintenance.id)}
                  className="mx-1"
                  size="small"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => onDelete(maintenance.id)}
                  className="mx-1"
                  size="small"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default Maintenance

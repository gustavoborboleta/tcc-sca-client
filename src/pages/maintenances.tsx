import { useRouter } from 'next/router'
import { Table } from 'reactstrap'
import useSWR from 'swr'
import Link from 'next/link'
import { strapi } from 'utils/auth/auth'
import Button from '../components/Button'
import Heading from '../components/Heading'

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
      <div className="py-5 d-flex justify-content-between">
        <div className="mx-1">
          <Heading color={'black'} lineLeft={true}>
            Maintenance
          </Heading>
        </div>
        <Link href="/maintenances/create">
          <Button className="mx-1" size="small">
            Create
          </Button>
        </Link>
      </div>
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
                  className="m-1"
                  size="small"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => onDelete(maintenance.id)}
                  className="m-1"
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

import { useRouter } from 'next/router'
import { Table } from 'reactstrap'
import useSWR from 'swr'
import { strapi } from 'utils/auth/auth'
import Button from '../components/Button'
import Heading from '../components/Heading'

const fetcher = (url: string) => strapi.request('get', url).then((res) => res)

const Tools = () => {
  const { data, error } = useSWR('/tools', fetcher)
  const router = useRouter()

  if (error) return 'An error has occurred.'
  if (!data) return 'Loading...'
  console.log(data)

  const onDelete = (id: number) => {
    console.log(id)
  }

  const goEdit = (id: number) => {
    router.push(`/tools/edit/${id}`)
  }

  return (
    <>
      <div className="py-5 d-flex justify-content-between">
        <div className="mx-1">
          <Heading color={'black'} lineLeft={true}>
            Tools
          </Heading>
        </div>
        <Button className="mx-1" size="small">
          Create
        </Button>
      </div>
      <Table hover>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Maintenance</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((tool: any) => (
            <tr key={tool.id}>
              <th scope="row">{tool.id}</th>
              <td>{tool.Name}</td>
              <td>{tool.tool_maintenance.Date}</td>
              <td>
                <Button
                  onClick={() => goEdit(tool.id)}
                  className="mx-1"
                  size="small"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => onDelete(tool.id)}
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

export default Tools

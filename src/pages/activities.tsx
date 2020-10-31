import { useRouter } from 'next/router'
import { Table } from 'reactstrap'
import useSWR from 'swr'
import Link from 'next/link'
import { strapi } from 'utils/auth/auth'
import Button from '../components/Button'
import Heading from '../components/Heading'

const fetcher = (url: string) => strapi.request('get', url).then((res) => res)

const Activities = () => {
  const { data, error } = useSWR('/activities', fetcher)
  const router = useRouter()

  if (error) return 'An error has occurred.'
  if (!data) return 'Loading...'
  console.log(data)

  const onDelete = (id: number) => {
    strapi.request('delete', `/activities/${id}`).then((res) => {
      console.log(res)
    })
  }

  const goEdit = (id: number) => {
    router.push(`/activities/edit/${id}`)
  }

  return (
    <>
      <div className="py-5 d-flex justify-content-between">
        <div className="mx-1">
          <Heading color={'black'} lineLeft={true}>
            Activities
          </Heading>
        </div>
        <Link href="/activities/create">
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
            <th scope="col">Shift</th>
            <th scope="col">Sector</th>
            <th scope="col">Mine</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((activities: any) => (
            <tr key={activities.id}>
              <th scope="row">{activities.id}</th>
              <td>{activities.Date}</td>
              <td>{activities.Description}</td>
              <td>{activities.shift.Name}</td>
              <td>{activities.sector.Name}</td>
              <td>{activities.mine.Name}</td>
              <td>
                <Button
                  onClick={() => goEdit(activities.id)}
                  className="m-1"
                  size="small"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => onDelete(activities.id)}
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

export default Activities

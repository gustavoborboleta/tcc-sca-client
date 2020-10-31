import { useRouter } from 'next/router'
import { Table } from 'reactstrap'
import useSWR from 'swr'
import Link from 'next/link'
import { strapi } from 'utils/auth/auth'
import Button from '../components/Button'
import Heading from '../components/Heading'

const fetcher = (url: string) => strapi.request('get', url).then((res) => res)

const Occurrences = () => {
  const { data, error } = useSWR('/occurrences', fetcher)
  const router = useRouter()

  if (error) return 'An error has occurred.'
  if (!data) return 'Loading...'
  console.log(data)

  const onDelete = (id: number) => {
    strapi.request('delete', `/occurrences/${id}`).then((res) => {
      console.log(res)
    })
  }

  const goEdit = (id: number) => {
    router.push(`/occurrences/edit/${id}`)
  }

  return (
    <>
      <div className="py-5 d-flex justify-content-between">
        <div className="mx-1">
          <Heading color={'black'} lineLeft={true}>
            Occurrences
          </Heading>
        </div>
        <Link href="/occurrences/create">
          <Button className="mx-1" size="small">
            Create
          </Button>
        </Link>
      </div>
      <Table hover>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Level</th>
            <th scope="col">Shift</th>
            <th scope="col">Sector</th>
            <th scope="col">Mine</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((occurrences: any) => (
            <tr key={occurrences.id}>
              <th scope="row">{occurrences.id}</th>
              <td>{occurrences.Title}</td>
              <td>{occurrences.level}</td>
              <td>{occurrences.shift.Name}</td>
              <td>{occurrences.sector.Name}</td>
              <td>{occurrences.mine.Name}</td>
              <td>
                <Button
                  onClick={() => goEdit(occurrences.id)}
                  className="m-1"
                  size="small"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => onDelete(occurrences.id)}
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

export default Occurrences

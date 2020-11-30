import { useRouter } from 'next/router'
import { Table } from 'reactstrap'
import useSWR from 'swr'
import Link from 'next/link'
import { strapi } from 'utils/auth/auth'
import Button from '../components/Button'
import Heading from '../components/Heading'
import { useEffect, useState } from 'react'

const fetcher = (url: string) => strapi.request('get', url).then((res) => res)

const Occurrences = () => {
  const router = useRouter()
  const [occurrences, setOccurrences] = useState([])
  const { data, error } = useSWR('/occurrences', fetcher)

  useEffect(() => {
    if (data) {
      setOccurrences(data)
    }
  }, [data])

  if (error) return 'An error has occurred.'
  if (!data) return 'Loading...'

  const onDelete = async (id: number) => {
    await strapi.request('delete', `/occurrences/${id}`).then((res) => {
      setOccurrences(
        occurrences.filter((tool: any) => {
          return tool.id !== res.id
        })
      )
    })
  }

  const goView = (id: number) => {
    router.push(`/occurrences/${id}`)
  }

  const goEdit = (id: number) => {
    router.push(`/occurrences/edit/${id}`)
  }

  return (
    <>
      <div className="py-5 d-flex justify-content-between">
        <div className="m-1">
          <Heading color={'black'} lineLeft>
            Occurrences
          </Heading>
        </div>
        <Link href="/occurrences/create">
          <Button className="m-1" size="small">
            Create
          </Button>
        </Link>
      </div>
      <Table hover>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Shift</th>
            <th scope="col">Sector</th>
            <th scope="col">Mine</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {occurrences.map((occurrences: any) => (
            <tr key={occurrences.id}>
              <th scope="row">{occurrences.id}</th>
              <td>{occurrences.Title}</td>
              <td>{occurrences.shift.Name}</td>
              <td>{occurrences.sector.Name}</td>
              <td>{occurrences.mine.Name}</td>
              <td>
                <Button
                  onClick={() => goView(occurrences.id)}
                  className="m-1"
                  size="small"
                >
                  View
                </Button>
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

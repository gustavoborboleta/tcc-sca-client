import { useRouter } from 'next/router'
import { Table } from 'reactstrap'
import useSWR from 'swr'
import Link from 'next/link'
import { strapi } from 'utils/auth/auth'
import Button from '../components/Button'
import Heading from '../components/Heading'
import { useEffect, useState } from 'react'

const fetcher = (url: string) => strapi.request('get', url).then((res) => res)

const Activities = () => {
  const router = useRouter()
  const [activities, setActivities] = useState([])
  const { data, error } = useSWR('/activities', fetcher)

  useEffect(() => {
    if (data) {
      setActivities(data)
    }
  }, [data])

  if (error) return 'An error has occurred.'
  if (!data) return 'Loading...'

  const onDelete = async (id: number) => {
    await strapi.request('delete', `/activities/${id}`).then((res) => {
      setActivities(
        activities.filter((activitie: any) => {
          return activitie.id !== res.id
        })
      )
    })
  }

  const goView = (id: number) => {
    router.push(`/activities/${id}`)
  }

  const goEdit = (id: number) => {
    router.push(`/activities/edit/${id}`)
  }

  return (
    <>
      <div className="py-5 d-flex justify-content-between">
        <div className="m-1">
          <Heading color={'black'} lineLeft>
            Activities
          </Heading>
        </div>
        <Link href="/activities/create">
          <Button className="m-1" size="small">
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
          {activities.map((activitie: any) => (
            <tr key={activitie.id}>
              <th scope="row">{activitie.id}</th>
              <td>{activitie.Date}</td>
              <td>{activitie.Description}</td>
              <td>{activitie.shift.Name}</td>
              <td>{activitie.sector.Name}</td>
              <td>{activitie.mine.Name}</td>
              <td>
                <Button
                  onClick={() => goView(activitie.id)}
                  className="m-1"
                  size="small"
                >
                  View
                </Button>
                <Button
                  onClick={() => goEdit(activitie.id)}
                  className="m-1"
                  size="small"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => onDelete(activitie.id)}
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

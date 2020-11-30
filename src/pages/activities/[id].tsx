import { useRouter } from 'next/router'
import Link from 'next/link'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import useSWR from 'swr'
import { strapi } from 'utils/auth/auth'
import Button from '../../components/Button'
import Heading from '../../components/Heading'

const fetcher = (url: string) => strapi.request('get', url).then((res) => res)

const Activities = () => {
  const router = useRouter()
  const { id } = router.query
  const { data } = useSWR(`/activities/${id}`, fetcher)

  const goEdit = (id: number) => {
    router.push(`/activities/edit/${id}`)
  }

  const onDelete = () => {
    strapi.request('delete', `/activities/${data.id}`).then(() => {
      router.push('/activities')
    })
  }

  return data ? (
    <>
      <div className="py-5 d-flex justify-content-between">
        <div className="m-1">
          <Heading color={'black'} lineLeft>
            Activitie
          </Heading>
        </div>
        <div>
          <Button onClick={() => goEdit(data.id)} className="m-1" size="small">
            Edit
          </Button>
          <Button onClick={() => onDelete()} className="m-1" size="small">
            Delete
          </Button>
        </div>
      </div>
      <Form>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            value={data.Description}
            disabled
            type="text"
            name="description"
            id="description"
            required
            style={{ height: 50, fontSize: '1.2em' }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="date">Date</Label>
          <Input
            value={data.Date}
            disabled
            type="text"
            name="date"
            id="date"
            required
            style={{ height: 50, fontSize: '1.2em' }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="mine">Mine</Label>
          <Input
            value={data.mine.Name}
            disabled
            type="text"
            name="mine"
            id="mine"
            required
            style={{ height: 50, fontSize: '1.2em' }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="sector">Sector</Label>
          <Input
            value={data.sector.Name}
            disabled
            type="text"
            name="sector"
            id="sector"
            required
            style={{ height: 50, fontSize: '1.2em' }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="shift">Shift</Label>
          <Input
            value={data.shift.Name}
            disabled
            type="text"
            name="shift"
            id="shift"
            required
            style={{ height: 50, fontSize: '1.2em' }}
          />
        </FormGroup>
        <div className="float-left">
          <Link href="/activities">
            <Button>Cancel</Button>
          </Link>
        </div>
      </Form>
    </>
  ) : null
}

export default Activities

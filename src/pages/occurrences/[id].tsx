import { useRouter } from 'next/router'
import Link from 'next/link'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import useSWR from 'swr'
import { strapi } from 'utils/auth/auth'
import Button from '../../components/Button'
import Heading from '../../components/Heading'

const fetcher = (url: string) => strapi.request('get', url).then((res) => res)

const Occurrences = () => {
  const router = useRouter()
  const { id } = router.query
  const { data } = useSWR(`/occurrences/${id}`, fetcher)

  const goEdit = (id: number) => {
    router.push(`/occurrences/edit/${id}`)
  }

  const onDelete = () => {
    strapi.request('delete', `/occurrences/${id}`).then(() => {
      router.push('/occurrences')
    })
  }

  return data ? (
    <>
      <div className="py-5 d-flex justify-content-between">
        <div className="m-1">
          <Heading color={'black'} lineLeft>
            Occurrence
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
          <Label for="title">Title</Label>
          <Input
            value={data.Title}
            type="text"
            name="Title"
            id="title"
            required
            style={{ height: 50, fontSize: '1.2em' }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            value={data.description}
            disabled
            type="textarea"
            rows="4"
            name="description"
            id="description"
            required
            style={{ height: 50, fontSize: '1.2em' }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="date">Date</Label>
          <Input
            value={data.date}
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
          <Link href="/occurrences">
            <Button>Cancel</Button>
          </Link>
        </div>
      </Form>
    </>
  ) : null
}

export default Occurrences

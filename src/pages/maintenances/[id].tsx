import { useRouter } from 'next/router'
import Link from 'next/link'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import useSWR from 'swr'
import { strapi } from 'utils/auth/auth'
import Button from '../../components/Button'
import Heading from '../../components/Heading'

const fetcher = (url: string) => strapi.request('get', url).then((res) => res)

const Maintenances = () => {
  const router = useRouter()
  const { id } = router.query

  const { data, error } = useSWR(`/tool-maintenances/${id}`, fetcher)

  if (error) return 'An error has occurred.'
  if (!data) return 'Loading...'

  const goEdit = (id: number) => {
    router.push(`/maintenances/edit/${id}`)
  }

  const onDelete = () => {
    strapi.request('delete', `/tool-maintenances/${id}`).then(() => {
      router.push('/maintenances')
    })
  }

  return data ? (
    <>
      <div className="py-5 d-flex justify-content-between">
        <div className="m-1">
          <Heading color={'black'} lineLeft>
            Maintenance
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
          <Label for="tools">Tool</Label>
          <Input
            disabled
            required
            type="text"
            name="tools"
            id="tools"
            value={data.tool.Name}
            style={{ height: 50, fontSize: '1.2em' }}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label for="date">Date</Label>
          <Input
            disabled
            required
            type="text"
            name="date"
            id="date"
            value={data.Date}
            style={{ height: 50, fontSize: '1.2em' }}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            disabled
            required
            type="text"
            name="description"
            id="description"
            value={data.Description}
            style={{ height: 50, fontSize: '1.2em' }}
          ></Input>
        </FormGroup>
        <div className="float-left">
          <Link href="/maintenances">
            <Button>Cancel</Button>
          </Link>
        </div>
      </Form>
    </>
  ) : null
}

export default Maintenances

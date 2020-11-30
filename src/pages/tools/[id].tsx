import { useRouter } from 'next/router'
import Link from 'next/link'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import useSWR from 'swr'
import { strapi } from 'utils/auth/auth'
import Button from '../../components/Button'
import Heading from '../../components/Heading'

const fetcher = (url: string) => strapi.request('get', url).then((res) => res)

const Tools = () => {
  const router = useRouter()
  const { id } = router.query
  const { data, error } = useSWR(`/tools/${id}`, fetcher)

  if (error) return 'An error has occurred.'
  if (!data) return 'Loading...'

  const goEdit = (id: number) => {
    router.push(`/tools/edit/${id}`)
  }

  const onDelete = () => {
    strapi.request('delete', `/tools/${id}`).then(() => {
      router.push('/tools')
    })
  }

  return (
    <>
      <div className="py-5 d-flex justify-content-between">
        <div className="m-1">
          <Heading color={'black'} lineLeft>
            Tool
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
          <Label for="name">Name</Label>
          <Input
            disabled
            value={data.Name}
            type="text"
            name="Name"
            id="name"
            placeholder="Chave de fenda"
            style={{ height: 50, fontSize: '1.2em' }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="name">Maintenance</Label>
          <Input
            disabled
            value={data.tool_maintenance ? data.tool_maintenance.Date : null}
            type="text"
            name="Maintenance"
            id="maintenance"
            style={{ height: 50, fontSize: '1.2em' }}
          />
        </FormGroup>
        <div className="float-left">
          <Link href="/tools">
            <Button>Back</Button>
          </Link>
        </div>
      </Form>
    </>
  )
}

export default Tools

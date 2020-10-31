import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import useSWR from 'swr'
import { strapi } from 'utils/auth/auth'
import Button from '../../../components/Button'

type ToolProps = {
  id: string
  Name: string
}

const fetcher = (url: string) => strapi.request('get', url).then((res) => res)

const Tools = () => {
  const [tool, setTool] = useState({} as ToolProps)
  const router = useRouter()
  const { id } = router.query

  const { data, error } = useSWR(`/tools/${id}`, fetcher)

  useEffect(() => {
    setTool({
      ...data
    })
  }, [data])

  if (error) return 'An error has occurred.'
  if (!data) return 'Loading...'

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTool({
      ...tool,
      [e.target.name]: e.target.value
    })
  }

  const onDelete = (id: number) => {
    console.log(id)
  }

  const onSubmit = () => {
    strapi
      .request('put', `/tools/${tool.id}`, {
        data: {
          Name: tool.Name
        }
      })
      .then((res) => {
        console.log(res)
      })
  }

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
        e.stopPropagation()
      }}
    >
      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          onChange={(e) => onChange(e)}
          value={tool.Name}
          type="text"
          name="Name"
          id="name"
          required
          placeholder="Chave de fenda"
          style={{ height: 50, fontSize: '1.2em' }}
        />
      </FormGroup>
      <Button type="submit">Save</Button>
    </Form>
  )
}

export default Tools

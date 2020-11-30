import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState } from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import { strapi } from 'utils/auth/auth'
import Button from '../../components/Button'
import Heading from '../../components/Heading'

type ToolProps = {
  Name: string
}

const Tools = () => {
  const [tool, setTool] = useState({} as ToolProps)
  const router = useRouter()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTool({
      ...tool,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = () => {
    strapi
      .request('post', `/tools`, {
        data: {
          Name: tool.Name
        }
      })
      .then(() => {
        router.push('/tools')
      })
  }

  return (
    <>
      <div className="py-5 mx-1">
        <Heading color={'black'} lineLeft={true}>
          Tool - create
        </Heading>
      </div>
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
        <div className="float-left">
          <Link href="/tools">
            <Button>Cancel</Button>
          </Link>
        </div>
        <Button type="submit" className="float-right">
          Save
        </Button>
      </Form>
    </>
  )
}

export default Tools

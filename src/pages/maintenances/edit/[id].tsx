import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import useSWR from 'swr'
import { strapi } from 'utils/auth/auth'
import Button from '../../../components/Button'
import Heading from '../../../components/Heading'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

type MaintenancesProps = {
  id: string
  Description: string
  Date: Date
  tool: ToolProps
}
type ToolProps = {
  id: string
  Name: string
  tool_maintenance: MaintenancesProps
}

const fetcher = (url: string) => strapi.request('get', url).then((res) => res)

const Maintenances = () => {
  const [maintenances, setMaintenances] = useState({} as MaintenancesProps)
  const [startDate, setStartDate] = useState(new Date())
  const [toolSelect, setToolSelect] = useState({} as ToolProps)
  const router = useRouter()
  const { id } = router.query

  const { data, error } = useSWR(`/tool-maintenances/${id}`, fetcher)
  const { data: tools } = useSWR(`/tools`, fetcher)

  useEffect(() => {
    if (data) {
      setMaintenances({
        ...data
      })
      let dateTemp = new Date(data.Date)
      dateTemp = new Date(dateTemp.setDate(dateTemp.getDate() + 1))
      setStartDate(dateTemp)
    }
  }, [data])

  if (error) return 'An error has occurred.'
  if (!data) return 'Loading...'

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaintenances({
      ...maintenances,
      [e.target.name]: e.target.value
    })
  }

  const onDelete = () => {
    strapi.request('delete', `/tool-maintenances/${id}`).then(() => {
      router.push('/tools')
    })
  }

  const onChangeTool = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToolSelect(
      e.target.value == 'Select'
        ? {}
        : tools.filter((tool: ToolProps) => {
            if (tool.id == e.target.value) {
              return tool
            }
          })[0]
    )
  }

  const onSubmit = () => {
    strapi
      .request('put', `/tool-maintenances/${maintenances.id}`, {
        data: {
          Description: maintenances.Description,
          Date: new Date(startDate.setDate(startDate.getDate() - 1)),
          tool: toolSelect.id
        }
      })
      .then(() => {
        router.push('/maintenances')
      })
  }

  return data && tools ? (
    <>
      <div className="py-5 d-flex justify-content-between">
        <div className="mx-1">
          <Heading color={'black'} lineLeft={true}>
            Maintenance - edit
          </Heading>
        </div>
        <Button onClick={() => onDelete()} className="mx-1" size="small">
          Delete
        </Button>
      </div>
      <Form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
          e.stopPropagation()
        }}
      >
        <FormGroup>
          <Label for="tools">Mine</Label>
          <Input
            onChange={(e) => onChangeTool(e)}
            required
            type="select"
            name="tools"
            id="tools"
            style={{ height: 50, fontSize: '1.2em' }}
          >
            <option>Select</option>
            {tools.map((tool: ToolProps) => {
              if (!tool.tool_maintenance) {
                return (
                  <option value={tool.id} key={tool.id}>
                    {tool.Name}
                  </option>
                )
              }
            })}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="date">Date</Label>
          <br></br>
          <DatePicker
            id="date"
            name="date"
            selected={startDate}
            required
            onChange={(date: Date) => setStartDate(date)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            onChange={(e) => onChange(e)}
            value={maintenances.Description}
            type="text"
            name="Description"
            id="description"
            required
            style={{ height: 50, fontSize: '1.2em' }}
          />
        </FormGroup>
        <div className="float-left">
          <Link href="/maintenances">
            <Button>Cancel</Button>
          </Link>
        </div>
        <Button className="float-right" type="submit">
          Save
        </Button>
      </Form>
    </>
  ) : null
}

export default Maintenances

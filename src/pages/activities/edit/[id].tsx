import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import useSWR from 'swr'
import { strapi } from 'utils/auth/auth'
import Button from '../../../components/Button'

import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

type ActivitiesProps = {
  id: string
  Description: string
  Date: Date
  mine: MineProps
  sector: SectorProps
  shift: ShiftProps
}
type MineProps = {
  id: string
  Name: string
  sectors: [SectorProps]
}
type SectorProps = {
  id: string
  Name: string
  shifts: [ShiftProps]
}
type ShiftProps = {
  id: string
  Name: string
}

const fetcher = (url: string) => strapi.request('get', url).then((res) => res)

const Activities = () => {
  const [activities, setActivities] = useState({
    Date: new Date()
  } as ActivitiesProps)
  const [startDate, setStartDate] = useState(new Date())
  const [mineSelect, setMineSelect] = useState({} as MineProps)
  const [sectorSelect, setSectorSelect] = useState({} as SectorProps)
  const [shiftSelect, setShiftSelect] = useState({} as ShiftProps)
  const router = useRouter()
  const { id } = router.query

  const { data } = useSWR(`/activities/${id}`, fetcher)
  const { data: mines } = useSWR(`/mines`, fetcher)
  const { data: sectors } = useSWR(`/sectors`, fetcher)
  const { data: shifts } = useSWR(`/shifts`, fetcher)

  useEffect(() => {
    if (data) {
      setActivities({
        ...data
      })
      setStartDate(new Date(data.Date))
    }
  }, [data])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActivities({
      ...activities,
      [e.target.name]: e.target.value
    })
  }

  const onDelete = (id: number) => {
    console.log(id)
  }

  const onChangeMine = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMineSelect(
      e.target.value == 'Select'
        ? {}
        : mines.filter((mine: MineProps) => {
            if (mine.id == e.target.value) {
              return mine
            }
          })[0]
    )
  }
  const onChangeSector = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSectorSelect(
      e.target.value == 'Select'
        ? {}
        : sectors.filter((sector: MineProps) => {
            if (sector.id == e.target.value) {
              return sector
            }
          })[0]
    )
  }
  const onChangeShift = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShiftSelect(
      e.target.value == 'Select'
        ? {}
        : shifts.filter((shift: MineProps) => {
            if (shift.id == e.target.value) {
              return shift
            }
          })[0]
    )
  }

  const onSubmit = () => {
    // startDate.setDate(startDate.getDate() - 1)
    strapi
      .request('put', `/activities/${activities.id}`, {
        data: {
          Description: activities.Description,
          Date: startDate,
          mine: {
            id: mineSelect.id || activities.mine.id
          },
          sector: {
            id: sectorSelect.id || activities.sector.id
          },
          shift: {
            id: shiftSelect.id || activities.shift.id
          }
        }
      })
      .then((res) => {
        console.log(res)
      })
  }

  console.log(mineSelect)

  return data && activities && mines && sectors && shifts ? (
    <Form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
        e.stopPropagation()
      }}
    >
      <FormGroup>
        <Label for="name">Description</Label>
        <Input
          onChange={(e) => onChange(e)}
          value={activities.Description}
          type="text"
          name="Description"
          id="name"
          required
          placeholder="Chave de fenda"
          style={{ height: 50, fontSize: '1.2em' }}
        />
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
        <Label for="mine">Mine</Label>
        <Input
          onChange={(e) => onChangeMine(e)}
          required
          type="select"
          name="mine"
          id="mine"
          style={{ height: 50, fontSize: '1.2em' }}
        >
          <option>Select</option>
          {mines.map((mine: MineProps) => (
            <option value={mine.id} key={mine.id}>
              {mine.Name}
            </option>
          ))}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="mine">Sector</Label>
        <Input
          onChange={(e) => onChangeSector(e)}
          disabled={mineSelect.sectors ? false : true}
          required
          type="select"
          name="mine"
          id="mine"
          style={{ height: 50, fontSize: '1.2em' }}
        >
          {mineSelect.sectors ? (
            <>
              <option>Select</option>
              {mineSelect.sectors.map((mine: SectorProps) => (
                <option value={mine.id} key={mine.id}>
                  {mine.Name}
                </option>
              ))}
            </>
          ) : null}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="mine">Shift</Label>
        <Input
          onChange={(e) => onChangeShift(e)}
          disabled={sectorSelect.shifts && mineSelect.sectors ? false : true}
          type="select"
          name="mine"
          required
          id="mine"
          style={{ height: 50, fontSize: '1.2em' }}
        >
          {sectorSelect.shifts ? (
            <>
              <option>Select</option>
              {sectorSelect.shifts.map((shift: ShiftProps) => (
                <option value={shift.id} key={shift.id}>
                  {shift.Name}
                </option>
              ))}
            </>
          ) : null}
        </Input>
      </FormGroup>
      <div className="float-left">
        <Link href="/activities">
          <Button>Cancel</Button>
        </Link>
      </div>
      <Button className="float-right" type="submit">
        Save
      </Button>
    </Form>
  ) : null
}

export default Activities

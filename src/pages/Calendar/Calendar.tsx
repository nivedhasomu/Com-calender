import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import styles from "./Calendar.module.scss"
import useCommunication from '../../api/useCommunication'
import { useEffect, useState } from 'react'
import { errorToast } from '../../lib/toast'
import "react-big-calendar/lib/css/react-big-calendar.css"
const localizer = momentLocalizer(moment)

const MyCalendar = (props) => {
  const [events, setEvents] = useState([]);
  const { communicationLoading, getCommunications } = useCommunication()

  useEffect(() => {
    getCommunications((res, err) => {
      if (err) {
        errorToast(err?.message)
        return
      }
      console.log(res.data)
      setEvents(res.data?.map(event => {
        return {
         ...event,
          title: event?.method?.name + " @ " + event?.company?.name,
          start: new Date(new Date(event.date).toLocaleDateString()),
          end: new Date(+new Date(new Date(event.date).toLocaleDateString()) + 24*60*60*1000 - 1),
        }
      }))
      console.log(events)
    })
  }, [])

  return (
    <div className={styles.main_container}>
      <div className={styles.header}>
        <div className={styles.text}>
          <h1>Calendar</h1>
        </div>
      </div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  )
}

export default MyCalendar
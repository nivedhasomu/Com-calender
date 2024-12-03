import { useSelector } from "react-redux"
import styles from "./Notification.module.scss"
import { SLICE_NAMES } from "../../../../constants/enums"
import { IoCloseOutline } from "react-icons/io5";

const Overdue = ({name}) => {
  return (
    <div className={styles.overdue}>
      <div>
        {name}
      </div>
      <span>Overdue</span>
    </div>
  )
}

const DueToday = ({name}) => {
  return (
    <div className={styles.dueToday}>
      <div>
        {name}
      </div>
      <span>Due Today</span>
    </div>
  )
}

const NotificationModal = ({
  notificationVisible,
  setNotificationVisible,
}) => {
  const notificationContent = useSelector(state => state[SLICE_NAMES.COMPANY].notifications)
  return (
    <div className={styles.notification}>
      <div className={styles.header}>
        <h2>All notifications</h2>
        <IoCloseOutline onClick={() => setNotificationVisible(false)} />
      </div>
      <div className={styles.scrollable}>
        {
          notificationContent?.today?.map((value, idx) => {
            return <DueToday key={idx} name={value?.name} />
          })
        }
        {
          notificationContent?.overdue?.map((value, idx) => {
            return <Overdue key={idx} name={value?.name} />
          })
        }
      </div>
    </div>
  )
}

export default NotificationModal
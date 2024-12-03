import { useEffect, useState } from "react";
import styles from "./CompanyRow.module.scss"
import { CiEdit } from "react-icons/ci";
import { PiTrashLight } from "react-icons/pi";
import useCommunication from "../../../../api/useCommunication";
import { errorToast } from "../../../../lib/toast";
import { formatDistanceToNow } from 'date-fns';
import { formatRelativeDate } from "../../../../utils/formatRelativeDate";

const CompanyRow = ({
  update,
  name,
  location,
  nextCommunication,
  lastFiveCommunication,
  handleDelete,
  onSelect,
  companyId
}: any) => {
  const { addCommunication, communicationLoading, getPastNScheduledCommunication } = useCommunication()

  const [conversationData, setConversationData] = useState({
    lastFive: [],
    nextScheduled: {}
  })
  const [nextDate, setNextDate] = useState("")

  const _getPastNScheduledCommunication = () => {
    getPastNScheduledCommunication(companyId, (res, error) => {
      if (error) {
        errorToast(error.message);
        return
      }
      setConversationData({
        lastFive: res?.lastFiveCommunication,
        nextScheduled: res?.nextCommunication
      })
      if (res?.nextCommunication?.date) {
        setNextDate(formatRelativeDate(res?.nextCommunication?.date))
      }
    })
  }


  useEffect(() => {
    _getPastNScheduledCommunication()
  }, [update])

  return (
    <div className={styles.company_row}>
      <div className={styles.top_row}>
        <div className={styles.company_info}>
          <input onClick={onSelect} type="checkbox" className={styles.checkbox} />
          <h1>{name}</h1>
          <h2>{location}</h2>
          <CiEdit className={styles.svg} />
          <PiTrashLight onClick={handleDelete} className={styles.svg} />
        </div>
        <div className={styles.next_comm}>
          <h2>{nextDate? `${conversationData.nextScheduled?.method?.name} ${nextDate}`:"No meet scheduled"}</h2>
        </div>
      </div>
      <div className={styles.last_five}>
        <span>Past Meetings: </span>
        {
          conversationData?.lastFive?.map((value, idx) => {
            return (
              <div key={idx} className={value?.status == "pending"?styles.last_five_pending:styles.last_five_item}>
                <p>{formatDistanceToNow(value.date)}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default CompanyRow
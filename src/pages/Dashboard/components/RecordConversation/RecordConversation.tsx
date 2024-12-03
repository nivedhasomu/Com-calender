import { useSelector } from "react-redux"
import styles from "./RecordConversation.module.scss"
import { SLICE_NAMES } from "../../../../constants/enums";
import { useState } from "react";
import useCommunication from "../../../../api/useCommunication";
import { errorToast, successToast } from "../../../../lib/toast";


const RecordConversation = ({
  companyIds,
  setRecordConversationVisible,
  setUpdate
}) => {
  const { addCommunication, communicationLoading } = useCommunication();

  const modes = useSelector((state) => state[SLICE_NAMES.COMMUNICATION]?.communicationMethods);
  
  const [data, setData] = useState({
    date: "",
    note: ""
  })
  const [selectedOption, setSelectedOption] = useState(modes[0]?.id);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    if (communicationLoading) return;
    console.log({
      companyIds: companyIds,
      methodId: selectedOption,
      date: data.date,
      note: data.note,
    })
    addCommunication({
      companyIds: companyIds,
      methodId: selectedOption,
      date: data.date,
      note: data.note,
    },(res, err) => {
      if (err) {
        errorToast(err)
        return
      }
      successToast(res + " communication recorded")
      setUpdate(prev => prev ^ 1)
      setRecordConversationVisible(false)
    });
  }
  return (
    <div className={styles.main_container}>
      <div className={styles.two_col}>
        <div>
          <label>Select communication method</label>
          <select value={selectedOption} onChange={handleChange}>
            {
              modes?.map((mode) => (
                <option key={mode?.id} value={mode?.id}>
                  {mode?.name}
                </option>
              ))
            }
          </select>
        </div>
        <div>
          <label>Select date</label>
          <input aria-label="Date" type="date" value={data.date} onChange={(e) => setData({
            ...data,
            date: e.target.value,
          })} />
        </div>
      </div>
      <div className={styles.notes}>
        <label>Add Note?</label>
        <textarea rows={10} value={data.note} onChange={(e) => setData({...data, note: e.target.value})} />
      </div>
      <div className={styles.action_container}>
        <div onClick={() => setRecordConversationVisible(false)} className={styles.cancel}>Cancel</div>
        <div onClick={handleSubmit} className={styles.sub}>Save</div>
      </div>
    </div>
  )
}

export default RecordConversation
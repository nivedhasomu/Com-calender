import { useDispatch, useSelector } from "react-redux"
import styles from "./Dashboard.module.scss"
import { SLICE_NAMES } from "../../constants/enums";
import { useEffect, useState } from "react";
import useCompany from "../../api/useCompany";
import { errorToast, successToast } from "../../lib/toast";
import { setCompany, setNotification } from "../../store/reducers/companySlice";
import { CiSearch } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import CompanyRow from "./components/CompanyRow/CompanyRow";
import NewCompany from "./components/NewCompany/NewCompany";
import { toast } from "react-toastify";
import useCommunicationMethod from "../../api/useCommunicationMethod";
import { setCommunicationMethods } from "../../store/reducers/communicationSlice";
import { IoIosNotificationsOutline } from "react-icons/io";
import RecordConversation from "./components/RecordConversation/RecordConversation";
import NotificationModal from "./components/Notification/Notification";
import { Link } from "react-router-dom";
import { IoCalendarOutline } from "react-icons/io5";

const Dashboard = () => {
  const { getCommunicationMethods } = useCommunicationMethod()
  const { companyLoading, getCompanies, addCompany, getNotifications, deleteCompany } = useCompany()
  const dispatch = useDispatch()

  const _company = useSelector((state) => state[SLICE_NAMES.COMPANY].companies);
  const [companies, setCompanies] = useState<any>()
  const [newCompanyData, setNewCompanyData] = useState({
    name: "",
    location: "",
    linkedinProfile: ""
  })
  const [newCompanyVisible, setNewCompanyVisible] = useState(false)
  const [selectedCompany, setSelectedCompay] = useState<string[]>([])
  const [recordConversationVisible, setRecordConversationVisible] = useState(false)
  const [update, setUpdate] = useState(1);
  const [notifications, setNotifications] = useState<any>({
    overdue: [],
    today: []
  })
  const [notificationsVisible, setNotificationsVisible] = useState(false)

  const getAllNotifications = () => {
    getNotifications((res, err) => {
      if (err) {
        errorToast(err.message);
        return
      }
      // toast.info("You have new notifications")
      dispatch(setNotification(res.data))
      setNotifications(res.data)
      // console.log(res.data)
    })
  }

  const handleCompanyAdd = () => {
    if (companyLoading || newCompanyData.name == "" || newCompanyData.linkedinProfile == "" || newCompanyData.location == "") return
    toast("adding company")
    addCompany(newCompanyData, (res, err) => {
      if (err) {
        errorToast(err.message);
        return
      }
      setNewCompanyVisible(false);
      successToast("company added")
      setNewCompanyData({
        name: "",
        location: "",
        linkedinProfile: ""
      })
      getAllCompanies();
    })
  }

  const getAllCompanies = () => {
    getCompanies((res, error) => {
      if (error) {
        errorToast(error.message);
        return
      }
      setCompanies(res?.data)
      dispatch(setCompany({ companies: res?.data }))
    })
  }

  const getAllCommunicationMethods = () => {
    getCommunicationMethods((res, err) => {
      if (err) {
        errorToast(err.message);
        return
      }
      dispatch(setCommunicationMethods({ communicationMethods: res?.data }))
    })
  }

  const onCheck = (id: string) => {
    if (!selectedCompany.includes(id)) {
      setSelectedCompay([...selectedCompany, id])
    } else {
      setSelectedCompay(selectedCompany.filter((item) => item !== id))
    }
  }

  const handleCompanyDelete = (companyId) => {
    deleteCompany(companyId, (res, err) => {
      if (err) {
        errorToast(err.message);
        return
      }
      successToast("company deleted")
      getAllCompanies();
    })
  }

  useEffect(() => {
    getAllCompanies()
    getAllCommunicationMethods()
    getAllNotifications()
  }, [update])
  return (
    <div className={styles.main_container}>
      {newCompanyVisible && <NewCompany
        companyData={newCompanyData}
        companyVisible={newCompanyVisible}
        handleSubmit={handleCompanyAdd}
        setCompanyData={setNewCompanyData}
        setCompanyVisible={setNewCompanyVisible}
      />}
      {recordConversationVisible && <RecordConversation setUpdate={setUpdate} companyIds={selectedCompany} setRecordConversationVisible={setRecordConversationVisible} />}
      {notificationsVisible && <NotificationModal notificationVisible={notificationsVisible} setNotificationVisible={setNotificationsVisible} />}
      <div className={styles.header}>
        <div className={styles.text}>
          <h1>Dashboard</h1>
        </div>
        <div className={styles.notification} onClick={() => setNotificationsVisible(true)}>
          <div className={styles.num}>{notifications.overdue.length + notifications.today.length}</div>
          <IoIosNotificationsOutline />
        </div>
        <div>
          <Link to="/user/calendar">
            <IoCalendarOutline />
          </Link>
        </div>
      </div>
      <div className={styles.main_content}>
        <div className={styles.company_container}>
          <div className={styles.company_header}>
            <h1>All companies</h1>
            <div className={styles.company_actions}>
              <span className={styles.search}>
                <CiSearch />
                <input type="text" placeholder="Search" />
              </span>
              {selectedCompany.length > 0 && <div onClick={() => setRecordConversationVisible(true)} className={styles.add_company}>
                <p>
                  Communication Performed
                </p>
              </div>}
              <div onClick={() => setNewCompanyVisible(true)} className={styles.add_company}><IoIosAdd /><p>Add new</p></div>
            </div>
          </div>
          <div className={styles.company_content}>
            {
              companyLoading && _company?.length == 0 && <p>Loading companies...</p>
            }
            {
              companies?.map((value: any, index: number) => {
                return (
                  <CompanyRow
                    update={update}
                    handleDelete={() => handleCompanyDelete(value.id)}
                    key={index}
                    name={value.name}
                    location={value.location}
                    lastFiveCommunication=""
                    nextCommunication=""
                    companyId={value.id}
                    onSelect={() => onCheck(value.id)}
                  />
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
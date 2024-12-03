import FormField from "../../../../components/Input/FormField/FormField"
import styles from "./NewCompany.module.scss"

type Props = {
  companyVisible: boolean,
  setCompanyVisible: React.Dispatch<React.SetStateAction<boolean>>,
  companyData: { name: string, location: string, linkedinProfile: string },
  setCompanyData: React.Dispatch<React.SetStateAction<{
    name: string;
    location: string;
    linkedinProfile: string;
  }>>
  handleSubmit: () => void
}

const NewCompany = ({
  companyVisible,
  setCompanyVisible,
  companyData,
  handleSubmit,
  setCompanyData
}: Props) => {
  return (
    <div className={styles.new_company}>
      <div className={styles.two_col}>
        <FormField type="text" label={"Company Name..."} placeholder={"Enter company name"} value={companyData.name} onChange={(e) => setCompanyData({
          ...companyData,
          name: e.target.value
        })} />
        <FormField type="text" label={"Company Location..."} placeholder={"Enter company location"} value={companyData.location} onChange={(e) => setCompanyData({
          ...companyData,
          location: e.target.value
        })} />
      </div>
      <FormField type="text" label={"Company Linkedin Profile..."} placeholder={"Enter company linkedin profile"} value={companyData.linkedinProfile} onChange={(e) => setCompanyData({
        ...companyData,
        linkedinProfile: e.target.value
      })} />
      <div className={styles.action_container}>
        <div className={styles.cancel} onClick={()=>setCompanyVisible(false)}>Cancel</div>
        <div className={styles.sub} onClick={handleSubmit}>
          Save
        </div>
      </div>
    </div>
  )
}

export default NewCompany
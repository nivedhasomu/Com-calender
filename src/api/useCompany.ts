import { useState } from "react"
import { axios_instance } from "../lib/axios"
import { errorToast } from "../lib/toast"

const useCompany = () => {
  const [companyLoading, setCompanyLoading] = useState(false)

  const addCompany = async (payload: {name: string, location: string, linkedinProfile: string}, callback: any) => {
    setCompanyLoading(true)
    try {
      const response = await axios_instance.post("/company", payload);
      
      if (response?.status == 401 || response?.data?.status == 401) {
        callback(null, new Error("Unauthorized"));
        return
      }
      if (![200,201].includes(response?.status || response?.data?.status)) {
        errorToast(
          response?.data?.messages || "Failed to login. Please try again"
        )
        setCompanyLoading(false)
        return;
      }

      callback(response?.data, null)
    } catch (error) {
      callback(null, error)
    } finally {
      setCompanyLoading(false)
    }
  }

  const getCompanies = async (callback: any) => {
    setCompanyLoading(true)
    try {
      const response = await axios_instance.get("/company")

      if (![200, 201].includes(response?.status || response?.data?.status)) {
        errorToast(
          response?.data?.messages || "Failed to get companies. Please try again"
        )
        setCompanyLoading(false)
        return;
      }

      callback(response?.data, null)
    } catch (error) {
      callback(null, error)
    } finally {
      setCompanyLoading(false)
    }
  }

  const getNotifications = async (callback: any) => {
    setCompanyLoading(true)
    try {
      const response = await axios_instance.get("/company/notifications");
      
      if (![200, 201].includes(response?.status || response?.data?.status)) {
        errorToast(
          response?.data?.messages || "Failed to get notifications. Please try again"
        )
        return;
      }
      callback(response?.data, null)
    } catch (error) {
      callback(null, error)
    } finally {
      setCompanyLoading(false)
    }
  }

  const deleteCompany = async (companyId: string, callback: any) => {
    setCompanyLoading(true)
    try {
      const response = await axios_instance.delete(`/company/${companyId}`);
      
      if (![200, 201].includes(response?.status || response?.data?.status)) {
        errorToast(
          response?.data?.messages || "Failed to delete company. Please try again"
        )
        setCompanyLoading(false)
        return;
      }
      callback(response?.data, null)
    } catch (error) {
      callback(null, error)
    } finally {
      setCompanyLoading(false)
    }
  }

  return {
    companyLoading,
    addCompany,
    getCompanies,
    getNotifications,
    deleteCompany
  }
}

export default useCompany
import { useState } from "react"
import { axios_instance } from "../lib/axios"
import { errorToast } from "../lib/toast"

const useCommunication = () => {
  const [communicationLoading, setCommunicationLoading] = useState(false)

  const addCommunication = async (payload: {
    companyIds: string[],
    methodId: string,
    date: string,
    note: string
  }, callback: any) => {
    setCommunicationLoading(true)
    try {
      const response = await axios_instance.post("/communication", payload)

      if (![200, 201].includes(response?.status || response?.data?.status)) {
        errorToast(
          response?.data?.message || "Failed to save communications"
        )
        setCommunicationLoading(false)
        return
      }

      callback(response?.data?.data)
    } catch (error) {
      callback(null, error)
    } finally {
      setCommunicationLoading(false)
    }
  }

  const getPastNScheduledCommunication = async (companyId: string, callback: any) => {
    setCommunicationLoading(true)
    try {
      const response = await axios_instance.post(`/communication/next-n-past`, {
        companyId: companyId,
      })
      if (![200, 201].includes(response?.status || response?.data?.status)) {
        errorToast(
          response?.data?.message || "Failed to get communications"
        )
        setCommunicationLoading(false)
        return
      }

      callback(response?.data?.data)
    } catch (error) {
      callback(null, error)
    } finally {
      setCommunicationLoading(false)
    }
  }

  const getCommunications = async (callback: any) => {
    setCommunicationLoading(true)
    try {
      const response = await axios_instance.get("/communication/all")
      if (![200, 201].includes(response?.status || response?.data?.status)) {
        errorToast(
          response?.data?.message || "Failed to get communications"
        )
        setCommunicationLoading(false)
        return
      }

      callback(response?.data, null)
    }catch(error) {
      callback(null, error)
    } finally {
      setCommunicationLoading(false)
    }
  }

  return {
    addCommunication,
    getPastNScheduledCommunication,
    communicationLoading,
    getCommunications
  }
}

export default useCommunication
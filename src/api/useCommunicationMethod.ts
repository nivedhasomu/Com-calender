import { useState } from "react"
import { axios_instance } from "../lib/axios"
import { errorToast } from "../lib/toast"

const useCommunicationMethod = () => {
  const [communicationMethodLoading, setCommunicationMethodLoading] = useState(false)

  const getCommunicationMethods = async (callback: any) => {
    setCommunicationMethodLoading(true)
    try {
      const response = await axios_instance.get("/communication-method")
      
      if (![200,201].includes(response?.status || response?.data?.status)) {
        errorToast(
          response?.data?.message || "Failed to get communication methods"
        )
        setCommunicationMethodLoading(false)
        return
      }
      
      callback(response?.data, null)
    } catch (error) {
      callback(null, error)
    } finally {
      setCommunicationMethodLoading(false)
    }
  }

  const addCommunicationMethod = async (paylaod, callback: any) => {
    setCommunicationMethodLoading(true)
    try {
      const response = await axios_instance.post("/communication-method", paylaod)
      
      if ([401].includes(response?.status || response?.data?.status)) {
        errorToast("Unauthorized")
        return
      }

      if (![200,201].includes(response?.status || response?.data?.status)) {
        errorToast(
          response?.data?.message || "Failed to add communication method"
        )
        setCommunicationMethodLoading(false)
        return
      }
      
      callback(response?.data, null)
    } catch (error) {
      callback(null, error)
    } finally {
      setCommunicationMethodLoading(false)
    }
  }

  return {
    communicationMethodLoading,
    getCommunicationMethods,
    addCommunicationMethod,
  }
}

export default useCommunicationMethod
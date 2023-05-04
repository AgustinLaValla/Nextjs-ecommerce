import axios, { AxiosInstance } from "axios"

const post = async <T>(api: AxiosInstance, url: string, body: any) => {
  try {
    const { data } = await api.post<T>(url, body);
    return data;
  } catch (error) {
    throw error;
  }
}

export const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return {
      hasError: true,
      message: error.response?.data.message
    }
  }

  return null
}

export const http = {
  post,
  handleError
}


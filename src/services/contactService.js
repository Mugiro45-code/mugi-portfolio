import axios from 'axios'

export const sendContactMessage = async (payload) => {
  const endpoint = import.meta.env.VITE_CONTACT_API_URL

  if (!endpoint) {
    return {
      status: 'skipped',
      payload,
    }
  }

  const { data } = await axios.post(endpoint, payload)
  return data
}
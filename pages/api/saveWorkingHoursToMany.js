import { fetchJson } from '../../api/fetchJson'

export default async (req, res) => {
  const obj = req.body.workingHoursData
  const cookie = req.headers.cookie
  const token = cookie.substring(cookie.indexOf('=') + 1)
  const url = `settings/saveWorkingHoursToMany`

  async function saveWorkingHoursToMany() {
    const api = await fetchJson(url, 'post', token, obj)
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        return err.response
      })

    return api
  }

  const reponse = await saveWorkingHoursToMany()

  /* res.statusCode = reponse.status; */
  res.json(reponse.data)
}

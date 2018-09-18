import api from 'api'

export default class Model {
  constructor(modelName) {
    this.modelName = modelName
    this.selection = null
  }
  setSelection(selection) {
    return (this.selection = selection)
  }
  get(id) {
    return api
      .get(`v1/${this.modelName}/${id}`)
      .then(res => this.setSelection(res))
  }
  get_by(obj) {
    const params = Object.keys(obj)
      .map(key => `${key}=${obj[key]}`)
      .join('&')
    return api
      .get(`v1/${this.modelName}/?${params}`)
      .then(res => this.setSelection(res))
  }
  all() {
    return api.get(`v1/${this.modelName}`).then(res => this.setSelection(res))
  }
  update(data = null) {
    if (this.selection === null) {
      return Promise.reject(
        new Error(
          `Selection for ${
            this.modelName
          } model instance was null when 'update' function was run`
        )
      )
    }
    return api
      .patch(`v1/${this.modelName}/${this.selection.id}`, { data })
      .then(res => this.setSelection(res))
  }
}

export const NewClubApplication = new Model('new_club_applications')
export const NewClub = new Model('new_clubs')
export const User = new Model('users')
export const LeaderProfile = new Model('leader_profiles')

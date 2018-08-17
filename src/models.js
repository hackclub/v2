import api from 'api'

export default class Model {
  constructor(modelName) {
    this.modelName = modelName
  }
  get(id) {
    return api.get(`v1/${this.modelName}/${id}`)
  }
  all() {
    return api.get(`v1/${this.modelName}`)
  }
}

export const NewClubApplication = new Model('new_club_applications')

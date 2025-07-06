import api from './api'

export const resumeService = {
  async getAllResumes(searchTerm = '') {
    const params = searchTerm ? { search: searchTerm } : {}
    const response = await api.get('/resumes', { params })
    return response.data
  },

  async getResumeById(id) {
    const response = await api.get(`/resumes/${id}`)
    return response.data
  },

  async createResume(resumeData) {
    const response = await api.post('/resumes', resumeData)
    return response.data
  },

  async updateResume(id, resumeData) {
    const response = await api.put(`/resumes/${id}`, resumeData)
    return response.data
  },

  async deleteResume(id) {
    const response = await api.delete(`/resumes/${id}`)
    return response.data
  },

  async downloadResumePdf(id) {
    const response = await api.get(`/resumes/${id}/pdf`, {
      responseType: 'blob'
    })
    return response.data
  },

  async getResumeStats() {
    const response = await api.get('/resumes/stats')
    return response.data
  }
}

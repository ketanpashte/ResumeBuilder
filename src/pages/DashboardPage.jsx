import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { resumeService } from '../services/resumeService'
import { Plus, FileText, Edit, Trash2, Download, Search } from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'
import toast from 'react-hot-toast'

const DashboardPage = () => {
  const { user } = useAuth()
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [stats, setStats] = useState(null)

  useEffect(() => {
    loadResumes()
    loadStats()
  }, [])

  const loadResumes = async (search = '') => {
    try {
      setLoading(true)
      const data = await resumeService.getAllResumes(search)
      setResumes(data)
    } catch (error) {
      toast.error('Failed to load resumes')
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const data = await resumeService.getResumeStats()
      setStats(data)
    } catch (error) {
      console.error('Failed to load stats:', error)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    loadResumes(searchTerm)
  }

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await resumeService.deleteResume(id)
        toast.success('Resume deleted successfully')
        loadResumes(searchTerm)
        loadStats()
      } catch (error) {
        toast.error('Failed to delete resume')
      }
    }
  }

  const handleDownload = async (id, title) => {
    try {
      const pdfBlob = await resumeService.downloadResumePdf(id)
      const url = window.URL.createObjectURL(pdfBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${title.replace(/[^a-zA-Z0-9]/g, '_')}_Resume.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      toast.success('Resume downloaded successfully')
    } catch (error) {
      toast.error('Failed to download resume')
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-gray-600">
          Manage your resumes and create new ones to land your dream job.
        </p>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-primary-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Resumes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalResumes}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <Link
          to="/resume/new"
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Create New Resume</span>
        </Link>

        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search resumes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10 w-64"
            />
          </div>
          <button type="submit" className="btn-secondary">
            Search
          </button>
        </form>
      </div>

      {/* Resumes Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : resumes.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? 'No resumes found' : 'No resumes yet'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm 
              ? 'Try adjusting your search terms'
              : 'Create your first resume to get started'
            }
          </p>
          {!searchTerm && (
            <Link to="/resume/new" className="btn-primary">
              Create Your First Resume
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <div key={resume.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {resume.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {resume.fullName}
                    </p>
                    <p className="text-xs text-gray-500">
                      Updated {formatDate(resume.updatedAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Link
                      to={`/resume/edit/${resume.id}`}
                      className="btn-ghost btn-sm flex items-center space-x-1"
                    >
                      <Edit className="h-3 w-3" />
                      <span>Edit</span>
                    </Link>
                    <button
                      onClick={() => handleDownload(resume.id, resume.title)}
                      className="btn-ghost btn-sm flex items-center space-x-1"
                    >
                      <Download className="h-3 w-3" />
                      <span>PDF</span>
                    </button>
                  </div>
                  <button
                    onClick={() => handleDelete(resume.id, resume.title)}
                    className="btn-ghost btn-sm text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DashboardPage

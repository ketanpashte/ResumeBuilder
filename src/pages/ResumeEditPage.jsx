import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm, FormProvider } from 'react-hook-form'
import { resumeService } from '../services/resumeService'
import PersonalInfoForm from '../components/resume/PersonalInfoForm'
import EducationForm from '../components/resume/EducationForm'
import WorkExperienceForm from '../components/resume/WorkExperienceForm'
import SkillsForm from '../components/resume/SkillsForm'
import ProjectsForm from '../components/resume/ProjectsForm'
import LoadingSpinner from '../components/LoadingSpinner'
import { ChevronLeft, ChevronRight, Save, FileText, Download } from 'lucide-react'
import toast from 'react-hot-toast'

const STEPS = [
  { id: 'personal', title: 'Personal Info', component: PersonalInfoForm },
  { id: 'education', title: 'Education', component: EducationForm },
  { id: 'experience', title: 'Experience', component: WorkExperienceForm },
  { id: 'skills', title: 'Skills', component: SkillsForm },
  { id: 'projects', title: 'Projects', component: ProjectsForm }
]

const ResumeEditPage = () => {
  const { id } = useParams()
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [resume, setResume] = useState(null)
  const navigate = useNavigate()

  const methods = useForm()
  const { handleSubmit, trigger, reset } = methods

  useEffect(() => {
    loadResume()
  }, [id])

  const loadResume = async () => {
    try {
      setLoading(true)
      const data = await resumeService.getResumeById(id)
      setResume(data)
      
      // Reset form with loaded data
      reset({
        title: data.title || '',
        fullName: data.fullName || '',
        email: data.email || '',
        phone: data.phone || '',
        address: data.address || '',
        profileSummary: data.profileSummary || '',
        educations: data.educations || [],
        workExperiences: data.workExperiences || [],
        skills: data.skills || [],
        projects: data.projects || []
      })
    } catch (error) {
      toast.error('Failed to load resume')
      navigate('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const nextStep = async () => {
    const currentStepId = STEPS[currentStep].id
    let fieldsToValidate = []

    switch (currentStepId) {
      case 'personal':
        fieldsToValidate = ['title', 'fullName', 'email']
        break
      case 'education':
        fieldsToValidate = ['educations']
        break
      case 'experience':
        fieldsToValidate = ['workExperiences']
        break
      case 'skills':
        fieldsToValidate = ['skills']
        break
      case 'projects':
        fieldsToValidate = ['projects']
        break
    }

    const isValid = await trigger(fieldsToValidate)
    if (isValid && currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true)
      await resumeService.updateResume(id, data)
      toast.success('Resume updated successfully!')
      navigate('/dashboard')
    } catch (error) {
      toast.error('Failed to update resume')
      console.error('Error updating resume:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDownload = async () => {
    try {
      const pdfBlob = await resumeService.downloadResumePdf(id)
      const url = window.URL.createObjectURL(pdfBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${resume.title.replace(/[^a-zA-Z0-9]/g, '_')}_Resume.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      toast.success('Resume downloaded successfully')
    } catch (error) {
      toast.error('Failed to download resume')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  const CurrentStepComponent = STEPS[currentStep].component

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-900">Edit Resume</h1>
          </div>
          <button
            onClick={handleDownload}
            className="btn-secondary flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Download PDF</span>
          </button>
        </div>
        
        {resume && (
          <p className="text-gray-600 mb-6">
            Editing: <span className="font-medium">{resume.title}</span>
          </p>
        )}
        
        {/* Progress Bar */}
        <div className="flex items-center space-x-4 mb-6">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`
                flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium
                ${index <= currentStep 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
                }
              `}>
                {index + 1}
              </div>
              <span className={`ml-2 text-sm font-medium ${
                index <= currentStep ? 'text-primary-600' : 'text-gray-500'
              }`}>
                {step.title}
              </span>
              {index < STEPS.length - 1 && (
                <div className={`w-12 h-0.5 mx-4 ${
                  index < currentStep ? 'bg-primary-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {STEPS[currentStep].title}
            </h2>
            
            <CurrentStepComponent />
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="btn-secondary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            <div className="flex space-x-4">
              {currentStep === STEPS.length - 1 ? (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  <span>{isSubmitting ? 'Updating...' : 'Update Resume'}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn-primary flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default ResumeEditPage

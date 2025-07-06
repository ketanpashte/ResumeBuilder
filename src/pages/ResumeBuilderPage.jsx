import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, FormProvider } from 'react-hook-form'
import { resumeService } from '../services/resumeService'
import { useAuth } from '../context/AuthContext'
import PersonalInfoForm from '../components/resume/PersonalInfoForm'
import EducationForm from '../components/resume/EducationForm'
import WorkExperienceForm from '../components/resume/WorkExperienceForm'
import SkillsForm from '../components/resume/SkillsForm'
import ProjectsForm from '../components/resume/ProjectsForm'
import LoadingSpinner from '../components/LoadingSpinner'
import { ChevronLeft, ChevronRight, Save, FileText } from 'lucide-react'
import toast from 'react-hot-toast'

const STEPS = [
  { id: 'personal', title: 'Personal Info', component: PersonalInfoForm },
  { id: 'education', title: 'Education', component: EducationForm },
  { id: 'experience', title: 'Experience', component: WorkExperienceForm },
  { id: 'skills', title: 'Skills', component: SkillsForm },
  { id: 'projects', title: 'Projects', component: ProjectsForm }
]

const ResumeBuilderPage = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const { user } = useAuth()

  const methods = useForm({
    defaultValues: {
      title: '',
      fullName: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : '',
      email: user?.email || '',
      phone: '',
      address: '',
      profileSummary: '',
      educations: [],
      workExperiences: [],
      skills: [],
      projects: []
    }
  })

  const { handleSubmit, trigger, formState: { errors } } = methods

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
      const resume = await resumeService.createResume(data)
      toast.success('Resume created successfully!')
      navigate('/dashboard')
    } catch (error) {
      toast.error('Failed to create resume')
      console.error('Error creating resume:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const CurrentStepComponent = STEPS[currentStep].component

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <FileText className="h-8 w-8 text-primary-600" />
          <h1 className="text-3xl font-bold text-gray-900">Create New Resume</h1>
        </div>
        
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
                  <span>{isSubmitting ? 'Creating...' : 'Create Resume'}</span>
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

export default ResumeBuilderPage

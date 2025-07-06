import { useFormContext, useFieldArray } from 'react-hook-form'
import { Plus, Trash2 } from 'lucide-react'

const WorkExperienceForm = () => {
  const { register, control, watch, formState: { errors } } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'workExperiences'
  })

  const addWorkExperience = () => {
    append({
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: '',
      displayOrder: fields.length
    })
  }

  const removeWorkExperience = (index) => {
    remove(index)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Add your work experience. List your most recent position first.
        </p>
        <button
          type="button"
          onClick={addWorkExperience}
          className="btn-secondary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 mb-4">No work experience entries yet</p>
          <button
            type="button"
            onClick={addWorkExperience}
            className="btn-primary"
          >
            Add Your First Experience
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {fields.map((field, index) => {
            const isCurrent = watch(`workExperiences.${index}.isCurrent`)
            
            return (
              <div key={field.id} className="border border-gray-200 rounded-lg p-6 relative">
                <button
                  type="button"
                  onClick={() => removeWorkExperience(index)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Title *
                    </label>
                    <input
                      {...register(`workExperiences.${index}.jobTitle`, {
                        required: 'Job title is required'
                      })}
                      type="text"
                      className={`input ${errors.workExperiences?.[index]?.jobTitle ? 'field-error' : ''}`}
                      placeholder="Software Developer"
                    />
                    {errors.workExperiences?.[index]?.jobTitle && (
                      <p className="error-message">{errors.workExperiences[index].jobTitle.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company *
                    </label>
                    <input
                      {...register(`workExperiences.${index}.company`, {
                        required: 'Company is required'
                      })}
                      type="text"
                      className={`input ${errors.workExperiences?.[index]?.company ? 'field-error' : ''}`}
                      placeholder="Tech Corp"
                    />
                    {errors.workExperiences?.[index]?.company && (
                      <p className="error-message">{errors.workExperiences[index].company.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date *
                    </label>
                    <input
                      {...register(`workExperiences.${index}.startDate`, {
                        required: 'Start date is required'
                      })}
                      type="date"
                      className={`input ${errors.workExperiences?.[index]?.startDate ? 'field-error' : ''}`}
                    />
                    {errors.workExperiences?.[index]?.startDate && (
                      <p className="error-message">{errors.workExperiences[index].startDate.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      {...register(`workExperiences.${index}.endDate`)}
                      type="date"
                      className="input"
                      disabled={isCurrent}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="flex items-center space-x-2">
                    <input
                      {...register(`workExperiences.${index}.isCurrent`)}
                      type="checkbox"
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">I currently work here</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Description
                  </label>
                  <textarea
                    {...register(`workExperiences.${index}.description`)}
                    rows={4}
                    className="textarea"
                    placeholder="Describe your responsibilities, achievements, and key contributions..."
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Use bullet points and action verbs. Focus on achievements and quantifiable results.
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default WorkExperienceForm

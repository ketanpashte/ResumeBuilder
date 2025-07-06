import { useFormContext, useFieldArray } from 'react-hook-form'
import { Plus, Trash2 } from 'lucide-react'

const EducationForm = () => {
  const { register, control, formState: { errors } } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'educations'
  })

  const addEducation = () => {
    append({
      degree: '',
      institution: '',
      startYear: '',
      endYear: '',
      grade: '',
      description: '',
      displayOrder: fields.length
    })
  }

  const removeEducation = (index) => {
    remove(index)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Add your educational background. You can add multiple entries.
        </p>
        <button
          type="button"
          onClick={addEducation}
          className="btn-secondary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Education</span>
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 mb-4">No education entries yet</p>
          <button
            type="button"
            onClick={addEducation}
            className="btn-primary"
          >
            Add Your First Education
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="border border-gray-200 rounded-lg p-6 relative">
              <button
                type="button"
                onClick={() => removeEducation(index)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Degree *
                  </label>
                  <input
                    {...register(`educations.${index}.degree`, {
                      required: 'Degree is required'
                    })}
                    type="text"
                    className={`input ${errors.educations?.[index]?.degree ? 'field-error' : ''}`}
                    placeholder="Bachelor of Computer Science"
                  />
                  {errors.educations?.[index]?.degree && (
                    <p className="error-message">{errors.educations[index].degree.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Institution *
                  </label>
                  <input
                    {...register(`educations.${index}.institution`, {
                      required: 'Institution is required'
                    })}
                    type="text"
                    className={`input ${errors.educations?.[index]?.institution ? 'field-error' : ''}`}
                    placeholder="University of Technology"
                  />
                  {errors.educations?.[index]?.institution && (
                    <p className="error-message">{errors.educations[index].institution.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Year *
                  </label>
                  <input
                    {...register(`educations.${index}.startYear`, {
                      required: 'Start year is required',
                      min: {
                        value: 1950,
                        message: 'Please enter a valid year'
                      },
                      max: {
                        value: new Date().getFullYear() + 10,
                        message: 'Please enter a valid year'
                      }
                    })}
                    type="number"
                    className={`input ${errors.educations?.[index]?.startYear ? 'field-error' : ''}`}
                    placeholder="2018"
                  />
                  {errors.educations?.[index]?.startYear && (
                    <p className="error-message">{errors.educations[index].startYear.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Year
                  </label>
                  <input
                    {...register(`educations.${index}.endYear`, {
                      min: {
                        value: 1950,
                        message: 'Please enter a valid year'
                      },
                      max: {
                        value: new Date().getFullYear() + 10,
                        message: 'Please enter a valid year'
                      }
                    })}
                    type="number"
                    className={`input ${errors.educations?.[index]?.endYear ? 'field-error' : ''}`}
                    placeholder="2022"
                  />
                  {errors.educations?.[index]?.endYear && (
                    <p className="error-message">{errors.educations[index].endYear.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grade/GPA
                  </label>
                  <input
                    {...register(`educations.${index}.grade`)}
                    type="text"
                    className="input"
                    placeholder="3.8 GPA"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  {...register(`educations.${index}.description`)}
                  rows={3}
                  className="textarea"
                  placeholder="Relevant coursework, achievements, honors, etc."
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default EducationForm

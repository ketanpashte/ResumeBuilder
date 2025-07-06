import { useFormContext, useFieldArray } from 'react-hook-form'
import { Plus, Trash2 } from 'lucide-react'

const ProjectsForm = () => {
  const { register, control, formState: { errors } } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'projects'
  })

  const addProject = () => {
    append({
      projectTitle: '',
      description: '',
      technologiesUsed: '',
      startDate: '',
      endDate: '',
      projectUrl: '',
      githubUrl: '',
      displayOrder: fields.length
    })
  }

  const removeProject = (index) => {
    remove(index)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-600">
            Add your projects to showcase your practical experience and skills.
          </p>
          <p className="text-sm text-gray-500 mt-1">
            This section is optional but highly recommended for developers and technical roles.
          </p>
        </div>
        <button
          type="button"
          onClick={addProject}
          className="btn-secondary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Project</span>
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 mb-4">No projects added yet</p>
          <button
            type="button"
            onClick={addProject}
            className="btn-primary"
          >
            Add Your First Project
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="border border-gray-200 rounded-lg p-6 relative">
              <button
                type="button"
                onClick={() => removeProject(index)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Title *
                </label>
                <input
                  {...register(`projects.${index}.projectTitle`, {
                    required: 'Project title is required'
                  })}
                  type="text"
                  className={`input ${errors.projects?.[index]?.projectTitle ? 'field-error' : ''}`}
                  placeholder="E-commerce Platform"
                />
                {errors.projects?.[index]?.projectTitle && (
                  <p className="error-message">{errors.projects[index].projectTitle.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  {...register(`projects.${index}.description`)}
                  rows={3}
                  className="textarea"
                  placeholder="Describe what the project does, your role, and key achievements..."
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technologies Used
                </label>
                <input
                  {...register(`projects.${index}.technologiesUsed`)}
                  type="text"
                  className="input"
                  placeholder="React, Node.js, MongoDB, Express"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Separate technologies with commas
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    {...register(`projects.${index}.startDate`)}
                    type="date"
                    className="input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    {...register(`projects.${index}.endDate`)}
                    type="date"
                    className="input"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Leave empty if project is ongoing
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project URL
                  </label>
                  <input
                    {...register(`projects.${index}.projectUrl`, {
                      pattern: {
                        value: /^https?:\/\/.+/,
                        message: 'Please enter a valid URL starting with http:// or https://'
                      }
                    })}
                    type="url"
                    className={`input ${errors.projects?.[index]?.projectUrl ? 'field-error' : ''}`}
                    placeholder="https://myproject.com"
                  />
                  {errors.projects?.[index]?.projectUrl && (
                    <p className="error-message">{errors.projects[index].projectUrl.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GitHub URL
                  </label>
                  <input
                    {...register(`projects.${index}.githubUrl`, {
                      pattern: {
                        value: /^https?:\/\/.+/,
                        message: 'Please enter a valid URL starting with http:// or https://'
                      }
                    })}
                    type="url"
                    className={`input ${errors.projects?.[index]?.githubUrl ? 'field-error' : ''}`}
                    placeholder="https://github.com/username/project"
                  />
                  {errors.projects?.[index]?.githubUrl && (
                    <p className="error-message">{errors.projects[index].githubUrl.message}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {fields.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-green-900 mb-2">Project tips:</h4>
          <ul className="text-sm text-green-800 space-y-1">
            <li>• Include projects that demonstrate skills relevant to your target job</li>
            <li>• Highlight your specific contributions and achievements</li>
            <li>• Mention the impact or results of your projects</li>
            <li>• Include links to live demos or source code when possible</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default ProjectsForm

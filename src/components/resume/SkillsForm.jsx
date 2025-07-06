import { useFormContext, useFieldArray } from 'react-hook-form'
import { Plus, Trash2 } from 'lucide-react'

const SKILL_CATEGORIES = [
  'Technical',
  'Programming Languages',
  'Frameworks & Libraries',
  'Tools & Software',
  'Soft Skills',
  'Languages',
  'Other'
]

const PROFICIENCY_LEVELS = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'Expert'
]

const SkillsForm = () => {
  const { register, control, formState: { errors } } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills'
  })

  const addSkill = () => {
    append({
      skillName: '',
      skillCategory: 'Technical',
      proficiencyLevel: 'Intermediate',
      displayOrder: fields.length
    })
  }

  const removeSkill = (index) => {
    remove(index)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Add your skills and expertise. Organize them by category for better presentation.
        </p>
        <button
          type="button"
          onClick={addSkill}
          className="btn-secondary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Skill</span>
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 mb-4">No skills added yet</p>
          <button
            type="button"
            onClick={addSkill}
            className="btn-primary"
          >
            Add Your First Skill
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="border border-gray-200 rounded-lg p-4 relative">
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skill Name *
                  </label>
                  <input
                    {...register(`skills.${index}.skillName`, {
                      required: 'Skill name is required'
                    })}
                    type="text"
                    className={`input ${errors.skills?.[index]?.skillName ? 'field-error' : ''}`}
                    placeholder="JavaScript"
                  />
                  {errors.skills?.[index]?.skillName && (
                    <p className="error-message">{errors.skills[index].skillName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    {...register(`skills.${index}.skillCategory`)}
                    className="input"
                  >
                    {SKILL_CATEGORIES.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Proficiency Level
                  </label>
                  <select
                    {...register(`skills.${index}.proficiencyLevel`)}
                    className="input"
                  >
                    {PROFICIENCY_LEVELS.map(level => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {fields.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Tips for adding skills:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Include both technical and soft skills relevant to your target job</li>
            <li>• Be honest about your proficiency levels</li>
            <li>• Group similar skills together using categories</li>
            <li>• Focus on skills that are in demand in your industry</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default SkillsForm

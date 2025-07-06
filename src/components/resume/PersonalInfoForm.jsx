import { useFormContext } from 'react-hook-form'

const PersonalInfoForm = () => {
  const { register, formState: { errors } } = useFormContext()

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Resume Title *
        </label>
        <input
          {...register('title', {
            required: 'Resume title is required',
            maxLength: {
              value: 100,
              message: 'Title must not exceed 100 characters'
            }
          })}
          type="text"
          className={`input ${errors.title ? 'field-error' : ''}`}
          placeholder="e.g., Software Developer Resume"
        />
        {errors.title && (
          <p className="error-message">{errors.title.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            {...register('fullName', {
              required: 'Full name is required',
              maxLength: {
                value: 100,
                message: 'Full name must not exceed 100 characters'
              }
            })}
            type="text"
            className={`input ${errors.fullName ? 'field-error' : ''}`}
            placeholder="John Doe"
          />
          {errors.fullName && (
            <p className="error-message">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            type="email"
            className={`input ${errors.email ? 'field-error' : ''}`}
            placeholder="john.doe@email.com"
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            {...register('phone', {
              maxLength: {
                value: 20,
                message: 'Phone must not exceed 20 characters'
              }
            })}
            type="tel"
            className={`input ${errors.phone ? 'field-error' : ''}`}
            placeholder="+1 (555) 123-4567"
          />
          {errors.phone && (
            <p className="error-message">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <input
            {...register('address')}
            type="text"
            className="input"
            placeholder="City, State, Country"
          />
        </div>
      </div>

      <div>
        <label htmlFor="profileSummary" className="block text-sm font-medium text-gray-700 mb-2">
          Profile Summary
        </label>
        <textarea
          {...register('profileSummary')}
          rows={4}
          className="textarea"
          placeholder="Write a brief summary about yourself, your experience, and career goals..."
        />
        <p className="text-sm text-gray-500 mt-1">
          A compelling summary can help you stand out to employers. Keep it concise and highlight your key strengths.
        </p>
      </div>
    </div>
  )
}

export default PersonalInfoForm

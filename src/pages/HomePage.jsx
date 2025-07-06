import { Link } from 'react-router-dom'
import { FileText, Download, Edit, Share, CheckCircle } from 'lucide-react'

const HomePage = () => {
  const features = [
    {
      icon: <Edit className="h-8 w-8 text-primary-600" />,
      title: 'Easy Resume Builder',
      description: 'Create professional resumes with our intuitive form-based builder. No design skills required.'
    },
    {
      icon: <Download className="h-8 w-8 text-primary-600" />,
      title: 'PDF Download',
      description: 'Download your resume as a high-quality PDF that\'s ready for printing and sharing.'
    },
    {
      icon: <Share className="h-8 w-8 text-primary-600" />,
      title: 'Multiple Resumes',
      description: 'Create and manage multiple resumes for different job applications and career paths.'
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-primary-600" />,
      title: 'ATS Friendly',
      description: 'Our templates are designed to pass through Applicant Tracking Systems (ATS).'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Build Your Perfect Resume
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Create professional resumes that get you hired. Easy to use, ATS-friendly, and completely free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Get Started Free
              </Link>
              <Link
                to="/login"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Resume Builder?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make it easy to create professional resumes that stand out to employers and pass through ATS systems.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Create your professional resume in just 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-primary-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Fill Out Your Information
              </h3>
              <p className="text-gray-600">
                Enter your personal details, work experience, education, and skills using our easy-to-use forms.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Review & Edit
              </h3>
              <p className="text-gray-600">
                Review your resume, make any necessary edits, and ensure all information is accurate and complete.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Download PDF
              </h3>
              <p className="text-gray-600">
                Download your professional resume as a PDF and start applying for your dream job.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Build Your Resume?
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              Join thousands of job seekers who have successfully created professional resumes with our builder.
            </p>
            <Link
              to="/register"
              className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center space-x-2"
            >
              <FileText className="h-5 w-5" />
              <span>Start Building Now</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage

import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    urgency: 'normal',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="relative max-w-md mx-auto p-8 bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-600 rounded-2xl shadow-2xl transform transition-all duration-500 ease-in-out">
        <div className="absolute inset-0 bg-white/10 rounded-2xl backdrop-blur-sm" />
        <div className="relative text-center">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mx-auto flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-white">Thank you!</h2>
          <p className="mt-3 text-lg text-indigo-50">We'll respond to your message as soon as possible.</p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="mt-8 px-6 py-3 bg-white text-indigo-700 rounded-xl font-semibold hover:bg-indigo-50 transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative max-w-md mx-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-600 rounded-2xl transform -rotate-1 scale-105 opacity-50 blur-lg transition-all duration-300" />
      <div className="relative p-8 bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-600 rounded-2xl shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-white/10 backdrop-blur-sm" />
        <div className="relative">
          <h2 className="text-3xl font-bold text-white mb-8">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-indigo-50">Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-indigo-300/30 rounded-xl text-white placeholder-indigo-200 backdrop-blur-sm focus:ring-2 focus:ring-white/50 focus:border-transparent outline-none transition-all"
                placeholder="Your name"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-indigo-50">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-indigo-300/30 rounded-xl text-white placeholder-indigo-200 backdrop-blur-sm focus:ring-2 focus:ring-white/50 focus:border-transparent outline-none transition-all"
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-indigo-50">Organization</label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-indigo-300/30 rounded-xl text-white placeholder-indigo-200 backdrop-blur-sm focus:ring-2 focus:ring-white/50 focus:border-transparent outline-none transition-all"
                placeholder="Your organization"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-indigo-50">Urgency Level</label>
              <select
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-indigo-300/30 rounded-xl text-white backdrop-blur-sm focus:ring-2 focus:ring-white/50 focus:border-transparent outline-none transition-all"
              >
                <option value="normal" className="text-indigo-900">Normal</option>
                <option value="urgent" className="text-indigo-900">Urgent</option>
                <option value="emergency" className="text-indigo-900">Emergency</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-indigo-50">Message</label>
              <textarea
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 bg-white/10 border border-indigo-300/30 rounded-xl text-white placeholder-indigo-200 backdrop-blur-sm focus:ring-2 focus:ring-white/50 focus:border-transparent outline-none transition-all resize-none"
                placeholder="Please describe your situation..."
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 px-6 bg-white text-indigo-700 rounded-xl font-semibold 
                ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-indigo-50 transform hover:-translate-y-1'} 
                transition-all duration-300 shadow-lg`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 border-t-2 border-indigo-700 border-solid rounded-full animate-spin" />
                  <span className="ml-2">Sending...</span>
                </div>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
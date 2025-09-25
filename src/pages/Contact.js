import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import './Contact.css';

function ContactUs() {
  const [state, handleSubmit] = useForm("mdkzavzj");

  if (state.succeeded) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-6">
          <div className="mb-8">
            <div className="w-20 h-20 bg-white-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Message Sent Successfully!</h2>
            <p className="text-lg text-gray-300">Thanks for your message! I'll get back to you within 48 hours.</p>
          </div>
          <a 
            href="/" 
            className="inline-flex items-center px-6 py-3 bg-black border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <div 
        className="relative h-96 bg-cover bg-center bg-fixed flex items-center justify-center"
        style={{ 
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80')"
        }}
      >
        <div className="text-center text-white z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-wide">Get In Touch</h1>
          <p className="text-xl md:text-2xl mb-4 font-light">Let's create something beautiful together</p>
          <div className="w-24 h-1 bg-white mx-auto"></div>
        </div>
        <div className="absolute inset-0 bg-white text-black opacity-20"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-black border border-gray-800 rounded-2xl shadow-xl p-8 h-fit">
              <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Email</h4>
                    <p className="text-gray-300">hello@photography.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Phone</h4>
                    <p className="text-gray-300">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Location</h4>
                    <p className="text-gray-300">New York, NY</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-800">
                <h4 className="font-semibold text-white mb-4">Follow Me</h4>
                                 <div className="flex space-x-4">
                   <a href="#" className="w-10 h-10 bg-gray-800 text-white rounded-lg flex items-center justify-center hover:bg-white hover:text-black transition-all duration-200">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                     </svg>
                   </a>
                   <a href="#" className="w-10 h-10 bg-gray-800 text-white rounded-lg flex items-center justify-center hover:bg-white hover:text-black transition-all duration-200">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                     </svg>
                   </a>
                   <a href="#" className="w-10 h-10 bg-gray-800 text-white rounded-lg flex items-center justify-center hover:bg-white hover:text-black transition-all duration-200">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                     </svg>
                   </a>
                 </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-black border border-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-white mb-4">Send Me a Message</h3>
                <p className="text-gray-300">I'll reply within 48 hours. Please check your spam folder.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
                      Full Name *
                    </label>
                                         <input
                       id="name"
                       type="text"
                       name="name"
                       required
                       className="w-full px-4 py-3 border border-gray-700 bg-black text-white rounded-lg focus:ring-2 focus:ring-white focus:border-white transition-all duration-200"
                       placeholder="Your full name"
                     />
                    <ValidationError 
                      prefix="Name" 
                      field="name"
                      errors={state.errors}
                      className="text-red-400 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                      Email Address *
                    </label>
                                         <input
                       id="email"
                       type="email"
                       name="email"
                       required
                       className="w-full px-4 py-3 border border-gray-700 bg-black text-white rounded-lg focus:ring-2 focus:ring-white focus:border-white transition-all duration-200"
                       placeholder="your@email.com"
                     />
                    <ValidationError 
                      prefix="Email" 
                      field="email"
                      errors={state.errors}
                      className="text-red-400 text-sm mt-1"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-white mb-2">
                    Subject *
                  </label>
                                     <input
                     id="subject"
                     type="text"
                     name="subject"
                     required
                     className="w-full px-4 py-3 border border-gray-700 bg-black text-white rounded-lg focus:ring-2 focus:ring-white focus:border-white transition-all duration-200"
                     placeholder="What's this about?"
                   />
                  <ValidationError 
                    prefix="Subject" 
                    field="subject"
                    errors={state.errors}
                    className="text-red-400 text-sm mt-1"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">
                    Your Message *
                  </label>
                                     <textarea
                     id="message"
                     name="message"
                     rows="6"
                     required
                     className="w-full px-4 py-3 border border-gray-700 bg-black text-white rounded-lg focus:ring-2 focus:ring-white focus:border-white transition-all duration-200 resize-none"
                     placeholder="Tell me about your project, event, or any questions you have..."
                   />
                  <ValidationError 
                    prefix="Message" 
                    field="message"
                    errors={state.errors}
                    className="text-red-400 text-sm mt-1"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="w-full py-4 px-6 bg-black border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all duration-200 disabled:opacity-50 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {state.submitting ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending Message...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                        </svg>
                        Send Message
                      </div>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="bg-black py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-3xl font-bold text-white mb-4">Ready to Start Your Project?</h3>
          <p className="text-gray-300 mb-8 text-lg">Let's discuss how we can bring your vision to life through stunning photography.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/commissioned-work" 
              className="inline-flex items-center px-8 py-3 bg-black border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              View Portfolio
            </a>

          </div>
        </div>
      </div>
    </div>
    
  );
}

export default ContactUs;
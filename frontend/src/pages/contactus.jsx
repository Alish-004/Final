import React from "react";

export default function ContactUs() {
  return (
    <div className="mt-32 py-8 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Contact Us
        </h1>
        <p className="text-lg text-center mb-16 text-gray-600">
          Get in touch with us for inquiries, feedback, or assistance. We'd love to hear from you!
        </p>
      </div>

      {/* Contact Content */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p className="mb-4">
                <strong>Location:</strong> 18 battisputali, Kathmandu, Nepal
              </p>
              <p className="mb-4">
                <strong>Phone:</strong> +977- 98137382883
              </p>
              <p className="mb-4">
                <strong>Email:</strong> journeywheel@gmail.com
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Send Us a Message</h2>
              <p className="text-gray-500 mb-6">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
              <form>
                <div className="grid gap-6">
                  <div>
                    <input
                      className="w-full p-4 bg-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div>
                    <input
                      className="w-full p-4 bg-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your Email"
                      type="email"
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      className="w-full p-4 bg-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your Message"
                      rows={4}
                      required
                    />
                  </div>
                  <div>
                    <button
                      className="w-full py-3 px-6 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 hover:shadow-md transition-all duration-300"
                      type="submit"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
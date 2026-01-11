import React, { useState } from "react";
import Navbar from "./Navbar";
import {
  FiMail,
  FiPhone,
  FiUser,
  FiMessageSquare,
  FiSend,
} from "react-icons/fi";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", form);
    alert("Thank you for your message! We will get back to you soon.");
    setForm({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto mt-15 px-4">
        {/* Header Section */}
        <section className="flex justify-center mb-12">
          <h1 className="text-5xl font-bold text-slate-500">Contact Us</h1>
        </section>

        {/* Introduction */}
        <section className="flex justify-center mb-12">
          <div className="w-full max-w-4xl">
            <p className="text-slate-400 text-lg text-center leading-relaxed">
              Have questions or feedback? We'd love to hear from you! Fill out
              the form below and we'll get back to you as soon as possible.
            </p>
          </div>
        </section>

        {/* Contact Form */}
        <section className="flex justify-center mb-12">
          <div className="w-full max-w-4xl bg-slate-800 rounded-lg shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="flex items-center gap-2 text-slate-300 font-medium mb-2"
                >
                  <FiUser className="text-blue-500" />
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={form.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full px-4 py-3 bg-slate-700 text-white placeholder-gray-400 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Phone Number Field */}
              <div>
                <label
                  htmlFor="phone"
                  className="flex items-center gap-2 text-slate-300 font-medium mb-2"
                >
                  <FiPhone className="text-green-500" />
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={form.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                  className="w-full px-4 py-3 bg-slate-700 text-white placeholder-gray-400 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Email Field (Optional) */}
              <div>
                <label
                  htmlFor="email"
                  className="flex items-center gap-2 text-slate-300 font-medium mb-2"
                >
                  <FiMail className="text-purple-500" />
                  Email{" "}
                  <span className="text-slate-500 text-sm">(Optional)</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 bg-slate-700 text-white placeholder-gray-400 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="flex items-center gap-2 text-slate-300 font-medium mb-2"
                >
                  <FiMessageSquare className="text-orange-500" />
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  id="message"
                  value={form.message}
                  onChange={handleInputChange}
                  placeholder="Type your message here..."
                  required
                  rows="6"
                  className="w-full px-4 py-3 bg-slate-700 text-white placeholder-gray-400 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 flex items-center justify-center gap-2"
              >
                <FiSend />
                Send Message
              </button>
            </form>
          </div>
        </section>

        {/* Additional Contact Info */}
        <section className="flex justify-center mb-12">
          <div className="w-full max-w-4xl bg-linear-to-r from-blue-900 to-slate-800 rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">
              Other Ways to Reach Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <FiMail className="text-blue-300 text-3xl mx-auto mb-2" />
                <h3 className="text-lg font-bold text-blue-300 mb-1">Email</h3>
                <p className="text-slate-300">support@passop.com</p>
              </div>
              <div>
                <FiPhone className="text-blue-300 text-3xl mx-auto mb-2" />
                <h3 className="text-lg font-bold text-blue-300 mb-1">Phone</h3>
                <p className="text-slate-300">+1 (555) 123-4567</p>
              </div>
              <div>
                <FiMessageSquare className="text-blue-300 text-3xl mx-auto mb-2" />
                <h3 className="text-lg font-bold text-blue-300 mb-1">
                  Live Chat
                </h3>
                <p className="text-slate-300">Available 24/7</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ContactUs;

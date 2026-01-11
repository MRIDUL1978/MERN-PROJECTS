import React from "react";
import { FiShield, FiLock, FiKey, FiEye } from "react-icons/fi";
import Navbar from "./Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto mt-15 px-4">
        {/* Header Section */}
        <section className="flex justify-center mb-12">
          <h1 className="text-5xl font-bold text-slate-500">About Us</h1>
        </section>

        {/* Mission Statement */}
        <section className="flex justify-center mb-12">
          <div className="w-full max-w-4xl bg-slate-800 rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-semibold text-slate-300 mb-4">
              Our Mission
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              We believe that everyone deserves to have secure, accessible
              password management. Our password manager is designed to give you
              complete control over your digital security while keeping things
              simple and user-friendly. We're committed to providing a safe
              space for you to store your most sensitive information.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="flex justify-center mb-12">
          <div className="w-full max-w-4xl">
            <h2 className="text-2xl font-semibold text-slate-300 mb-6">
              Why Choose Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Feature 1 */}
              <div className="bg-slate-800 rounded-lg shadow-lg p-6 hover:bg-slate-750 transition-colors duration-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-blue-600 p-3 rounded-lg">
                    <FiShield className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    Secure Storage
                  </h3>
                </div>
                <p className="text-slate-400">
                  Your passwords are stored with industry-standard encryption,
                  ensuring that your sensitive data remains protected at all
                  times.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-slate-800 rounded-lg shadow-lg p-6 hover:bg-slate-750 transition-colors duration-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-green-600 p-3 rounded-lg">
                    <FiLock className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    Easy Access
                  </h3>
                </div>
                <p className="text-slate-400">
                  Access your passwords anytime, anywhere. Our intuitive
                  interface makes password management a breeze, no technical
                  knowledge required.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-slate-800 rounded-lg shadow-lg p-6 hover:bg-slate-750 transition-colors duration-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-purple-600 p-3 rounded-lg">
                    <FiKey className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    One-Click Copy
                  </h3>
                </div>
                <p className="text-slate-400">
                  Copy your passwords instantly with a single click. Quick,
                  efficient, and designed to save you time in your daily
                  workflow.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-slate-800 rounded-lg shadow-lg p-6 hover:bg-slate-750 transition-colors duration-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-red-600 p-3 rounded-lg">
                    <FiEye className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    Privacy First
                  </h3>
                </div>
                <p className="text-slate-400">
                  We respect your privacy. Your data stays yours, and we never
                  have access to your master password or stored credentials.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="flex justify-center mb-12">
          <div className="w-full max-w-4xl bg-slate-800 rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-semibold text-slate-300 mb-4">
              Our Story
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-4">
              Born from the need for a simple yet powerful password management
              solution, our platform was created with one goal in mind: to make
              digital security accessible to everyone.
            </p>
            <p className="text-slate-400 text-lg leading-relaxed">
              We understand the frustration of forgotten passwords and the
              security risks of reusing the same password across multiple sites.
              That's why we built a tool that not only stores your passwords
              securely but also makes them incredibly easy to manage and
              retrieve.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="flex justify-center mb-12">
          <div className="w-full max-w-4xl bg-linear-to-r from-blue-900 to-slate-800 rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-semibold text-white mb-6 text-center">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="text-xl font-bold text-blue-300 mb-2">
                  Security
                </h3>
                <p className="text-slate-300">
                  Your data's protection is our top priority
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-300 mb-2">
                  Simplicity
                </h3>
                <p className="text-slate-300">
                  Powerful features, minimal complexity
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-300 mb-2">Trust</h3>
                <p className="text-slate-300">
                  Building lasting relationships through transparency
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default About;

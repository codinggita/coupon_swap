import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000); 
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-indigo-50 flex items-center justify-center py-16 px-6">
      <div className="max-w-4xl w-full text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-orange-600 mb-6 tracking-tight"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          We’re Here to Help!
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          Got a question or issue? Reach out—we’ll get back to you ASAP.
        </motion.p>
        {submitted && (
          <motion.div
            className="bg-green-100 text-green-800 p-4 rounded-lg mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Thanks! We’ll reply within 24 hours.
          </motion.div>
        )}

        <motion.form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <div className="mb-6">
            <label htmlFor="name" className="block text-left text-gray-700 font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-left text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-left text-gray-700 font-semibold mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us what’s up"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none h-32"
              required
            />
          </div>

          {/* CTA Button */}
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-600 to-orange-600 text-white font-semibold py-3 px-6 rounded-full shadow-xl hover:from-orange-700 hover:to-orange-700 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Message
          </motion.button>
        </motion.form>

        {/* Contact Info */}
        <motion.div
          className="mt-10 text-gray-600 text-lg"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <p>Email: <a href="mailto:support@[website].com" className="text-orange-600 hover:underline">nageshjagtap063@gmail.com</a></p>
          <p>Phone: <span className="text-orange-600">+918999301793</span></p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUs;
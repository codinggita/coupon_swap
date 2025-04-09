// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import emailjs from 'emailjs-com';

// const ContactUs = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', message: '' });
//   const [submitted, setSubmitted] = useState(false);
//   const [error, setError] = useState(false);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { 
//       opacity: 1,
//       transition: { 
//         staggerChildren: 0.2,
//         delayChildren: 0.3 
//       }
//     }
//   };
//   const itemVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { 
//         type: 'spring',
//         stiffness: 100,
//         damping: 15
//       }
//     }
//   };
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // EmailJS configuration
//     const serviceID = 'YOUR_SERVICE_ID'; // Replace with your EmailJS Service ID
//     const templateID = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS Template ID
//     const userID = 'YOUR_USER_ID'; // Replace with your EmailJS User ID

//     const templateParams = {
//       from_name: formData.name,
//       from_email: formData.email,
//       to_email: 'nageshjagtap063@gmail.com', // Your email
//       message: formData.message,
//     };

//     emailjs.send(serviceID, templateID, templateParams, userID)
//       .then((response) => {
//         console.log('Email sent successfully!', response.status, response.text);
//         setSubmitted(true);
//         setError(false);
//         setFormData({ name: '', email: '', message: '' });
//         setTimeout(() => setSubmitted(false), 4000);
//       })
//       .catch((err) => {
//         console.error('Failed to send email:', err);
//         setError(true);
//         setTimeout(() => setError(false), 4000);
//       });
//   };

//   return (
//     <section className="min-h-screen bg-gradient-to-b from-white to-indigo-50 py-16 px-4 md:px-6 lg:px-8 overflow-hidden">
//       <motion.div 
//         className="max-w-4xl mx-auto"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <motion.h1 
//           className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-orange-600 mb-6 tracking-tight text-center"
//           variants={itemVariants}
//         >
//           Let’s Connect!
//         </motion.h1>
        
//         <motion.p 
//           className="text-lg md:text-xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed text-center"
//           variants={itemVariants}
//         >
//           Drop us a message—we’re excited to assist you quickly!
//         </motion.p>

//         <AnimatePresence>
//           {submitted && (
//             <motion.div
//               className="bg-green-100 text-green-800 p-4 rounded-xl mb-8 max-w-md mx-auto shadow-md"
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.8 }}
//               transition={{ duration: 0.3 }}
//             >
//               <span className="font-semibold">Success!</span> Your message has been sent. We’ll reply soon!
//             </motion.div>
//           )}
//           {error && (
//             <motion.div
//               className="bg-red-100 text-red-800 p-4 rounded-xl mb-8 max-w-md mx-auto shadow-md"
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.8 }}
//               transition={{ duration: 0.3 }}
//             >
//               <span className="font-semibold">Oops!</span> Something went wrong. Please try again.
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <motion.form
//           onSubmit={handleSubmit}
//           className="bg-white p-6 md:p-8 rounded-xl shadow-2xl max-w-lg mx-auto relative"
//           variants={itemVariants}
//           whileHover={{ y: -5 }}
//         >
//           <motion.div 
//             className="absolute -top-4 -right-4 w-12 h-12 bg-orange-600 rounded-full opacity-20"
//             animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
//             transition={{ duration: 4, repeat: Infinity }}
//           />

//           <div className="space-y-6">
//             <motion.div variants={itemVariants}>
//               <label htmlFor="name" className="block text-left text-gray-700 font-semibold mb-2">
//                 Name
//               </label>
//               <motion.input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Your name"
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
//                 required
//                 whileFocus={{ scale: 1.02 }}
//               />
//             </motion.div>

//             <motion.div variants={itemVariants}>
//               <label htmlFor="email" className="block text-left text-gray-700 font-semibold mb-2">
//                 Email
//               </label>
//               <motion.input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Your email"
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
//                 required
//                 whileFocus={{ scale: 1.02 }}
//               />
//             </motion.div>

//             <motion.div variants={itemVariants}>
//               <label htmlFor="message" className="block text-left text-gray-700 font-semibold mb-2">
//                 Message
//               </label>
//               <motion.textarea
//                 id="message"
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 placeholder="What’s on your mind?"
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none h-36 bg-gray-50"
//                 required
//                 whileFocus={{ scale: 1.02 }}
//               />
//             </motion.div>

//             <motion.button
//               type="submit"
//               className="w-full bg-gradient-to-r from-orange-600 to-orange-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300 relative overflow-hidden"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               disabled={submitted}
//             >
//               <span className="relative z-10">
//                 {submitted ? 'Sending...' : 'Send Message'}
//               </span>
//               <motion.div 
//                 className="absolute inset-0 bg-orange-700 opacity-0"
//                 whileHover={{ opacity: 0.2 }}
//               />
//             </motion.button>
//           </div>
//         </motion.form>

//         <motion.div 
//           className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600 text-lg"
//           variants={itemVariants}
//         >
//           <motion.div 
//             className="flex items-center justify-center gap-2"
//             whileHover={{ x: 5 }}
//           >
//             <span className="font-semibold">Email:</span>
//             <a href="mailto:nageshjagtap063@gmail.com" className="text-orange-600 hover:underline">
//               nageshjagtap063@gmail.com
//             </a>
//           </motion.div>
//           <motion.div 
//             className="flex items-center justify-center gap-2"
//             whileHover={{ x: 5 }}
//           >
//             <span className="font-semibold">Phone:</span>
//             <span className="text-orange-600">+918999301793</span>
//           </motion.div>
//         </motion.div>

//         <motion.div 
//           className="mt-8 flex justify-center gap-6"
//           variants={itemVariants}
//         >
//           {['Twitter', 'Facebook', 'Instagram'].map((social) => (
//             <motion.a
//               key={social}
//               href="#"
//               className="text-gray-600 hover:text-orange-600 transition-colors"
//               whileHover={{ scale: 1.2, rotate: 5 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               {social}
//             </motion.a>
//           ))}
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// };

// export default ContactUs;






import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from 'emailjs-com';
import { Mail, Phone, MapPin, ChevronDown, ArrowRight } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const serviceID = 'YOUR_SERVICE_ID'; // Replace with your EmailJS Service ID
    const templateID = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS Template ID
    const userID = 'YOUR_USER_ID'; // Replace with your EmailJS User ID

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      from_phone: formData.phone,
      subject: formData.subject,
      to_email: 'nageshjagtap063@gmail.com',
      message: formData.message,
    };

    emailjs.send(serviceID, templateID, templateParams, userID)
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
        setSubmitted(true);
        setError(false);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 4000);
      })
      .catch((err) => {
        console.error('Failed to send email:', err);
        setError(true);
        setTimeout(() => setError(false), 4000);
      });
  };

  return (
    <div className="bg-gradient-to-b from-orange-50 to-amber-100 py-16 px-4 md:px-6 lg:px-8 overflow-hidden">
      <motion.div className="max-w-5xl mx-auto space-y-16" variants={containerVariants} initial="hidden" animate="visible">
        {/* Header Section */}
        <section className="text-center">
          <motion.div className="text-sm text-orange-600 mb-4" variants={itemVariants}>
            Home  <span className="font-semibold">Contact Us</span>
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-orange-600 mb-4 tracking-tight"
            variants={itemVariants}
          >
            Get in Touch!
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            We’re here to help—reach out with your questions, feedback, or just to say hi!
          </motion.p>
        </section>

        {/* Form Section */}
        <section>
          <AnimatePresence>
            {submitted && (
              <motion.div
                className="bg-green-100 text-green-800 p-4 rounded-xl mb-8 max-w-md mx-auto shadow-md"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <span className="font-semibold">Success!</span> Your message has been sent. We’ll reply soon!
              </motion.div>
            )}
            {error && (
              <motion.div
                className="bg-red-100 text-red-800 p-4 rounded-xl mb-8 max-w-md mx-auto shadow-md"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <span className="font-semibold">Oops!</span> Something went wrong. Please try again.
              </motion.div>
            )}
          </AnimatePresence>

          <motion.form
            onSubmit={handleSubmit}
            className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl max-w-lg mx-auto relative"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <motion.div
              className="absolute -top-6 -right-6 w-16 h-16 bg-orange-500 rounded-full opacity-20"
              animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <div className="space-y-6">
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block text-left text-gray-700 font-semibold mb-2">Name</label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
                  required
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-left text-gray-700 font-semibold mb-2">Email</label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
                  required
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="phone" className="block text-left text-gray-700 font-semibold mb-2">Phone (Optional)</label>
                <motion.input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="subject" className="block text-left text-gray-700 font-semibold mb-2">Subject</label>
                <motion.input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What’s this about?"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
                  required
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block text-left text-gray-700 font-semibold mb-2">Message</label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none h-40 bg-gray-50"
                  required
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-600 to-amber-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300 relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={submitted}
              >
                <span className="relative z-10">{submitted ? 'Sending...' : 'Send Message'}</span>
                <motion.div className="absolute inset-0 bg-orange-700 opacity-0" whileHover={{ opacity: 0.3 }} />
              </motion.button>
            </div>
          </motion.form>
        </section>

        {/* Contact Details */}
        <motion.section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700" variants={itemVariants}>
          <motion.div className="flex items-center gap-3 bg-white p-6 rounded-xl shadow-md" whileHover={{ x: 5 }}>
            <Mail size={24} className="text-orange-600" />
            <div>
              <p className="font-semibold">Email</p>
              <a href="mailto:nageshjagtap063@gmail.com" className="text-orange-600 hover:underline">
                nageshjagtap063@gmail.com
              </a>
            </div>
          </motion.div>
          <motion.div className="flex items-center gap-3 bg-white p-6 rounded-xl shadow-md" whileHover={{ x: 5 }}>
            <Phone size={24} className="text-orange-600" />
            <div>
              <p className="font-semibold">Phone</p>
              <span className="text-orange-600">+91 8999 301 793</span>
            </div>
          </motion.div>
          <motion.div className="flex items-center gap-3 bg-white p-6 rounded-xl shadow-md" whileHover={{ x: 5 }}>
            <MapPin size={24} className="text-orange-600" />
            <div>
              <p className="font-semibold">Location</p>
              <span className="text-orange-600">Ahmedabad, India</span>
            </div>
          </motion.div>
        </motion.section>

        {/* FAQ Highlights */}
        <section className="bg-white rounded-2xl shadow-xl p-8">
          <motion.h2
            className="text-2xl md:text-3xl font-semibold text-orange-600 mb-6 text-center"
            variants={itemVariants}
          >
            Quick FAQ Highlights
          </motion.h2>
          <motion.div className="space-y-6 max-w-2xl mx-auto" variants={itemVariants}>
            {[
              { q: "How soon will I get a reply?", a: "We aim to respond within 24 hours!" },
              { q: "Can I call instead?", a: "Yes, feel free to reach us at +91 8999 301 793." },
              { q: "What should I include?", a: "Your name, email, and a brief message work best." },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-orange-50 rounded-lg p-4 shadow-sm"
                whileHover={{ scale: 1.02 }}
              >
                <p className="font-semibold text-gray-800">{faq.q}</p>
                <p className="text-gray-600 mt-1">{faq.a}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Our Team */}
        {/* <section className="bg-orange-50 rounded-2xl shadow-xl p-8">
          <motion.h2
            className="text-2xl md:text-3xl font-semibold text-orange-600 mb-6 text-center"
            variants={itemVariants}
          >
            Meet Our Team
          </motion.h2>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" variants={itemVariants}>
            {[
              { name: "Nagesh Jagtap", role: "Founder", desc: "Driving the vision of CouponSwap." },
              { name: "Sakshi P", role: "Support Lead", desc: "Here to assist you 24/7." },
              { name: "om mule", role: "Tech Lead", desc: "Keeping the platform running smoothly." },
            ].map((member, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md text-center"
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-orange-200 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl text-orange-600">
                  {member.name[0]}
                </div>
                <h3 className="font-semibold text-gray-800">{member.name}</h3>
                <p className="text-orange-600 text-sm">{member.role}</p>
                <p className="text-gray-600 text-sm mt-2">{member.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section> */}



        {/* Footer */}
        <footer className="bg-gradient-to-r from-orange-600 to-amber-500 text-white p-8 rounded-2xl shadow-xl text-center">
          <motion.h3 className="text-2xl font-semibold mb-4" variants={itemVariants}>
            Stay Connected
          </motion.h3>
          <motion.div className="flex justify-center gap-8 mb-6" variants={itemVariants}>
            {['Twitter', 'Facebook', 'Instagram'].map((social) => (
              <motion.a
                key={social}
                href="#"
                className="text-white hover:text-orange-200 transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                {social}
              </motion.a>
            ))}
          </motion.div>
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={itemVariants}>
            <input
              type="email"
              placeholder="Subscribe to our newsletter"
              className="px-4 py-2 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300 w-full sm:w-64"
            />
            <button className="px-6 py-2 bg-white text-orange-600 font-medium rounded-full hover:bg-orange-50 transition-all shadow-md">
              Subscribe
            </button>
          </motion.div>
          <motion.p className="text-sm mt-6" variants={itemVariants}>
            © 2025 CouponSwap. All rights reserved.
          </motion.p>
        </footer>
      </motion.div>
    </div>
  );
};

export default ContactUs;
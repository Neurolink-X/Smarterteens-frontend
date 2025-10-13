import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { useState } from "react";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setFormData({ name: "", email: "", number: "" });
    alert("Thank you for connecting with us!");
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Let's Connect Section */}
      <div className="bg-white text-gray-900 py-10">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              Let&apos;s <span className="text-indigo-600">Connect</span>
            </h1>
            <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed">
              Have questions, ideas, or opportunities to collaborate?  
              Reach out to us — we&apos;d love to hear from you!
            </p>
            <div className="flex justify-center lg:justify-start space-x-5 text-2xl text-gray-600">
              <a href="#" className="hover:text-indigo-600 transition-colors"><FaEnvelope /></a>
              <a href="#" className="hover:text-indigo-600 transition-colors"><FaFacebook /></a>
              <a href="#" className="hover:text-indigo-600 transition-colors"><FaInstagram /></a>
              <a href="#" className="hover:text-indigo-600 transition-colors"><FaTwitter /></a>
              <a href="#" className="hover:text-indigo-600 transition-colors"><FaLinkedin /></a>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-gray-100 p-6 rounded-2xl shadow-md space-y-4 max-w-md mx-auto w-full"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
              Get in Touch
            </h2>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="number"
              name="number"
              placeholder="Your Number"
              value={formData.number}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-xl transition-colors"
            >
              Send Request
            </button>
          </form>
        </div>
      </div>

      {/* Footer Section */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid sm:grid-cols-2 md:grid-cols-4 gap-10 border-t border-gray-800">
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold text-white mb-4">
            Smarter<span className="text-yellow-500">Teens</span>
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Empowering the next generation through knowledge, innovation, and growth.
            Join us in making learning impactful and fun.
          </p>
        </div>
        <div className="text-center md:text-left">
          <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Courses</a></li>
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
          </ul>
        </div>
        <div className="text-center md:text-left">
          <h4 className="text-lg font-semibold text-white mb-3">Resources</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
            <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Events</a></li>
          </ul>
        </div>
        <div className="text-center md:text-left">
          <h4 className="text-lg font-semibold text-white mb-3">Contact</h4>
          <p className="text-gray-400 text-sm">📍 Pune, India</p>
          <p className="text-gray-400 text-sm">✉️ info@smarterteens.com</p>
          <p className="text-gray-400 text-sm">📞 +91 98765 43210</p>
        </div>
      </div>

      <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="text-white">SmarterTeens</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

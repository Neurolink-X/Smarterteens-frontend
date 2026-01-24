import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaTwitter,
    FaEnvelope,
} from "react-icons/fa";
import { BsChatDotsFill } from "react-icons/bs";
import { useState, useEffect, useRef } from "react";

const Footer = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        number: "",
    });

    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState<
        { sender: string; text: string; time: string }[]
    >([]);
    const [chatInput, setChatInput] = useState("");
    const [isBotTyping, setIsBotTyping] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatMessages, isBotTyping]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        setFormData({ name: "", email: "", number: "" });
        alert("Thank you for connecting with us!");
    };

    const getTime = () => {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    const handleChatSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatInput.trim()) return;

        const userMessage = { sender: "user", text: chatInput, time: getTime() };
        setChatMessages((prev) => [...prev, userMessage]);
        setChatInput("");
        setIsBotTyping(true);

        setTimeout(() => {
            const responses = [
                "Hey there! 👋 I’m SmarterBot — your AI learning buddy.",
                "We empower teens through smart learning and innovation!",
                "Would you like to explore our courses or mentorship programs?",
                "SmarterTeens is about learning, community, and creativity 🚀",
                "Ask me anything about our platform — I’m here to help 💬",
            ];
            const botResponse = {
                sender: "bot",
                text: responses[Math.floor(Math.random() * responses.length)],
                time: getTime(),
            };
            setChatMessages((prev) => [...prev, botResponse]);
            setIsBotTyping(false);
        }, 1200);
    };

    return (
        <footer className="bg-gray-900 text-gray-300 relative">
            {/* Let's Connect Section */}
            <div className="bg-white text-gray-900 py-10">
                <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
                            Let&apos;s <span className="text-indigo-600">Connect</span>
                        </h1>
                        <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed">
                            Have questions, ideas, or opportunities to collaborate? Reach out
                            to us — we&apos;d love to hear from you!
                        </p>
                        <div className="flex justify-center lg:justify-start space-x-5 text-2xl text-gray-600">
                            <FaEnvelope className="hover:text-indigo-600 transition-colors" />
                            <FaFacebook className="hover:text-indigo-600 transition-colors" />
                            <FaInstagram className="hover:text-indigo-600 transition-colors" />
                            <FaTwitter className="hover:text-indigo-600 transition-colors" />
                            <FaLinkedin className="hover:text-indigo-600 transition-colors" />
                        </div>
                    </div>

                    {/* Contact Form */}
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
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600 text-white font-medium py-2 rounded-xl transition-all duration-300 shadow-md"
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
                        Empowering the next generation through knowledge, innovation, and
                        growth. Join us in making learning impactful and fun.
                    </p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        {["Home", "Courses", "About Us", "Blog"].map((link) => (
                            <li key={link}>
                                <a href="#" className="hover:text-white transition-colors">
                                    {link}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Resources</h4>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        {["Community", "Support", "FAQs", "Events"].map((item) => (
                            <li key={item}>
                                <a href="#" className="hover:text-white transition-colors">
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Contact</h4>
                    <p className="text-gray-400 text-sm">📍 Pune, India</p>
                    <p className="text-gray-400 text-sm">✉️ info@smarterteens.com</p>
                    <p className="text-gray-400 text-sm">📞 +91 98765 43210</p>
                </div>
            </div>

            <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-500">
                © {new Date().getFullYear()}{" "}
                <span className="text-white">SmarterTeens</span>. All rights reserved.
            </div>

            <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="fixed bottom-6 left-6 group z-50"
            >
                <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-violet-500 via-indigo-500 to-sky-500 text-white shadow-lg shadow-indigo-400/40 transition-all duration-500 hover:scale-110 hover:shadow-indigo-500/60 backdrop-blur-md border border-white/20">
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400 to-violet-400 opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500"></span>
                    <BsChatDotsFill
                        size={28}
                        className="relative z-10 transition-transform duration-500 group-hover:scale-110"
                    />
                    <span className="absolute inset-0 rounded-full border-2 border-indigo-400/40 animate-[ping_2s_linear_infinite]"></span>
                </div>
            </button>

            {/* Chatbot Window */}
            {isChatOpen && (
                <div className="fixed bottom-24 left-6 w-96 h-[480px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.15)] border border-gray-200 overflow-hidden z-50 animate-fadeInUp flex flex-col">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-4 flex justify-between items-center shadow-md">
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <img
                                    src="/SmaterbotLogo.png"
                                    alt="SmarterBot Logo"
                                    className="w-9 h-9 rounded-full border-2 border-white shadow-md"
                                />
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
                            </div>
                            <h3 className="font-semibold text-lg tracking-wide">
                                SmarterBot AI
                            </h3>
                        </div>
                        <button
                            onClick={() => setIsChatOpen(false)}
                            className="text-white hover:text-gray-200 text-xl transition"
                        >
                            ✖
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-5 space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                        {chatMessages.length === 0 ? (
                            <p className="text-gray-500 text-sm text-center mt-10">
                                👋 Hi! I&apos;m <b>SmarterBot</b> — ask me anything about{" "}
                                <b>SmarterTeens</b>!
                            </p>
                        ) : (
                            chatMessages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    <div
                                        className={`p-3 rounded-2xl text-sm shadow-md max-w-[80%] transition-all ${msg.sender === "user"
                                                ? "bg-gradient-to-r from-indigo-100 to-purple-100 text-gray-800 rounded-br-none"
                                                : "bg-gray-100 text-gray-700 rounded-bl-none"
                                            }`}
                                    >
                                        <p>{msg.text}</p>
                                        <span className="block text-xs text-gray-400 mt-1 text-right">
                                            {msg.time}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                        {isBotTyping && (
                            <div className="flex items-center space-x-2 text-gray-500 text-sm">
                                <span className="animate-bounce">•</span>
                                <span className="animate-bounce delay-150">•</span>
                                <span className="animate-bounce delay-300">•</span>
                                <span>SmarterBot is typing...</span>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    <form
                        onSubmit={handleChatSubmit}
                        className="flex border-t border-gray-300 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800"
                    >
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            className="flex-1 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none bg-transparent"
                        />
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-tr-3xl rounded-br-3xl font-medium hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-md"
                        >
                            Send
                        </button>
                    </form>
                </div>
            )}
        </footer>
    );
};

export default Footer;

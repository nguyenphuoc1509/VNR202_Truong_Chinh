import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader } from "lucide-react";

const API_URL = "https://springai-r5fr.onrender.com/vnr202";

function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Xin chào! Tôi là trợ lý AI về Trường Chinh. Bạn muốn hỏi gì?",
            sender: "bot",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMessage = {
            id: Date.now(),
            text: input,
            sender: "user",
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const response = await fetch(
                `${API_URL}?message=${encodeURIComponent(input)}`
            );
            const data = await response.json();

            const botMessage = {
                id: Date.now() + 1,
                text: data.message || "Xin lỗi, tôi không thể trả lời câu hỏi này.",
                sender: "bot",
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Error:", error);
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 1,
                    text: "Có lỗi xảy ra. Vui lòng thử lại sau.",
                    sender: "bot",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[var(--accent-2)] to-[var(--accent-3)] text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Mở chatbot"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-6 z-50 w-[380px] h-[500px] rounded-3xl bg-neutral-900 border border-white/10 shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 bg-gradient-to-r from-[var(--accent-2)] to-[var(--accent-3)] text-white">
                            <h3 className="font-bold text-lg">Trợ lý AI - Trường Chinh</h3>
                            <p className="text-xs opacity-90">
                                Hỏi tôi về lịch sử và cuộc đời Trường Chinh
                            </p>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === "user"
                                                ? "bg-[var(--accent)] text-black"
                                                : "bg-white/10 text-white"
                                            }`}
                                    >
                                        <p className="text-sm leading-relaxed">{msg.text}</p>
                                    </div>
                                </motion.div>
                            ))}
                            {loading && (
                                <div className="flex justify-start">
                                    <div className="bg-white/10 text-white p-3 rounded-2xl flex items-center gap-2">
                                        <Loader size={16} className="animate-spin" />
                                        <span className="text-sm">Đang suy nghĩ...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-white/10 bg-black/20">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Nhập câu hỏi..."
                                    className="flex-1 px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                                    disabled={loading}
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={loading || !input.trim()}
                                    className="px-4 py-2 rounded-xl bg-[var(--accent)] text-black font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default Chatbot;

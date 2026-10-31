import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Order Inquiry');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSent(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
    }, 500);
  };

  return (
    <section id="contact-us" className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-1.5 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <MessageSquare className="w-4 h-4" />
            <span>Dedicated Customer Care</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Contact Us — We're Here to Help
          </h2>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed">
            Have a question about a product, shipping status, returns, or payment? Reach our friendly support team directly using the phone number, email, or instant message form below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Phone & Email Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Phone Card */}
            <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700/80 hover:border-blue-500/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-medium">Toll-Free Phone Support</span>
                  <h4 className="text-lg font-bold text-white mt-0.5">
                    <a href="tel:+18005550199" className="hover:text-blue-400 transition-colors">
                      +1 (800) 555-0199
                    </a>
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Available 7 days a week · Average wait time &lt; 2 mins
                  </p>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700/80 hover:border-blue-500/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-medium">Email Inquiries & Support</span>
                  <h4 className="text-base sm:text-lg font-bold text-white mt-0.5">
                    <a href="mailto:support@nordiccommerce.com" className="hover:text-blue-400 transition-colors">
                      support@nordiccommerce.com
                    </a>
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    We respond within 2 to 4 business hours
                  </p>
                </div>
              </div>
            </div>

            {/* Business Hours & Location Info */}
            <div className="p-5 bg-slate-800/40 rounded-2xl border border-slate-800 space-y-3 text-xs text-slate-400">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <div>
                  <strong className="text-slate-300">Working Hours:</strong> Mon–Fri 8:00 AM – 8:00 PM EST · Sat–Sun 9:00 AM – 6:00 PM EST
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <div>
                  <strong className="text-slate-300">Customer Center:</strong> 450 Nordic Way, Suite 800, New York, NY 10001
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Contact / Inquiry Form */}
          <div className="lg:col-span-7 bg-slate-800/90 p-6 sm:p-8 rounded-2xl border border-slate-700">
            {isSent ? (
              <div className="py-10 text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Message Sent Successfully!</h3>
                <p className="text-xs text-slate-400 max-w-sm mb-6 leading-relaxed">
                  Thank you for reaching out. One of our customer service representatives will contact you shortly via email.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-base font-bold text-white mb-2">Send Us an Instant Message</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sarah@example.com"
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Topic / Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Order Inquiry">Order Inquiry / Tracking</option>
                    <option value="Product Details">Product Specification Question</option>
                    <option value="Returns & Refunds">Returns & Refund Request</option>
                    <option value="Payment Issue">Payment & Billing Assistance</option>
                    <option value="Other">General Feedback / Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">How can we help you?</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your question or issue with as much detail as possible..."
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message to Support</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Quiet Footer Bottom Strip */}
        <div className="pt-12 mt-12 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Nordic Commerce Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Shipping & Delivery</span>
            <span className="hover:text-slate-400 cursor-pointer">Returns & Exchanges</span>
          </div>
        </div>

      </div>
    </section>
  );
};

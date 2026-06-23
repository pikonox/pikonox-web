"use client";

import { useState, useTransition } from "react";
import { submitContact } from "@/actions/contact";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import toast from "react-hot-toast";

type ContactShell = {
  sidebarHeadingHtml?: string;
  sidebarBody?: string;
  formTitle?: string;
};

type ContactData = {
  email?: string;
  phone?: string;
  address?: string;
};

function splitName(full: string) {
  const p = full.trim().split(/\s+/);
  const firstName = p[0] || "Visitor";
  const lastName = p.length > 1 ? p.slice(1).join(" ") : "-";
  return { firstName, lastName };
}

export default function ContactPublicForm({
  shell,
  contactData,
}: {
  shell: ContactShell;
  contactData: ContactData;
}) {
  const [pending, startTransition] = useTransition();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Name, email, and message are required.");
      return;
    }
    const { firstName, lastName } = splitName(name);
    startTransition(async () => {
      const res = await submitContact({
        firstName,
        lastName,
        email: email.trim(),
        phone: phone.trim() || undefined,
        service: subject.trim() || undefined,
        message: message.trim(),
      });
      if (res.success) {
        toast.success("Message sent. We will get back to you soon.");
        setName("");
        setEmail("");
        setPhone("");
        setSubject("");
        setMessage("");
      } else toast.error(res.error ?? "Could not send");
    });
  }

  const headingHtml =
    shell.sidebarHeadingHtml ||
    'Reach Out to the <br class="hidden sm:block"/> <span class="bg-gradient-to-r from-primary to-green-500 bg-clip-text text-transparent">Experts</span> Today';
  const body =
    shell.sidebarBody ||
    "We're committed to providing the highest level of service. Whether you have a specific project in mind or just want to explore possibilities, we're here for you.";
  const formTitle = shell.formTitle || "Send us a Message";

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-60 animate-[ScaleInOut_8s_infinite] -z-10"></div>
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-green-500/10 rounded-full blur-3xl opacity-40 animate-[ScaleInOut_12s_infinite_reverse] -z-10"></div>

      <div className="container relative z-10">
        <div className="grid grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5 col-span-12">
            <div className="mb-10">
              <h2
                className="text-3xl lg:text-4xl font-black text-secondary mb-6 leading-tight"
                dangerouslySetInnerHTML={{ __html: headingHtml }}
              />
              <p className="text-lg text-secondary/70 font-medium leading-relaxed max-w-md">{body}</p>
            </div>

            <div className="space-y-6">
              <ContactInfoItem
                icon={Mail}
                label="Official Email"
                value={contactData?.email || "contact@pikonox.com"}
                href={`mailto:${contactData?.email || "contact@pikonox.com"}`}
              />
              <ContactInfoItem
                icon={MapPin}
                label="Our Office"
                value={contactData?.address || "Punjab, Pakistan"}
                href="#"
              />
            </div>

            <div className="mt-12 bg-white/30 backdrop-blur-md border border-white/50 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.01)] max-w-md">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Follow our journey</p>
              <div className="flex items-center gap-4">
                {[
                  { Icon: FaFacebookF, href: "https://facebook.com" },
                  { Icon: FaTwitter, href: "https://x.com" },
                  { Icon: FaLinkedinIn, href: "https://linkedin.com" }
                ].map(({ Icon, href }, idx) => (
                  <a
                    key={idx}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="size-11 rounded-full bg-white text-secondary hover:bg-primary hover:text-white hover:scale-105 active:scale-95 transition-all flex items-center justify-center border border-gray-100 shadow-sm"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 col-span-12">
            <div 
              className="bg-slate-900 border border-slate-800 text-white rounded-[2.5rem] p-8 lg:p-12 shadow-[0_30px_70px_-15px_rgba(15,23,42,0.4)] relative overflow-hidden group"
              style={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#ffffff' }}
            >
              {/* Glowing decorative corner */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary/10 to-green-500/10 rounded-full blur-2xl -z-10 pointer-events-none group-hover:scale-125 transition-transform duration-700"></div>

              <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3" style={{ color: '#ffffff' }}>
                <MessageSquare className="w-6 h-6 text-green-500" />
                {formTitle}
              </h3>

              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormInput label="Full Name" placeholder="John Doe" value={name} onChange={setName} type="text" />
                  <FormInput label="Email Address" placeholder="john@example.com" value={email} onChange={setEmail} type="email" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormInput label="Phone Number" placeholder="+1 (555) 000-0000" value={phone} onChange={setPhone} type="tel" />
                  <FormInput label="Subject" placeholder="Project Inquiry" value={subject} onChange={setSubject} type="text" />
                </div>
                <div className="space-y-2.5">
                  <label className="text-[13px] font-bold text-slate-300 uppercase tracking-wider ml-1" style={{ color: '#cbd5e1' }}>Your Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your project requirements..."
                    className="w-full bg-slate-950/40 border border-slate-800 rounded-2xl px-6 py-5 text-white font-medium placeholder-slate-600 focus:ring-2 focus:ring-primary/40 focus:border-primary focus:bg-slate-950/60 outline-none transition-all resize-none min-h-[160px]"
                    style={{ backgroundColor: 'rgba(2, 6, 23, 0.4)', border: '1px solid #475569', color: '#ffffff' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={pending}
                  className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-5 rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-3 group/btn relative overflow-hidden active:scale-95 disabled:opacity-60"
                >
                  {/* Shimmer Sweep Effect */}
                  <span className="absolute inset-0 w-[150%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

                  <span className="text-[15px] font-bold tracking-wide z-10">
                    {pending ? "Sending..." : "Send Message Now"}
                  </span>
                  
                  <span className="relative overflow-hidden flex h-6 w-6 items-center justify-center text-white shrink-0 z-10">
                    <Send className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-6 group-hover/btn:-translate-y-6" />
                    <Send className="absolute w-4 h-4 transition-transform duration-300 -translate-x-6 translate-y-6 group-hover/btn:translate-x-0 group-hover/btn:translate-y-0" />
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactInfoItem({ icon: Icon, label, value, href }: { icon: React.ElementType; label: string; value: string; href: string }) {
  return (
    <a 
      href={href} 
      className="backdrop-blur-md bg-white/40 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 rounded-2xl flex items-center gap-5 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group"
    >
      <div className="size-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-primary shadow-sm group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-lg font-extrabold text-secondary tracking-tight break-all">{value}</p>
      </div>
    </a>
  );
}

function FormInput({
  label,
  placeholder,
  type,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2.5">
      <label className="text-[13px] font-bold text-slate-300 uppercase tracking-wider ml-1" style={{ color: '#cbd5e1' }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-950/40 border border-slate-800 rounded-2xl px-6 py-4 text-white font-medium placeholder-slate-600 focus:ring-2 focus:ring-primary/40 focus:border-primary focus:bg-slate-950/60 outline-none transition-all"
        style={{ backgroundColor: 'rgba(2, 6, 23, 0.4)', border: '1px solid #475569', color: '#ffffff' }}
      />
    </div>
  );
}

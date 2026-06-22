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
    'Reach Out to the <br class="hidden sm:block"/> <span class="text-primary underline decoration-blue-200 underline-offset-8">Experts</span> Today';
  const body =
    shell.sidebarBody ||
    "We're committed to providing the highest level of service. Whether you have a specific project in mind or just want to explore possibilities, we're here for you.";
  const formTitle = shell.formTitle || "Send us a Message";

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl translate-x-1/2 -z-10 opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-100/50 rounded-full blur-3xl -translate-x-1/2 -z-10 opacity-40"></div>

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
                value={contactData?.email ?? "info@pikonox.com"}
                href={`mailto:${contactData?.email ?? "info@pikonox.com"}`}
              />
              <ContactInfoItem
                icon={Phone}
                label="Quick Support"
                value={contactData?.phone ?? "+1 (123) 456-78-90"}
                href={`tel:${(contactData?.phone ?? "+11234567890").replace(/\D/g, "")}`}
              />
              <ContactInfoItem
                icon={MapPin}
                label="Our Office"
                value={contactData?.address ?? "123 Tech Avenue, Silicon Valley, CA 94043"}
                href="#"
              />
            </div>

            <div className="mt-12">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Follow our journey</p>
              <div className="flex items-center gap-4">
                {[FaFacebookF, FaTwitter, FaLinkedinIn].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="size-12 rounded-full bg-blue-50 text-secondary hover:bg-primary hover:text-white transition-all flex items-center justify-center border border-blue-100 shadow-sm"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 col-span-12">
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-gray-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 transition-all duration-500 group-hover:scale-150"></div>

              <h3 className="text-2xl font-black text-secondary mb-8 flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-primary" />
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
                  <label className="text-[14px] font-bold text-secondary/80 ml-1">Your Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your project requirements..."
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5 text-secondary font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none min-h-[160px]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={pending}
                  className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-5 rounded-2xl shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-3 group disabled:opacity-60"
                >
                  {pending ? "Sending…" : "Send Message Now"}
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
    <a href={href} className="flex items-center gap-5 p-4 rounded-2xl hover:bg-blue-50 transition-colors group">
      <div className="size-14 rounded-2xl bg-white border border-blue-50 flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{label}</p>
        <p className="text-lg font-black text-secondary">{value}</p>
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
      <label className="text-[14px] font-bold text-secondary/80 ml-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4.5 text-secondary font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
      />
    </div>
  );
}

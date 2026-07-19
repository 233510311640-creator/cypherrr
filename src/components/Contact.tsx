import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Send, Instagram, Github } from "lucide-react";

interface ContactFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type ContactErrors = Partial<Record<keyof ContactFields, string>>;
type SubmissionState = "idle" | "configuration" | "submitting" | "success" | "failure";

const initialFields: ContactFields = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const inputClassName =
  "w-full bg-transparent border-b border-noir-700 p-0 pb-3 focus:outline-none focus:border-white transition-colors font-serif italic text-lg";

export default function Contact() {
  const [fields, setFields] = useState<ContactFields>(initialFields);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const configuredEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
  const formspreeEndpoint =
    typeof configuredEndpoint === "string" ? configuredEndpoint.trim() : "";

  const updateField = (field: keyof ContactFields, value: string) => {
    setFields(current => ({ ...current, [field]: value }));
    setErrors(current => ({ ...current, [field]: undefined }));
    if (submissionState !== "submitting") setSubmissionState("idle");
  };

  const validate = () => {
    const nextErrors: ContactErrors = {};

    if (!fields.name.trim()) nextErrors.name = "Please enter your name.";
    if (!fields.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!fields.subject.trim()) nextErrors.subject = "Please enter a subject.";
    if (!fields.message.trim()) nextErrors.message = "Please enter a message.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formspreeEndpoint) {
      setSubmissionState("configuration");
      return;
    }

    if (!validate()) return;

    setSubmissionState("submitting");
    const formData = new FormData();
    (Object.keys(fields) as Array<keyof ContactFields>).forEach(key => {
      formData.append(key, fields[key].trim());
    });

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Formspree rejected the submission.");

      setFields(initialFields);
      setErrors({});
      setSubmissionState("success");
    } catch {
      setSubmissionState("failure");
    }
  };

  const socialLinks = [
    {
      label: "Instagram profile",
      href: "https://www.instagram.com/bhumit_.singh?igsh=NDM3d3M3YXRxa24y&utm_source=qr",
      Icon: Instagram,
    },
    {
      label: "GitHub profile",
      href: "https://github.com/233510311640-creator",
      Icon: Github,
    },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-12 relative overflow-hidden bg-noir-black border-t border-noir-900">
      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32">
          <div className="space-y-16">
            <div className="space-y-6">
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-noir-500 block">Connection // 03</span>
              <h2 className="text-5xl sm:text-7xl md:text-[8vw] font-serif italic font-black uppercase tracking-tighter leading-[0.8]">
                Initiate <br />
                <span className="text-white">Dialogue<span className="text-noir-500 font-sans not-italic">.</span></span>
              </h2>
              <p className="text-sm uppercase tracking-widest text-noir-500 leading-loose max-w-md">
                I would love to connect and collaborate on different projects, with a focus on learning through the process of creating.
              </p>
            </div>

            <div className="space-y-8">
              <h3 className="font-mono text-[9px] uppercase tracking-[0.4em] text-noir-700">Priority Channel</h3>
              <a href="mailto:bikigaai@gmail.com" className="group block">
                <span className="block text-xl md:text-3xl font-serif italic tracking-tight text-white border-b border-noir-900 pb-4 group-hover:border-white transition-colors">
                  bikigaai@gmail.com
                </span>
              </a>
            </div>

            <div className="flex space-x-4">
              {socialLinks.map(({ label, href, Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (opens in a new tab)`}
                  whileHover={{ y: -3, color: "#FFFFFF" }}
                  className="w-12 h-12 border border-noir-900 flex items-center justify-center text-noir-500 hover:border-noir-700 focus-visible:border-white focus-visible:text-white focus-visible:outline-none transition-colors bg-noir-950"
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </motion.a>
              ))}
            </div>
          </div>

          <motion.form
            noValidate
            onSubmit={handleSubmit}
            aria-labelledby="contact-form-title"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-noir-950 border border-noir-900 p-10 md:p-16 space-y-12 relative"
          >
            <h3 id="contact-form-title" className="sr-only">Send a message</h3>
            <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-white/10 tracking-[0.4em] vertical-rl rotate-180 uppercase pointer-events-none" aria-hidden="true">
              Outgoing Transmission Protocol
            </div>

            <div className="space-y-10">
              <div className="space-y-3">
                <label htmlFor="contact-name" className="font-mono text-[9px] uppercase tracking-[0.5em] text-noir-500">Identity / Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={fields.name}
                  onChange={event => updateField("name", event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                  maxLength={100}
                  placeholder="WHO ARE YOU?"
                  className={inputClassName}
                />
                {errors.name && <p id="contact-name-error" className="font-mono text-[10px] text-red-300" role="alert">{errors.name}</p>}
              </div>

              <div className="space-y-3">
                <label htmlFor="contact-email" className="font-mono text-[9px] uppercase tracking-[0.5em] text-noir-500">Communication Node / Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={fields.email}
                  onChange={event => updateField("email", event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                  maxLength={254}
                  placeholder="EMAIL@SYSTEM.IO"
                  className={inputClassName}
                />
                {errors.email && <p id="contact-email-error" className="font-mono text-[10px] text-red-300" role="alert">{errors.email}</p>}
              </div>

              <div className="space-y-3">
                <label htmlFor="contact-subject" className="font-mono text-[9px] uppercase tracking-[0.5em] text-noir-500">Subject</label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={fields.subject}
                  onChange={event => updateField("subject", event.target.value)}
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                  maxLength={160}
                  placeholder="PROJECT / QUESTION"
                  className={inputClassName}
                />
                {errors.subject && <p id="contact-subject-error" className="font-mono text-[10px] text-red-300" role="alert">{errors.subject}</p>}
              </div>

              <div className="space-y-3">
                <label htmlFor="contact-message" className="font-mono text-[9px] uppercase tracking-[0.5em] text-noir-500">Transmitted Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={fields.message}
                  onChange={event => updateField("message", event.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  maxLength={5000}
                  placeholder="NARRATIVE BRIEF..."
                  className={`${inputClassName} resize-none`}
                />
                {errors.message && <p id="contact-message-error" className="font-mono text-[10px] text-red-300" role="alert">{errors.message}</p>}
              </div>
            </div>

            <div aria-live="polite" aria-atomic="true">
              {submissionState === "configuration" && (
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-amber-200" role="alert">
                  Form delivery is not configured. Set VITE_FORMSPREE_ENDPOINT to enable submission.
                </p>
              )}
              {submissionState === "success" && (
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-emerald-200" role="status">
                  Signal received. Thank you for getting in touch.
                </p>
              )}
              {submissionState === "failure" && (
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-red-300" role="alert">
                  The signal could not be sent. Please try again or use the email link.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submissionState === "submitting"}
              aria-busy={submissionState === "submitting"}
              className="group flex items-center justify-center space-x-6 border border-white px-10 py-5 font-mono text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-black disabled:cursor-wait disabled:opacity-60 transition-all duration-500 w-full md:w-auto"
            >
              <span>{submissionState === "submitting" ? "Sending Signal" : "Send Signal"}</span>
              <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" aria-hidden="true" />
            </button>
          </motion.form>
        </div>

        <footer className="mt-40 pt-16 border-t border-noir-900 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col space-y-2">
            <div className="text-[9px] font-mono text-noir-500 uppercase tracking-[0.4em]">
              &copy; MMXXVI PORTFOLIO ARCHIVE // HANZO.STUDIO
            </div>
            <div className="text-[8px] font-mono text-noir-700 uppercase tracking-[0.3em]">
              All visual constructs reserved.
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}

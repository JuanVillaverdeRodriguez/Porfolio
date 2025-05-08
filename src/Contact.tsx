import { useState } from "react";
import emailjs from "emailjs-com";
import { GithubIcon } from "@/components/ui/github";
import { LinkedinIcon } from "@/components/ui/linkedin";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      })
      .catch(() => setStatus("error"));
  };

  const handleReset = () => {
    setStatus("idle");
  };

  return (
    <section id="contact" className="text-[var(--foreground)] mx-auto max-w-5xl px-4 mb-32">
      <h1 className="font-bold text-3xl text-center mb-12 w-0">Contacto</h1>
      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Info */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>juanvillaverderodriguez@gmail.com</span>
          </div>
          <div className="flex items-center space-x-3">
            <GithubIcon className="w-6 h-6 text-[var(--muted-foreground)]" />
            <span>@JuanVillaverdeRodriguez</span>
          </div>
          <div className="flex items-center space-x-3">
            <LinkedinIcon className="w-6 h-6 text-[var(--muted-foreground)]" />
            <span>Juan Villaverde Rodríguez</span>
          </div>
        </div>

        {/* Formulario o mensaje de éxito */}
        <div className="flex-1 w-full">
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center text-center space-y-4 p-6 rounded-xl shadow-md animate-fade-in">
              <svg
                className="w-14 h-14 text-[var(--accent)]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.1" />
                <path
                  fill="currentColor"
                  d="M10 13.5l-2.5-2.5-1.42 1.42L10 16.34l7.92-7.92-1.42-1.42z"
                />
              </svg>
              <h2 className="text-xl font-semibold">¡Mensaje enviado!</h2>
              <p className="text-[var(--muted-foreground)]">
                Gracias por contactarme. Responderé lo antes posible.
              </p>
              <button
                onClick={handleReset}
                className="mt-4 px-4 py-2 rounded-full bg-[var(--button)] text-[var(--accent-foreground)] font-medium hover:brightness-110 transition shadow-sm cursor-pointer hover:shadow-purple-200/20"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form className="space-y-4 w-full" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Tu nombre"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md bg-[var(--card)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
              <input
                type="email"
                name="email"
                placeholder="Tu correo"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md bg-[var(--card)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
              <textarea
                name="message"
                placeholder="Tu mensaje"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md bg-[var(--card)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="px-6 py-2 rounded-full bg-[var(--button)] text-[var(--accent-foreground)] hover:brightness-110 transition-shadow hover:shadow-purple-200/20 disabled:opacity-50 shadow-sm cursor-pointer"
              >
                {status === "sending" ? "Enviando..." : "Enviar mensaje"}
              </button>
              {status === "error" && (
                <p className="text-red-500 text-sm">Hubo un error. Inténtalo de nuevo.</p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;

import { useState } from "react";
import emailjs from "emailjs-com";
import { useTranslation } from "react-i18next";
import Figlet from "../ascii/Figlet";
import Pane from "../ascii/Pane";
import Prompt from "../ascii/Prompt";

const ENVELOPE = String.raw`
  ____________________
 |\                  /|
 | \      ____      / |
 |  \    |    |    /  |
 |   \___|____|___/   |
 |____________________|`;

export default function Contact() {
  const { t } = useTranslation();
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

  return (
    <section id="contact" className="chapter" aria-labelledby="contact-title">
      <h2 id="contact-title" className="sr-only">{t("contact.title")}</h2>
      <Figlet text={t("contact.title")} />
      <div className="contact">
        <Pane title="finger" className="contact-info">
          <Prompt cmd={t("contact.cmd")} />
          <dl className="finger">
            <div><dt>Login:</dt><dd>juan</dd></div>
            <div><dt>Mail:</dt><dd><a className="tlink" href="mailto:juanvillaverderodriguez@gmail.com">juanvillaverderodriguez@gmail.com</a></dd></div>
            <div><dt>GitHub:</dt><dd><a className="tlink" href="https://github.com/JuanVillaverdeRodriguez" target="_blank" rel="noopener noreferrer">@JuanVillaverdeRodriguez</a></dd></div>
            <div><dt>LinkedIn:</dt><dd><a className="tlink" href="https://www.linkedin.com/in/juanvillaverde" target="_blank" rel="noopener noreferrer">Juan Villaverde Rodríguez</a></dd></div>
            <div><dt>Plan:</dt><dd className="plan">{t("aboutMe.availableButton")}</dd></div>
          </dl>
        </Pane>

        <Pane title={t("contact.prompt")} className="contact-form" right={status === "sending" ? t("contact.sendingMessage") : undefined}>
          {status === "success" ? (
            <div className="sent" role="status">
              <pre className="envelope" aria-hidden="true">{ENVELOPE}</pre>
              <p className="sent-title">{t("contact.messageSent")}</p>
              <p className="dim">{t("contact.messageSentThanks")}</p>
              <button className="btn-primary" onClick={() => setStatus("idle")}>
                <span aria-hidden="true">[ </span>{t("contact.sendAnotherMessage")}<span aria-hidden="true"> ]</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mailform">
              <label className="field">
                <span className="field-label">{t("contact.name")}&gt;</span>
                <input type="text" name="name" autoComplete="name" placeholder={t("contact.yourName")} value={form.name} onChange={handleChange} required />
              </label>
              <label className="field">
                <span className="field-label">{t("contact.email")}&gt;</span>
                <input type="email" name="email" autoComplete="email" placeholder={t("contact.yourEmail")} value={form.email} onChange={handleChange} required />
              </label>
              <label className="field field-area">
                <span className="field-label">{t("contact.message")}&gt;</span>
                <textarea name="message" rows={5} placeholder={t("contact.yourMessage")} value={form.message} onChange={handleChange} required />
              </label>
              <div className="form-foot">
                <button type="submit" className="btn-primary" disabled={status === "sending"}>
                  <span aria-hidden="true">[ </span>
                  {status === "sending" ? t("contact.sendingMessage") : t("contact.sendMessage")}
                  <span aria-hidden="true"> ⏎ ]</span>
                </button>
                {status === "sending" && <span className="spinner" aria-hidden="true" />}
              </div>
              {status === "error" && <p className="err" role="alert">! {t("contact.messageError")}</p>}
            </form>
          )}
        </Pane>
      </div>
    </section>
  );
}

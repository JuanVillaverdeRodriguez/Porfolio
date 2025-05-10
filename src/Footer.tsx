import { GithubIcon } from "@/components/ui/github";
import { LinkedinIcon } from "@/components/ui/linkedin";
import T from "./i18n/T";

const Footer = () => {
  return (
    <footer className="max-w-screen px-4 py-6  bg-[var(--button)] text-[var(--muted-foreground)]">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-center md:text-left">
          <T i18nKey="footer.copyright" />
        </p>
        <div className="flex space-x-5 mt-4 md:mt-0">
          <a
            href="https://github.com/JuanVillaverdeRodriguez"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--accent)] transition-transform hover:scale-110"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/juanvillaverde"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--accent)] transition-transform hover:scale-110"
          >
            <LinkedinIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { ReactNode, useRef } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import T from "./i18n/T";

type PDFFile = string | File | null;

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

type Certificate = {
  title: () => ReactNode;
  issuer?: string;
  date: () => ReactNode;
  file?: PDFFile;
  link?: string;
  isComingSoon?: boolean;
};

const certifications: Certificate[] = [
  {
    title: () => (<T i18nKey="certifications_1.title"/>), 
    issuer: "Santander",
    date: () => (<T i18nKey="certifications_1.date"/>), 
    file: "/assets/PowerBI_Cert.pdf",
    link: "/assets/PowerBI_Cert.pdf",
  },
  {
    title: () => (<T i18nKey="certifications_2.title"/>), 
    issuer: "Cambridge University",
    date: () => (<T i18nKey="certifications_2.date"/>), 
    file: "/assets/Statment_of_Result.pdf",
    link: "/assets/Statment_of_Result.pdf",
  }
];

const Certifications = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="certifications" className="text-[var(--foreground)] w-full mx-auto max-w-5xl px-4 mb-32 ">
      <h1 className="font-bold text-2xl sm:text-3xl mb-6">
        <T i18nKey="certifications.title"/>
      </h1>

      <div className="relative justify-items-center">
        {/* Carrusel: scroll solo en móvil, grilla en escritorio */}
        <div
          ref={scrollRef}
          className="flex md:flex-row flex-col gap-6 md:gap-6 py-4"
        >
          {certifications.map((cert, index) =>
            cert.isComingSoon ? (
              <div
                key={index}
                className="flex flex-col items-center justify-center border-2 border-dashed border-[var(--muted-foreground)] text-[var(--muted-foreground)] rounded-xl w-[90vw] sm:w-[420px] flex-shrink-0 text-center p-6 hover:border-[var(--accent)] transition-all"
              >
                <span className="text-lg font-semibold tracking-wide animate-pulse">
                  Más próximamente...
                </span>
              </div>
            ) : (
              <div
                key={index}
                className="bg-[var(--card)] rounded-2xl shadow-lg flex-shrink-0 flex flex-col overflow-hidden"
              >
                <div className="w-full h-[60vw] sm:h-52 border-b border-[var(--muted)] overflow-hidden">
                  <Document file={cert.file}>
                    <Page
                      pageNumber={1}
                      width={window.innerWidth < 640 ? window.innerWidth * 0.9 : 420}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                    />
                  </Document>
                </div>
                <div className="flex flex-col items-center text-center md:p-4 px-4 py-2 space-y-2">
                  <h2 className="text-lg sm:text-xl font-semibold">{cert.title()}</h2>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {cert.issuer} · {cert.date()}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 mt-2">
                    {cert.link && (
                      <>
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[var(--accent)] hover:underline hover:opacity-90"
                        >
                          <T i18nKey="certifications.show"/>
                        </a>
                        <a
                          href={cert.link}
                          download
                          className="text-sm text-[var(--accent)] hover:underline hover:opacity-90"
                        >
                          <T i18nKey="certifications.download"/>
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Certifications;

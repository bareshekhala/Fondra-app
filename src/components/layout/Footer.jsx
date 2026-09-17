import { Mail } from "lucide-react";
function Footer() {
  return (

      <footer
        className="
        flex
        flex-col
    font-body
    bg-[#F4F1EC]
    dark:bg-[#14112B]
    border-t
    border-[#E3DDD5]
    dark:border-white/10
    text-[#4A4462]
    dark:text-[#CFC6E6]
    px-6
    md:px-10
    pb-7
    bt-5
  "
      >
        <div
          className="
      pt-6
      flex
      flex-col
      md:flex-row
      md:justify-between
      gap-4
      text-xs
      md:text-sm
      mt-auto
    "
        >
          <div className="flex items-center gap-4">
            <p>© 2026 Fondra</p>

            <a
              href="mailto:fondra@naskkhaneh.com"
              className="inline-flex items-center gap-1.5 font-medium text-[#6A59C4] transition-colors hover:text-[#1E1A2F] dark:text-[#C2B3E4] dark:hover:text-[#F1ECFA]"
            >
              <Mail size={14} />
              Get in touch
            </a>
          </div>

          <p className="md:text-right">
            Fondra is for everyday care, not emergencies. In a crisis, contact
            your local emergency services.
          </p>
        </div>
      </footer>

  );
}

export default Footer;

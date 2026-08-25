import { motion } from "framer-motion";

// Fade + slide up on scroll into view
export const Reveal = ({ children, delay = 0, y = 28, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

// Masked line-by-line reveal for headings (array of lines)
export const MaskedLines = ({ lines, className = "", lineClass = "", delay = 0 }) => (
  <span className={className}>
    {lines.map((line, i) => (
      <span key={i} className="reveal-line">
        <motion.span
          className={`block ${lineClass}`}
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          transition={{
            duration: 1,
            delay: delay + i * 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {line}
        </motion.span>
      </span>
    ))}
  </span>
);

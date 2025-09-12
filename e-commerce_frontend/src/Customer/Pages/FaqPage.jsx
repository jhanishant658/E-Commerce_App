import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is the delivery time for this product?",
    answer:
      "Our standard delivery time is 3-7 business days, depending on your location. You’ll receive a tracking link once your order is shipped.",
  },
  {
    question: "Do you offer free shipping?",
    answer:
      "Yes, we offer free shipping on orders above ₹999. For orders below that amount, standard shipping charges apply.",
  },
  {
    question: "Can I return or exchange this product?",
    answer:
      "Absolutely! We have a 7-day easy return and exchange policy. The product must be unused, with original packaging and tags intact.",
  },
  {
    question: "Is there a warranty or guarantee?",
    answer:
      "Yes, this product comes with a standard manufacturer warranty (details mentioned in the product description).",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, we’ll send you a tracking number via email/SMS. You can also track your order in the My Orders section on our website.",
  },
  {
    question: "Is Cash on Delivery (COD) available?",
    answer:
      "Yes, we offer COD as a payment option in most locations. You can check COD availability at checkout.",
  },
  {
    question: "Are there any discounts or offers available?",
    answer:
      "We regularly run special offers and discounts. You can check our home page or sign up for our newsletter to get updates.",
  },
  {
    question: "How do I know if this product is authentic?",
    answer:
      "We source all our products directly from authorized suppliers/manufacturers to ensure 100% authenticity.",
  },
  {
    question: "What should I do if I receive a damaged or wrong product?",
    answer:
      "If you receive a damaged, defective, or wrong item, please contact us within 48 hours of delivery, and we’ll arrange a replacement or refund.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can reach our support team via email, chat, or phone. Visit our Contact Us page for details.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold  mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-2xl shadow-sm bg-white"
          >
            <button
              className="flex justify-between items-center w-full px-4 py-3 text-left"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-lg font-medium">{faq.question}</span>
              <ChevronDown
                className={`transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 pb-3 text-gray-700"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

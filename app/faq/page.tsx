import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ - FUTUREWEAR',
  description: 'Frequently asked questions',
};

const faqs = [
  {
    category: 'Orders & Shipping',
    questions: [
      {
        q: 'How long does shipping take?',
        a: 'We offer express worldwide shipping in 2-3 business days for all orders.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'Yes, we ship to over 100 countries worldwide. Shipping costs are calculated at checkout.',
      },
      {
        q: 'Can I track my order?',
        a: 'Absolutely! Once your order ships, you\'ll receive a tracking number via email.',
      },
    ],
  },
  {
    category: 'Returns & Exchanges',
    questions: [
      {
        q: 'What is your return policy?',
        a: 'We offer free returns within 30 days of delivery. Items must be unworn and in original condition.',
      },
      {
        q: 'How do I exchange an item?',
        a: 'Contact our support team to initiate an exchange. We\'ll send you a prepaid return label.',
      },
    ],
  },
  {
    category: 'Products',
    questions: [
      {
        q: 'Are your products sustainably made?',
        a: 'Yes, we\'re committed to sustainability. All our pieces use premium, eco-friendly materials.',
      },
      {
        q: 'How do I know my size?',
        a: 'Check our size guide on each product page. We offer detailed measurements for all items.',
      },
      {
        q: 'Are drops really limited edition?',
        a: 'Yes! Once a drop sells out, it\'s gone forever. We never restock limited drops.',
      },
    ],
  },
  {
    category: 'Payment & Security',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards, PayPal, Apple Pay, and Google Pay.',
      },
      {
        q: 'Is my payment information secure?',
        a: 'Absolutely. We use industry-standard SSL encryption to protect all transactions.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <main className="relative min-h-screen">
      <section className="pt-32 pb-20 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-heading text-6xl md:text-8xl font-bold uppercase mb-6">
            Frequently Asked <span className="text-brand-green">Questions</span>
          </h1>
          <p className="text-xl   mb-16">
            Find answers to common questions about our products and services.
          </p>

          <div className="space-y-12">
            {faqs.map((category, idx) => (
              <div key={idx}>
                <h2 className="font-heading text-3xl font-bold uppercase mb-6 text-brand-green">
                  {category.category}
                </h2>
                <div className="space-y-6">
                  {category.questions.map((faq, qIdx) => (
                    <div key={qIdx} className="border-l-2 border-brand-green/20 pl-6 py-2">
                      <h3 className="font-heading text-lg font-semibold uppercase mb-2">
                        {faq.q}
                      </h3>
                      <p className="  leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 border border-brand-green/20 bg-brand-green/5">
            <h3 className="font-heading text-2xl font-bold uppercase mb-4">
              Still have questions?
            </h3>
            <p className="  mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-brand-green text-white font-heading uppercase tracking-wider hover:bg-brand-green/80 transition-all"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}




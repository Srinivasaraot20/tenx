export default function ArticleFAQ({ faqs = [] }) {
  if (!faqs.length) return null;

  return (
    <section className="article-faq" aria-labelledby="faq-heading">
      <h2 id="faq-heading">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, i) => (
          <details key={i} className="faq-item">
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

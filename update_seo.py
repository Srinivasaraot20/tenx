import sys

content = open('src/app/seo-services/SEOServicesClient.js', encoding='utf-8').read()

faq_target = """      {/* ── 14. FREQUENTLY ASKED QUESTIONS ── */}
      <section className="seo-section seo-section-white">
        <div className="seo-wrap">
          <div className="seo-sec-header reveal-element">
            <span className="eyebrow">❓ Got Questions?</span>
            <h2>SEO Frequently Asked Questions</h2>
            <p>
              Get straightforward answers to the most common search engine optimization questions and clear up any doubts.
            </p>
          </div>"""

service_areas = """      {/* ── SERVICE AREAS ── */}
      <section className="seo-section seo-section-light">
        <div className="seo-wrap">
          <div className="seo-sec-header reveal-element">
            <span className="eyebrow">📍 SERVICE AREAS</span>
            <h2>Serving Businesses Across Andhra Pradesh & Telangana</h2>
            <p>
              We help businesses across Andhra Pradesh and Telangana grow with expert SEO services, Google Ads, web design, local SEO, and performance-driven digital marketing solutions.
            </p>
          </div>
          <div className="seo-locations-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div className="why-card reveal-element" style={{ alignItems: 'flex-start', padding: '24px', minHeight: 'auto', textAlign: 'left' }}>
              <h3 style={{ marginTop: '0', fontSize: '18px', color: 'var(--seo-dark)' }}>Hyderabad & Telangana</h3>
              <ul style={{ paddingLeft: '20px', color: 'var(--seo-muted)', fontSize: '15px', lineHeight: '1.8', margin: 0, listStyle: 'disc' }}>
                <li>SEO Services in Hyderabad</li>
                <li>Google Ads Management</li>
                <li>Local SEO</li>
                <li>Web Design</li>
                <li>Social Media Marketing</li>
              </ul>
            </div>
            <div className="why-card reveal-element delay-100" style={{ alignItems: 'flex-start', padding: '24px', minHeight: 'auto', textAlign: 'left' }}>
              <h3 style={{ marginTop: '0', fontSize: '18px', color: 'var(--seo-dark)' }}>Visakhapatnam & North Andhra</h3>
              <ul style={{ paddingLeft: '20px', color: 'var(--seo-muted)', fontSize: '15px', lineHeight: '1.8', margin: 0, listStyle: 'disc' }}>
                <li>SEO Services in Visakhapatnam</li>
                <li>Local SEO</li>
                <li>E-commerce SEO</li>
                <li>Digital Marketing</li>
                <li>Business Growth</li>
              </ul>
            </div>
            <div className="why-card reveal-element delay-200" style={{ alignItems: 'flex-start', padding: '24px', minHeight: 'auto', textAlign: 'left' }}>
              <h3 style={{ marginTop: '0', fontSize: '18px', color: 'var(--seo-dark)' }}>Vijayawada & Central Andhra</h3>
              <ul style={{ paddingLeft: '20px', color: 'var(--seo-muted)', fontSize: '15px', lineHeight: '1.8', margin: 0, listStyle: 'disc' }}>
                <li>SEO Services in Vijayawada</li>
                <li>Lead Generation</li>
                <li>PPC Campaigns</li>
                <li>Web Design</li>
                <li>Local Business Marketing</li>
              </ul>
            </div>
            <div className="why-card reveal-element" style={{ alignItems: 'flex-start', padding: '24px', minHeight: 'auto', textAlign: 'left' }}>
              <h3 style={{ marginTop: '0', fontSize: '18px', color: 'var(--seo-dark)' }}>Rayalaseema Region</h3>
              <ul style={{ paddingLeft: '20px', color: 'var(--seo-muted)', fontSize: '15px', lineHeight: '1.8', margin: 0, listStyle: 'disc' }}>
                <li>SEO Services in Nandyal</li>
                <li>Kurnool</li>
                <li>Kadapa</li>
                <li>Anantapur</li>
                <li>Tirupati</li>
              </ul>
            </div>
            <div className="why-card reveal-element delay-100" style={{ alignItems: 'flex-start', padding: '24px', minHeight: 'auto', textAlign: 'left' }}>
              <h3 style={{ marginTop: '0', fontSize: '18px', color: 'var(--seo-dark)' }}>Growing Business Locations</h3>
              <ul style={{ paddingLeft: '20px', color: 'var(--seo-muted)', fontSize: '15px', lineHeight: '1.8', margin: 0, listStyle: 'disc' }}>
                <li>Kakinada</li>
                <li>Nellore</li>
                <li>Guntur</li>
                <li>Rajahmundry</li>
                <li>Warangal</li>
              </ul>
            </div>
            <div className="why-card reveal-element delay-200" style={{ alignItems: 'flex-start', padding: '24px', minHeight: 'auto', textAlign: 'left' }}>
              <h3 style={{ marginTop: '0', fontSize: '18px', color: 'var(--seo-dark)' }}>Industries We Support</h3>
              <ul style={{ paddingLeft: '20px', color: 'var(--seo-muted)', fontSize: '15px', lineHeight: '1.8', margin: 0, listStyle: 'disc' }}>
                <li>Healthcare</li>
                <li>Real Estate</li>
                <li>Education</li>
                <li>E-commerce</li>
                <li>Local Businesses</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 14. FREQUENTLY ASKED QUESTIONS ── */}
      <section className="seo-section seo-section-white">
        <div className="seo-wrap">
          <div className="seo-sec-header reveal-element">
            <span className="eyebrow">❓ Got Questions?</span>
            <h2>Frequently Asked Questions About SEO Services</h2>
            <p>
              Find answers to common questions about our SEO services, pricing, timelines, reporting, and how we help businesses improve Google rankings and organic traffic.
            </p>
          </div>"""

content = content.replace(faq_target, service_areas)

lead_target = """              <h2>Ready to Dominate Google Search?</h2>
              <p>
                Request a free, high-performance website SEO audit. Our certified technical team will crawl your pages, map index issues, and design a customized traffic growth roadmap.
              </p>
              
              <div className="seo-lead-points">
                <div className="seo-lead-point">
                  <span className="seo-lp-icon">📋</span>
                  <div>
                    <h4>100% Free SEO Audit Report</h4>
                    <p>No credit card required. Receive a clear PDF detailing sitemap issues, technical errors, and quick ranking wins.</p>
                  </div>
                </div>

                <div className="seo-lead-point">
                  <span className="seo-lp-icon">🎯</span>
                  <div>
                    <h4>Keyword Opportunity Mapping</h4>
                    <p>We find search term gaps your competitors are ranking for and show you how to capture that traffic.</p>
                  </div>
                </div>

                <div className="seo-lead-point">
                  <span className="seo-lp-icon">⚡</span>
                  <div>
                    <h4>Speed &amp; Core Web Vitals Review</h4>
                    <p>Google prioritizes fast loading. Get actionable suggestions to boost your mobile LCP and index speeds.</p>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <button className="seo-btn seo-btn-primary" onClick={scrollToForm}>
                  📋 Request Free Audit
                </button>
                <button className="seo-btn seo-btn-outline" onClick={triggerConsultationModal}>
                  📅 Book Consultation
                </button>
              </div>"""

lead_replace = """              <h2>Ready to Rank Higher on Google?</h2>
              <p>
                Get a free SEO audit from our experts. We'll analyze your website, identify technical issues, keyword opportunities, and provide a customized SEO growth strategy.
              </p>
              
              <div className="seo-lead-points">
                <div className="seo-lead-point">
                  <span className="seo-lp-icon">📋</span>
                  <div>
                    <h4>100% Free SEO Audit Report</h4>
                    <p>Receive a detailed report with technical issues and improvement recommendations.</p>
                  </div>
                </div>

                <div className="seo-lead-point">
                  <span className="seo-lp-icon">🎯</span>
                  <div>
                    <h4>Keyword Opportunity Analysis</h4>
                    <p>Discover high-value keywords your business can rank for.</p>
                  </div>
                </div>

                <div className="seo-lead-point">
                  <span className="seo-lp-icon">⚡</span>
                  <div>
                    <h4>Technical SEO Review</h4>
                    <p>Identify crawl errors, Core Web Vitals issues, and indexing problems.</p>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <button className="seo-btn seo-btn-primary" onClick={scrollToForm}>
                  Get Free SEO Audit
                </button>
                <button className="seo-btn seo-btn-outline" onClick={triggerConsultationModal}>
                  Book SEO Consultation
                </button>
              </div>"""

content = content.replace(lead_target, lead_replace)

cta_target = """      <CTA />"""
cta_replace = """      <CTA 
        title="Ready to Grow Your Organic Traffic?"
        description="Partner with Digital Marketing TenX and let our SEO experts improve your Google rankings, increase organic traffic, and generate qualified leads with data-driven SEO strategies."
        primaryText="Get Free SEO Audit"
        secondaryText="Book SEO Consultation"
        onPrimaryClick={scrollToForm}
        onSecondaryClick={triggerConsultationModal}
      />"""

content = content.replace(cta_target, cta_replace)

open('src/app/seo-services/SEOServicesClient.js', 'w', encoding='utf-8').write(content)

import GlassCard from "@/components/ui/GlassCard";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none z-[-1]" aria-hidden="true">
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 max-w-[800px]">
        <header className="mb-12 text-center">
          <span className="eyebrow">Legal</span>
          <h1 className="text-h2 mt-4">Privacy <span className="text-gradient">Policy</span></h1>
          <p className="text-[var(--text-muted)] mt-2 text-sm">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </header>

        <GlassCard className="p-8 md:p-12 text-[var(--text-muted)] leading-relaxed">
          <div className="space-y-8">
            <p className="text-lg">
              This Privacy Policy describes how Binary Froster (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects, uses, and shares your personal information when you use our website and our custom software development services.
            </p>

            <section>
              <h3 className="text-xl font-semibold text-[var(--text-h)] mb-4">1. Information We Collect</h3>
              <p className="mb-4">We collect information that you provide directly to us, including:</p>
              <ul className="list-disc pl-6 space-y-3 marker:text-[var(--cyan-500)]">
                <li><strong className="text-[var(--text-h)]">Contact Information:</strong> Name, email address, phone number, and company name when you fill out a contact form or request a quote.</li>
                <li><strong className="text-[var(--text-h)]">Account Information:</strong> If applicable, username and password for client portals.</li>
                <li><strong className="text-[var(--text-h)]">Communication Records:</strong> Information you provide when communicating with our team.</li>
                <li><strong className="text-[var(--text-h)]">Project Data:</strong> Information necessary to perform our Services for you.</li>
              </ul>
              <p className="mt-6 mb-4">We also automatically collect certain information when you visit our Site:</p>
              <ul className="list-disc pl-6 space-y-3 marker:text-[var(--cyan-500)]">
                <li><strong className="text-[var(--text-h)]">Device and Usage Information:</strong> IP address, browser type, operating system, pages visited, and referring URLs.</li>
                <li><strong className="text-[var(--text-h)]">Cookies and Tracking Technologies:</strong> We use cookies to improve your experience on our Site.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-[var(--text-h)] mb-4">2. How We Use Your Information</h3>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-3 marker:text-[var(--cyan-500)]">
                <li>Provide, operate, and maintain our Services.</li>
                <li>Communicate with you, including responding to inquiries and sending project updates.</li>
                <li>Process transactions and send related information, including invoices.</li>
                <li>Improve, personalize, and expand our Site and Services.</li>
                <li>Comply with legal obligations.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-[var(--text-h)] mb-4">3. Sharing Your Information</h3>
              <p className="mb-4">We do not sell your personal information. We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-3 marker:text-[var(--cyan-500)]">
                <li><strong className="text-[var(--text-h)]">Service Providers:</strong> Third-party vendors who perform services on our behalf (e.g., hosting, analytics, payment processing).</li>
                <li><strong className="text-[var(--text-h)]">Legal Compliance:</strong> When required by law, subpoena, or other legal process.</li>
                <li><strong className="text-[var(--text-h)]">Business Transfers:</strong> In connection with a merger, sale of company assets, or acquisition.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-[var(--text-h)] mb-4">4. Your Rights</h3>
              <p>Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, or delete your data. To exercise these rights, please contact us at <a href="mailto:hello@binaryfroster.com" className="text-[var(--cyan-500)] hover:text-[var(--cyan-400)] underline underline-offset-4 decoration-[var(--cyan-500)/30]">hello@binaryfroster.com</a>.</p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-[var(--text-h)] mb-4">5. Data Security</h3>
              <p>We implement reasonable technical and organizational security measures designed to protect your information. However, no security system is impenetrable, and we cannot guarantee the absolute security of your data.</p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-[var(--text-h)] mb-4">6. Contact Us</h3>
              <p className="mb-2">If you have any questions about this Privacy Policy, please contact us at:</p>
              <p><strong className="text-[var(--text-h)]">Email:</strong> <a href="mailto:hello@binaryfroster.com" className="text-[var(--cyan-500)] hover:text-[var(--cyan-400)] underline underline-offset-4 decoration-[var(--cyan-500)/30]">hello@binaryfroster.com</a></p>
            </section>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

import GlassCard from "@/components/ui/GlassCard";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none z-[-1]" aria-hidden="true">
        <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 max-w-[800px]">
        <header className="mb-12 text-center">
          <span className="eyebrow">Legal</span>
          <h1 className="text-h2 mt-4">Terms of <span className="text-gradient">Service</span></h1>
          <p className="text-[var(--text-muted)] mt-2 text-sm">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </header>

        <GlassCard className="p-8 md:p-12 text-[var(--text-muted)] leading-relaxed">
          <div className="space-y-8">
            <p className="text-lg">
              Welcome to Binary Froster. These Terms of Service (&ldquo;Terms&rdquo;) govern your use of our website and our software development services. By accessing or using our Site or Services, you agree to be bound by these Terms.
            </p>

            <section>
              <h3 className="text-xl font-semibold text-[var(--text-h)] mb-4">1. Services Provided</h3>
              <p>
                Binary Froster provides custom software development, AI integrations, web development, and related technology services. The specific scope, deliverables, timeline, and fees for any project will be outlined in a separate Statement of Work (SOW) or Master Services Agreement (MSA) signed by both parties.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-[var(--text-h)] mb-4">2. Client Responsibilities</h3>
              <p className="mb-4">You agree to:</p>
              <ul className="list-disc pl-6 space-y-3 marker:text-[var(--cyan-500)]">
                <li>Provide timely access to necessary information, materials, and personnel required for us to perform the Services.</li>
                <li>Ensure that any materials provided to us do not infringe on the intellectual property rights of third parties.</li>
                <li>Review and approve deliverables in a timely manner.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-[var(--text-h)] mb-4">3. Intellectual Property</h3>
              <p className="mb-4">
                <strong className="text-[var(--text-h)]">Client Ownership:</strong> Upon full payment of all fees associated with a project, we assign to you all rights, title, and interest in the final custom software deliverables created specifically for you, unless otherwise specified in an SOW/MSA.
              </p>
              <p>
                <strong className="text-[var(--text-h)]">Binary Froster Ownership:</strong> We retain all rights to our pre-existing intellectual property, tools, methodologies, and any open-source code utilized.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-[var(--text-h)] mb-4">4. Payment Terms</h3>
              <p>
                Fees and payment schedules will be detailed in the applicable SOW or invoice. Invoices are due upon receipt. We reserve the right to suspend Services if payments are not received in a timely manner.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-[var(--text-h)] mb-4">5. Warranties and Disclaimers</h3>
              <p>
                We warrant that the Services will be performed in a professional and workmanlike manner. EXCEPT AS EXPRESSLY SET FORTH HEREIN, THE SITE AND SERVICES ARE PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE.&rdquo; WE DISCLAIM ALL OTHER WARRANTIES, EXPRESS OR IMPLIED.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-[var(--text-h)] mb-4">6. Limitation of Liability</h3>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL BINARY FROSTER BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-[var(--text-h)] mb-4">7. Contact Information</h3>
              <p className="mb-2">For any questions regarding these Terms, please contact us at:</p>
              <p><strong className="text-[var(--text-h)]">Email:</strong> <a href="mailto:binaryfroster@gmail.com" className="text-[var(--cyan-500)] hover:text-[var(--cyan-400)] underline underline-offset-4 decoration-[var(--cyan-500)/30]">binaryfroster@gmail.com</a></p>
            </section>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

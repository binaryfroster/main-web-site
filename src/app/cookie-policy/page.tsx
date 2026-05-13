import GlassCard from "@/components/ui/GlassCard";

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none z-[-1]" aria-hidden="true">
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 max-w-[800px]">
        <header className="mb-12 text-center">
          <span className="eyebrow">Legal</span>
          <h1 className="text-h2 mt-4">Cookie <span className="text-gradient">Policy</span></h1>
          <p className="text-[var(--text-muted)] mt-2 text-sm">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </header>

        <GlassCard className="p-8 md:p-12 text-[var(--text-muted)] leading-relaxed">
          <div className="space-y-8">
            <p className="text-lg">
              This Cookie Policy explains how Binary Froster (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) uses cookies and similar tracking technologies when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
            </p>

            <section>
              <h3 className="text-xl font-semibold text-[var(--text-h)] mb-4">1. What are cookies?</h3>
              <p className="mb-4">
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-[var(--text-h)] mb-4">2. Why do we use cookies?</h3>
              <p className="mb-4">We use cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Website.</p>
              <ul className="list-disc pl-6 space-y-3 marker:text-[var(--cyan-500)]">
                <li><strong className="text-[var(--text-h)]">Essential website cookies:</strong> These cookies are strictly necessary to provide you with services available through our Website and to use some of its features, such as access to secure areas.</li>
                <li><strong className="text-[var(--text-h)]">Performance and functionality cookies:</strong> These are used to enhance the performance and functionality of our Website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.</li>
                <li><strong className="text-[var(--text-h)]">Analytics and customization cookies:</strong> These cookies collect information that is used either in aggregate form to help us understand how our Website is being used or how effective our marketing campaigns are, or to help us customize our Website for you.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-[var(--text-h)] mb-4">3. How can I control cookies?</h3>
              <p className="mb-4">You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager allows you to select which categories of cookies you accept or reject. Essential cookies cannot be rejected as they are strictly necessary to provide you with services.</p>
              <p>You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted. As the means by which you can refuse cookies through your web browser controls vary from browser-to-browser, you should visit your browser's help menu for more information.</p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-[var(--text-h)] mb-4">4. Updates to this policy</h3>
              <p>We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.</p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-[var(--text-h)] mb-4">5. Contact Us</h3>
              <p className="mb-2">If you have any questions about our use of cookies or other technologies, please email us at:</p>
              <p><strong className="text-[var(--text-h)]">Email:</strong> <a href="mailto:hello@binaryfroster.com" className="text-[var(--cyan-500)] hover:text-[var(--cyan-400)] underline underline-offset-4 decoration-[var(--cyan-500)/30]">hello@binaryfroster.com</a></p>
            </section>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

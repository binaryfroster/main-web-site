import React from 'react';
import Link from 'next/link';

const accentConfig: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
  '#00BFBF': { bg: 'bg-cyan-500/15', text: 'text-cyan-400', border: 'border-cyan-500/30', gradient: 'from-cyan-500/20 to-violet-500/20' },
  '#7F77DD': { bg: 'bg-violet-500/15', text: 'text-violet-400', border: 'border-violet-500/30', gradient: 'from-violet-500/20 to-blue-500/20' },
  '#3B82F6': { bg: 'bg-blue-500/15', text: 'text-blue-400', border: 'border-blue-500/30', gradient: 'from-blue-500/20 to-green-500/20' },
};

export default function ProductsPage() {
  const products = [
    {
      id: 'diet-planner',
      title: 'AI Diet Planner',
      status: 'Live',
      description: 'The world\'s most advanced AI-driven nutrition assistant. Tailored meal plans based on your unique biometric data.',
      features: ['Personalized Macros', 'Wearable Integration', 'Smart Grocery Lists', 'Real-time Goal Adjustments'],
      accent: '#00BFBF',
      href: '/products/diet-planner'
    },
    {
      id: 'flowops',
      title: 'FlowOps ERP',
      status: 'Waitlist',
      description: 'Streamlined agency management for the modern tech firm. Finance, project tracking, and client management in one pane of glass.',
      features: ['Automated Invoicing', 'Capacity Planning', 'Client Portals', 'Visual Kanban boards'],
      accent: '#7F77DD',
      href: '#contact'
    },
    {
      id: 'leadfrost',
      title: 'LeadFrost',
      status: 'Beta',
      description: 'Automated B2B lead generation using AI-driven enrichment and multi-channel outreach strategies.',
      features: ['LinkedIn Automation', 'Data Enrichment', 'Email Sequences', 'CRM Integration'],
      accent: '#3B82F6',
      href: '#contact'
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-base)] pt-32 pb-20 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-violet-900/10 blur-[150px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-cyan-900/10 blur-[150px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mb-20">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-[var(--text-h)] mb-6">
            Our <span className="text-gradient">Product</span> Ecosystem
          </h1>
          <p className="text-xl text-[var(--text-muted)] leading-relaxed font-light">
            Beyond custom services, we build ready-to-use software that empowers individuals 
            and businesses through the power of Artificial Intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const ac = accentConfig[product.accent];
            return (
              <div 
                key={product.id}
                className={`group relative p-8 rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl transition-all duration-500 hover:border-[var(--glass-border-h)] hover:-translate-y-2`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${ac.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />
                
                {/* Product Status Tag */}
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono tracking-tighter uppercase mb-6 ${ac.bg} ${ac.text} border ${ac.border}`}>
                  {product.status}
                </div>

                <h2 className="text-2xl font-display font-bold text-[var(--text-h)] mb-4">
                  {product.title}
                </h2>
                
                <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-8">
                  {product.description}
                </p>

                <div className="space-y-3 mb-10">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className={`flex items-center gap-3 text-xs text-[var(--text-muted)]`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${ac.bg.replace('/15', '')}`} />
                      {feature}
                    </div>
                  ))}
                </div>

                <Link 
                  href={product.href}
                  className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-h)] group-hover:gap-3 transition-all"
                >
                  Learn More 
                  <span className={`text-lg transition-transform group-hover:translate-x-1 ${ac.text}`}>→</span>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Global CTA */}
        <div className="mt-32 p-12 rounded-[40px] bg-gradient-to-r from-violet-600/10 to-cyan-600/10 border border-[var(--glass-border)] text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <h3 className="text-3xl font-display font-bold text-[var(--text-h)] mb-4">Have an Idea for a SaaS?</h3>
          <p className="text-[var(--text-muted)] mb-8 max-w-xl mx-auto">
            We partner with founders to bring software ideas to life. From MVP to scaling, 
            Binary Froster provides the technical backbone.
          </p>
          <Link 
            href="/contact"
            className="inline-block px-10 py-4 rounded-full bg-[var(--text-h)] text-[var(--bg-base)] font-bold hover:scale-105 transition-transform"
          >
            Let&apos;s Build It
          </Link>
        </div>
      </div>
    </div>
  );
}

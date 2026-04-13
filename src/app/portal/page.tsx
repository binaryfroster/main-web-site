"use client";

import { useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import LiquidButton from "@/components/ui/LiquidButton";

/* ═══════ Mock Data ═══════ */
const kanbanColumns = [
  { title: "Todo", color: "text-violet-300", tasks: [
    { id: 1, name: "Setup Database Schema", priority: "high", assignees: ["AK", "JD"], code: "#BF-1001" },
    { id: 2, name: "Define API Specifications", priority: "medium", assignees: ["JD"], code: "#BF-1002" },
    { id: 3, name: "Migrate Cloud Assets", priority: "low", assignees: ["SP"], code: "#BF-1003" },
  ]},
  { title: "In Progress", color: "text-cyan-400", tasks: [
    { id: 4, name: "Implement Authentication Flow", priority: "high", assignees: ["AK", "SP"], code: "#BF-1004" },
    { id: 5, name: "Build Dashboard Components", priority: "medium", assignees: ["JD"], code: "#BF-1005" },
  ]},
  { title: "In Review", color: "text-yellow-400", tasks: [
    { id: 6, name: "Landing Page Design", priority: "medium", assignees: ["SP", "AK"], code: "#BF-1006" },
  ]},
  { title: "Completed", color: "text-green-400", tasks: [
    { id: 7, name: "Project Discovery", priority: "low", assignees: ["AK"], code: "#BF-1007" },
    { id: 8, name: "Wireframe Sign-off", priority: "low", assignees: ["JD", "SP"], code: "#BF-1008" },
  ]},
];

const invoices = [
  { id: "INV-001", date: "2026-03-15", desc: "Discovery & Design Phase", amount: "£2,500", status: "Paid" },
  { id: "INV-002", date: "2026-04-01", desc: "Development Sprint 1", amount: "£3,200", status: "Paid" },
  { id: "INV-003", date: "2026-04-15", desc: "Development Sprint 2", amount: "£3,200", status: "Pending" },
  { id: "INV-004", date: "2026-05-01", desc: "QA & Launch", amount: "£1,800", status: "Upcoming" },
];

const messages = [
  { id: 1, sender: "Project Lead", senderInit: "AK", preview: "Sprint 2 is looking great — the dashboard components are nearly done.", time: "2 hours ago", unread: true, thread: [
    { from: "AK", text: "Sprint 2 is looking great — the dashboard components are nearly done. We should be ready for review by Friday.", time: "2 hours ago" },
    { from: "You", text: "That's great news! Can we schedule a demo call for Friday afternoon?", time: "1 hour ago" },
    { from: "AK", text: "Absolutely — I'll send a calendar invite for 3pm GMT.", time: "45 min ago" },
  ]},
  { id: 2, sender: "Designer", senderInit: "SP", preview: "I've uploaded the updated mockups to the shared drive.", time: "Yesterday", unread: false, thread: [
    { from: "SP", text: "I've uploaded the updated mockups to the shared drive. The colour adjustments you requested are all applied.", time: "Yesterday" },
    { from: "You", text: "Looking good! The violet tones are much better now. Approved.", time: "Yesterday" },
  ]},
  { id: 3, sender: "Backend Dev", senderInit: "JD", preview: "API endpoints for invoice module are live on staging.", time: "2 days ago", unread: false, thread: [
    { from: "JD", text: "API endpoints for invoice module are live on staging. You can test them at staging.binaryfroster.com/api.", time: "2 days ago" },
  ]},
];

const dashboardMetrics = [
  { label: "Tasks Completed", value: "2", total: "8", percent: 25, color: "bg-green-400" },
  { label: "Sprint Progress", value: "65%", total: null, percent: 65, color: "bg-cyan-400" },
  { label: "Budget Used", value: "£5,700", total: "£10,700", percent: 53, color: "bg-violet-400" },
  { label: "Days Remaining", value: "18", total: "45", percent: 60, color: "bg-yellow-400" },
];

const activityFeed = [
  { action: "Task Completed", detail: "Project Discovery marked as done", time: "2 hours ago", icon: "✓" },
  { action: "Invoice Paid", detail: "INV-002 — £3,200 received", time: "Yesterday", icon: "💰" },
  { action: "New Comment", detail: "AK commented on Landing Page Design", time: "2 days ago", icon: "💬" },
  { action: "Sprint Started", detail: "Sprint 2 kicked off", time: "3 days ago", icon: "🚀" },
  { action: "File Uploaded", detail: "Updated mockups V2 added", time: "4 days ago", icon: "📎" },
];

/* ═══════ Component ═══════ */
type View = "dashboard" | "kanban" | "invoices" | "messages";

export default function PortalPage() {
  const [isLogged, setIsLogged] = useState(false);
  const [activeView, setActiveView] = useState<View>("dashboard");
  const [activeThread, setActiveThread] = useState(0);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLogged(true);
  };

  // ─── LOGIN SCREEN ───
  if (!isLogged) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none z-[-1]" aria-hidden="true">
          <div className="absolute top-[30%] left-[20%] w-[400px] h-[400px] bg-violet-600/8 rounded-full blur-[100px] animate-[float_20s_ease-in-out_infinite]" />
          <div className="absolute bottom-[20%] right-[25%] w-[350px] h-[350px] bg-cyan-500/6 rounded-full blur-[100px] animate-[float_25s_ease-in-out_infinite_reverse]" />
        </div>

        <GlassCard className="w-full max-w-[450px] p-10 mx-6">
          <div className="text-center mb-8">
            <svg className="w-10 h-10 mx-auto stroke-cyan-400 stroke-2 fill-none mb-4" viewBox="0 0 64 64" aria-hidden="true"><path d="M32 2L42 22L62 32L42 42L32 62L22 42L2 32L22 22L32 2Z" /></svg>
            <h2 className="text-2xl font-display font-medium text-[var(--text-h)]">Client Portal</h2>
            <p className="text-sm text-[var(--text-muted)] mt-2">Access your project dashboard.</p>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-[var(--text-muted)]">Access ID</label>
              <input type="text" defaultValue="BFX-8942" className="bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg px-4 py-2.5 text-[var(--text-h)] focus:outline-none focus:border-violet-500 text-sm" placeholder="e.g. BFX-8942" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-[var(--text-muted)]">Security Key</label>
              <input type="password" defaultValue="demo123456" className="bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg px-4 py-2.5 text-[var(--text-h)] focus:outline-none focus:border-violet-500 text-sm" placeholder="••••••••••••" />
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-[var(--glass-border)] bg-[var(--glass-bg)] text-violet-500 focus:ring-violet-500" />
              <span className="text-sm text-[var(--text-muted)]">Remember me</span>
            </label>
            <LiquidButton type="submit" className="w-full">Sign In</LiquidButton>
            <p className="text-center text-xs text-[var(--text-hint)]">🔒 End-to-end encrypted · SOC 2 compliant</p>
          </form>
        </GlassCard>
      </div>
    );
  }

  // ─── DASHBOARD (POST-LOGIN) ───
  const navItems: { key: View; label: string; icon: string }[] = [
    { key: "dashboard", label: "Dashboard", icon: "📊" },
    { key: "kanban", label: "Kanban Board", icon: "📋" },
    { key: "invoices", label: "Invoices", icon: "💰" },
    { key: "messages", label: "Messages", icon: "💬" },
  ];

  const priorityColor = (p: string) => {
    if (p === "high") return "bg-red-500/20 text-red-300 border-red-500/30";
    if (p === "medium") return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
    return "bg-green-500/20 text-green-300 border-green-500/30";
  };

  return (
    <div className="min-h-screen flex">
      {/* SIDEBAR */}
      <aside className={"fixed left-0 top-0 h-full z-[900] bg-[var(--bg-surface)]/95 backdrop-blur-xl border-r border-[var(--glass-border)] flex flex-col transition-all duration-300 pt-20 " + (sidebarCollapsed ? "w-[72px]" : "w-[240px]")}>
        <div className="px-4 mb-6 flex items-center justify-between">
          {!sidebarCollapsed && (
            <div>
              <p className="text-sm font-display font-medium text-[var(--text-h)]">Project Alpha</p>
              <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Sprint 2</p>
            </div>
          )}
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="w-8 h-8 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-h)] transition-colors text-xs" aria-label="Toggle sidebar">
            {sidebarCollapsed ? "→" : "←"}
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-3 flex-grow">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveView(item.key)}
              className={"flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium " +
                (activeView === item.key
                  ? "bg-violet-500/15 text-violet-200 border border-violet-500/20"
                  : "text-[var(--text-muted)] hover:text-[var(--text-h)] hover:bg-[var(--glass-bg)]"
                ) +
                (sidebarCollapsed ? " justify-center" : "")
              }
            >
              <span className="text-lg">{item.icon}</span>
              {!sidebarCollapsed && <span>{item.label}</span>}
              {item.key === "messages" && !sidebarCollapsed && (
                <span className="ml-auto w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] font-mono">1</span>
              )}
            </button>
          ))}
        </nav>

        <div className="px-3 pb-6 mt-auto">
          <button
            onClick={() => setIsLogged(false)}
            className={"flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all w-full " + (sidebarCollapsed ? "justify-center" : "")}
          >
            <span>🚪</span>
            {!sidebarCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className={"flex-grow transition-all duration-300 min-h-screen pt-24 pb-12 px-6 md:px-12 " + (sidebarCollapsed ? "ml-[72px]" : "ml-[240px]")}>
        <div className="max-w-[1400px] mx-auto">

          {/* ── DASHBOARD VIEW ── */}
          {activeView === "dashboard" && (
            <div className="flex flex-col gap-8">
              <div>
                <h1 className="text-h2 mb-2">Welcome back 👋</h1>
                <p className="text-[var(--text-muted)]">Here&apos;s what&apos;s happening with Project Alpha.</p>
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {dashboardMetrics.map((m, i) => (
                  <GlassCard key={i} className="p-6">
                    <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-3">{m.label}</p>
                    <div className="flex items-end gap-2 mb-3">
                      <span className="text-3xl font-display font-bold text-[var(--text-h)]">{m.value}</span>
                      {m.total && <span className="text-sm text-[var(--text-muted)] mb-1">/ {m.total}</span>}
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${m.color} transition-all duration-1000`} style={{ width: `${m.percent}%` }} />
                    </div>
                  </GlassCard>
                ))}
              </div>

              {/* Two column: Active Projects + Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Active project strip */}
                <div className="lg:col-span-3">
                  <GlassCard className="p-6">
                    <h3 className="font-display font-medium text-[var(--text-h)] mb-4">Kanban Summary</h3>
                    <div className="grid grid-cols-4 gap-4">
                      {kanbanColumns.map((col, i) => (
                        <div key={i} className="text-center">
                          <div className={"text-2xl font-display font-bold " + col.color}>{col.tasks.length}</div>
                          <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mt-1">{col.title}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-[var(--glass-border)]">
                      <button onClick={() => setActiveView("kanban")} className="text-sm text-violet-300 hover:text-violet-200 font-medium">View Full Board →</button>
                    </div>
                  </GlassCard>
                </div>

                {/* Recent Activity */}
                <div className="lg:col-span-2">
                  <GlassCard className="p-6 h-full">
                    <h3 className="font-display font-medium text-[var(--text-h)] mb-4">Recent Activity</h3>
                    <div className="flex flex-col gap-4">
                      {activityFeed.slice(0, 4).map((a, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="w-8 h-8 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-center text-sm flex-shrink-0">{a.icon}</span>
                          <div className="min-w-0">
                            <p className="text-sm text-[var(--text-h)] font-medium">{a.action}</p>
                            <p className="text-xs text-[var(--text-muted)] truncate">{a.detail}</p>
                            <p className="text-[10px] text-[var(--text-hint)] mt-0.5">{a.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </div>
              </div>

              {/* Messages preview */}
              <GlassCard className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-display font-medium text-[var(--text-h)]">Latest Messages</h3>
                  <button onClick={() => setActiveView("messages")} className="text-sm text-violet-300 hover:text-violet-200 font-medium">View All →</button>
                </div>
                <div className="flex flex-col gap-3">
                  {messages.slice(0, 2).map((m) => (
                    <div key={m.id} className="flex items-center gap-3 p-3 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:border-[var(--glass-border-h)] transition-colors cursor-pointer" onClick={() => { setActiveThread(messages.indexOf(m)); setActiveView("messages"); }}>
                      <div className="w-9 h-9 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-xs font-bold text-violet-200 flex-shrink-0">{m.senderInit}</div>
                      <div className="min-w-0 flex-grow">
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium text-[var(--text-h)]">{m.sender}</p>
                          <span className="text-[10px] text-[var(--text-hint)]">{m.time}</span>
                        </div>
                        <p className="text-xs text-[var(--text-muted)] truncate">{m.preview}</p>
                      </div>
                      {m.unread && <span className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0" />}
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          )}

          {/* ── KANBAN VIEW ── */}
          {activeView === "kanban" && (
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-h2 mb-1">Kanban Board</h1>
                  <p className="text-[var(--text-muted)] text-sm">Sprint 2 · Project Alpha</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {kanbanColumns.map((col, i) => (
                  <GlassCard key={i} className="p-5 bg-white/[0.02] min-h-[400px]">
                    <h3 className={"font-display font-medium text-sm mb-5 flex items-center justify-between " + col.color}>
                      {col.title}
                      <span className="text-xs bg-white/10 px-2 py-0.5 rounded-md text-[var(--text-muted)]">{col.tasks.length}</span>
                    </h3>
                    <div className="flex flex-col gap-3">
                      {col.tasks.map((task) => (
                        <div key={task.id} className="p-4 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl cursor-grab active:cursor-grabbing hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(0,191,191,0.1)] transition-all group">
                          <div className="flex justify-between items-start mb-3">
                            <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono uppercase border ${priorityColor(task.priority)}`}>{task.priority}</span>
                            <span className="text-[10px] text-[var(--text-hint)] font-mono">{task.code}</span>
                          </div>
                          <div className="text-sm text-[var(--text-h)] font-medium mb-3">{task.name}</div>
                          <div className="flex justify-between items-center">
                            <div className="flex -space-x-2">
                              {task.assignees.map((a, j) => (
                                <div key={j} className="w-6 h-6 rounded-full bg-violet-500/30 border-2 border-[var(--bg-surface)] flex items-center justify-center text-[8px] font-bold text-violet-200">{a}</div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}

          {/* ── INVOICES VIEW ── */}
          {activeView === "invoices" && (
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-h2 mb-1">Invoices</h1>
                <p className="text-[var(--text-muted)] text-sm">Manage and track all project invoices.</p>
              </div>

              {/* Summary cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <GlassCard className="p-5">
                  <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Total Value</p>
                  <p className="text-2xl font-display font-bold text-[var(--text-h)]">£10,700</p>
                </GlassCard>
                <GlassCard className="p-5">
                  <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Paid</p>
                  <p className="text-2xl font-display font-bold text-green-400">£5,700</p>
                </GlassCard>
                <GlassCard className="p-5">
                  <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Outstanding</p>
                  <p className="text-2xl font-display font-bold text-yellow-400">£5,000</p>
                </GlassCard>
              </div>

              {/* Invoice Table */}
              <GlassCard className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[var(--glass-border)]">
                        <th className="text-left px-6 py-4 text-xs text-[var(--text-muted)] uppercase tracking-wider font-medium">Invoice</th>
                        <th className="text-left px-6 py-4 text-xs text-[var(--text-muted)] uppercase tracking-wider font-medium">Date</th>
                        <th className="text-left px-6 py-4 text-xs text-[var(--text-muted)] uppercase tracking-wider font-medium">Description</th>
                        <th className="text-right px-6 py-4 text-xs text-[var(--text-muted)] uppercase tracking-wider font-medium">Amount</th>
                        <th className="text-center px-6 py-4 text-xs text-[var(--text-muted)] uppercase tracking-wider font-medium">Status</th>
                        <th className="text-center px-6 py-4 text-xs text-[var(--text-muted)] uppercase tracking-wider font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map((inv) => (
                        <tr key={inv.id} className="border-b border-[var(--glass-border)] hover:bg-[var(--glass-bg)] transition-colors">
                          <td className="px-6 py-4 font-mono text-[var(--text-h)]">{inv.id}</td>
                          <td className="px-6 py-4 text-[var(--text-muted)]">{inv.date}</td>
                          <td className="px-6 py-4 text-[var(--text-body)]">{inv.desc}</td>
                          <td className="px-6 py-4 text-right font-mono text-[var(--text-h)]">{inv.amount}</td>
                          <td className="px-6 py-4 text-center">
                            <span className={
                              "px-2.5 py-1 rounded-full text-[10px] font-mono uppercase border " +
                              (inv.status === "Paid" ? "bg-green-500/15 text-green-300 border-green-500/20" :
                               inv.status === "Pending" ? "bg-yellow-500/15 text-yellow-300 border-yellow-500/20" :
                               "bg-white/5 text-[var(--text-muted)] border-[var(--glass-border)]")
                            }>
                              {inv.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            {inv.status === "Paid" && (
                              <button className="text-xs text-violet-300 hover:text-violet-200 font-medium">Download PDF</button>
                            )}
                            {inv.status === "Pending" && (
                              <button className="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/20 text-cyan-300 text-xs font-medium hover:bg-cyan-500/25 transition-colors">Pay Now</button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            </div>
          )}

          {/* ── MESSAGES VIEW ── */}
          {activeView === "messages" && (
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-h2 mb-1">Messages</h1>
                <p className="text-[var(--text-muted)] text-sm">Communicate with your development team.</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[600px]">
                {/* Thread List */}
                <GlassCard className="lg:col-span-1 p-4 flex flex-col gap-2">
                  <h3 className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-medium px-2 mb-2">Conversations</h3>
                  {messages.map((m, i) => (
                    <button
                      key={m.id}
                      onClick={() => setActiveThread(i)}
                      className={"flex items-center gap-3 p-3 rounded-lg transition-all text-left w-full " +
                        (activeThread === i
                          ? "bg-violet-500/15 border border-violet-500/20"
                          : "hover:bg-[var(--glass-bg)]"
                        )
                      }
                    >
                      <div className="w-9 h-9 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-xs font-bold text-violet-200 flex-shrink-0">{m.senderInit}</div>
                      <div className="min-w-0 flex-grow">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-[var(--text-h)] truncate">{m.sender}</p>
                          {m.unread && <span className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0" />}
                        </div>
                        <p className="text-xs text-[var(--text-muted)] truncate">{m.preview}</p>
                        <p className="text-[10px] text-[var(--text-hint)] mt-0.5">{m.time}</p>
                      </div>
                    </button>
                  ))}
                </GlassCard>

                {/* Active Thread */}
                <GlassCard className="lg:col-span-2 flex flex-col">
                  {/* Thread header */}
                  <div className="p-4 border-b border-[var(--glass-border)] flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-xs font-bold text-violet-200">{messages[activeThread].senderInit}</div>
                    <div>
                      <p className="text-sm font-medium text-[var(--text-h)]">{messages[activeThread].sender}</p>
                      <p className="text-[10px] text-[var(--text-muted)]">Project Alpha · Sprint 2</p>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-grow p-6 overflow-y-auto flex flex-col gap-4">
                    {messages[activeThread].thread.map((msg, i) => (
                      <div key={i} className={msg.from === "You" ? "self-end max-w-[75%]" : "self-start max-w-[75%]"}>
                        <div className={
                          msg.from === "You"
                            ? "bg-violet-500/15 border border-violet-500/20 rounded-2xl rounded-br-none px-4 py-3"
                            : "bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl rounded-bl-none px-4 py-3"
                        }>
                          <p className="text-[11px] font-medium text-[var(--text-muted)] mb-1">{msg.from}</p>
                          <p className="text-sm text-[var(--text-body)] leading-relaxed">{msg.text}</p>
                          <p className="text-[10px] text-[var(--text-hint)] mt-1.5">{msg.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Compose */}
                  <div className="p-4 border-t border-[var(--glass-border)] flex gap-3">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-grow bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg px-4 py-2.5 text-[var(--text-h)] text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                    <button className="px-4 py-2.5 bg-violet-500/20 border border-violet-500/30 rounded-lg text-violet-200 hover:bg-violet-500/30 transition-colors text-sm font-medium">Send</button>
                  </div>
                </GlassCard>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

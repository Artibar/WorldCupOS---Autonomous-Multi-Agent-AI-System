// src/pages/CommandCenter.jsx

import React from "react";
import {
  LayoutDashboard,
  Calendar,
  Shield,
  Users,
  Map,
  Settings,
  HelpCircle,
  Bell,
  UserCircle,
  Bot,
  Plane,
  Car,
  Radar,
  AlertTriangle,
  Headphones,
  Zap,
} from "lucide-react";

export const CommandCenter = () => {
  return (
    <div className="bg-background text-onBackground min-h-screen overflow-hidden font-body">
      {/* SIDEBAR */}
      <aside className="w-[280px] h-screen fixed left-0 top-0 bg-surfaceContainerLow border-r border-outlineVariant flex flex-col py-8 z-50">
        <div className="px-6 mb-10">
          <h1 className="text-2xl font-bold text-primary">Worldcup AI</h1>
          <p className="text-xs tracking-[3px] uppercase text-onSurfaceVariant mt-1">
            Command Center
          </p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <NavItem
            active
            icon={<LayoutDashboard size={20} />}
            title="Command Center"
          />

          <NavItem icon={<Calendar size={20} />} title="Booking" />
          <NavItem icon={<Shield size={20} />} title="Fraud Detection" />
          <NavItem icon={<Users size={20} />} title="Crowd Monitor" />
          <NavItem icon={<Map size={20} />} title="Map" />
        </nav>

        <div className="mt-auto px-4 pt-8 border-t border-outlineVariant/30">
          <button className="w-full bg-primaryContainer text-white rounded-2xl py-4 flex items-center justify-center gap-2 font-medium hover:opacity-90 transition">
            <Zap size={18} />
            Execute Task
          </button>

          <div className="mt-4 space-y-2">
            <NavItem icon={<Settings size={20} />} title="Settings" />
            <NavItem icon={<HelpCircle size={20} />} title="Support" />
          </div>

          <div className="flex items-center gap-3 mt-6 px-3">
            <img
              src="https://i.pravatar.cc/100"
              alt=""
              className="w-10 h-10 rounded-full border border-outlineVariant"
            />

            <div>
              <p className="text-sm font-medium">Admin_01</p>
              <p className="text-[10px] uppercase tracking-widest text-primary/70">
                System Operator
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* TOPBAR */}
      <header className="fixed top-0 right-0 left-[280px] h-16 bg-surface/80 backdrop-blur-xl border-b border-outlineVariant z-40 flex items-center justify-between px-6">
        <div className="flex items-center flex-1 max-w-2xl bg-surfaceContainer rounded-full px-4 py-2 border border-outlineVariant focus-within:border-primary transition-all">
          <Bot className="text-outline mr-2" size={18} />

          <input
            type="text"
            placeholder="Ask AI Agent to 'Book luxury transport for FIFA Officials'..."
            className="bg-transparent outline-none flex-1 text-sm"
          />

          <kbd className="hidden md:block bg-surfaceVariant px-2 py-1 rounded text-[10px] border border-outlineVariant">
            ⌘K
          </kbd>
        </div>

        <div className="flex items-center gap-6 ml-6">
          <button className="relative text-onSurfaceVariant hover:text-primary transition">
            <Bell size={22} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-background"></span>
          </button>

          <button className="text-onSurfaceVariant hover:text-primary transition">
            <UserCircle size={26} />
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="ml-[280px] pt-24 p-8">
        <div className="grid grid-cols-12 gap-6 max-w-[1440px] mx-auto">
          {/* LEFT */}
          <section className="col-span-12 lg:col-span-8 space-y-6">
            {/* STREAMS */}
            <div className="glass-panel rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Plane className="text-primary" />
                  <h2 className="text-2xl font-semibold">
                    Active Logistical Streams
                  </h2>
                </div>

                <span className="bg-surfaceVariant border border-outlineVariant text-primary px-4 py-1 rounded-full text-xs">
                  4 Active Units
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* CARD 1 */}
                <TransportCard
                  icon={<Plane className="text-primary" />}
                  title="FL-902: Official Delegation"
                  location="Zurich (ZRH) → Doha (DOH)"
                  status="In-Transit"
                  progress="75%"
                  footer="ETA: 1h 20m"
                  color="bg-primaryContainer"
                />

                {/* CARD 2 */}
                <TransportCard
                  icon={<Car className="text-tertiary" />}
                  title="TX-44: Executive VIP"
                  location="Lusail Stadium → Ritz-Carlton"
                  status="Boarding"
                  progress="25%"
                  footer="Plate: QW-8802"
                  color="bg-tertiaryContainer"
                />
              </div>
            </div>

            {/* HEATMAP */}
            <div className="glass-panel rounded-2xl overflow-hidden h-[400px] flex flex-col">
              <div className="p-6 border-b border-outlineVariant flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Radar className="text-primary" />
                  <h2 className="text-2xl font-semibold">
                    Crowd Heatmap: Fan Zone A
                  </h2>
                </div>

                <div className="flex gap-2">
                  <button className="bg-surfaceVariant px-4 py-1 rounded text-sm">
                    Lusail
                  </button>

                  <button className="bg-surfaceContainerHighest px-4 py-1 rounded text-sm">
                    Doha Port
                  </button>
                </div>
              </div>

              <div className="flex-1 relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1600&auto=format&fit=crop"
                  alt=""
                  className="w-full h-full object-cover opacity-60"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>

                <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-red-500/30 blur-3xl rounded-full animate-pulse"></div>

                <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-cyan-400/20 blur-3xl rounded-full"></div>

                <div className="absolute bottom-4 left-4 space-y-2">
                  <div className="bg-background/80 backdrop-blur px-4 py-2 rounded border border-outlineVariant flex gap-2">
                    <span className="font-bold text-primary">84,202</span>
                    <span className="text-xs text-onSurfaceVariant">
                      Live Occupancy
                    </span>
                  </div>

                  <div className="bg-background/80 backdrop-blur px-4 py-2 rounded border border-outlineVariant flex gap-2">
                    <span className="font-bold text-red-400">CRITICAL</span>
                    <span className="text-xs text-onSurfaceVariant">
                      Gate 4 Flow rate
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* RIGHT */}
          <section className="col-span-12 lg:col-span-4">
            <div className="glass-panel rounded-2xl flex flex-col h-[calc(100vh-130px)]">
              <div className="p-6 border-b border-outlineVariant bg-surfaceContainerHigh/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="text-red-400" />

                    <h2 className="text-2xl font-semibold">
                      Fraud Watch
                    </h2>
                  </div>

                  <span className="text-red-400 text-sm animate-pulse">
                    LIVE
                  </span>
                </div>

                <p className="text-sm text-outline">
                  Real-time vendor transaction monitoring
                </p>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AlertCard
                  danger
                  title="POS_MISMATCH"
                  time="12:04:02"
                  description="Suspicious transaction velocity detected at Vendor #088."
                />

                <AlertCard
                  title="IDENTITY_FLAG"
                  time="12:02:44"
                  description="Duplicate accreditation scan detected at Media Gate 2."
                />

                <div className="pt-4 border-t border-outlineVariant/30 space-y-2 text-xs text-onSurfaceVariant">
                  <FeedLog
                    time="12:01:55"
                    label="SCAN"
                    text="Ticket ID #9902 verified."
                  />

                  <FeedLog
                    time="12:01:30"
                    label="API"
                    text="Flight FL-902 updated status."
                  />

                  <FeedLog
                    time="12:00:12"
                    label="SYSTEM"
                    text="AI Agent processed shuttle schedule."
                  />

                  <FeedLog
                    time="11:59:45"
                    label="VENDOR"
                    text="Daily audit completed. 0 Flags."
                  />
                </div>
              </div>

              <div className="p-6 border-t border-outlineVariant bg-surfaceContainerHigh/50 flex items-center justify-between text-sm text-onSurfaceVariant">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  Agent Monitoring Active
                </span>

                <span>CPU: 14%</span>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* FLOATING BUTTON */}
      <button className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-primary text-black flex items-center justify-center shadow-2xl hover:scale-110 transition animate-pulse">
        <Headphones />
      </button>
    </div>
  );
};

export default CommandCenter;

/* ---------------- COMPONENTS ---------------- */

const NavItem = ({ icon, title, active }) => (
  <button
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      active
        ? "bg-surfaceVariant/30 text-primary border-r-2 border-primary font-semibold"
        : "text-onSurfaceVariant hover:bg-surfaceVariant"
    }`}
  >
    {icon}
    <span>{title}</span>
  </button>
);

const TransportCard = ({
  icon,
  title,
  location,
  status,
  progress,
  footer,
  color,
}) => (
  <div className="bg-surfaceContainerHigh rounded-xl p-5 border border-outlineVariant hover:border-primaryContainer transition-all">
    <div className="flex justify-between items-start mb-5">
      <div className="p-2 rounded bg-white/5">{icon}</div>

      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>

        <span className="text-sm text-cyan-300">{status}</span>
      </div>
    </div>

    <h3 className="text-lg font-bold mb-1">{title}</h3>

    <p className="text-sm text-onSurfaceVariant mb-5">{location}</p>

    <div className="h-1 rounded-full bg-surfaceVariant overflow-hidden mb-2">
      <div className={`h-full ${color} w-3/4`} />
    </div>

    <div className="flex justify-between text-xs text-outline">
      <span>{progress} Journey</span>
      <span>{footer}</span>
    </div>
  </div>
);

const AlertCard = ({ title, time, description, danger }) => (
  <div
    className={`p-4 rounded-xl border-l-4 ${
      danger
        ? "bg-red-500/10 border-red-400"
        : "bg-surfaceContainer border-cyan-400"
    }`}
  >
    <div className="flex justify-between mb-2">
      <span
        className={`font-semibold ${
          danger ? "text-red-400" : "text-cyan-300"
        }`}
      >
        {title}
      </span>

      <span className="text-xs text-outline">{time}</span>
    </div>

    <p className="text-sm mb-4">{description}</p>

    <div className="flex gap-2">
      {danger && (
        <button className="px-3 py-1 bg-red-400 text-black rounded text-sm">
          Freeze POS
        </button>
      )}

      <button className="px-3 py-1 border border-outlineVariant rounded text-sm hover:bg-surfaceVariant">
        Detail
      </button>
    </div>
  </div>
);

const FeedLog = ({ time, label, text }) => (
  <div className="flex gap-2">
    <span className="text-primary/60">{time}</span>
    <span className="text-outline">{label}:</span>
    <span>{text}</span>
  </div>
);
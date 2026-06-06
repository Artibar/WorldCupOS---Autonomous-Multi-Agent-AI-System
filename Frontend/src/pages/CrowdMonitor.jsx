// CrowdMonitor.jsx

import React, { useState, useEffect } from "react";
import {
  Bell,
  Search,
  Users,
  Zap,
  ChevronRight,
  Route,
  Car,
  Map,
  Shield,
  Settings,
  Ticket,
} from "lucide-react";

export const CrowdMonitor = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="bg-[#0B1326] text-[#DAE2FD] min-h-screen overflow-hidden relative font-['Inter']">
      {/* TOP SEARCH AREA */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center gap-3 bg-[#171F33]/80 backdrop-blur-xl border border-[#434656] rounded-full px-5 py-3 shadow-lg">
            <Users className="text-[#B8C3FF]" size={20} />

            <span className="text-xl font-bold tracking-tight text-[#B8C3FF]">
              Worldcup AI
            </span>
          </div>

          {/* NOTIFICATION */}
          <button className="w-11 h-11 rounded-full bg-[#171F33]/80 backdrop-blur-xl border border-[#434656] flex items-center justify-center text-[#DAE2FD]">
            <Bell size={20} />
          </button>
        </div>

        {/* SEARCH */}
        <div className="relative">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8E90A2]"
            size={18}
          />

          <input
            type="text"
            placeholder="Search zones or venues..."
            className="w-full h-14 rounded-2xl bg-[#171F33]/90 backdrop-blur-xl border border-[#434656] px-14 text-[#DAE2FD] outline-none focus:border-[#2E5BFF] focus:ring-1 focus:ring-[#2E5BFF]"
          />
        </div>
      </div>

      {/* MAIN MAP */}
      <main className="relative w-full h-screen overflow-hidden">
        {/* MAP BG */}
        <div className="absolute inset-0 bg-[#0B1326]">
          <img
            src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1800&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover opacity-60 grayscale-[0.3]"
          />

          {/* OVERLAYS */}
          <AnimatedOverlay className="w-48 h-48 top-1/2 left-1/2 bg-[#2E5BFF]/20" />

          <AnimatedOverlay className="w-32 h-32 top-[40%] left-[30%] bg-cyan-400/20" />

          <AnimatedOverlay className="w-64 h-64 bottom-[25%] right-[15%] bg-red-500/20" />
        </div>

        {/* LEGEND */}
        <div className="absolute right-4 top-40 bg-[#171F33]/70 backdrop-blur-2xl border border-[#434656] rounded-2xl p-4 flex flex-col gap-2">
          <span className="text-[10px] uppercase tracking-[3px] text-[#8E90A2] mb-2">
            Crowd Density
          </span>

          <Legend color="bg-cyan-400" label="Low" />

          <Legend color="bg-[#2E5BFF]" label="Medium" />

          <Legend color="bg-red-500" label="Critical" />
        </div>

        {/* EXECUTE TASK */}
        <button className="fixed right-4 bottom-[320px] z-40 h-14 px-7 rounded-full bg-[#2E5BFF] text-white flex items-center gap-3 shadow-[0_0_20px_rgba(46,91,255,0.4)] hover:brightness-110 active:scale-95 transition">
          <Zap size={18} />

          <span className="uppercase tracking-[2px] text-sm font-semibold">
            Execute Task
          </span>
        </button>
      </main>

      {/* BOTTOM SHEET */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 bg-[#171F33]/80 backdrop-blur-3xl border-t border-[#434656] rounded-t-[32px] flex flex-col max-h-[750px] transition-transform duration-500 ${
          collapsed
            ? "translate-y-[calc(100%-80px)]"
            : "translate-y-0"
        }`}
      >
        {/* HANDLE */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full py-4 flex flex-col items-center gap-3"
        >
          <div className="w-14 h-1.5 rounded-full bg-[#434656]"></div>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>

            <span className="uppercase text-cyan-400 tracking-[3px] text-sm font-mono">
              Live Hub: Zone 4 Update
            </span>
          </div>
        </button>

        {/* CONTENT */}
        <div className="overflow-y-auto px-5 pb-28 space-y-8">
          {/* REROUTING */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-2xl font-semibold">
                Rerouting Insights
              </h3>

              <span className="bg-[#2E5BFF]/10 text-[#B8C3FF] px-3 py-1 rounded-lg text-xs uppercase tracking-[2px]">
                AI Optimal
              </span>
            </div>

            <div className="space-y-4">
              <InsightCard
                icon={<Route size={22} />}
                title="North Gate Path B"
                subtitle="Congestion avoidant pedestrian trail"
                time="-12 min"
                cyan
              />

              <InsightCard
                icon={<Car size={22} />}
                title="VIP Shuttle Route 4"
                subtitle="Priority corridor established"
                time="-8 min"
              />
            </div>
          </section>

          {/* LIVE ACTIVITY */}
          <section>
            <h3 className="text-2xl font-semibold mb-5">
              Live Activity
            </h3>

            <div className="space-y-4">
              <FeedItem
                time="20:41"
                text="Gate 7 through-put increased by 14%"
                status="Processing"
                statusColor="text-cyan-400"
              />

              <FeedItem
                time="20:38"
                text="Zone 2 sensor 409 reporting 85% capacity"
                status="Alert"
                statusColor="text-red-400"
              />

              <FeedItem
                time="20:35"
                text="Security dispatch confirmed for Block A"
                status="Acknowledged"
                statusColor="text-[#C4C5D9]"
              />
            </div>
          </section>
        </div>
      </div>

      {/* BOTTOM NAV */}
      <nav className="fixed bottom-0 inset-x-0 h-20 bg-[#131B2E]/95 backdrop-blur-xl flex items-center justify-around px-5 z-[60] border-t border-[#434656]">
        <NavItem icon={<Ticket size={22} />} label="Booking" />

        <NavItem icon={<Shield size={22} />} label="Fraud" />

        <NavItem
          icon={<Users size={22} />}
          label="Monitor"
          active
        />

        <NavItem icon={<Map size={22} />} label="Map" />

        <NavItem
          icon={<Settings size={22} />}
          label="Settings"
        />
      </nav>
    </div>
  );
};

export default CrowdMonitor;

/* COMPONENTS */

const Legend = ({ color, label }) => (
  <div className="flex items-center gap-2">
    <div className={`w-2 h-2 rounded-full ${color}`}></div>

    <span className="text-xs font-mono">{label}</span>
  </div>
);

const InsightCard = ({
  icon,
  title,
  subtitle,
  time,
  cyan,
}) => (
  <div className="bg-[#222A3D] border border-[#434656] rounded-2xl p-4 flex items-center gap-4">
    <div
      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
        cyan
          ? "bg-cyan-400/10 text-cyan-400"
          : "bg-[#2E5BFF]/10 text-[#B8C3FF]"
      }`}
    >
      {icon}
    </div>

    <div className="flex-1">
      <div className="flex items-center justify-between">
        <span className="font-semibold">{title}</span>

        <span
          className={`text-sm ${
            cyan ? "text-cyan-400" : "text-[#B8C3FF]"
          }`}
        >
          {time}
        </span>
      </div>

      <p className="text-xs text-[#C4C5D9] mt-1">
        {subtitle}
      </p>
    </div>

    <ChevronRight className="text-[#8E90A2]" size={18} />
  </div>
);

const FeedItem = ({
  time,
  text,
  status,
  statusColor,
}) => (
  <div className="flex gap-4 py-3 border-b border-[#434656]/40">
    <span className="text-xs text-[#8E90A2] whitespace-nowrap font-mono">
      {time}
    </span>

    <div>
      <p className="text-sm font-medium">{text}</p>

      <span
        className={`uppercase tracking-[2px] text-[10px] mt-1 inline-block ${statusColor}`}
      >
        {status}
      </span>
    </div>
  </div>
);

const NavItem = ({ icon, label, active }) => (
  <button
    className={`flex flex-col items-center gap-1 ${
      active ? "text-[#B8C3FF]" : "text-[#C4C5D9]"
    }`}
  >
    <div className="relative">
      {icon}

      {active && (
        <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 border border-[#0B1326]"></div>
      )}
    </div>

    <span className="text-[10px] font-mono">{label}</span>
  </button>
);

const AnimatedOverlay = ({ className }) => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition({
        x: (Math.random() - 0.5) * 40,
        y: (Math.random() - 0.5) * 40,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`absolute rounded-full blur-3xl transition-all duration-[5000ms] ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    />
  );
};
// FraudDashboard.jsx
import React from "react";
import {
  Search,
  Bell,
  User,
  Shield,
  Users,
  Map,
  Settings,
  HelpCircle,
  RefreshCw,
  AlertTriangle,
  Building2,
  Factory,
  Cloud,
  Eye,
  Ban,
  Bot,
} from "lucide-react";

const vendors = [
  {
    name: "Hyperion Logistics Ltd.",
    id: "#VX-9921-A",
    risk: "High Risk",
    amount: "$1,240,000",
    icon: <Building2 size={22} />,
    reason:
      "Pattern mismatch in transactional routing. 42% of recent ledger entries originate from shell entities.",
  },
  {
    name: "Apex Core Solutions",
    id: "#VX-8834-B",
    risk: "Medium Risk",
    amount: "$45,200",
    icon: <Factory size={22} />,
    reason:
      "Geographic inconsistency detected. Login credentials accessed from 4 distinct continents.",
  },
  {
    name: "Stratosphere Data",
    id: "#VX-0112-C",
    risk: "High Risk",
    amount: "$2,810,500",
    icon: <Cloud size={22} />,
    reason:
      "Invoice velocity spike. Monthly billing increased by 400% without SLA expansion.",
  },
];

const agents = [
  { name: "Agent_01: Validating Hash", active: true },
  { name: "Agent_02: Idle", active: false },
  { name: "Agent_03: Tracing IP", active: true },
  { name: "Agent_04: Port Scanning", active: true },
];

export const FraudDashboard = () => {
  return (
    <div className="min-h-screen bg-[#0B1326] text-white flex font-sans">
      {/* Sidebar */}
      <aside className="w-[280px] fixed left-0 top-0 h-screen bg-[#131B2E] border-r border-slate-700 flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-300">
            Worldcup AI
          </h1>
          <p className="text-sm text-slate-400">Command Center</p>
        </div>

        <nav className="flex-1 px-3 space-y-2">
          <SidebarItem icon={<Shield />} title="Fraud Detection" active />
          <SidebarItem icon={<Users />} title="Crowd Monitor" />
          <SidebarItem icon={<Map />} title="Map" />
        </nav>

        <div className="border-t border-slate-700 p-4 space-y-3">
          <div className="flex items-center gap-3 bg-[#1A2338] p-3 rounded-xl">
            <div className="bg-indigo-500/20 p-2 rounded-lg">
              <Bot className="text-indigo-300" />
            </div>

            <div>
              <p className="font-medium">Agentic AI</p>
              <p className="text-xs text-cyan-400">Active Security</p>
            </div>
          </div>

          <SidebarItem icon={<Settings />} title="Settings" />
          <SidebarItem icon={<HelpCircle />} title="Support" />
        </div>
      </aside>

      {/* Main */}
      <div className="ml-[280px] flex-1">
        {/* Topbar */}
        <header className="h-16 border-b border-slate-700 bg-[#0B1326]/80 backdrop-blur fixed top-0 left-[280px] right-0 z-50 flex items-center justify-between px-8">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Scan vendor ID..."
              className="bg-[#111827] border border-slate-700 rounded-lg pl-10 pr-4 py-2 w-80 outline-none focus:border-indigo-400"
            />
          </div>

          <div className="flex items-center gap-4">
            <Bell className="text-slate-400 hover:text-white cursor-pointer" />

            <div className="w-px h-6 bg-slate-700" />

            <div className="flex items-center gap-2 cursor-pointer">
              <User />
              <span className="text-sm">Chief Security Officer</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="pt-24 px-8 pb-10">
          {/* Header */}
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">
                Fraud Intelligence Dashboard
              </h2>

              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <p className="text-sm text-cyan-300">
                  System Pulse: High-Fidelity Monitoring Active
                </p>
              </div>
            </div>

            <button className="bg-indigo-600 hover:bg-indigo-500 transition px-5 py-3 rounded-lg flex items-center gap-2 font-medium">
              <RefreshCw size={18} />
              RERUN SCAN
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-12 gap-6">
            {/* Risk Card */}
            <div className="col-span-4 bg-[#131B2E]/80 border border-slate-700 rounded-2xl p-6 backdrop-blur">
              <div className="flex items-center justify-between mb-6">
                <p className="uppercase text-sm text-slate-400">
                  Global Risk Index
                </p>

                <AlertTriangle className="text-red-400" />
              </div>

              <div className="flex items-end gap-3 mb-5">
                <h3 className="text-6xl font-bold text-indigo-300">64.2</h3>
                <span className="text-red-400 text-sm">+4.2% (24h)</span>
              </div>

              <div className="w-full bg-slate-700 rounded-full h-2 mb-6">
                <div className="bg-indigo-400 h-2 rounded-full w-[64%]" />
              </div>

              <div className="grid grid-cols-3 text-center border-t border-slate-700 pt-5">
                <StatItem title="Flagged" value="12" />
                <StatItem title="Scanning" value="1.4k" />
                <StatItem title="Cleared" value="892" success />
              </div>
            </div>

            {/* Map */}
            <div className="col-span-8 relative overflow-hidden rounded-2xl border border-slate-700 min-h-[320px]">
              <img
                src="https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=1400&auto=format&fit=crop"
                alt="Map"
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1326] to-transparent" />

              <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                <div className="flex justify-between">
                  <div>
                    <h4 className="text-2xl font-semibold">
                      Alert Distribution
                    </h4>

                    <p className="text-slate-300 text-sm">
                      Live Geographic Visualization
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Badge label="APAC: LOW" />
                    <Badge label="EMEA: CRITICAL" danger />
                  </div>
                </div>

                {/* Hotspots */}
                <div className="relative flex-1">
                  <div className="absolute top-10 left-1/2 w-4 h-4 rounded-full bg-red-500 animate-ping" />
                  <div className="absolute bottom-16 left-20 w-4 h-4 rounded-full bg-red-500 animate-ping" />
                  <div className="absolute top-20 right-24 w-4 h-4 rounded-full bg-red-500 animate-ping" />
                </div>
              </div>
            </div>

            {/* Vendors */}
            <div className="col-span-12 bg-[#131B2E]/80 border border-slate-700 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-slate-700">
                <h4 className="text-2xl font-semibold">Flagged Vendors</h4>
                <p className="text-slate-400 text-sm">
                  High-priority AI-detected anomalies
                </p>
              </div>

              <div>
                {vendors.map((vendor, index) => (
                  <VendorRow key={index} vendor={vendor} />
                ))}
              </div>
            </div>

            {/* Agents */}
            <div className="col-span-12 bg-[#131B2E]/80 border border-slate-700 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-2xl font-semibold">
                  Active Security Agents
                </h4>

                <span className="text-slate-400 text-sm">
                  03:42:01 UTC
                </span>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                {agents.map((agent, index) => (
                  <div
                    key={index}
                    className="bg-[#1A2338] border border-slate-700 rounded-xl p-4 flex items-center gap-3"
                  >
                    <div
                      className={`w-3 h-3 rounded-full ${
                        agent.active
                          ? "bg-cyan-400 animate-pulse"
                          : "bg-slate-500"
                      }`}
                    />

                    <p className="text-sm">{agent.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* Components */

function SidebarItem({ icon, title, active }) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
        active
          ? "bg-indigo-500/10 text-indigo-300 border border-indigo-500/30"
          : "text-slate-400 hover:bg-[#1A2338] hover:text-white"
      }`}
    >
      {icon}
      <span>{title}</span>
    </button>
  );
}

function StatItem({ title, value, success }) {
  return (
    <div>
      <p className="text-sm text-slate-400">{title}</p>
      <p
        className={`text-2xl font-bold ${
          success ? "text-cyan-400" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function Badge({ label, danger }) {
  return (
    <div
      className={`px-3 py-1 rounded-lg text-xs font-semibold border ${
        danger
          ? "bg-red-500/10 border-red-500/30 text-red-400"
          : "bg-cyan-500/10 border-cyan-500/30 text-cyan-300"
      }`}
    >
      {label}
    </div>
  );
}

function VendorRow({ vendor }) {
  return (
    <div className="p-6 border-b border-slate-700 flex items-center gap-6 hover:bg-indigo-500/5 transition">
      <div className="bg-[#1A2338] border border-slate-700 p-3 rounded-xl">
        {vendor.icon}
      </div>

      <div className="w-64">
        <h5 className="font-semibold">{vendor.name}</h5>
        <p className="text-sm text-slate-400">{vendor.id}</p>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <span
            className={`text-xs px-3 py-1 rounded-full font-semibold ${
              vendor.risk === "High Risk"
                ? "bg-red-500/20 text-red-400"
                : "bg-cyan-500/20 text-cyan-300"
            }`}
          >
            {vendor.risk}
          </span>

          <span className="text-sm text-slate-400">Rationale:</span>
        </div>

        <p className="text-sm italic text-slate-300">
          "{vendor.reason}"
        </p>
      </div>

      <div className="text-right w-40">
        <p className="font-semibold">{vendor.amount}</p>
        <p className="text-sm text-slate-400">Pending Exposure</p>
      </div>

      <div className="flex gap-2">
        <button className="p-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10">
          <Ban size={18} />
        </button>

        <button className="p-2 rounded-lg border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10">
          <Eye size={18} />
        </button>
      </div>
    </div>
  );
}
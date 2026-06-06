// BookingLogistics.jsx

import React from "react";
import {
  Plane,
  Shield,
  Users,
  Map,
  Settings,
  HelpCircle,
  Bell,
  UserCircle,
  Search,
  Car,
  Zap,
  Send,
  Mic,
  XCircle,
  Bot,
  CheckCircle,
  Star,
} from "lucide-react";

export const Booking = () => {
  return (
    <div className="bg-[#0B1326] text-[#DAE2FD] min-h-screen overflow-hidden flex font-['Inter']">
      {/* SIDEBAR */}
      <aside className="w-[280px] fixed left-0 top-0 h-screen bg-[#131B2E] border-r border-[#434656] flex flex-col py-8 z-50">
        <div className="px-6 mb-10">
          <h1 className="text-2xl font-bold text-[#B8C3FF]">
            Worldcup AI
          </h1>

          <p className="text-sm text-[#C4C5D9] opacity-70">
            Command Center
          </p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <SidebarItem
            active
            icon={<Plane size={20} />}
            label="Booking"
          />

          <SidebarItem
            icon={<Shield size={20} />}
            label="Fraud Detection"
          />

          <SidebarItem
            icon={<Users size={20} />}
            label="Crowd Monitor"
          />

          <SidebarItem icon={<Map size={20} />} label="Map" />
        </nav>

        <div className="border-t border-[#434656] pt-6 px-4">
          <div className="flex items-center gap-3 px-3 py-3 mb-5">
            <img
              src="https://i.pravatar.cc/100"
              alt=""
              className="w-11 h-11 rounded-full border border-[#2E5BFF]"
            />

            <div>
              <p className="font-medium">Alpha Unit</p>

              <p className="text-xs text-cyan-400">
                Active Monitor
              </p>
            </div>
          </div>

          <SidebarItem
            icon={<Settings size={20} />}
            label="Settings"
          />

          <SidebarItem
            icon={<HelpCircle size={20} />}
            label="Support"
          />
        </div>
      </aside>

      {/* MAIN */}
      <div className="ml-[280px] flex-1 flex flex-col">
        {/* TOPBAR */}
        <header className="h-16 border-b border-[#434656] bg-[#0B1326]/80 backdrop-blur-xl flex items-center justify-between px-8 fixed top-0 left-[280px] right-0 z-40">
          <div className="relative w-full max-w-xl">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8E90A2]"
            />

            <input
              type="text"
              placeholder="Global system search..."
              className="w-full h-11 rounded-full bg-[#2D3449]/40 border border-[#434656] pl-11 pr-4 outline-none focus:border-[#2E5BFF]"
            />
          </div>

          <div className="flex items-center gap-6 ml-8">
            <button className="relative text-[#C4C5D9] hover:text-[#B8C3FF]">
              <Bell size={22} />

              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400"></span>
            </button>

            <button className="text-[#C4C5D9] hover:text-[#B8C3FF]">
              <UserCircle size={25} />
            </button>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex flex-1 pt-16 overflow-hidden">
          {/* CENTER */}
          <section className="flex-1 overflow-y-auto px-8 py-8">
            <div className="max-w-5xl mx-auto space-y-10">
              {/* HEADER */}
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-4xl font-bold">
                    Logistics Hub
                  </h2>

                  <p className="text-[#C4C5D9] mt-2">
                    Flight and ground transport orchestration
                  </p>
                </div>

                <div className="flex gap-3">
                  <Tag text="AGENT: ALPHA-1" cyan />
                  <Tag text="MODE: EXECUTION" />
                </div>
              </div>

              {/* FLIGHTS */}
              <div>
                <h3 className="text-sm uppercase tracking-[4px] text-[#B8C3FF]/70 mb-6">
                  Top Flight Recommendations
                </h3>

                <div className="space-y-5">
                  <FlightCard
                    direct
                    route="LHR → DOH"
                    airline="Qatar Airways"
                    aircraft="A380-800"
                    price="$1,240"
                    rating="4.9"
                    crowd={2}
                    button="Book"
                    primary
                  />

                  <FlightCard
                    route="LHR → DXB → DOH"
                    airline="Emirates"
                    aircraft="B777-300ER"
                    price="$980"
                    rating="4.7"
                    crowd={3}
                    button="Select"
                  />
                </div>
              </div>

              {/* GROUND */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm uppercase tracking-[4px] text-[#B8C3FF]/70">
                    Ground Logistics
                  </h3>

                  <div className="flex items-center gap-2 text-cyan-400 text-xs uppercase">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>

                    Live Crowd Data Active
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <TransportCard
                    title="Executive Black Car"
                    price="$45"
                    arrival="8 mins"
                    warning="Stadium traffic high"
                    icon={<Car />}
                  />

                  <TransportCard
                    title="Tesla Model Y (EV)"
                    price="$38"
                    arrival="4 mins"
                    warning="Eco-Route available"
                    icon={<Zap />}
                    blue
                  />
                </div>
              </div>

              {/* MAP */}
              <div className="relative h-72 rounded-3xl overflow-hidden border border-[#434656] bg-[#171F33]">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1800&auto=format&fit=crop"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1326] to-transparent"></div>

                <div className="absolute bottom-6 left-6 bg-[#171F33]/80 backdrop-blur-xl border border-cyan-400/20 rounded-2xl p-5 max-w-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-ping"></div>

                    <span className="font-semibold text-sm">
                      LUSAIL STADIUM ZONE
                    </span>
                  </div>

                  <p className="text-sm text-[#C4C5D9]">
                    Gridlock detected. Rerouting ground units
                    via Al Khawr Coastal Rd.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* RIGHT CHAT PANEL */}
          <aside className="w-[360px] bg-[#171F33] border-l border-[#434656] flex flex-col">
            {/* HEADER */}
            <div className="p-6 border-b border-[#434656] flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center relative">
                <Bot className="text-cyan-400" size={20} />

                <span className="absolute top-0 right-0 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
              </div>

              <div>
                <h4 className="font-semibold">
                  Alpha-1 Agent
                </h4>

                <p className="text-xs text-cyan-400 uppercase">
                  Synchronized
                </p>
              </div>
            </div>

            {/* CHAT */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              <AiMessage text="Welcome back. I've analyzed your itinerary. Traffic around the stadium is currently at 84% capacity." />

              <UserMessage text="Book the quickest flight to Doha and a Tesla for the airport transfer." />

              <AiMessage
                text="Understood. I've shortlisted Qatar Airways QR16. It lands at 18:45. Your Tesla will be waiting at Gate 4. Total logistics cost: $1,278. Confirm execution?"
                extra
              />

              {/* TASKS */}
              <div>
                <p className="text-[10px] uppercase tracking-[3px] text-[#C4C5D9] mb-3">
                  Background Tasks
                </p>

                <div className="bg-[#131B2E] border border-[#434656] rounded-xl p-4 text-xs font-mono space-y-2 text-cyan-300">
                  <TaskRow text="MONITORING_CROWDS" />
                  <TaskRow text="FETCHING_PRICES" />
                  <TaskRow text="IDENTITY_VERIFIED" />
                  <TaskRow text="SECURE_PAYMENT_CHANNEL" />
                </div>
              </div>
            </div>

            {/* INPUT */}
            <div className="p-5 border-t border-[#434656]">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Reply to Alpha-1..."
                  className="w-full h-12 rounded-2xl bg-[#2D3449]/40 border border-[#434656] px-4 pr-12 outline-none focus:border-[#2E5BFF]"
                />

                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B8C3FF] hover:text-cyan-400">
                  <Send size={18} />
                </button>
              </div>

              <div className="flex items-center justify-between mt-4 text-xs uppercase">
                <button className="flex items-center gap-2 text-[#C4C5D9] hover:text-[#B8C3FF]">
                  <Mic size={14} />
                  Voice command
                </button>

                <button className="flex items-center gap-2 text-[#C4C5D9] hover:text-red-400">
                  <XCircle size={14} />
                  Cancel task
                </button>
              </div>
            </div>
          </aside>
        </main>
      </div>

      {/* FAB */}
      <button className="fixed bottom-8 right-[410px] h-16 px-8 rounded-full bg-cyan-400 text-black font-semibold flex items-center gap-3 shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:scale-105 transition z-50">
        <Zap size={20} />
        Execute Booking
      </button>
    </div>
  );
};



/* COMPONENTS */

const SidebarItem = ({ icon, label, active }) => (
  <button
    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition ${
      active
        ? "bg-[#2D3449]/50 text-[#B8C3FF] border-r-2 border-[#2E5BFF] font-semibold"
        : "text-[#C4C5D9] hover:bg-[#2D3449]"
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const Tag = ({ text, cyan }) => (
  <span
    className={`px-4 py-1 rounded-full text-xs border ${
      cyan
        ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/20"
        : "bg-[#2D3449]/50 text-[#C4C5D9] border-[#434656]"
    }`}
  >
    {text}
  </span>
);

const FlightCard = ({
  route,
  airline,
  aircraft,
  price,
  rating,
  crowd,
  button,
  direct,
  primary,
}) => (
  <div className="bg-[#171F33]/70 backdrop-blur-xl border border-[#434656] hover:border-[#2E5BFF]/40 transition rounded-3xl p-6 flex items-center justify-between">
    <div className="flex items-center gap-6">
      <div className="w-16 h-16 rounded-2xl bg-[#2D3449] flex items-center justify-center">
        <Plane className="text-cyan-400" size={30} />
      </div>

      <div>
        <div className="flex items-center gap-3">
          <h3 className="text-2xl font-bold">{route}</h3>

          <span className="text-[10px] uppercase px-2 py-1 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-300">
            {direct ? "Direct" : "1 Stop"}
          </span>
        </div>

        <div className="flex items-center gap-5 mt-2 text-sm text-[#C4C5D9]">
          <span>{airline}</span>

          <span className="flex items-center gap-1">
            <Star size={14} className="text-yellow-400" />
            {rating}
          </span>

          <span className="text-cyan-400 font-mono">
            {aircraft}
          </span>
        </div>
      </div>
    </div>

    <div className="flex items-center gap-10">
      <div>
        <p className="text-xs text-[#8E90A2] uppercase">
          Est. Price
        </p>

        <h4 className="text-3xl font-bold text-[#B8C3FF]">
          {price}
        </h4>
      </div>

      <div>
        <p className="text-xs text-[#8E90A2] uppercase mb-2">
          Crowd Level
        </p>

        <div className="flex gap-1">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className={`w-2 h-5 rounded-full ${
                item <= crowd
                  ? "bg-cyan-400"
                  : "bg-[#434656]"
              }`}
            />
          ))}
        </div>
      </div>

      <button
        className={`h-12 px-7 rounded-xl font-semibold transition ${
          primary
            ? "bg-[#2E5BFF] hover:brightness-110"
            : "border border-[#2E5BFF] text-[#B8C3FF] hover:bg-[#2E5BFF]/10"
        }`}
      >
        {button}
      </button>
    </div>
  </div>
);

const TransportCard = ({
  title,
  price,
  arrival,
  warning,
  icon,
  blue,
}) => (
  <div className="bg-[#171F33]/70 border border-[#434656] rounded-3xl p-5 flex items-center gap-4">
    <div className="w-14 h-14 rounded-2xl bg-[#222A3D] flex items-center justify-center text-cyan-400">
      {icon}
    </div>

    <div className="flex-1">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">{title}</h4>

        <span className="text-[#B8C3FF] font-bold">
          {price}
        </span>
      </div>

      <div className="flex items-center justify-between mt-3 text-sm">
        <span className="text-[#C4C5D9]">
          Arrival:
          <span className="text-cyan-400 ml-1">
            {arrival}
          </span>
        </span>

        <span
          className={`flex items-center gap-1 text-xs ${
            blue ? "text-cyan-400" : "text-red-400"
          }`}
        >
          <Zap size={12} />
          {warning}
        </span>
      </div>
    </div>
  </div>
);

const AiMessage = ({ text, extra }) => (
  <div className="flex flex-col items-start gap-2">
    <div className="bg-[#2D3449] rounded-2xl rounded-tl-none p-4 max-w-[90%] text-sm">
      <p>{text}</p>

      {extra && (
        <div className="mt-4 space-y-2">
          <StatusItem text="Flight Seat 14A Secured (Hold)" />
          <StatusItem text="EV Transfer Synced" />
        </div>
      )}
    </div>

    <span className="text-[10px] text-[#8E90A2]">
      14:06 PM
    </span>
  </div>
);

const UserMessage = ({ text }) => (
  <div className="flex flex-col items-end gap-2">
    <div className="bg-[#2E5BFF] text-white rounded-2xl rounded-tr-none p-4 max-w-[90%] text-sm">
      {text}
    </div>

    <span className="text-[10px] text-[#8E90A2]">
      14:05 PM
    </span>
  </div>
);

const StatusItem = ({ text }) => (
  <div className="flex items-center gap-2 bg-black/20 border border-[#434656] rounded-lg p-2 text-xs">
    <CheckCircle size={14} className="text-cyan-400" />
    {text}
  </div>
);

const TaskRow = ({ text }) => (
  <div className="flex items-center justify-between">
    <span>{">"} {text}</span>

    <span className="text-emerald-400">OK</span>
  </div>
);
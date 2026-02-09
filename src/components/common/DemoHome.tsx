import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';
import { RiMoneyDollarCircleLine, RiFileList3Line, RiUserStarLine } from "react-icons/ri";
import Card from '@/components/common/Card';

const data = [
  { name: 'Mon', revenue: 4000, orders: 240 },
  { name: 'Tue', revenue: 3000, orders: 198 },
  { name: 'Wed', revenue: 2000, orders: 150 },
  { name: 'Thu', revenue: 2780, orders: 210 },
  { name: 'Fri', revenue: 1890, orders: 120 },
  { name: 'Sat', revenue: 2390, orders: 250 },
  { name: 'Sun', revenue: 3490, orders: 310 },
];

export default function DemoHome() {
  return (
    <div className="p-6 space-y-6 bg-slate-50 w-full h-full">
      <header>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
        <p className="text-slate-500">Welcome back! Here's what's happening today.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Revenue" 
          value="$12,450" 
          change="+12.5%" 
          icon={<RiMoneyDollarCircleLine className="text-green-medium size-8" />} 
        />
        <StatCard 
          title="Total Orders" 
          value="842" 
          change="+5.2%" 
          icon={<RiFileList3Line className="text-green-medium size-8" />} 
        />
        <StatCard 
          title="Avg. Rating" 
          value="4.8" 
          change="+0.1" 
          icon={<RiUserStarLine className="text-green-medium size-8" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card classes="p-6">
          <h3 className="font-bold mb-4 text-slate-700">Revenue Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ab68b" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0ab68b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Area type="monotone" dataKey="revenue" stroke="#0ab68b" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Orders Bar Chart */}
        <Card classes="p-6">
          <h3 className="font-bold mb-4 text-slate-700">Daily Orders</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f1f5f9'}} />
                <Bar dataKey="orders" fill="#92de8b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, icon }: { title: string, value: string, change: string, icon: React.ReactNode }) {
  return (
    <Card classes="p-6 flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500 font-medium">{title}</p>
        <h2 className="text-3xl font-bold text-slate-800">{value}</h2>
        <span className="text-xs font-bold text-green-medium">{change} <span className="text-slate-400 font-normal">vs last week</span></span>
      </div>
      <div className="bg-green-light/20 p-3 rounded-2xl">
        {icon}
      </div>
    </Card>
  );
}
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import { RiFileList3Line, RiMoneyRupeeCircleLine } from "react-icons/ri";
import Card from '@/components/common/Card';
import { useGetDashboardData } from './-query-hooks';
import { FaStore } from 'react-icons/fa6';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Dashboard() {
  const { data: { stats, user } = {}, isLoading } = useGetDashboardData();

  return (
    <div className="flex flex-col w-full gap-6 p-6">
      <header>
        {isLoading ? <Skeleton count={2} width={'40%'} height={30} borderRadius={15} /> :
          <>
            <h1 className="text-2xl font-bold text-slate-800">Hi! {user?.name}</h1>
            <p className="text-slate-500">Welcome back! Here's what's happening today.</p>
          </>
        }
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading ?
          <>
            <Skeleton height={100} borderRadius={15} />
            <Skeleton height={100} borderRadius={15} />
            <Skeleton height={100} borderRadius={15} />
          </>
          :
          <>
            <StatCard
              title="Outlet"
              value={user?.outletName}
              icon={<FaStore className="text-green-medium size-8" />}
            />
            <StatCard
              title="Today's Revenue"
              value={`₹${stats?.todaySales}`}
              icon={<RiMoneyRupeeCircleLine className="text-green-medium size-8" />}
            />
            <StatCard
              title="Today's Orders"
              value={stats?.todayOrders}
              icon={<RiFileList3Line className="text-green-medium size-8" />}
            />
          </>
        }
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {
          isLoading?
          <>
            <Skeleton height={330} borderRadius={15} />
            <Skeleton height={330} borderRadius={15} />
          </>
          : <>
             {/* Revenue Chart */}
        <Card className="p-6">
          <h3 className="font-bold mb-4 text-slate-700">Revenue Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats?.weeklyData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ab68b" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#0ab68b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b'}}  width={50} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="Revenue" stroke="#0ab68b" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Orders Bar Chart */}
        <Card className="p-6">
          <h3 className="font-bold mb-4 text-slate-700">Daily Orders</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.weeklyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="Parcel" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Table" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
          </>
        }
       
      </div>
    </div>
  );
}

function StatCard({ title, value, change, icon }: { title: string, value?: string | number, change?: string, icon?: React.ReactNode }) {
  return (
    <Card className="p-6 flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500 font-medium">{title}</p>
        <h2 className="text-3xl font-bold text-slate-800">{value}</h2>
        {change && <span className="text-xs font-bold text-green-medium">{change}
          <span className="text-slate-400 font-normal">vs last week</span>
        </span>}
      </div>
      <div className="bg-green-light/20 p-3 rounded-2xl">
        {icon}
      </div>
    </Card>
  );
}
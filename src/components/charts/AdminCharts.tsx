"use client";

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Heart, BarChart3 } from "lucide-react";

type DeptScore = { dept: string; score: number };
type RiskDist = { label: string; value: number; color: string };

export function RiskPieChart({ data }: { data: RiskDist[] }) {
  const hasData = data.some(d => d.value > 0);
  if (!hasData) {
    return <p className="text-sm text-secondary text-center py-8">لا توجد بيانات مخاطر</p>;
  }
  return (
    <div className="shade-card p-6">
      <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
        <Heart className="h-5 w-5 text-emerald" /> توزيع المخاطر الصحية
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value">
            {data.map((entry, idx) => (
              <Cell key={idx} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
            formatter={(value: any, name: any) => [`${value}%`, name]}
          />
          <Legend verticalAlign="bottom" formatter={(value: string) => <span style={{ color: '#94A3B8', fontSize: '12px' }}>{value}</span>} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function DeptBarChart({ data }: { data: DeptScore[] }) {
  if (data.length === 0) {
    return (
      <div className="shade-card p-6">
        <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-emerald" /> مقارنة الأقسام
        </h3>
        <p className="text-sm text-secondary text-center py-8">لا توجد بيانات</p>
      </div>
    );
  }
  const colors = ['#24A170', '#3DBB84', '#8ED2B7', '#1C7E57', '#155F41'];
  return (
    <div className="shade-card p-6">
      <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
        <BarChart3 className="h-5 w-5 text-emerald" /> مقارنة الأقسام
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis dataKey="dept" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
            formatter={(value: any) => [`${value}%`, 'درجة العافية']}
          />
          <Bar dataKey="score" radius={[6, 6, 0, 0]} maxBarSize={40}>
            {data.map((_, idx) => (
              <Cell key={idx} fill={colors[idx % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

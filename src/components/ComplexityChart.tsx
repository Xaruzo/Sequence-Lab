import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { useStore } from '../store/useStore';
import { LineChart as ChartIcon, Info } from 'lucide-react';

export const ComplexityChart: React.FC = () => {
  const { chartData, envInfo, tabulationResult } = useStore();

  // Only show the chart once at least one calculation has been performed
  if (!tabulationResult && chartData.length <= 1) return null;

  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-800 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
            <ChartIcon size={18} />
          </div>
          <div>
            <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
              Complexity Analysis
            </h3>
            <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">
              Scaling Performance Trend
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 px-3 py-1.5 bg-zinc-50 dark:bg-zinc-950 rounded-full border border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-tighter">
              {envInfo.browser}
            </span>
          </div>
          <div className="w-px h-3 bg-zinc-200 dark:bg-zinc-800" />
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">
            {envInfo.os}
          </span>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorTab" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorMemo" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" className="dark:stroke-zinc-800" />
            <XAxis 
              dataKey="n" 
              stroke="#a1a1aa" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              label={{ value: 'Input Index (n)', position: 'insideBottom', offset: -5, fontSize: 10, fill: '#a1a1aa' }}
            />
            <YAxis 
              stroke="#a1a1aa" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              label={{ value: 'Time (ms)', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#a1a1aa' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                borderRadius: '8px', 
                border: 'none', 
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                fontSize: '11px',
                color: '#18181b'
              }}
              itemStyle={{ padding: '2px 0' }}
            />
            <Legend 
              verticalAlign="top" 
              align="right" 
              iconType="circle" 
              iconSize={8}
              wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', paddingBottom: '20px' }}
            />
            <Area 
              type="monotone" 
              dataKey="tabulation" 
              stroke="#2563eb" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorTab)" 
              name="Tabulation"
              animationDuration={1500}
            />
            <Area 
              type="monotone" 
              dataKey="memoization" 
              stroke="#a855f7" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorMemo)" 
              name="Memoization"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 flex items-start gap-2 text-[10px] text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-950 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800">
        <Info size={14} className="mt-0.5 text-blue-500 shrink-0" />
        <p className="leading-relaxed">
          The chart tracks your performance history. As you test different values of <span className="font-bold">n</span>, you'll see how the <span className="text-blue-600 dark:text-blue-400 font-bold underline decoration-blue-500/30 underline-offset-2">iterative overhead</span> of Tabulation compares to the <span className="text-purple-600 dark:text-purple-400 font-bold underline decoration-purple-500/30 underline-offset-2">recursive overhead</span> of Memoization.
        </p>
      </div>
    </div>
  );
};

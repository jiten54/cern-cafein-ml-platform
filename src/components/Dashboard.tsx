import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Database, 
  Cpu, 
  Network, 
  AlertTriangle, 
  Search, 
  Terminal, 
  Layers, 
  Zap, 
  Globe, 
  Server,
  ChevronRight,
  Menu,
  X,
  MessageSquare,
  Bot
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  Cell
} from 'recharts';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

// --- Mock Data Generators ---

const generateAnomalyData = () => {
  return Array.from({ length: 50 }, (_, i) => {
    const base = Math.sin(i * 0.2) * 10 + 50;
    const noise = Math.random() * 5;
    const isAnomaly = Math.random() > 0.95;
    return {
      time: i,
      value: isAnomaly ? base + 30 : base + noise,
      anomaly: isAnomaly ? 1 : 0,
    };
  });
};

const generateFederatedData = () => {
  return [
    { name: 'Node-Geneva', accuracy: 88, loss: 0.12, status: 'Active' },
    { name: 'Node-Chicago', accuracy: 85, loss: 0.15, status: 'Active' },
    { name: 'Node-Tokyo', accuracy: 82, loss: 0.18, status: 'Syncing' },
    { name: 'Node-London', accuracy: 89, loss: 0.11, status: 'Active' },
    { name: 'Node-Paris', accuracy: 87, loss: 0.13, status: 'Idle' },
  ];
};

const generateResourceData = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    time: i,
    cpu: 40 + Math.random() * 40,
    mem: 30 + Math.random() * 50,
  }));
};

// --- Sub-components ---

const SidebarItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      active 
        ? 'bg-primary/10 text-primary border-l-4 border-primary' 
        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium text-sm">{label}</span>
  </button>
);

const PlatformStatus = () => {
  const [resources, setResources] = useState(generateResourceData());

  useEffect(() => {
    const interval = setInterval(() => {
      setResources(prev => [...prev.slice(1), { 
        time: prev[prev.length - 1].time + 1, 
        cpu: 40 + Math.random() * 40, 
        mem: 30 + Math.random() * 50 
      }]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-2 bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="text-primary" size={20} />
            CAFEIN Platform Infrastructure
          </CardTitle>
          <CardDescription>Real-time Kubernetes cluster resource allocation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={resources}>
                <defs>
                  <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" hide />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Area type="monotone" dataKey="cpu" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorCpu)" name="CPU Load (%)" />
                <Area type="monotone" dataKey="mem" stroke="#10b981" fillOpacity={0.1} fill="#10b981" name="Memory Usage (%)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Microservices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 / 14</div>
            <div className="flex gap-1 mt-2">
              {Array.from({ length: 14 }).map((_, i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full ${i < 12 ? 'bg-primary' : 'bg-muted'}`} />
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Data Pipeline Throughput</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2 GB/s</div>
            <p className="text-xs text-emerald-500 flex items-center gap-1 mt-1">
              <Zap size={12} /> +12% from last hour
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Federated Nodes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground mt-1">Global distribution active</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const AnomalyMonitor = () => {
  const [data, setData] = useState(generateAnomalyData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const nextTime = prev[prev.length - 1].time + 1;
        const base = Math.sin(nextTime * 0.2) * 10 + 50;
        const isAnomaly = Math.random() > 0.95;
        const newValue = {
          time: nextTime,
          value: isAnomaly ? base + 30 : base + (Math.random() * 5),
          anomaly: isAnomaly ? 1 : 0,
        };
        return [...prev.slice(1), newValue];
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="text-amber-500" size={20} />
              LHC Beam Anomaly Detection
            </CardTitle>
            <CardDescription>Real-time GNN-based segmentation and anomaly scoring</CardDescription>
          </div>
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
            Live Stream
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" hide />
              <YAxis domain={[0, 100]} stroke="rgba(255,255,255,0.3)" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2} 
                dot={(props: any) => {
                  const { cx, cy, payload } = props;
                  if (payload.anomaly) {
                    return <circle cx={cx} cy={cy} r={6} fill="#ef4444" stroke="none" />;
                  }
                  return null;
                }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 rounded-lg bg-accent/50 border border-border/50">
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Model</div>
            <div className="font-mono text-sm">GNN-v4.2-Segment</div>
          </div>
          <div className="p-3 rounded-lg bg-accent/50 border border-border/50">
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Latency</div>
            <div className="font-mono text-sm">1.2ms</div>
          </div>
          <div className="p-3 rounded-lg bg-accent/50 border border-border/50">
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Recall</div>
            <div className="font-mono text-sm">99.8%</div>
          </div>
          <div className="p-3 rounded-lg bg-accent/50 border border-border/50">
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Status</div>
            <div className="flex items-center gap-2 font-mono text-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Operational
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const FederatedLearning = () => {
  const nodes = generateFederatedData();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="text-primary" size={20} />
            Federated Learning Network
          </CardTitle>
          <CardDescription>Privacy-preserving distributed training across global nodes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {nodes.map((node, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-accent/30 border border-border/50">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    node.status === 'Active' ? 'bg-emerald-500' : 
                    node.status === 'Syncing' ? 'bg-amber-500 animate-pulse' : 'bg-muted'
                  }`} />
                  <span className="font-medium">{node.name}</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Accuracy</div>
                    <div className="font-mono text-sm">{node.accuracy}%</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Loss</div>
                    <div className="font-mono text-sm">{node.loss}</div>
                  </div>
                  <Badge variant="outline" className="text-[10px] uppercase tracking-tighter">
                    {node.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="text-primary" size={20} />
            Global Model Convergence
          </CardTitle>
          <CardDescription>Aggregated model performance over training rounds</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={nodes}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" hide />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Bar dataKey="accuracy" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]}>
                  {nodes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.status === 'Active' ? 'hsl(var(--primary))' : 'hsl(var(--muted))'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-3">
              <Activity className="text-primary" size={24} />
              <div>
                <div className="text-sm font-bold">Global Accuracy: 86.4%</div>
                <div className="text-xs text-muted-foreground">Round 42/100 completed</div>
              </div>
            </div>
            <Button size="sm" variant="outline">View Details</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const RAGAssistant = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am the CAFEIN Platform Assistant. How can I help you with your MLOps or Federated Learning tasks today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    // Simulate response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Based on the CERN documentation for CAFEIN, ${input.includes('federated') ? 'federated learning is managed via the FL-aggregator microservice.' : 'you can deploy models using the standard Kubernetes pipeline.'}` 
      }]);
    }, 1000);
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="text-primary" size={20} />
          CAFEIN Knowledge Assistant
        </CardTitle>
        <CardDescription>Generative AI & RAG system for internal CERN documentation</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden flex flex-col gap-4">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  msg.role === 'user' 
                    ? 'bg-primary text-primary-foreground rounded-tr-none' 
                    : 'bg-accent border border-border/50 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="flex gap-2">
          <Input 
            placeholder="Ask about MLOps, RAG, or CAFEIN..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="bg-background/50"
          />
          <Button onClick={handleSend} size="icon">
            <ChevronRight size={20} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// --- Main Dashboard ---

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('platform');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background text-foreground flex overflow-hidden dark">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none cern-grid opacity-20" />
      <div className="fixed inset-0 pointer-events-none scanline" />

      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 0, opacity: isSidebarOpen ? 1 : 0 }}
        className="relative z-20 border-r border-border/50 bg-card/30 backdrop-blur-md overflow-hidden"
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Activity className="text-primary-foreground" size={24} />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight">CAFEIN</h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">CERN ML Platform</p>
            </div>
          </div>

          <nav className="space-y-2 flex-1">
            <SidebarItem 
              icon={Server} 
              label="Platform Status" 
              active={activeTab === 'platform'} 
              onClick={() => setActiveTab('platform')} 
            />
            <SidebarItem 
              icon={AlertTriangle} 
              label="Anomaly Monitor" 
              active={activeTab === 'anomaly'} 
              onClick={() => setActiveTab('anomaly')} 
            />
            <SidebarItem 
              icon={Globe} 
              label="Federated Learning" 
              active={activeTab === 'federated'} 
              onClick={() => setActiveTab('federated')} 
            />
            <SidebarItem 
              icon={Bot} 
              label="Knowledge Assistant" 
              active={activeTab === 'assistant'} 
              onClick={() => setActiveTab('assistant')} 
            />
            <Separator className="my-4" />
            <SidebarItem 
              icon={Database} 
              label="Data Pipelines" 
              active={activeTab === 'pipelines'} 
              onClick={() => setActiveTab('pipelines')} 
            />
            <SidebarItem 
              icon={Terminal} 
              label="MLOps Console" 
              active={activeTab === 'console'} 
              onClick={() => setActiveTab('console')} 
            />
          </nav>

          <div className="mt-auto pt-6 border-t border-border/50">
            <div className="flex items-center gap-3 p-2 rounded-lg bg-accent/50">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-emerald-500" />
              <div className="overflow-hidden">
                <p className="text-xs font-medium truncate">monijiten4@gmail.com</p>
                <p className="text-[10px] text-muted-foreground">ML Engineer (Junior)</p>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative z-10 overflow-hidden">
        {/* Header */}
        <header className="h-16 border-bottom border-border/50 bg-card/30 backdrop-blur-md flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Home</span>
              <ChevronRight size={14} />
              <span className="text-foreground font-medium capitalize">{activeTab.replace('-', ' ')}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-wider">Beam: Stable</span>
            </div>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <Input placeholder="Search experiments..." className="pl-10 w-64 bg-background/50 h-9" />
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Zap size={14} className="text-amber-500" />
              Deploy Model
            </Button>
          </div>
        </header>

        {/* Content Area */}
        <ScrollArea className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'platform' && (
                  <div className="space-y-8">
                    <div className="flex flex-col gap-1">
                      <h2 className="text-3xl font-bold tracking-tight">Platform Overview</h2>
                      <p className="text-muted-foreground">Monitoring CAFEIN microservices and Kubernetes cluster health.</p>
                    </div>
                    <PlatformStatus />
                  </div>
                )}

                {activeTab === 'anomaly' && (
                  <div className="space-y-8">
                    <div className="flex flex-col gap-1">
                      <h2 className="text-3xl font-bold tracking-tight">Anomaly Detection</h2>
                      <p className="text-muted-foreground">Real-time inference on particle accelerator beam data.</p>
                    </div>
                    <AnomalyMonitor />
                  </div>
                )}

                {activeTab === 'federated' && (
                  <div className="space-y-8">
                    <div className="flex flex-col gap-1">
                      <h2 className="text-3xl font-bold tracking-tight">Federated Learning</h2>
                      <p className="text-muted-foreground">Distributed model training across international research nodes.</p>
                    </div>
                    <FederatedLearning />
                  </div>
                )}

                {activeTab === 'assistant' && (
                  <div className="space-y-8">
                    <div className="flex flex-col gap-1">
                      <h2 className="text-3xl font-bold tracking-tight">Knowledge Assistant</h2>
                      <p className="text-muted-foreground">LLM-powered RAG system for CERN technical documentation.</p>
                    </div>
                    <RAGAssistant />
                  </div>
                )}

                {['pipelines', 'console'].includes(activeTab) && (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-4">
                      <Terminal className="text-muted-foreground" size={32} />
                    </div>
                    <h3 className="text-xl font-bold">Module Under Maintenance</h3>
                    <p className="text-muted-foreground max-w-md mt-2">
                      The {activeTab} module is currently being updated to support the new CAFEIN v2.0 API. 
                      Please check back later or contact the MLOps team.
                    </p>
                    <Button variant="outline" className="mt-6" onClick={() => setActiveTab('platform')}>
                      Return to Dashboard
                    </Button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}

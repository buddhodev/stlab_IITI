import React, { useState, useEffect } from "react";
import { 
  Terminal, 
  ArrowUpRight, 
  Database, 
  Network, 
  Download, 
  RefreshCw, 
  FileCode, 
  Check, 
  Link2, 
  Copy,
  Server,
  Activity,
  CheckCircle2
} from "lucide-react";

interface WebHookLog {
  id: string;
  timestamp: string;
  source: string;
  payloadType: string;
  data: any;
  status: "success" | "warning" | "error";
}

export default function IitiIntegrationCenter() {
  const [logs, setLogs] = useState<WebHookLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [serverState, setServerState] = useState<{ status: string; environment: string; endpoint: string }>({
    status: "offline",
    environment: "Initializing...",
    endpoint: "/api/iiti-server"
  });
  
  // Simulation Form State
  const [sourceNode, setSourceNode] = useState<string>("IIT Indore Lab-Scale Client [PHP]");
  const [payloadType, setPayloadType] = useState<string>("Bioreactor Telemetry Feed");
  const [temp, setTemp] = useState<number>(30.0);
  const [oxy, setOxy] = useState<number>(0.85);
  const [ph, setPh] = useState<number>(6.8);
  const [simulating, setSimulating] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Fetch server status and logs
  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/iiti-server");
      if (res.ok) {
        const body = await res.json();
        setLogs(body.logs || []);
        setServerState({
          status: body.status,
          environment: body.environment,
          endpoint: body.endpoint
        });
      }
    } catch (err) {
      console.warn("Failed to query Express API (might be running in client-only mode fallback)", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 8000);
    return () => clearInterval(interval);
  }, []);

  // Post simulated PHP webhook packet
  const handleSimulateSync = async (e: React.FormEvent) => {
    e.preventDefault();
    setSimulating(true);
    try {
      const res = await fetch("/api/iiti-server", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: sourceNode,
          payloadType: payloadType,
          data: {
            temperature: temp,
            oxygenFlow: oxy,
            pHValue: ph,
            simulatedByFrontEnd: true,
            timestamp_origin: new Date().toISOString()
          }
        })
      });

      if (res.ok) {
        // Fetch logs again instantly
        await fetchLogs();
      }
    } catch (err) {
      console.error("Simulation request failed", err);
    } finally {
      setSimulating(false);
    }
  };

  const copyUrl = () => {
    // Attempt to copy connector link
    navigator.clipboard.writeText(window.location.origin + "/iiti_connector.php");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Sample PHP connector code preview block
  const phpPreviewCode = `<?php
// IIT Indore Lab-Scale Client Connector Example
$API_ENDPOINT = "https://your-deployed-host.run.app/api/iiti-server";

$payload = [
    'source' => 'IIT Indore Campus Site PHP',
    'payloadType' => 'Bioreactor Telemetry Feed',
    'data' => [
        'temperature' => 30.5,
        'oxygenFlow' => 0.82,
        'pHValue' => 6.9
    ]
];

$ch = curl_init($API_ENDPOINT);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
$response = curl_exec($ch);
curl_close($ch);
?>`;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col xl:flex-row min-h-[500px]" id="iiti-integration-center">
      
      {/* Configuration & Code Deck */}
      <div className="xl:w-1/2 p-6 bg-slate-50 border-r border-slate-200 flex flex-col justify-between space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-teal-50 border border-teal-100 rounded-xl text-teal-700">
              <Network className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 tracking-tight text-lg">IITI Server Bridge</h3>
              <p className="text-xs text-slate-400 font-sans">Connect your external PHP or HTML website to our centralized API</p>
            </div>
          </div>

          <div className="space-y-4">
            
            {/* Status overview */}
            <div className="bg-white p-4 rounded-xl border border-slate-150 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gateway Status</span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  serverState.status === "online" 
                    ? "bg-teal-50 text-teal-750 border border-teal-100" 
                    : "bg-slate-100 text-slate-600 border border-slate-200"
                }`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${serverState.status === "online" ? "bg-teal-600 animate-pulse" : "bg-slate-400"}`} />
                  {serverState.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Active Endpoint</span>
                  <span className="font-mono font-bold text-slate-700 bg-slate-50 px-1 py-0.5 rounded text-[11px] block truncate transition-all">
                    {serverState.endpoint}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Environment Node</span>
                  <span className="text-slate-700 font-bold block truncate">
                    {serverState.environment}
                  </span>
                </div>
              </div>
            </div>

            {/* Simulated webhook push */}
            <form onSubmit={handleSimulateSync} className="bg-white p-4 rounded-xl border border-slate-150 shadow-sm space-y-3.5">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Simulate Incoming PHP cURL Packet</h4>
                <div className="flex gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-300" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5 text-xs">
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Source Node Name</label>
                  <input 
                    type="text" 
                    value={sourceNode} 
                    onChange={(e) => setSourceNode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium text-slate-800 focus:bg-white focus:ring-1 focus:ring-teal-500" 
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Payload Classification</label>
                  <select 
                    value={payloadType} 
                    onChange={(e) => setPayloadType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-semibold text-slate-700 focus:bg-white"
                  >
                    <option value="Bioreactor Telemetry Feed">Bioreactor Telemetry Feed</option>
                    <option value="Process Lifecycle Metrics">Process Lifecycle Metrics</option>
                    <option value="Techno-Economic Parameters">Techno-Economic Parameters</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Temperature (°C)</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    value={temp} 
                    onChange={(e) => setTemp(parseFloat(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-mono" 
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Dissolved Oxygen (KLa)</label>
                  <input 
                    type="number" 
                    step="0.05" 
                    value={oxy} 
                    onChange={(e) => setOxy(parseFloat(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-mono" 
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">pH Environment Level</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    value={ph} 
                    onChange={(e) => setPh(parseFloat(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-mono" 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={simulating}
                className="w-full bg-teal-600 hover:bg-teal-700 text-slate-950 font-bold text-xs py-2 px-4 rounded-lg cursor-pointer transition-all flex items-center justify-center gap-1.5 shadow-sm mt-2"
              >
                {simulating ? "Transmitting package..." : "Simulate PHP cURL Submit"}
              </button>
            </form>

          </div>
        </div>

        {/* Small Lab Context Summary */}
        <div className="border-t border-slate-200 pt-4 pl-2 text-xs text-slate-400 leading-normal">
          <p className="mb-1 text-[10px] uppercase font-bold text-slate-500 tracking-wider">Academic Portability Option</p>
          We provide a standalone PHP template <code className="font-mono text-[10.5px] bg-slate-150 px-1 py-0.5 rounded text-slate-600">iiti_connector.php</code> at the root layout of this portal. Put it in your PHP project directory.
        </div>
      </div>

      {/* Connection Logs Panel */}
      <div className="xl:w-1/2 p-6 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-sm font-bold text-slate-800">Dynamic Central Logs stream</h4>
              <p className="text-[11px] text-slate-400 font-sans">Transactions recorded from connected nodes in real-time</p>
            </div>
            <button 
              type="button" 
              onClick={fetchLogs} 
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition"
              title="Refresh logs"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>

          {/* Table display */}
          <div className="bg-slate-50 rounded-xl border border-slate-150 overflow-hidden">
            <div className="p-1 px-3 text-[10px] font-bold text-slate-400 bg-slate-100 uppercase tracking-widest flex justify-between">
              <span>Origin Node</span>
              <span>Classification / Metric</span>
            </div>
            
            {logs.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400 italic">
                Logs initializing or empty. Use the simulator panel to send the initial cURL transaction packet!
              </div>
            ) : (
              <div className="divide-y divide-slate-150 max-h-[290px] overflow-y-auto">
                {logs.map((log) => (
                  <div key={log.id} className="p-3 text-xs flex justify-between items-start hover:bg-white transition-all">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0" />
                        <span className="font-bold text-slate-800">{log.source}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                        {new Date(log.timestamp).toLocaleTimeString("en-US", { hour12: false })} - {log.payloadType}
                      </span>
                    </div>
                    <div className="text-right font-mono text-[10px] text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded shadow-sm max-w-[200px] truncate">
                      <code>{JSON.stringify(log.data)}</code>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Code sample with COPY block */}
        <div className="bg-slate-900 text-slate-350 p-4 rounded-xl space-y-3 font-mono text-[11px] select-all relative group overflow-hidden">
          <div className="flex justify-between items-center text-[10px] text-slate-400 font-sans border-b border-slate-800 pb-1.5">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-widest text-[#93c5fd]">
              <FileCode className="h-3.5 w-3.5" />
              php cURL snippet
            </span>
            <div className="flex items-center gap-2">
              <button 
                type="button" 
                onClick={copyUrl} 
                className="hover:text-white flex items-center gap-1 font-semibold transition cursor-pointer"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                {copied ? "Connector URL Copied!" : "Copy URL"}
              </button>
            </div>
          </div>
          
          <pre className="text-[10px] text-slate-300 leading-normal max-h-[100px] overflow-y-auto overflow-x-auto whitespace-pre">
            {phpPreviewCode}
          </pre>
          <div className="absolute right-0 bottom-0 pointer-events-none w-12 h-12 bg-gradient-to-tr from-teal-500/5 to-transparent"></div>
        </div>

      </div>

    </div>
  );
}

<?php
/**
 * IIT Indore (IITI) Sustainable Lab Connect Gateway
 * Version: 1.0.0
 * 
 * Description: 
 * This PHP script acts as a secure, pre-configured bridge between your local HTML/PHP 
 * institutional website and the centralized IITI Sustainable Technologies Laboratory server.
 * It encapsulates telemetry packet transmission, server ping tests, and data fetching 
 * using standard PHP cURL mechanisms.
 * 
 * How to download & run:
 * 1. Extract this file and place it in your PHP project directory.
 * 2. Set the GATEWAY_URL below to your deployed Cloud Run URL.
 * 3. Access this file via your local PHP server (e.g. http://localhost/iiti_connector.php).
 */

error_reporting(E_ALL);
ini_set('display_errors', 1);

// --- CONFIGURATION ---
// Paste your deployed Cloud Run URL or current developer server address here
$GATEWAY_URL = "https://ais-dev-6354boo7m5zhft2xxz3z6c-915862645800.asia-east1.run.app"; 
// Normalize gateway trailing slash
$GATEWAY_URL = rtrim($GATEWAY_URL, '/');

$API_ENDPOINT = $GATEWAY_URL . "/api/iiti-server";

// Simple message / feedback holder
$feedback = null;
$feedbackClass = "";

// Handle user actions inside this dashboard helper Page
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = isset($_POST['action']) ? $_POST['action'] : '';

    if ($action === 'ping') {
        // Perform a test connection check (GET request)
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $API_ENDPOINT);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 5);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // For simple local testing configurations

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        curl_close($ch);

        if ($error) {
            $feedback = "Connection Failed: Unable to resolve host. Details: " . $error;
            $feedbackClass = "bg-red-50 text-red-700 border-red-200";
        } elseif ($httpCode !== 200) {
            $feedback = "Server Responded with Error code: " . $httpCode . " (Gateway endpoint structure may be updating).";
            $feedbackClass = "bg-amber-50 text-amber-700 border-amber-200";
        } else {
            $data = json_decode($response, true);
            $feedback = "Success! Connected to IITI server. Host Status: " . (isset($data['status']) ? strtoupper($data['status']) : 'UNKNOWN') . ". Logs online: " . (isset($data['totalLogs']) ? $data['totalLogs'] : '0');
            $feedbackClass = "bg-emerald-50 text-emerald-700 border-emerald-200";
        }
    } 
    elseif ($action === 'sync') {
        // Transmit an actual simulated data packet from current PHP client
        $sourceName = isset($_POST['client_source']) ? filter_var($_POST['client_source'], FILTER_SANITIZE_SPECIAL_CHARS) : "PHP Campus Client";
        $payloadType = isset($_POST['payload_type']) ? $_POST['payload_type'] : "Bioreactor Simulation Sync";
        
        // Assemble dynamic payload based on form parameters
        $dataPayload = [
            'temperature' => (float)($_POST['temp'] ?? 30.0),
            'oxygenFlow' => (float)($_POST['oxygen'] ?? 0.8),
            'feedstockRate' => (float)($_POST['feedstock'] ?? 2.5),
            'pHValue' => (float)($_POST['ph'] ?? 6.8),
            'timestamp_origin' => date('Y-m-d H:i:s')
        ];

        $postFields = json_encode([
            'source' => $sourceName,
            'payloadType' => $payloadType,
            'data' => $dataPayload
        ]);

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $API_ENDPOINT);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Accept: application/json'
        ]);
        curl_setopt($ch, CURLOPT_TIMEOUT, 6);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        curl_close($ch);

        if ($error) {
            $feedback = "Data Transmit Failed: " . $error;
            $feedbackClass = "bg-red-50 text-red-700 border-red-200";
        } elseif ($httpCode !== 201) {
            $feedback = "Failed to sync. Server returned code: " . $httpCode . ". Output: " . htmlspecialchars($response);
            $feedbackClass = "bg-amber-50 text-amber-700 border-amber-200";
        } else {
            $resArr = json_decode($response, true);
            $feedback = "Packet Transmitted successfully! ID assigned by server: " . ($resArr['savedLog']['id'] ?? 'N/A');
            $feedbackClass = "bg-teal-50 text-teal-750 border-teal-100";
        }
    }
}

// Fetch current logs to display in table view (GET request)
$logs = [];
$serverStatus = "Offline / Unchecked";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $API_ENDPOINT);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 4);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$response = curl_exec($ch);
if (!curl_errno($ch) && curl_getinfo($ch, CURLINFO_HTTP_CODE) === 200) {
    $resArr = json_decode($response, true);
    if ($resArr) {
        $logs = $resArr['logs'] ?? [];
        $serverStatus = "Online (Active Workspace: " . $resArr['environment'] . ")";
    }
}
curl_close($ch);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IITI Sustainable Lab Connector</title>
    <!-- Tailwind CSS CDN for visual fidelity -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap font-sans" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #f8fafc; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
    </style>
</head>
<body class="p-4 sm:p-8">
    <div class="max-w-4xl mx-auto space-y-6">
        
        <!-- Header banner -->
        <div class="bg-gradient-to-r from-slate-900 to-teal-900 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
            <div class="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                     <span class="text-teal-400 text-[10px] font-bold uppercase tracking-widest block mb-1">IIT INDORE (IITI) CENTRAL LINK GATEWAY</span>
                     <h1 class="text-2xl font-bold tracking-tight">External PHP Portal Bridge</h1>
                     <p class="text-xs text-slate-300 mt-1">Simulate real-time biochemical parameters exchange and system diagnostics with our React core application.</p>
                </div>
                <div class="bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/15 text-xs text-right shrink-0">
                    <span class="text-slate-400 block text-[9px] uppercase font-bold">IITI Endpoint Status</span>
                    <span class="font-bold text-teal-300 font-mono"><?= htmlspecialchars($serverStatus) ?></span>
                </div>
            </div>
            <!-- Decors -->
            <div class="absolute -right-16 -bottom-16 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl"></div>
        </div>

        <!-- Connection setup panel -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            
            <div class="md:col-span-4 bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
                <h3 class="font-bold text-slate-800 text-sm border-b border-slate-100 pb-2">Gateway Parameters</h3>
                
                <form method="POST" class="space-y-3.5">
                    <div>
                        <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Active Gateway URL</label>
                        <input type="text" readonly disabled value="<?= htmlspecialchars($GATEWAY_URL) ?>" class="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-mono text-slate-500 select-all" />
                        <span class="text-[9px] text-slate-400 block mt-1">Configured in PHP source code variables.</span>
                    </div>

                    <div class="border-t border-slate-100 pt-3 flex gap-2">
                        <input type="hidden" name="action" value="ping" />
                        <button type="submit" class="w-full bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                            <svg class="h-3.5 w-3.5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            Test Server Ping
                        </button>
                    </div>
                </form>

                <div class="bg-slate-50 rounded-lg p-3 text-[11px] text-slate-500 space-y-1.5 border border-slate-100 font-sans">
                    <p class="font-bold text-slate-700 uppercase text-[9px] tracking-wide">Developer Quick Tip</p>
                    Ensure your local PHP site can bypass SSL verifications (`CURLOPT_SSL_VERIFYPEER => false`) while performing local loop diagnostics under standard academic servers.
                </div>
            </div>

            <!-- Packet Dispatch simulator form -->
            <div class="md:col-span-8 bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
                <h3 class="font-bold text-slate-800 text-sm border-b border-slate-100 pb-2">Packet Transmitter (Simulate PHP Sync)</h3>
                
                <?php if ($feedback): ?>
                    <div class="p-3.5 rounded-lg text-xs font-semibold border <?= $feedbackClass ?> transition-all">
                        <?= $feedback ?>
                    </div>
                <?php endif; ?>

                <form method="POST" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="hidden" name="action" value="sync" />
                    
                    <div class="sm:col-span-2">
                        <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Source Node Client</label>
                        <input type="text" name="client_source" value="IITI Central lab-bridge PHP [A]" required class="w-full bg-white border border-slate-250 rounded-lg p-2 text-xs font-medium text-slate-850" />
                    </div>

                    <div>
                        <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Payload Classification</label>
                        <select name="payload_type" class="w-full bg-white border border-slate-250 rounded-lg p-2 text-xs font-medium text-slate-850">
                            <option value="Bioreactor Telemetry Feed">Bioreactor Telemetry Feed</option>
                            <option value="Process Lifecycle Metrics">Process Lifecycle Metrics</option>
                            <option value="Techno-Economic Parameters">Techno-Economic Parameters</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Temperature Input (°C)</label>
                        <input type="number" step="0.1" name="temp" value="30.0" min="10" max="50" class="w-full bg-white border border-slate-250 rounded-lg p-2 text-xs font-mono text-slate-850" />
                    </div>

                    <div>
                        <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Dissolved Oxygen (KLa)</label>
                        <input type="number" step="0.05" name="oxygen" value="0.80" min="0" max="2" class="w-full bg-white border border-slate-250 rounded-lg p-2 text-xs font-mono text-slate-850" />
                    </div>

                    <div>
                        <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">pH Environment Level</label>
                        <input type="number" step="0.1" name="ph" value="6.8" min="2" max="12" class="w-full bg-white border border-slate-250 rounded-lg p-2 text-xs font-mono text-slate-850" />
                    </div>

                    <div class="sm:col-span-2 border-t border-slate-100 pt-3">
                        <button type="submit" class="w-full bg-teal-600 hover:bg-teal-700 text-slate-950 text-xs font-bold py-2.5 px-4 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm">
                            Generate & Send Telemetry cURL
                        </button>
                    </div>
                </form>
            </div>

        </div>

        <!-- Connection Logs viewer -->
        <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div class="flex justify-between items-center border-b border-slate-100 pb-2">
                <h3 class="font-bold text-slate-800 text-sm">Active Server Connection Logs (Fetched dynamically via PHP)</h3>
                <span class="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full">
                    <?= count($logs) ?> Logs Saved
                </span>
            </div>

            <?php if (empty($logs)): ?>
                <p class="text-xs text-slate-400 leading-normal italic text-center py-6">No packet exchange records found. Set up the core React server online, and transmit your first packet above!</p>
            <?php else: ?>
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr class="border-b border-slate-100 bg-slate-50 text-slate-400">
                                <th class="p-2 text-[10px] uppercase font-bold tracking-wider">Timestamp</th>
                                <th class="p-2 text-[10px] uppercase font-bold tracking-wider">Source</th>
                                <th class="p-2 text-[10px] uppercase font-bold tracking-wider">Payload Type</th>
                                <th class="p-2 text-[10px] uppercase font-bold tracking-wider">Payload Captured (JSON)</th>
                                <th class="p-2 text-[10px] uppercase font-bold tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            <?php foreach ($logs as $log): ?>
                                <tr class="hover:bg-slate-50/50">
                                    <td class="p-2 font-mono text-slate-500 font-medium text-[11px] whitespace-nowrap">
                                        <?= date('H:i:s', strtotime($log['timestamp'])) ?>
                                    </td>
                                    <td class="p-2 font-bold text-slate-800"><?= htmlspecialchars($log['source']) ?></td>
                                    <td class="p-2 text-slate-600 font-medium"><?= htmlspecialchars($log['payloadType']) ?></td>
                                    <td class="p-2 font-mono text-slate-500 text-[11px]">
                                        <code><?= htmlspecialchars(json_encode($log['data'])) ?></code>
                                    </td>
                                    <td class="p-2">
                                        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                            ACTIVE
                                        </span>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            <?php endif; ?>
        </div>

    </div>
</body>
</html>

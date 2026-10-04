import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ShieldCheck, RefreshCw } from "lucide-react";
import ServerUrlField from "@/components/connect/ServerUrlField";
import AgentClientTabs from "@/components/connect/AgentClientTabs";
import ConnectNote from "@/components/connect/ConnectNote";

export default function Connect() {
  const serverUrl = new URL("/api/mcp", window.location.origin).toString();

  return (
    <div className="min-h-screen bg-[#0E1235] cyber-grid pt-16">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="font-orbitron text-3xl font-bold text-white mb-2">
          Σύνδεση AI Agent
        </h1>
        <p className="text-white/50 text-sm font-rajdhani mb-8">
          Πώς να συνδέσεις τον αγαπημένο σου AI assistant (Claude, ChatGPT, Cursor ή οποιονδήποτε
          άλλο) με την εφαρμογή, ώστε να απαντά με βάση τα δεδομένα και τα δικαιώματα του
          λογαριασμού σου.
        </p>

        <ServerUrlField url={serverUrl} />

        <AgentClientTabs />

        <div className="flex flex-col gap-4 mt-8">
          <ConnectNote icon={ShieldCheck} title="Σύνδεση με τον λογαριασμό σου">
            <p>
              Η πρόσβαση στην εφαρμογή απαιτεί σύνδεση. Αφού προσθέσεις τον server, ο client θα
              ανοίξει τη σελίδα έγκρισης: συνδέσου με τον <strong>δικό σου λογαριασμό</strong> της
              εφαρμογής και πάτα <strong>Approve</strong>. Ο assistant ενεργεί πάντα ως εσύ — βλέπει
              και κάνει μόνο ό,τι επιτρέπει ο λογαριασμός σου.
            </p>
          </ConnectNote>
          <ConnectNote icon={RefreshCw} title="Κάνε refresh μετά από αλλαγές" variant="warning">
            <p>
              Οι assistants κρατούν προσωρινά τη λίστα με τα εργαλεία. Όταν προστίθενται νέες
              λειτουργίες, χρειάζεται refresh ή νέα έγκριση στον client, αλλιώς ο assistant δεν τις
              βλέπει.
            </p>
          </ConnectNote>
        </div>
      </div>

      <Footer />
    </div>
  );
}
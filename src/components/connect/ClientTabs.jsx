import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const CLIENTS = [
  {
    id: 'claude',
    label: 'Claude',
    steps: [
      'Άνοιξε το προφίλ σου και πήγαινε Settings → Connectors.',
      'Πάτα «Add custom connector».',
      'Δώσε ένα όνομα (π.χ. SpotlightPOS Guide) και επικόλλησε το URL από πάνω.',
      'Πάτα Add.',
    ],
  },
  {
    id: 'chatgpt',
    label: 'ChatGPT',
    steps: [
      'Πήγαινε Apps και ενεργοποίησε το Developer mode (το ChatGPT θα σου δείξει μια σχετική προειδοποίηση — αποδέξου την για να συνεχίσεις).',
      'Πάτα «Create app», δώσε όνομα και επικόλλησε το URL από πάνω.',
      'Πάτα Create.',
      'Ενεργοποίησε την εφαρμογή από το composer της συνομιλίας πριν κάνεις την πρώτη ερώτηση.',
    ],
  },
  {
    id: 'cursor',
    label: 'Cursor',
    steps: [
      'Πήγαινε Settings → Tools & Integrations και πάτα «New MCP Server» — ανοίγει το mcp.json.',
      'Πρόσθεσε μια καταχώρηση με «url» ίσο με το URL από πάνω.',
      'Αποθήκευσε το αρχείο.',
      'Ενεργοποίησε το toggle του server.',
    ],
  },
  {
    id: 'custom',
    label: 'Custom',
    steps: [
      'Αντίγραψε το URL από πάνω.',
      'Πρόσθεσέ το στον client σου ως streamable HTTP MCP server — για τους περισσότερους clients αρκούν όνομα και URL.',
      'Κάνε reload τον client.',
    ],
  },
];

export default function ClientTabs() {
  return (
    <Tabs defaultValue="claude" className="w-full">
      <TabsList className="bg-[#131840] border border-[#00CFFF]/20 p-1 h-auto flex-wrap justify-start">
        {CLIENTS.map(c => (
          <TabsTrigger
            key={c.id}
            value={c.id}
            className="font-orbitron text-xs tracking-wider text-white/60 data-[state=active]:bg-[#00CFFF] data-[state=active]:text-[#0E1235] px-4 py-2"
          >
            {c.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {CLIENTS.map(c => (
        <TabsContent key={c.id} value={c.id} className="mt-4">
          <ol className="border border-[#00CFFF]/20 bg-[#131840]/60 divide-y divide-[#00CFFF]/10">
            {c.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-4 p-4">
                <span className="w-7 h-7 flex-shrink-0 flex items-center justify-center bg-[#5B21B6] text-white text-xs font-bold">
                  {i + 1}
                </span>
                <span className="text-white/75 text-sm leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </TabsContent>
      ))}
    </Tabs>
  );
}
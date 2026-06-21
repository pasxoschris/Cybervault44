import { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import EditTicketModal from '@/components/servicedesk/EditTicketModal';

const toDisplayDate = (d) => {if (!d) return '';const [y, m, day] = d.split('-');return `${day}/${m}/${y}`;};
const toStorageDate = (d) => {const p = d.split('/');if (p.length !== 3) return d;return `${p[2]}-${p[1]}-${p[0]}`;};
const today = () => new Date().toISOString().split('T')[0];
const todayDisplay = () => toDisplayDate(today());
const nowTime = () => new Date().toTimeString().slice(0, 5);

const toGreekDate = (d) => {if (!d) return '—';const [y, m, day] = d.split('-');return `${day}/${m}/${y}`;};

const CATEGORIES = [
{ key: 'category_not_spotlight', label: 'ΔΕΝ ΑΦΟΡΟΥΣΕ ΤΗ SPOTLIGHT' },
{ key: 'category_printers', label: 'ΕΚΤΥΠΩΤΕΣ' },
{ key: 'category_settings', label: 'ΡΥΘΜΙΣΕΙΣ ΕΦΑΡΜΟΓΗΣ' },
{ key: 'category_pos', label: 'POS' },
{ key: 'category_pda', label: 'PDA' },
{ key: 'category_invoices', label: 'Τιμολόγια' }];


export default function TicketForm({ user, onSaved }) {
  const [stores, setStores] = useState([]);
  const [storesError, setStoresError] = useState('');

  useEffect(() => {
    base44.functions.invoke('getStores', {}).
    then((res) => setStores(res.data?.stores || [])).
    catch(() => setStoresError('Αδυναμία φόρτωσης καταστημάτων.'));
  }, []);

  const [form, setForm] = useState({
    date: today(),
    time: nowTime(),
    operator: user?.full_name || '',
    store_id: '',
    store: '',
    caller: '',
    phone: '',
    problem: '',
    priority: 'normal',
    resolved: false,
    notes: '',
    category_not_spotlight: false,
    category_printers: false,
    category_settings: false,
    category_pos: false,
    category_pda: false,
    category_invoices: false
  });
  const [storeSearch, setStoreSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Store ticket history
  const [storeTickets, setStoreTickets] = useState([]);
  const [storeTicketsLoading, setStoreTicketsLoading] = useState(false);
  const [storeTicketsError, setStoreTicketsError] = useState('');
  const [editingTicket, setEditingTicket] = useState(null);

  useEffect(() => {
    if (!form.store_id) {
      setStoreTickets([]);
      return;
    }
    setStoreTicketsLoading(true);
    setStoreTicketsError('');
    base44.functions.invoke('getStoreTickets', { store_id: form.store_id, store: form.store }).
    then((res) => setStoreTickets(res.data?.tickets || [])).
    catch(() => setStoreTicketsError('Αδυναμία φόρτωσης ιστορικού.')).
    finally(() => setStoreTicketsLoading(false));
  }, [form.store_id]);

  const filteredStores = stores.filter((s) => {
    const q = storeSearch.toLowerCase();
    return s.label.toLowerCase().includes(q) ||
    s.business_name.toLowerCase().includes(q) ||
    s.trade_name.toLowerCase().includes(q) ||
    s.store_name.toLowerCase().includes(q) ||
    s.vat_number.toLowerCase().includes(q);
  }).slice(0, 50);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const selectStore = (storeObj) => {
    set('store_id', storeObj.id);
    set('store', storeObj.label);
    setStoreSearch('');
    setShowDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSubmitError('');
    try {
      await base44.entities.Ticket.create(form);
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        setForm({
          date: today(), time: nowTime(), operator: user?.full_name || '',
          store_id: '', store: '', caller: '', phone: '', problem: '', priority: 'normal', resolved: false, notes: '',
          category_not_spotlight: false, category_printers: false, category_settings: false,
          category_pos: false, category_pda: false, category_invoices: false
        });
        setStoreSearch('');
        onSaved();
      }, 1200);
    } catch {
      setSubmitError('Σφάλμα καταχώρησης. Παρακαλώ δοκιμάστε ξανά.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Row: Date + Time + Operator — full width */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Ημερομηνία</label>
          <input
            type="text"
            value={toDisplayDate(form.date)}
            onChange={(e) => set('date', toStorageDate(e.target.value))}
            className="cyber-input"
            required
            placeholder="ηη/μμ/εεεε" />
          
        </div>
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Ώρα</label>
          <input
            type="text"
            value={form.time}
            onChange={(e) => set('time', e.target.value)}
            className="cyber-input"
            placeholder="ΩΩ:ΛΛ"
            pattern="[0-2][0-9]:[0-5][0-9]" />
          
        </div>
        <div>
          <label className="block text-white/40 text-xs mb-1.5">Χειριστής</label>
          <input
            type="text"
            value={form.operator}
            onChange={(e) => set('operator', e.target.value)}
            className="cyber-input"
            placeholder="Όνομα χειριστή" />
          
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-6 items-start">
        <div className="space-y-5">
          {/* Store searchable dropdown */}
          <div className="relative">
            <label className="block text-white/40 text-xs mb-1.5">Κατάστημα *</label>
            {storesError &&
            <p className="text-red-400 text-xs mb-2">{storesError}</p>
            }
            <input
              type="text"
              value={storeSearch || form.store}
              onChange={(e) => {setStoreSearch(e.target.value);set('store', '');set('store_id', '');setShowDropdown(true);}}
              onFocus={() => setShowDropdown(true)}
              className="cyber-input"
              placeholder="Αναζήτηση καταστήματος..."
              required={!form.store} />
            
            {form.store && !storeSearch &&
            <div className="absolute right-3 top-9 text-[#00CFFF] text-xs font-mono-cyber">{form.store}</div>
            }
            {showDropdown && storeSearch && filteredStores.length > 0 && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
                <div className="absolute z-50 left-0 right-0 mt-1 max-h-56 overflow-y-auto border border-[#00CFFF]/30 bg-[#0E1235] shadow-2xl shadow-black/70">
                  {filteredStores.map((s) =>
                <div
                  key={s.id}
                  onClick={() => selectStore(s)}
                  className="px-4 py-2 text-white/80 hover:bg-[#00CFFF]/10 hover:text-[#00CFFF] cursor-pointer text-sm">
                  
                      <div>{s.label}</div>
                      {s.vat_number && <div className="text-white/30 text-xs">ΑΦΜ: {s.vat_number}</div>}
                    </div>
                )}
                </div>
              </>
            )}
            {form.store &&
            <div className="mt-1 text-[#00CFFF] text-sm">✓ {form.store}</div>
            }
          </div>

          {/* Caller + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/40 text-xs mb-1.5">Ποιος κάλεσε</label>
              <input
                type="text"
                value={form.caller}
                onChange={(e) => set('caller', e.target.value)}
                className="cyber-input"
                placeholder="Όνομα καλούντα" />
              
            </div>
            <div>
              <label className="block text-white/40 text-xs mb-1.5">Τηλέφωνο</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => set('phone', e.target.value)}
                className="cyber-input"
                placeholder="6900000000" />
              
            </div>
          </div>

          {/* Problem */}
          <div>
            <label className="block text-white/40 text-xs mb-1.5">Πρόβλημα</label>
            <textarea
              value={form.problem}
              onChange={(e) => set('problem', e.target.value)}
              className="cyber-input resize-none"
              rows={3}
              placeholder="Περιγραφή προβλήματος..."
              required />
            
          </div>

          {/* Priority */}
          <div>
            <label className="block text-white/40 text-xs mb-1.5">Προτεραιότητα</label>
            <div className="grid grid-cols-4 gap-2">
              {[
              { key: 'low', label: 'ΧΑΜΗΛΗ', color: 'border-blue-400/40 text-blue-400 bg-blue-400/5' },
              { key: 'normal', label: 'ΚΑΝΟΝΙΚΗ', color: 'border-[#00CFFF]/40 text-[#00CFFF] bg-[#00CFFF]/5' },
              { key: 'high', label: 'ΥΨΗΛΗ', color: 'border-yellow-400/40 text-yellow-400 bg-yellow-400/5' },
              { key: 'urgent', label: 'ΕΠΕΙΓΟΥΣΑ', color: 'border-red-400/40 text-red-400 bg-red-400/5' }].
              map((p) =>
              <div
                key={p.key}
                onClick={() => set('priority', p.key)}
                className={`flex items-center justify-center gap-2 p-2 border cursor-pointer transition-all font-mono-cyber text-[11px] tracking-widest ${
                form.priority === p.key ?
                `${p.color} border-current` :
                'border-[#00CFFF]/15 bg-[#131840]/40 text-white/35 hover:border-[#00CFFF]/35'}`
                }>
                
                  <div className={`w-3 h-3 rounded-full border flex items-center justify-center flex-shrink-0 transition-all ${
                form.priority === p.key ? 'border-current bg-current' : 'border-[#00CFFF]/40'}`
                }>
                    {form.priority === p.key && <span className="text-[#0E1235] text-[7px] font-bold">✓</span>}
                  </div>
                  {p.label}
                </div>
              )}
            </div>
          </div>

          {/* Resolved checkbox */}
          <div
            onClick={() => set('resolved', !form.resolved)}
            className={`flex items-center gap-3 p-4 border cursor-pointer transition-all ${
            form.resolved ?
            'border-[#00CFFF]/60 bg-[#00CFFF]/10' :
            'border-[#00CFFF]/20 bg-[#131840]/60 hover:border-[#00CFFF]/40'}`
            }>
            
            <div className={`w-5 h-5 border flex items-center justify-center flex-shrink-0 transition-all ${
            form.resolved ? 'border-[#00CFFF] bg-[#00CFFF]' : 'border-[#00CFFF]/40'}`
            }>
              {form.resolved && <span className="text-[#0E1235] text-xs font-bold">✓</span>}
            </div>
            <span className="text-white/80 text-base">Επιλύθηκε ή στάλθηκε στο support@ox.one</span>
          </div>

          {/* Notes / Ενέργειες */}
          <div>
            <label className="block text-white/40 text-xs mb-1.5">Ενέργειες</label>
            <textarea
              value={form.notes}
              onChange={(e) => set('notes', e.target.value)}
              className="cyber-input resize-none"
              rows={3}
              placeholder="Ενέργειες που έγιναν..." />
            
          </div>

          {/* Categories */}
          <div>
            <label className="block text-white/40 text-xs mb-3">Το πρόβλημα αφορούσε</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {CATEGORIES.map((cat) =>
              <div
                key={cat.key}
                onClick={() => set(cat.key, !form[cat.key])}
                className={`flex items-center gap-3 p-3 border cursor-pointer transition-all ${
                form[cat.key] ?
                'border-[#00CFFF]/60 bg-[#00CFFF]/10' :
                'border-[#00CFFF]/15 bg-[#131840]/40 hover:border-[#00CFFF]/35'}`
                }>
                
                  <div className={`w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-all ${
                form[cat.key] ? 'border-[#00CFFF] bg-[#00CFFF]' : 'border-[#00CFFF]/40'}`
                }>
                    {form[cat.key] && <span className="text-[#0E1235] text-xs font-bold">✓</span>}
                  </div>
                  <span className="font-mono-cyber text-xs text-white/70 tracking-wider">{cat.label}</span>
                </div>
              )}
            </div>
          </div>

          {/* Submit */}
          {submitError &&
          <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">{submitError}</p>
          }
          <button
            type="submit"
            disabled={saving || saved || !form.store}
            className="w-full cyber-btn disabled:opacity-50 disabled:cursor-not-allowed">
            
            {saved ? '✓ ΑΠΟΘΗΚΕΥΤΗΚΕ' : saving ? 'ΑΠΟΘΗΚΕΥΣΗ...' : 'ΚΑΤΑΧΩΡΗΣΗ TICKET'}
          </button>
        </div>

        {/* Store ticket history sidebar */}
        {form.store &&
        <aside className="border border-[#00CFFF]/20 bg-[#131840]/80 p-5 space-y-4">
            <div>
              <div className="text-white/40 text-xs mb-1">Ιστορικό Καταστήματος</div>
              <h3 className="font-orbitron text-white text-sm leading-snug">{form.store}</h3>
            </div>

            {storeTicketsLoading &&
          <div className="py-8 text-center font-mono-cyber text-[#00CFFF]/40 text-xs tracking-widest">ΦΟΡΤΩΣΗ...</div>
          }

            {storeTicketsError && !storeTicketsLoading &&
          <p className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 px-3 py-2">{storeTicketsError}</p>
          }

            {!storeTicketsLoading && !storeTicketsError && storeTickets.length === 0 &&
          <div className="py-8 text-center text-white/35 text-sm">Δεν υπάρχουν προηγούμενα tickets για αυτό το κατάστημα.</div>
          }

            {!storeTicketsLoading && !storeTicketsError && storeTickets.length > 0 &&
          <div className="space-y-3 max-h-[620px] overflow-y-auto pr-1">
                {storeTickets.map((ticket) =>
            <StoreTicketCard key={ticket.id} ticket={ticket} onEdit={() => setEditingTicket(ticket)} />
            )}
              </div>
          }
          </aside>
        }
      </div>
      {editingTicket &&
      <EditTicketModal
        ticket={editingTicket}
        onClose={() => setEditingTicket(null)}
        onSaved={() => {
          setEditingTicket(null);
          if (form.store_id) {
            base44.functions.invoke('getStoreTickets', { store_id: form.store_id, store: form.store }).
            then((res) => setStoreTickets(res.data?.tickets || [])).
            catch(() => {});
          }
        }} />

      }
    </form>);

}

function StoreTicketCard({ ticket, onEdit }) {
  const activeCategories = CATEGORIES.filter((cat) => ticket[cat.key]);

  return (
    <div className="border border-[#00CFFF]/10 bg-[#0E1235]/80 p-3 space-y-2">
      <div className="flex items-center justify-between gap-2">
        <div className="font-mono-cyber text-xs text-[#00CFFF]/60">
          {toGreekDate(ticket.date)}{ticket.time ? ` · ${ticket.time}` : ''}
        </div>
        <div className="flex items-center gap-2">
          {ticket.operator &&
          <span className="text-white/40 text-xs">{ticket.operator}</span>
          }
          {ticket.caller &&
          <span className="text-white/50 text-xs">📞 {ticket.caller}</span>
          }
          {ticket.resolved &&
          <span className="px-1.5 py-0.5 text-[9px] font-mono-cyber tracking-widest border border-green-500/40 text-green-400 bg-green-500/10 whitespace-nowrap">✓ OK</span>
          }
          <button onClick={onEdit} className="text-white/20 hover:text-[#00CFFF] transition-colors ml-1" title="Επεξεργασία">
            <Pencil size={12} />
          </button>
        </div>
      </div>

      {ticket.problem &&
      <div className="text-white/80 text-sm leading-relaxed">{ticket.problem}</div>
      }

      {ticket.notes &&
      <div className="text-white/50 text-xs leading-relaxed italic">"{ticket.notes}"</div>
      }

      {activeCategories.length > 0 &&
      <div className="flex flex-wrap gap-1.5">
          {activeCategories.map((cat) =>
        <span key={cat.key} className="px-1.5 py-0.5 text-[9px] font-mono-cyber tracking-widest border border-[#00CFFF]/30 text-[#00CFFF]/70 bg-[#00CFFF]/5">
              {cat.label}
            </span>
        )}
        </div>
      }
    </div>);

}
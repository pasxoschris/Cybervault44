import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus, Trash2, GripVertical, ChevronDown, ChevronRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';

const CATEGORIES = [
  { id: 'general', label: 'Γενικά', icon: '💬' },
  { id: 'login', label: 'Σύνδεση', icon: '🔑' },
  { id: 'shift', label: 'Βάρδια', icon: '🕐' },
  { id: 'sync', label: 'Σύνδεση & Συγχρονισμός', icon: '📶' },
  { id: 'order', label: 'Παραγγελία', icon: '📝' },
  { id: 'payment', label: 'Πληρωμή', icon: '💳' },
  { id: 'invoice', label: 'Τιμολόγιο', icon: '🧾' },
  { id: 'transfer', label: 'Μεταφορά Παραγγελίας', icon: '↔️' },
  { id: 'cashier', label: 'Cashier Mode', icon: '🧑‍💻' },
  { id: 'delivery', label: 'Delivery', icon: '🛵' },
];

const getCat = (id) => CATEGORIES.find(c => c.id === id) || CATEGORIES[0];

export default function AssistantQuestions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [newCategory, setNewCategory] = useState('general');
  const [collapsed, setCollapsed] = useState({});

  const load = async () => {
    setLoading(true);
    try {
      const list = await base44.entities.AssistantSuggestedQuestion.list('display_order', 200);
      setQuestions(list);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const addQuestion = async () => {
    if (!newQuestion.trim()) return;
    setSaving(true);
    try {
      const sameCat = questions.filter(q => (q.category || 'general') === newCategory);
      const maxOrder = sameCat.reduce((m, q) => Math.max(m, q.display_order || 0), 0);
      await base44.entities.AssistantSuggestedQuestion.create({
        question: newQuestion.trim(),
        category: newCategory,
        display_order: maxOrder + 1,
        is_active: true,
      });
      setNewQuestion('');
      await load();
    } catch (e) {
      console.error(e);
    }
    setSaving(false);
  };

  const updateQuestion = async (id, value) => {
    try {
      await base44.entities.AssistantSuggestedQuestion.update(id, { question: value });
      setQuestions(prev => prev.map(q => q.id === id ? { ...q, question: value } : q));
    } catch (e) { console.error(e); }
  };

  const updateCategory = async (id, category) => {
    try {
      const sameCat = questions.filter(q => (q.category || 'general') === category && q.id !== id);
      const maxOrder = sameCat.reduce((m, q) => Math.max(m, q.display_order || 0), 0);
      await base44.entities.AssistantSuggestedQuestion.update(id, { category, display_order: maxOrder + 1 });
      await load();
    } catch (e) { console.error(e); }
  };

  const toggleActive = async (q) => {
    try {
      await base44.entities.AssistantSuggestedQuestion.update(q.id, { is_active: !q.is_active });
      await load();
    } catch (e) { console.error(e); }
  };

  const remove = async (id) => {
    try {
      await base44.entities.AssistantSuggestedQuestion.delete(id);
      await load();
    } catch (e) { console.error(e); }
  };

  const onDragEnd = async (result) => {
    if (!result.destination || result.destination.index === result.source.index) return;
    const cat = result.type;
    const sorted = questions
      .filter(q => (q.category || 'general') === cat)
      .sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
    const [moved] = sorted.splice(result.source.index, 1);
    sorted.splice(result.destination.index, 0, moved);
    setQuestions(prev => {
      const others = prev.filter(q => (q.category || 'general') !== cat);
      return [...others, ...sorted.map((q, i) => ({ ...q, display_order: i + 1 }))];
    });
    try {
      await base44.entities.AssistantSuggestedQuestion.bulkUpdate(
        sorted.map((q, i) => ({ id: q.id, display_order: i + 1 }))
      );
    } catch (e) {
      console.error(e);
      await load();
    }
  };

  const toggleCollapse = (cat) => setCollapsed(prev => ({ ...prev, [cat]: !prev[cat] }));

  const byCategory = (catId) => questions
    .filter(q => (q.category || 'general') === catId)
    .sort((a, b) => (a.display_order || 0) - (b.display_order || 0));

  return (
    <div className="min-h-screen bg-[#0E1235] cyber-grid pt-16">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="font-orbitron text-2xl font-bold text-white mb-1">Προτεινόμενες Ερωτήσεις Assistant</h1>
        <p className="text-white/50 text-sm mb-8 font-rajdhani">Διαχείριση των default ερωτήσεων ανά ενότητα — εμφανίζονται στον Spotlight POS Assistant</p>

        {/* Add new */}
        <div className="flex flex-col gap-2 mb-6 p-4 rounded-xl border border-[#00CFFF]/20 bg-[#131840]/40">
          <input
            value={newQuestion}
            onChange={e => setNewQuestion(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addQuestion()}
            placeholder="Νέα ερώτηση..."
            className="cyber-input"
            disabled={saving}
          />
          <div className="flex gap-2">
            <select
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
              className="cyber-input flex-1"
            >
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.id} className="bg-[#131840]">{c.icon} {c.label}</option>
              ))}
            </select>
            <button
              onClick={addQuestion}
              disabled={saving || !newQuestion.trim()}
              className="cyber-btn !py-2 !px-4 disabled:opacity-40 flex items-center gap-2 whitespace-nowrap"
            >
              <Plus className="w-4 h-4" /> Προσθήκη
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-[#00CFFF]/30 border-t-[#00CFFF] rounded-full animate-spin" />
          </div>
        ) : questions.length === 0 ? (
          <div className="text-center py-12 text-white/40 font-rajdhani">
            Δεν υπάρχουν ερωτήσεις. Πρόσθεσε την πρώτη παραπάνω.
          </div>
        ) : (
          <div className="space-y-4">
            {CATEGORIES.map(cat => {
              const items = byCategory(cat.id);
              if (items.length === 0) return null;
              const isCollapsed = collapsed[cat.id];
              return (
                <div key={cat.id} className="rounded-xl border border-[#00CFFF]/15 bg-[#131840]/30 overflow-hidden">
                  <button
                    onClick={() => toggleCollapse(cat.id)}
                    className="w-full flex items-center gap-2 px-4 py-3 bg-[#131840]/60 hover:bg-[#131840]/80 transition-colors"
                  >
                    {isCollapsed ? <ChevronRight className="w-4 h-4 text-[#00CFFF]" /> : <ChevronDown className="w-4 h-4 text-[#00CFFF]" />}
                    <span className="text-lg">{cat.icon}</span>
                    <span className="font-orbitron text-sm font-semibold text-white/90 flex-1 text-left">{cat.label}</span>
                    <span className="text-xs text-white/40 font-mono-cyber">{items.length}</span>
                  </button>
                  {!isCollapsed && (
                    <DragDropContext onDragEnd={onDragEnd}>
                      <Droppable droppableId={cat.id} type={cat.id}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.droppableProps} className="p-2 space-y-2">
                            {items.map((q, i) => (
                              <Draggable key={q.id} draggableId={q.id} index={i}>
                                {(prov, snapshot) => (
                                  <div
                                    ref={prov.innerRef}
                                    {...prov.draggableProps}
                                    className={`flex items-center gap-2 border rounded-lg p-2.5 transition-all ${
                                      q.is_active
                                        ? 'border-[#00CFFF]/20 bg-[#0E1235]/60'
                                        : 'border-white/10 bg-[#0E1235]/30 opacity-50'
                                    } ${snapshot.isDragging ? 'shadow-lg ring-1 ring-[#00CFFF]/40 !border-[#00CFFF]/50' : ''}`}
                                  >
                                    <button
                                      {...prov.dragHandleProps}
                                      className="text-white/30 hover:text-[#00CFFF] cursor-grab active:cursor-grabbing transition-colors touch-none"
                                      title="Σύρε για αλλαγή σειράς"
                                    >
                                      <GripVertical className="w-4 h-4" />
                                    </button>
                                    <span className="text-white/30 text-xs font-mono-cyber w-5 text-center">{i + 1}</span>
                                    <input
                                      value={q.question}
                                      onChange={e => updateQuestion(q.id, e.target.value)}
                                      className="flex-1 bg-transparent text-white/90 text-sm font-rajdhani outline-none border-b border-transparent focus:border-[#00CFFF]/30"
                                    />
                                    <select
                                      value={q.category || 'general'}
                                      onChange={e => updateCategory(q.id, e.target.value)}
                                      className="bg-[#0E1235] text-white/60 text-xs border border-white/10 rounded px-1 py-0.5 outline-none"
                                    >
                                      {CATEGORIES.map(c => (
                                        <option key={c.id} value={c.id} className="bg-[#131840]">{c.icon} {c.label}</option>
                                      ))}
                                    </select>
                                    <button
                                      onClick={() => toggleActive(q)}
                                      className={`px-2 py-1 rounded text-xs font-medium transition-all whitespace-nowrap ${
                                        q.is_active
                                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                          : 'bg-white/10 text-white/40 border border-white/20'
                                      }`}
                                    >
                                      {q.is_active ? 'Ενεργή' : 'Ανενεργή'}
                                    </button>
                                    <button
                                      onClick={() => remove(q.id)}
                                      className="text-red-400/60 hover:text-red-400 transition-colors p-1"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
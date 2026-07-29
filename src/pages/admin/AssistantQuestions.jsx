import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Plus, Trash2, GripVertical, ArrowUp, ArrowDown, Save, X } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';

export default function AssistantQuestions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const list = await base44.entities.AssistantSuggestedQuestion.list('display_order', 100);
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
      const maxOrder = questions.reduce((m, q) => Math.max(m, q.display_order || 0), 0);
      await base44.entities.AssistantSuggestedQuestion.create({
        question: newQuestion.trim(),
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

  const move = async (q, dir) => {
    const sorted = [...questions].sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
    const idx = sorted.findIndex(x => x.id === q.id);
    const swapIdx = dir === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;
    const other = sorted[swapIdx];
    try {
      await base44.entities.AssistantSuggestedQuestion.bulkUpdate([
        { id: q.id, display_order: other.display_order },
        { id: other.id, display_order: q.display_order },
      ]);
      await load();
    } catch (e) { console.error(e); }
  };

  return (
    <div className="min-h-screen bg-[#0E1235] cyber-grid pt-16">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="font-orbitron text-2xl font-bold text-white mb-1">Προτεινόμενες Ερωτήσεις Assistant</h1>
        <p className="text-white/50 text-sm mb-8 font-rajdhani">Διαχείριση των default ερωτήσεων που εμφανίζονται στον Spotlight POS Assistant</p>

        {/* Add new */}
        <div className="flex gap-2 mb-6">
          <input
            value={newQuestion}
            onChange={e => setNewQuestion(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addQuestion()}
            placeholder="Νέα ερώτηση..."
            className="cyber-input flex-1"
            disabled={saving}
          />
          <button
            onClick={addQuestion}
            disabled={saving || !newQuestion.trim()}
            className="cyber-btn !py-2 !px-4 disabled:opacity-40 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Προσθήκη
          </button>
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
          <div className="space-y-2">
            {[...questions].sort((a, b) => (a.display_order || 0) - (b.display_order || 0)).map((q, i, arr) => (
              <div
                key={q.id}
                className={`flex items-center gap-2 border rounded-xl p-3 transition-all ${
                  q.is_active
                    ? 'border-[#00CFFF]/20 bg-[#131840]/60'
                    : 'border-white/10 bg-[#131840]/30 opacity-50'
                }`}
              >
                <div className="flex flex-col">
                  <button
                    onClick={() => move(q, 'up')}
                    disabled={i === 0}
                    className="text-white/40 hover:text-[#00CFFF] disabled:opacity-20 transition-colors"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => move(q, 'down')}
                    disabled={i === arr.length - 1}
                    className="text-white/40 hover:text-[#00CFFF] disabled:opacity-20 transition-colors"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
                <input
                  value={q.question}
                  onChange={e => updateQuestion(q.id, e.target.value)}
                  className="flex-1 bg-transparent text-white/90 text-sm font-rajdhani outline-none border-b border-transparent focus:border-[#00CFFF]/30"
                />
                <button
                  onClick={() => toggleActive(q)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-all ${
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
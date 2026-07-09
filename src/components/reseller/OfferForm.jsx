import { useState, useEffect, lazy, Suspense } from 'react';
import { usePricingItems } from '@/hooks/usePricingItems';
import { usePricingCategories } from '@/hooks/usePricingCategories';
import { useResellerSettings } from '@/hooks/useResellerSettings';
import { useOfferTotals } from '@/hooks/useOfferTotals';
import { useOfferValidation } from '@/hooks/useOfferValidation';
import { useCreateOffer, useUpdateOffer } from '@/hooks/useOffers';
import { useReorderPricingItems } from '@/hooks/usePricingItems';
import {
  sortItems,
  createLineFromItem,
  addDays,
  generatePublicToken,
} from '@/lib/resellerUtils';
import CustomerForm, { EMPTY_CUSTOMER } from './offer/CustomerForm';
import EquipmentSelector from './offer/EquipmentSelector';
import OfferLinesTable from './offer/OfferLinesTable';
import OfferActions from './offer/OfferActions';

// Lazy load heavy modals
const EmailModal = lazy(() => import('./EmailModal'));
const OfferPreviewModal = lazy(() => import('./OfferPreviewModal'));

export default function OfferForm({ editOffer, onSaved }) {
  const [customer, setCustomer] = useState(EMPTY_CUSTOMER);
  const [lines, setLines] = useState([]);
  const [saving, setSaving] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [savedOffer, setSavedOffer] = useState(null);
  const [openCategories, setOpenCategories] = useState({});

  // ─── Data (React Query cached) ──────────────────────────────────
  const { data: pricingItems = [] } = usePricingItems({ activeOnly: true });
  const { data: categories = [] } = usePricingCategories({ activeOnly: true });
  const { data: settingsData } = useResellerSettings();
  const settings = settingsData || { vat_rate: 24, offer_validity_days: 30, default_vat_rate: 24 };

  const createOffer = useCreateOffer();
  const updateOffer = useUpdateOffer();
  const reorderPricingItems = useReorderPricingItems();
  const { validateOffer } = useOfferValidation();

  // ─── Load edit offer ────────────────────────────────────────────
  useEffect(() => {
    if (editOffer) {
      setCustomer({
        store_name: editOffer.store_name || '', company_legal_name: editOffer.company_legal_name || '',
        vat_number: editOffer.vat_number || '', address: editOffer.address || '',
        contact_person: editOffer.contact_person || '', email: editOffer.email || '',
        phone: editOffer.phone || '', notes: editOffer.notes || ''
      });
      try { setLines(JSON.parse(editOffer.items || '[]')); } catch { }
    } else {
      setCustomer(EMPTY_CUSTOMER);
      setLines([]);
      setSavedOffer(null);
    }
  }, [editOffer]);

  // ─── Initialize open categories (first one open) ────────────────
  useEffect(() => {
    if (categories.length > 0) {
      const openState = {};
      categories.forEach((c, idx) => { openState[c.id] = idx === 0; });
      openState['__uncategorized__'] = false;
      setOpenCategories(openState);
    }
  }, [categories]);

  // ─── Memoized totals ────────────────────────────────────────────
  const totals = useOfferTotals(lines, settings);

  // ─── Line operations ────────────────────────────────────────────
  const addLine = (item, quantity) => setLines(prev => [...prev, createLineFromItem(item, quantity)]);
  const updateLine = (id, field, val) => setLines(prev => prev.map(l => l.id === id ? { ...l, [field]: val } : l));
  const removeLine = (id) => setLines(prev => prev.filter(l => l.id !== id));

  const handleLineDragEnd = (result) => {
    if (!result.destination) return;
    setLines(prev => {
      const reordered = [...prev];
      const [moved] = reordered.splice(result.source.index, 1);
      reordered.splice(result.destination.index, 0, moved);
      return reordered;
    });
  };

  // ─── Category toggle ────────────────────────────────────────────
  const toggleCategory = (id) => setOpenCategories(prev => ({ ...prev, [id]: !prev[id] }));

  // ─── Equipment DnD (reorder within catalog) ─────────────────────
  const handleCatalogDragEnd = async (result) => {
    if (!result.destination) return;
    const catId = result.source.droppableId;
    if (catId !== result.destination.droppableId) return;

    const catItems = sortItems(pricingItems.filter(i =>
      catId === '__uncategorized__'
        ? (!i.category_id || !categories.find(c => c.id === i.category_id))
        : i.category_id === catId
    ));

    const reordered = [...catItems];
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    const updates = reordered.map((item, idx) => ({ id: item.id, display_order: idx * 10 }));
    await reorderPricingItems.mutateAsync(updates);
  };

  // ─── Customer change ─────────────────────────────────────────────
  const handleCustomerChange = (key, val) => setCustomer(c => ({ ...c, [key]: val }));

  // ─── Save ────────────────────────────────────────────────────────
  const handleSave = async (status = 'draft') => {
    setSaving(true);
    try {
      const validityDays = settings.offer_validity_days || 30;
      const expiresAt = addDays(validityDays);

      const offerData = {
        ...customer,
        status,
        items: lines,
        expires_at: expiresAt,
        subtotal_before_discount: totals.subtotalBefore,
        total_discount: totals.totalDiscount,
        subtotal_after_discount: totals.subtotalAfter,
        vat_rate: totals.vatRate,
        vat_amount: totals.vatAmount,
        final_total: totals.finalTotal,
      };

      // Validate
      const { success, errors } = validateOffer(offerData, { allowEmptyLines: true });
      if (!success) {
        console.error('Validation errors:', errors);
        setSaving(false);
        return;
      }

      let saved;
      if (editOffer) {
        saved = await updateOffer.mutateAsync({
          id: editOffer.id,
          data: offerData,
          auditAction: 'updated',
          auditDetails: { status },
        });
      } else {
        saved = await createOffer.mutateAsync(offerData);
      }
      setSavedOffer(saved);
      if (onSaved) onSaved(saved);
    } catch (err) {
      console.error('Save error:', err);
    }
    setSaving(false);
  };

  const handleClear = () => {
    setCustomer(EMPTY_CUSTOMER);
    setLines([]);
    setSavedOffer(null);
  };

  return (
    <div className="space-y-6">
      <CustomerForm customer={customer} onChange={handleCustomerChange} />

      <EquipmentSelector
        pricingItems={pricingItems}
        categories={categories}
        openCategories={openCategories}
        onToggleCategory={toggleCategory}
        onAddItem={addLine}
        onReorderItems={handleCatalogDragEnd}
      />

      {lines.length > 0 && (
        <OfferLinesTable
          lines={lines}
          onUpdateLine={updateLine}
          onRemoveLine={removeLine}
          onReorderLines={handleLineDragEnd}
          totals={totals}
        />
      )}

      <OfferActions
        saving={saving}
        linesCount={lines.length}
        hasSavedOffer={!!savedOffer}
        onSaveDraft={() => handleSave('draft')}
        onPreview={() => setShowPreview(true)}
        onSendEmail={() => { handleSave('draft'); setShowEmail(true); }}
        onClear={handleClear}
      />

      {showEmail && (
        <Suspense fallback={<div className="text-center py-12 text-white/30 text-sm">Φόρτωση...</div>}>
          <EmailModal offer={savedOffer} customer={customer} defaultSettings={settings} onClose={() => setShowEmail(false)} />
        </Suspense>
      )}
      {showPreview && (
        <Suspense fallback={<div className="text-center py-12 text-white/30 text-sm">Φόρτωση...</div>}>
          <OfferPreviewModal
            customer={customer} lines={lines}
            totals={totals}
            settings={settings} refNumber={editOffer?.reference_number || savedOffer?.reference_number}
            savedOffer={savedOffer}
            onClose={() => setShowPreview(false)}
            onSaveBeforeEmail={async () => { await handleSave('draft'); }}
          />
        </Suspense>
      )}
    </div>
  );
}
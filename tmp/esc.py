files = {
    'base44/shared/offerNotifications.ts': "import { escapeHtml } from './access.ts';",
    'base44/shared/offerAcceptance.ts': "import { escapeHtml } from './access.ts';",
    'base44/functions/verifyOfferOtp/entry.ts': "import { escapeHtml } from '../../shared/access.ts';",
}
pats = [
    ("<strong>${offer.reference_number}</strong>", "<strong>${escapeHtml(offer.reference_number)}</strong>"),
    ("<strong>${offer.reference_number || ''}</strong>", "<strong>${escapeHtml(offer.reference_number || '')}</strong>"),
    ("<strong>${offer.reference_number || '—'}</strong>", "<strong>${escapeHtml(offer.reference_number || '—')}</strong>"),
    ("<td>${offer.company_legal_name || offer.store_name || '—'}</td>", "<td>${escapeHtml(offer.company_legal_name || offer.store_name || '—')}</td>"),
    ("<td>${offer.email || '—'}</td>", "<td>${escapeHtml(offer.email || '—')}</td>"),
    ("font-family:monospace;\">${ip || '—'}</td>", "font-family:monospace;\">${escapeHtml(ip || '—')}</td>"),
    ("font-family:monospace;\">${ip}</td>", "font-family:monospace;\">${escapeHtml(ip)}</td>"),
    ("<td>${method || '—'}</td>", "<td>${escapeHtml(method || '—')}</td>"),
]
for f, imp in files.items():
    s = open(f, encoding='utf-8').read()
    n = 0
    for a, b in pats:
        n += s.count(a)
        s = s.replace(a, b)
    lines = s.split('\n')
    idx = max(i for i, l in enumerate(lines) if l.startswith('import '))
    lines.insert(idx + 1, imp)
    open(f, 'w', encoding='utf-8').write('\n'.join(lines))
    print(f, n)

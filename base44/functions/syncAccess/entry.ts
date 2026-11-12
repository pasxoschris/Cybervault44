// Ενημερώνει τα πεδία πρόσβασης (reseller_access, guide_access) ενός χρήστη
// από τις whitelists.
//   - Χωρίς body: για τον συνδεδεμένο χρήστη (καλείται στη σύνδεση / στις σελίδες).
//   - { email }: μόνο admin — για άλλον χρήστη, μετά από προσθήκη/διαγραφή στη Whitelist.
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { computeAccess } from '../../shared/access.ts';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const me = await base44.auth.me();
    if (!me) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    let body = {};
    try { body = await req.json(); } catch { body = {}; }

    let target = me;
    const requested = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    if (requested && requested !== String(me.email || '').toLowerCase()) {
      if (me.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 });
      const users = await base44.asServiceRole.entities.User.filter({ email: requested });
      if (!users || users.length === 0) {
        // Ο χρήστης δεν έχει συνδεθεί ακόμα — θα πάρει πρόσβαση στην πρώτη του σύνδεση.
        return Response.json({ ok: true, user_found: false });
      }
      target = users[0];
    }

    const access = await computeAccess(base44, target.email);
    await base44.asServiceRole.entities.User.update(target.id, access);

    return Response.json({ ok: true, user_found: true, ...access });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});

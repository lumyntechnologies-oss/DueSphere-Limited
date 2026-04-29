# Due Diligence Integration Plan
## Approved: Parallel system to audits (new models/routes/pages) to preserve existing functionality.

## Step-by-Step Implementation:

### Phase 1: Database Schema (Prisma) ✅
- [x] Update `prisma/schema.prisma`: Add `DueDiligenceRequest`, `DueDiligenceReport`, `DueDiligenceFinding`, `DueDiligenceDocument` models.
- [x] Update `lib/db/schema.ts`: Add TS interfaces.
- [x] Run `npx prisma migrate dev --name add_due_diligence` (completed).
- [x] Run `npx prisma generate` (completed - assume success).

### Phase 2: API Routes ✅
- [x] Copy `app/api/audits/` → `app/api/dues/` (CRUD + all routes created).
- [x] Adapt/test APIs.

### Phase 3: Client Dashboard ✅
- [x] Update `app/dashboard/page.tsx`: Tabs for audits/dues, combined stats/buttons.
- [x] Create `app/dashboard/new-due-diligence/page.tsx` (form).
- [x] Create `app/dashboard/due-diligence/[id]/page.tsx` (details).
- [x] Create `app/dashboard/due-diligence/page.tsx` (list).

### Phase 4: Admin Panel ✅
- [x] Update `app/admin/components/audits-manager.tsx` → RequestsManager (tabbed audits/dues).
- [x] Create `app/admin/components/due-diligence-manager.tsx` (standalone for detailed view).
- [x] Update `app/admin/page.tsx`: Nav label, import RequestsManager.

### Phase 5: UI/Content Updates ✅
- [x] Update `app/services/page.tsx`: Title/keywords for due diligence.
- [ ] Update homepage/privacy if needed.

### Phase 6: Testing
- [ ] Test create/view due diligence (org/new-hire).
### Phase 4: Admin Panel
- [ ] Rename/update `app/admin/components/audits-manager.tsx` → tabbed RequestsManager.
- [ ] Create `app/admin/components/due-diligence-manager.tsx`.

### Phase 2: API Routes
- [ ] Copy `app/api/audits/` → `app/api/dues/` (CRUD operations).
- [ ] Adapt APIs for new models (due diligence fields).

### Phase 3: Client Dashboard
- [ ] Update `app/dashboard/page.tsx`: Add Due Diligence section/tabs alongside audits.
- [ ] Create `app/dashboard/new-due-diligence/page.tsx` (form).
- [ ] Create `app/dashboard/due-diligence/[id]/page.tsx` (details).

### Phase 4: Admin Panel
- [ ] Rename/update `app/admin/components/audits-manager.tsx` → tabbed RequestsManager.
- [ ] Create `app/admin/components/due-diligence-manager.tsx`.

### Phase 5: UI/Content Updates
- [ ] Update `app/services/page.tsx`: Add due diligence services.
- [ ] Update homepage/privacy if needed.

### Phase 6: Testing
- [ ] Test create/view due diligence (org/new-hire).
- [ ] Verify audits unchanged.
- [ ] Full e2e: client → admin → reports.
y
**Next:** Await migration completion, then Phase 2 APIs.

### Phase 2: API Routes
- [ ] Copy `app/api/audits/` → `app/api/dues/` (CRUD operations).
- [ ] Adapt APIs for new models (due diligence fields).

### Phase 3: Client Dashboard
- [ ] Update `app/dashboard/page.tsx`: Add Due Diligence section/tabs alongside audits.
- [ ] Create `app/dashboard/new-due-diligence/page.tsx` (form).
- [ ] Create `app/dashboard/due-diligence/[id]/page.tsx` (details).

### Phase 4: Admin Panel
- [ ] Rename/update `app/admin/components/audits-manager.tsx` → tabbed RequestsManager.
- [ ] Create `app/admin/components/due-diligence-manager.tsx`.

### Phase 5: UI/Content Updates
- [ ] Update `app/services/page.tsx`: Add due diligence services.
- [ ] Update homepage/privacy if needed.

### Phase 6: Testing
- [ ] Test create/view due diligence (org/new-hire).
- [ ] Verify audits unchanged.
- [ ] Full e2e: client → admin → reports.

**Next:** Phase 1 schema updates. Mark complete as done.

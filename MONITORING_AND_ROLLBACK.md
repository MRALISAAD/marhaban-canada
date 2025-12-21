# 📊 Monitoring & Rollback Procedures

---

## 🔍 Real-Time Monitoring

### Browser DevTools

**Performance Monitoring:**
```javascript
// Check in console:
performance.timing.loadEventEnd - performance.timing.navigationStart
// Should be < 3000ms

// Memory usage:
performance.memory
// Should be < 50MB
```

**localStorage Monitoring:**
```javascript
// Check storage size:
const stored = localStorage.getItem('mc_checklist_offline_v1');
const bytes = new Blob([stored]).size;
console.log(`Storage: ${bytes} bytes`);
// Should be < 5KB
```

### Web Vitals Tracking

Add to production for continuous monitoring:

```javascript
// In src/app/layout.tsx
import { reportWebVitals } from 'web-vitals';

reportWebVitals((metric) => {
  console.log(metric); // Send to analytics
});
```

**Key Metrics to Monitor:**
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1

---

## 📈 Analytics Setup

### Google Analytics Integration

```javascript
// Install
npm install @react-google-analytics/core

// Add to _document.tsx
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Key Events to Track

1. **Checklist Interactions**
   ```javascript
   gtag('event', 'checkbox_toggle', {
     item_id: itemId,
     phase: phase,
     checked: isChecked
   });
   ```

2. **Completion**
   ```javascript
   gtag('event', 'checklist_complete', {
     total_items: 50,
     completed_items: 50,
     completion_time: seconds
   });
   ```

3. **Page Performance**
   ```javascript
   gtag('event', 'page_load', {
     load_time: loadTime,
     page: '/checklist'
   });
   ```

---

## 🚨 Alert Configuration

### Sentry Error Tracking

```javascript
// Install
npm install @sentry/nextjs

// Initialize in next.config.js
const withSentryConfig = require("@sentry/nextjs/withSentryConfig");

module.exports = withSentryConfig(
  { /* your Next.js config */ },
  { org: "your-org", project: "your-project" }
);
```

### Alert Thresholds

| Metric | Alert Threshold | Action |
|--------|-----------------|--------|
| **JS Errors** | > 5 per hour | Investigate |
| **Page Load Time** | > 5 seconds | Check CDN/server |
| **localStorage Quota** | > 4MB | Consider compression |
| **API Response Time** | > 2 seconds | Scale up |
| **Uptime** | < 99% | Check status page |

---

## 🔄 Health Checks

### Automated Health Check Script

```bash
#!/bin/bash
# File: scripts/health-check.sh

DOMAIN="https://yourdomain.com"
CHECKLIST_URL="$DOMAIN/checklist"

echo "🔍 Running health checks..."

# 1. Page load test
echo -n "✓ Page loads: "
curl -I $CHECKLIST_URL | grep "200\|HTTP" && echo "OK" || echo "FAILED"

# 2. Lighthouse test
echo -n "✓ Performance: "
npm run lighthouse $CHECKLIST_URL | grep "Performance" && echo "OK" || echo "FAILED"

# 3. Accessibility test
echo -n "✓ Accessibility: "
npm run test:axe && echo "OK" || echo "FAILED"

# 4. E2E tests
echo -n "✓ E2E tests: "
npm run test:playwright && echo "OK" || echo "FAILED"

echo "✅ Health check complete"
```

**Run Daily:**
```bash
# Add to cron (runs at 2am daily)
0 2 * * * cd /path/to/marhaban && bash scripts/health-check.sh
```

---

## 🔙 Rollback Procedures

### Scenario 1: Critical Bug (Rollback in < 5 minutes)

**On Vercel:**
1. Go to https://vercel.com/dashboard
2. Select project
3. Click "Deployments"
4. Find previous successful deployment
5. Click "..." menu → "Promote to Production"
6. Confirm

**Via CLI:**
```bash
git log --oneline  # Find previous commit
git revert <commit-hash>
git push origin main
# Vercel auto-deploys
```

**Verify Rollback:**
```bash
curl https://yourdomain.com/checklist
# Should return previous version
```

### Scenario 2: Build Failure (Rollback to Last Known Good)

```bash
# Find last successful commit
git log --grep="Deploy successful" --oneline | head -1

# Rollback
git revert <commit-hash>
git push origin main

# Monitor deployment
vercel logs --follow
```

### Scenario 3: Performance Degradation

```bash
# Check recent changes
git diff HEAD~5 HEAD

# Identify problematic commit
npm run lighthouse

# If performance < 80, rollback
git revert <commit-hash>
git push origin main
```

### Scenario 4: Accessibility Regression

```bash
# Run audit
npm run test:axe

# If violations > 0
npm run test:axe -- --reporter=json > violations.json

# Find problematic change
git bisect start
git bisect bad HEAD
git bisect good <last-good-commit>

# Rollback problematic commit
git revert <commit-hash>
git push origin main
```

---

## 📋 Rollback Checklist

Before starting rollback:

- [ ] Confirm issue is real (not cache)
- [ ] Check error logs for details
- [ ] Notify stakeholders
- [ ] Document issue details
- [ ] Have rollback command ready

During rollback:

- [ ] Execute rollback command
- [ ] Monitor deployment status
- [ ] Verify previous version deployed
- [ ] Run health checks
- [ ] Test manually

After rollback:

- [ ] Confirm issue resolved
- [ ] Document what went wrong
- [ ] Create issue for fix
- [ ] Plan hotfix
- [ ] Notify stakeholders

---

## 🧪 Testing Before Deployment

### Pre-Deployment Test Suite

```bash
# 1. Lint
npm run lint

# 2. Type check
npx tsc --noEmit

# 3. Build
npm run build

# 4. Unit/E2E tests
npm run test:playwright

# 5. Accessibility audit
npm run test:axe

# 6. Lighthouse
npm run lighthouse

# 7. Manual testing
# - Test all features
# - Test on mobile
# - Test keyboard nav
```

### Automated CI/CD Tests

GitHub Actions runs automatically on:
- Push to `main`
- Push to `develop`
- Pull requests

**Status:** Check at https://github.com/MRALISAAD/marhaban-canada/actions

---

## 📞 Incident Response

### On-Call Engineer Checklist

1. **Initial Assessment** (5 min)
   - Check error logs
   - Run health checks
   - Get status from monitoring

2. **Severity Assessment** (5 min)
   - Is production affected?
   - How many users impacted?
   - Business impact?

3. **Decision** (5 min)
   - Rollback or fix forward?
   - If rollback: execute immediately
   - If fix: prepare hotfix

4. **Communicate** (Ongoing)
   - Notify stakeholders
   - Update status page
   - Share ETA

5. **Resolution** (Varies)
   - Deploy fix or rollback
   - Run health checks
   - Verify issue resolved

6. **Post-Incident** (Next day)
   - RCA (Root Cause Analysis)
   - Document issue
   - Plan preventive measures

### Escalation Path

1. **On-Call Engineer** (5 min response)
2. **Team Lead** (10 min response)
3. **Project Manager** (15 min response)

---

## 📊 Success Metrics

Track these metrics after deployment:

| Metric | Target | Actual |
|--------|--------|--------|
| **Uptime** | 99.9% | - |
| **Page Load Time** | < 2s | - |
| **Bounce Rate** | < 10% | - |
| **Error Rate** | < 0.1% | - |
| **Checklist Completion** | > 70% | - |

---

## 🔐 Backup & Recovery

### Backup Strategy

```bash
# Daily backup (runs at midnight)
0 0 * * * tar czf backup-$(date +%Y%m%d).tar.gz /path/to/project

# Store backups
# - S3: 90-day retention
# - GCS: 30-day retention
# - Local: 7-day retention
```

### Recovery Procedure

```bash
# 1. Identify backup date needed
ls backups/ | grep 2024-12

# 2. Restore from backup
tar xzf backup-20241221.tar.gz

# 3. Verify restored data
npm run build
npm run test:playwright

# 4. Deploy restored version
git push origin main
```

---

## 📞 Support Contact

- **On-Call:** [Slack: @oncall]
- **Email:** support@marhabancanada.ca
- **GitHub:** [@MRALISAAD](https://github.com/MRALISAAD)

---

**Last Updated:** December 21, 2024  
**Next Review:** After first production deployment


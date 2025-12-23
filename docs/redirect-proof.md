# Preuve de Redirection - Tests Réels

**Date :** 2025-01-XX
**Statut :** ⚠️ À EXÉCUTER - Instructions ci-dessous

**IMPORTANT :** Exécuter ces commandes avec le serveur de développement démarré (`npm run dev`)

---

## Instructions pour Exécuter les Tests

**Prérequis :**
1. Le serveur de développement doit être démarré : `npm run dev`
2. Le serveur doit être accessible sur `http://localhost:3000`

**Exécuter ces commandes dans un terminal :**

```bash
# Test 1: /checklist
curl -I http://localhost:3000/checklist

# Test 2: /parcours
curl -I http://localhost:3000/parcours

# Test 3: /resources
curl -I http://localhost:3000/resources

# Test 4: /parcours/guide/steps/nas
curl -I http://localhost:3000/parcours/guide/steps/nas

# Test 5: /robots.txt
curl -I http://localhost:3000/robots.txt

# Test 6: /sitemap.xml
curl -I http://localhost:3000/sitemap.xml
```

---

## Résultats Attendus

### ✅ Tests de Redirection (doivent retourner 307 avec Location)

**1. `/checklist`**
```
HTTP/1.1 307 Temporary Redirect
Location: /fr/checklist
```

**2. `/parcours`**
```
HTTP/1.1 307 Temporary Redirect
Location: /fr/parcours
```

**3. `/resources`**
```
HTTP/1.1 307 Temporary Redirect
Location: /fr/ressources
```

**4. `/parcours/guide/steps/nas`**
```
HTTP/1.1 307 Temporary Redirect
Location: /fr/parcours/guide/steps/nas
```

### ✅ Tests d'Exclusion (doivent retourner 200 sans redirection)

**5. `/robots.txt`**
```
HTTP/1.1 200 OK
Content-Type: text/plain; charset=utf-8
```

**6. `/sitemap.xml`**
```
HTTP/1.1 200 OK
Content-Type: application/xml; charset=utf-8
```

---

## Résultats Réels

**⚠️ RÉSULTATS DES TESTS (404 détectés - middleware ne s'exécute pas) :**

Tous les tests retournent 404, ce qui signifie que le middleware ne s'exécute pas correctement.

**Problème identifié :**
- Le matcher du middleware ne correspond pas aux routes
- Le middleware n'est pas déclenché pour les URLs sans locale

**Correctif appliqué :**
- Matcher simplifié et corrigé pour capturer toutes les routes nécessaires

```bash
# Résultat Test 1: /checklist
[COLLER ICI]

# Résultat Test 2: /parcours
[COLLER ICI]

# Résultat Test 3: /resources
[COLLER ICI]

# Résultat Test 4: /parcours/guide/steps/nas
[COLLER ICI]

# Résultat Test 5: /robots.txt
[COLLER ICI]

# Résultat Test 6: /sitemap.xml
[COLLER ICI]
```

---

## Diagnostic

### Si une URL retourne 404

**Causes possibles :**
1. Le middleware ne s'exécute pas (matcher trop restrictif)
2. Le serveur n'est pas démarré
3. La route n'existe pas dans `app/[locale]/`

**Correctifs :**

**Si le matcher ne fonctionne pas :**
- Vérifier que `middleware.ts` contient bien : `matcher: ['/((?!_next|api|.*\\..*).*)']`
- Redémarrer le serveur (`npm run dev`)

**Si la redirection ne fonctionne pas :**
- Vérifier la logique dans `middleware.ts` (lignes 68-80)
- Vérifier que `isLocale()` fonctionne correctement
- Vérifier les logs du serveur Next.js pour les erreurs

### Si `/robots.txt` ou `/sitemap.xml` sont redirigés

**Cause :** Le middleware s'applique à ces fichiers.

**Correctif :** Vérifier que les exclusions dans `middleware.ts` (lignes 47-57) incluent bien ces fichiers.

---

## Validation Finale

**Après avoir exécuté les tests :**

- [ ] Toutes les URLs sans locale redirigent vers `/{locale}/...`
- [ ] `/robots.txt` et `/sitemap.xml` retournent 200 (pas de redirection)
- [ ] Aucune URL ne retourne 404
- [ ] Le header `Location` est présent dans toutes les redirections

---

## Notes

**Si les tests échouent :**
1. Vérifier que le serveur est démarré
2. Vérifier le contenu de `middleware.ts`
3. Vérifier les logs du serveur Next.js
4. Si nécessaire, ajuster le matcher ou la logique de redirection


# Checklist Finale - Publication V1 Marhaban Canada

**Date :** 2024  
**Objectif :** Valider que la V1 est prête pour publication immédiate

---

## ✅ Validation de la logique produit V1

### Les 5 étapes V1 sont présentes et accessibles

- [x] **Étape 1 : Logement** (`housing` dans `guideSteps.ts`)
  - Route : `/parcours/guide/steps/housing`
  - Statut : ✅ Existe

- [x] **Étape 2 : NAS** (`nas` dans `guideSteps.ts`)
  - Route : `/parcours/guide/steps/nas`
  - Statut : ✅ Existe

- [x] **Étape 3 : Banque** (`bank` dans `guideSteps.ts`)
  - Route : `/parcours/guide/steps/bank`
  - Statut : ✅ Existe

- [x] **Étape 4 : Téléphone / Internet** (`phone` dans `guideSteps.ts`)
  - Route : `/parcours/guide/steps/phone`
  - Statut : ✅ Existe

- [x] **Étape 5 : Santé** (`health` dans `guideSteps.ts`)
  - Route : `/parcours/guide/steps/health`
  - Statut : ✅ Existe

---

## 📄 Pages V1 - Validation

### Page d'accueil

- [x] **Route :** `/[locale]/`
- [x] **Fichier :** `src/app/[locale]/page.tsx`
- [x] **Statut :** ✅ Existe
- [ ] **À vérifier :**
  - [ ] Promesse claire affichée
  - [ ] Accès au parcours visible
  - [ ] Ton neutre, rassurant, institutionnel
  - [ ] Aucune promesse irréaliste
  - [ ] Mobile-first

### Page "Parcours"

- [x] **Route :** `/[locale]/parcours`
- [x] **Fichier :** `src/app/[locale]/parcours/page.tsx`
- [x] **Statut :** ✅ Existe
- [ ] **À vérifier :**
  - [ ] Les 5 étapes V1 sont visibles
  - [ ] Structure claire et cohérente
  - [ ] Liens vers les pages individuelles fonctionnent

### Pages individuelles (5 pages)

- [x] **Route :** `/[locale]/parcours/guide/steps/[stepId]`
- [x] **Fichier :** `src/app/[locale]/parcours/guide/steps/[stepId]/page.tsx`
- [x] **Statut :** ✅ Existe
- [ ] **À vérifier pour chaque étape :**
  - [ ] Résumé (3-4 lignes max) présent
  - [ ] "Pourquoi c'est important" présent
  - [ ] "Comment faire" (3-7 étapes simples) présent
  - [ ] "À éviter" (3-5 points max) présent
  - [ ] Sources officielles avec liens fonctionnels
  - [ ] Ton neutre, rassurant
  - [ ] Aucune promesse irréaliste

### Page "Arnaques logement"

- [x] **Route :** `/[locale]/arnaques/logement`
- [x] **Fichier :** `src/app/[locale]/arnaques/[slug]/page.tsx`
- [x] **Statut :** ✅ Existe (slug = "logement")
- [ ] **À vérifier :**
  - [ ] Contenu de prévention des arnaques présent
  - [ ] Signaux d'alarme listés
  - [ ] Règles d'or affichées
  - [ ] Actions en cas d'arnaque
  - [ ] Sources officielles

### Page "Contact"

- [x] **Route :** `/[locale]/contact`
- [x] **Fichier :** `src/app/[locale]/contact/page.tsx`
- [x] **Statut :** ✅ Existe
- [ ] **À vérifier :**
  - [ ] Disclaimers obligatoires intégrés
  - [ ] "Service d'information et d'accompagnement" mentionné
  - [ ] "Ne remplace pas les services gouvernementaux" mentionné
  - [ ] "Les démarches officielles doivent toujours être validées sur les sites gouvernementaux" mentionné

### Footer avec disclaimers

- [x] **Fichier :** `src/components/navigation/Footer.tsx`
- [x] **Statut :** ✅ Existe
- [ ] **À vérifier :**
  - [ ] Disclaimer présent dans le footer
  - [ ] "Service d'information et d'accompagnement" mentionné
  - [ ] "Ne remplace pas les services gouvernementaux" mentionné
  - [ ] "Les démarches officielles doivent toujours être validées sur les sites gouvernementaux" mentionné

---

## 📋 Contenu - Structure obligatoire

### Pour chaque étape, vérifier :

#### 1. Résumé
- [ ] 3-4 lignes maximum
- [ ] Clair et concis
- [ ] Pas de promesse irréaliste

#### 2. Pourquoi c'est important
- [ ] Présent
- [ ] Explique l'importance sans exagérer
- [ ] Ton neutre et rassurant

#### 3. Comment faire (pas à pas)
- [ ] 3 à 7 étapes simples
- [ ] Ordre logique
- [ ] Instructions claires
- [ ] Pas de jargon inutile

#### 4. À éviter (erreurs / arnaques)
- [ ] 3 à 5 points maximum
- [ ] Focus sur la prévention
- [ ] Exemples concrets d'arnaques

#### 5. Sources officielles
- [ ] Liens gouvernementaux fiables
- [ ] Tous les liens fonctionnent
- [ ] URLs à jour

---

## 🎨 Design et UX

### Mobile-first
- [ ] Toutes les pages sont responsive
- [ ] Navigation mobile fonctionnelle
- [ ] Contenu lisible sur mobile

### Accessibilité
- [ ] Navigation clavier fonctionnelle
- [ ] ARIA labels présents
- [ ] Contraste des couleurs suffisant

### Performance
- [ ] Pages chargent rapidement
- [ ] Images optimisées
- [ ] Pas de ressources inutiles

---

## ⚠️ Contraintes non négociables

### Ton et style
- [ ] Français simple, phrases courtes
- [ ] Ton neutre, rassurant, institutionnel
- [ ] Aucune promesse irréaliste
- [ ] Aucune imitation de service gouvernemental

### Contenu
- [ ] Aucun contenu superflu
- [ ] Priorité à la clarté et à la confiance
- [ ] Structure cohérente entre toutes les pages

---

## 🔗 Liens et sources

### Vérification des liens gouvernementaux

#### Logement
- [ ] [IRCC – Se loger](https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants/vie-canada/logement.html)
- [ ] [SCHL – Guide de location](https://www.cmhc-schl.gc.ca/fr/consommateurs/guide-location)
- [ ] [Tribunal administratif du logement (Québec)](https://www.tal.gouv.qc.ca)

#### NAS
- [ ] [Service Canada – Numéro d'assurance sociale](https://www.canada.ca/fr/emploi-developpement-social/services/numero-assurance-sociale.html)
- [ ] [Service Canada – Protection du NAS](https://www.canada.ca/fr/emploi-developpement-social/services/numero-assurance-sociale/proteger.html)

#### Banque
- [ ] [ACFC – Services bancaires](https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/banque.html)
- [ ] [ACFC – Liste des banques](https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/banques/liste.html)

#### Téléphone / Internet
- [ ] [CRTC – Services mobiles](https://crtc.gc.ca/fra/phone/mobile.htm)
- [ ] [CRTC – Comparateur de forfaits](https://crtc.gc.ca/fra/phone/mobile/compare.htm)

#### Santé
- [ ] [IRCC – Soins de santé](https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants/apprendre-canada/soins-sante/systeme-soins-sante.html)
- [ ] [RAMQ (Québec)](https://www.quebec.ca/sante/assurance-maladie)
- [ ] [OHIP (Ontario)](https://www.ontario.ca/page/apply-ohip-and-get-health-card)
- [ ] [MSP (Colombie-Britannique)](https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp)
- [ ] [AHCIP (Alberta)](https://www.alberta.ca/ahcip.aspx)

---

## ✅ Checklist finale avant publication

### Contenu
- [ ] Contenu des 5 étapes généré selon la structure
- [ ] Page d'accueil avec promesse claire + accès au parcours
- [ ] Page "Parcours" avec les 5 étapes
- [ ] 5 pages individuelles (une par étape)
- [ ] Page "Arnaques logement" dédiée
- [ ] Page "Contact" avec disclaimers
- [ ] Footer avec disclaimers obligatoires

### Technique
- [ ] Vérification des liens gouvernementaux (tous fonctionnels)
- [ ] Vérification du ton (neutre, rassurant, institutionnel)
- [ ] Vérification mobile-first
- [ ] Aucune promesse irréaliste
- [ ] Aucune imitation de service gouvernemental
- [ ] Tests de navigation
- [ ] Tests de responsive design

### Légale
- [ ] Disclaimers présents et visibles
- [ ] Mentions légales à jour
- [ ] Politique de confidentialité (si applicable)

---

## 🚀 Prêt pour publication ?

Une fois toutes les cases cochées, le site est prêt pour publication.

**Objectif : site publiable immédiatement.**

---

## 📝 Notes

- Si une information ne rentre pas dans les blocs définis, elle doit être supprimée.
- Priorité à la clarté et à la confiance.
- Pas de sur-ingénierie : garder simple et efficace.


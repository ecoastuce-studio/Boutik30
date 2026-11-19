# SaaS Radar

SaaS Radar est un outil pédagogique en français pour passer d'une idée de projet numérique à un premier plan de validation.

## Fonctionnalités disponibles

- Questionnaire de profil : type de projet, idée, public, problème, niveau, temps, budget, marché, objectif et contraintes.
- Trois recommandations : classement heuristique à partir d'un catalogue d'exemples et des réponses.
- Studio de projet : problème, public cible, proposition à tester, MVP, risques et premier test.
- Générateur de prompts : prompt personnalisé, modifiable, copiable et téléchargeable.
- Plan de validation en 30 tâches avec progression locale.
- Comparateur de concurrents renseigné manuellement et export CSV.
- Espace projets avec sauvegarde locale, import et export JSON.
- Laboratoire de signaux publics : Hacker News Algolia, dépôts GitHub et issues GitHub, liens vers les sources, cache local de 30 minutes et export texte.
- Google Trends : ouverture d'une page externe préremplie. SaaS Radar ne récupère pas directement les données Google Trends.

## Architecture

Le site est statique et peut être publié sur un hébergement compatible avec HTML, CSS et JavaScript.

- index.html : page principale et ordre de chargement.
- radar.js : radar existant, idées d'exemple, Hacker News, GitHub, comparaison et aide guidée.
- analysis-pro.js : diagnostic approfondi.
- studio.js : Studio de projet, recommandations, prompts, sauvegardes et plan.
- market-lab.js : laboratoire de recherche de signaux publics.

Ordre de chargement dans index.html :
1. radar.js
2. analysis-pro.js
3. studio.js
4. market-lab.js

Ne pas déplacer market-lab.js avant studio.js : le laboratoire lit les projets sauvegardés par le Studio.

## Sources publiques

- Hacker News Algolia API : discussions publiques.
- GitHub REST API : dépôts et problèmes publics.
- Google Trends : ouverture d'une page externe de recherche, sans extraction automatique.

Les API publiques peuvent imposer des limites temporaires. Les résultats ne représentent pas tous les utilisateurs et ne prouvent ni la taille d'un marché, ni la volonté de payer, ni la rentabilité. Ouvrir les sources et vérifier leur date et leur contexte.

## Limites connues

- Pas de véritable assistant IA connecté : les aides sont préécrites et le générateur de prompt assemble les informations du projet. Aucun modèle de langage n'est appelé par SaaS Radar.
- Pas de comptes utilisateurs ni de synchronisation cloud : les données sont enregistrées dans localStorage du navigateur.
- Recommandations heuristiques : les trois idées viennent d'un catalogue et d'un classement fondé sur le profil. Ce ne sont pas des opportunités de marché vérifiées.
- Concurrents renseignés manuellement : les prix, avantages et limites sont les observations de l'utilisateur.
- Pas de prévision de revenus : les objectifs déclarés ne sont pas des prévisions.

Ne jamais placer une clé API secrète dans le JavaScript exécuté dans le navigateur. Une véritable IA, des comptes et une synchronisation multi-appareils nécessiteraient un backend sécurisé et une configuration séparée.

## Vérifications manuelles recommandées

1. Ouvrir la page sur ordinateur et téléphone.
2. Parcourir les quatre étapes du questionnaire, revenir en arrière et vérifier les réponses.
3. Générer les recommandations et ouvrir une idée.
4. Générer, modifier, copier et télécharger un prompt.
5. Cocher des tâches, recharger la page et vérifier la progression.
6. Ajouter un concurrent, supprimer une fiche et exporter le CSV.
7. Exporter puis réimporter une sauvegarde JSON.
8. Lancer une recherche dans le laboratoire, ouvrir des liens et exporter le bilan.
9. Tester le comportement lorsque les API publiques ne répondent pas ou imposent une limite.

## Confidentialité

Les données du Studio et les recherches sont enregistrées localement dans le navigateur. Éviter de saisir des informations personnelles, confidentielles ou des données de connexion. Prévoir une information de confidentialité et un mécanisme de consentement adaptés avant toute collecte ou mesure d'audience destinée aux visiteurs.

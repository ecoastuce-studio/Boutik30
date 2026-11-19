# PixelBoost — site indépendant

PixelBoost est un projet distinct de SaaS Radar, rangé dans le dossier `/pixelboost` du dépôt `ecoastuce-studio/Boutik30`.

## Fichiers
- `index.html` : site public et formulaire de demande.
- `styles.css` : identité visuelle responsive.
- `app.js` : préparation locale d'un e-mail depuis le formulaire public.
- `dashboard.html` et `dashboard.js` : espace de travail local, génération de propositions, sauvegarde de briefs.

## Ce qui fonctionne dans cette version
- Site vitrine responsive.
- Présentation de l'offre, méthode et exemple fictif clairement indiqué.
- Formulaire qui prépare un e-mail dans le logiciel de messagerie du visiteur, après configuration d'une adresse de réception.
- Génération locale de trois idées de publications, de légendes et d'un calendrier éditorial à partir d'un brief.
- Copie et téléchargement du pack de contenu.
- Sauvegarde locale des briefs dans le navigateur.

## Ce qui n'est PAS automatisé
- Aucun serveur ne reçoit les formulaires : le visiteur doit envoyer le courriel prérempli lui-même.
- Les briefs et la configuration sont stockés dans le navigateur utilisé, pas dans une base de données.
- Le générateur est un ensemble de modèles JavaScript, pas une IA connectée.
- Pas de connexion à Instagram, Facebook, Gmail ou à un CRM.
- Pas de publication automatique, d'envoi de prospection, de paiement ni de facturation.
- Pas de notifications ni de synchronisation entre appareils.

## Mise en ligne
Le projet doit être publié par un hébergeur statique. Pour le publier à la racine d'un domaine PixelBoost indépendant, déployer le contenu de ce dossier comme racine du site. Si GitHub Pages est configuré pour publier la racine du dépôt, ce sous-dossier pourra être servi à l'adresse `/pixelboost/`, sous réserve de la configuration du dépôt. Aucun domaine ni déploiement n'est créé par ces fichiers.

## Avant toute utilisation réelle
1. Configurer une adresse e-mail de réception dans l'espace de travail sur chaque navigateur, ou remplacer le mécanisme mailto par un backend sécurisé.
2. Ajouter une politique de confidentialité et une durée de conservation des demandes.
3. Utiliser une adresse professionnelle autorisée et vérifier les informations légales requises.
4. Faire valider les prix, les engagements, les contrats et les paiements par un parent/tuteur légal.
5. Obtenir l'accord du commerçant avant d'utiliser son nom, son logo, ses photos ou de publier des contenus.
6. Ne pas envoyer de prospection en masse. Personnaliser les prises de contact, identifier l'expéditeur et permettre l'opposition.

## Test
Ouvrir `index.html` puis `dashboard.html` dans un navigateur moderne. Tester le formulaire avec une adresse de réception configurée dans le dashboard du même navigateur. Les données locales peuvent être effacées si le stockage du navigateur est vidé.

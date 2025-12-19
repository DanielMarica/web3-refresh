
Cette technique d'organisation s'appelle le **"Feature Folder" pattern** (Modèle par Dossier de Fonctionnalité) ou la **"Co-location"**.

Le principe est simple : au lieu de ranger les fichiers par *type* (tous les composants ensemble, tous les styles ensemble), on les range par **fonctionnalité**. Tout ce qui concerne le "Layout" vit dans le dossier `Layout`.

Voici le rôle précis de chaque acteur dans ton dossier `Layout` :

### 1. `Component.tsx` (L'Artiste / La Vue) 🎨

C'est le fichier **visuel**. Son seul travail est d'afficher du HTML (JSX) et du style (Tailwind).

* **Son rôle :** Il reçoit des données et les affiche. Il ne doit pas contenir de logique compliquée (comme des appels API directs).
* **Dans ton cas :** C'est lui qui contient la `<nav>` verte, le logo, et le menu déroulant HTML. Il utilise `<Outlet />` pour dire "affiche les pages enfants ici".
* **Pourquoi ?** Si tu veux changer la couleur de la barre de navigation, tu sais exactement où aller sans risquer de casser la logique de chargement des données.

### 2. `loader.ts` (Le Coursier / La Logistique) 🚚

C'est le fichier de **données**. Il est spécifique aux versions récentes de React Router (6.4+).

* **Son rôle :** Il part chercher les données (les utilisateurs) **AVANT** que le composant ne s'affiche. C'est lui qui parle à ton fichier `api.ts`.
* **Dans ton cas :** Il appelle `ApiClient.getUsers()`.
* **Pourquoi ?** Cela évite l'effet de "clignotement" ou de chargement infini. Quand le `Component.tsx` s'affiche, les données sont *déjà* là. On sépare l'affichage (Component) de la récupération de données (Loader).

### 3. `hooks.ts` (Le Spécialiste / L'Outilleur) 🛠️

C'est le fichier de **logique personnalisée**.

* **Son rôle :** Il cache la complexité de React (comme `useContext` ou `useOutletContext`). Il fournit une fonction simple à utiliser pour les autres composants.
* **Dans ton cas :** Tu as créé `useCurrentUser`. Au lieu d'écrire 3 lignes de code compliquées dans chaque page pour récupérer l'utilisateur connecté, tu importes juste cet outil.
* **Pourquoi ?** Si demain la façon de gérer l'utilisateur change, tu modifies uniquement ce fichier, et tout le reste de l'application se met à jour.

### 4. `index.ts` (Le Portier / La Façade) 🚪

C'est le fichier d'**export**. On appelle souvent ça un "Barrel file".

* **Son rôle :** Il sert de point d'entrée unique pour le dossier. Il décide de ce qui est "public" (accessible aux autres dossiers) et de ce qui est "privé".
* **Dans ton cas :** Il exporte le `Component` (par défaut), le `loader` et le hook.
* **Pourquoi ?** C'est pour le confort du développeur (`DX`).
* *Sans index :* `import Layout from './pages/Layout/Component';` (Moche)
* *Avec index :* `import Layout from './pages/Layout';` (Propre)



### En résumé (Analogie du Restaurant) 🍽️

* **`Layout/` (Le Dossier)** : C'est le Restaurant "Chez Expenso".
* **`Component.tsx`** : C'est la **Salle à manger**. C'est ce que le client voit (déco, tables).
* **`loader.ts`** : C'est le **Fournisseur**. Il livre les ingrédients (les Users) le matin avant l'ouverture, pour que la cuisine soit prête quand le client arrive.
* **`hooks.ts`** : C'est le **Serveur expérimenté**. Il connaît les raccourcis pour servir le client (donner le `currentUser`) sans qu'on ait besoin de lui réexpliquer le menu.
* **`index.ts`** : C'est la **Porte d'entrée**. Le client entre par là, il n'a pas besoin de passer par la porte de service ou la fenêtre.

Cette structure rend ton code **modulaire**. Si tu veux supprimer le Layout, tu supprimes le dossier, et tu es sûr d'avoir tout supprimé (vue, logique, données) sans laisser de déchets ailleurs.
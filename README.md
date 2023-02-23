# GoWithDog
Go with dog

Ce projet est une application web qui répertorie tous les lieux autorisés pour les chiens , les ballades à faire avec eux. Le projet utilise Laravel 9 pour l'API et ReactJS avec la librairie de style MUI avec Material UI pour le front-end.

Prérequis

Avant de pouvoir exécuter l'application, vous devez avoir les éléments suivants installés sur votre système:

    PHP 8
    Composer
    Node.js
    NPM

Installation

    Clonez le repository Git.
    Dans le dossier racine, exécutez la commande suivante pour installer les dépendances Laravel:

composer install

    Renommez le fichier .env.example en .env et modifiez les variables d'environnement selon vos besoins (par exemple, la configuration de la base de données).
    Générez une clé d'application en exécutant la commande suivante:



php artisan key:generate

    Exécutez les migrations pour créer les tables de base de données:

php artisan migrate

    Installez les dépendances React en exécutant la commande suivante dans le dossier go-with-dog-app:

npm install

Configuration

Dans le fichier .env, vous pouvez configurer les variables d'environnement suivantes:

    APP_NAME: Le nom de l'application.
    APP_ENV: L'environnement de l'application (production, développement, etc.).
    APP_DEBUG: Si cette variable est définie sur true, les erreurs seront affichées sur le front-end.
    DB_CONNECTION: Le pilote de base de données à utiliser (par exemple, mysql).
    DB_HOST: L'hôte de la base de données.
    DB_PORT: Le port de la base de données.
    DB_DATABASE: Le nom de la base de données.
    DB_USERNAME: Le nom d'utilisateur de la base de données.
    DB_PASSWORD: Le mot de passe de la base de données.

Exécution

Pour exécuter l'application, exécutez les deux commandes suivantes dans deux terminaux différents:

    Dans le dossier racine, exécutez la commande suivante pour démarrer l'API:

php artisan serve

    Dans le dossier client, exécutez la commande suivante pour démarrer le serveur de développement de React:



npm start

Ensuite, accédez à l'URL suivante dans votre navigateur:

javascript

http://localhost:3000

Fonctionnalités

Le site web permet à l'utilisateur (sans le role admin) de:

    Consulter la liste des lieux autorisés aux chiens.
    Consulter la liste des ballades.
    Ajouter un nouveau lieu autorisé aux chiens.
    Ajouter une nouvelle ballade.
    
 Le site web permet à l'utilisateur admin de:
 
    Faire tout comme un utilisateur
    Modifier un lieu ou une ballade
    Supprimer un lieu ou une ballade
  

## 🧱 Schéma de la base de données – Gestion de présence par QR code

### `students` – Élèves

| Champ       | Type         | Contraintes      | Description                   |
| ----------- | ------------ | ---------------- | ----------------------------- |
| id          | UUID         | PK               | Identifiant unique de l’élève |
| full\_name  | VARCHAR(255) | NOT NULL         | Nom complet                   |
| email       | VARCHAR(255) | UNIQUE           | Email de l’élève (optionnel)  |
| class\_id   | UUID         | FK → classes(id) | Référence à la classe         |
| created\_at | TIMESTAMP    | DEFAULT now()    | Date de création              |

---

### `teachers` – Enseignants

| Champ      | Type         | Contraintes | Description                        |
| ---------- | ------------ | ----------- | ---------------------------------- |
| id         | UUID         | PK          | Identifiant unique de l’enseignant |
| full\_name | VARCHAR(255) | NOT NULL    | Nom complet                        |
| email      | VARCHAR(255) | UNIQUE      | Email                              |

---

### `classes` – Classes/Salles

| Champ       | Type         | Contraintes       | Description                         |
| ----------- | ------------ | ----------------- | ----------------------------------- |
| id          | UUID         | PK                | Identifiant unique de la classe     |
| name        | VARCHAR(100) | UNIQUE, NOT NULL  | Nom de la classe (ex : 6A)          |
| teacher\_id | UUID         | FK → teachers(id) | Enseignant responsable de la classe |

---

### `sessions` – Séances de cours

| Champ         | Type         | Contraintes       | Description                       |
| ------------- | ------------ | ----------------- | --------------------------------- |
| id            | UUID         | PK                | Identifiant unique de la séance   |
| class\_id     | UUID         | FK → classes(id)  | Classe concernée                  |
| subject       | VARCHAR(100) | NOT NULL          | Matière (ex : Mathématiques)      |
| session\_date | DATE         | NOT NULL          | Date de la séance                 |
| start\_time   | TIME         | NOT NULL          | Heure de début                    |
| end\_time     | TIME         | NOT NULL          | Heure de fin                      |
| qr\_code\_url | TEXT         | UNIQUE, NOT NULL  | URL S3 du QR code lié à la séance |
| created\_by   | UUID         | FK → teachers(id) | Enseignant ayant lancé la séance  |

---

### `attendances` – Présences

| Champ       | Type      | Contraintes       | Description                             |
| ----------- | --------- | ----------------- | --------------------------------------- |
| id          | UUID      | PK                | Identifiant unique de la présence       |
| session\_id | UUID      | FK → sessions(id) | Référence à la séance                   |
| student\_id | UUID      | FK → students(id) | Élève ayant scanné le QR                |
| scanned\_at | TIMESTAMP | DEFAULT now()     | Horodatage du scan                      |
| status      | ENUM      | DEFAULT 'present' | Statut : `present`, `late`, ou `absent` |

🔐 Clé unique composite : `(session_id, student_id)` → un élève ne peut pointer qu’une seule fois par séance.



Diagrammes : https://dbdocs.io/haruna.rashid.yakubu/worketyamo


# Steps 

### Installation des deps 

```bash 
 npm i express body-parser dotenv
 npm i -D typescript morgan
 npm i -D nodemon 
 npm install prisma typescript tsx @types/node --save-dev
 npx prisma init --datasource-provider mongodb --output ../generated/prisma
```

##### One To many with prisma 
[] (https://www.prisma.io/docs/orm/prisma-schema/data-model/relations/one-to-one-relations)


[](https://.postman.co/workspace/Personal-Workspace~5590985b-915f-4dcc-9c76-7af991e546b1/collection/32288990-955b20dc-c558-4041-85a4-600c57de9e22?action=share&creator=32288990)
# 🔄 Guide de Migration Prisma - Ajout des Utilisateurs et Transferts

Ce guide explique comment migrer votre base de données d'un système simple (expenses avec `payer` en string) vers un système relationnel avec des utilisateurs et des transferts.

---

## 📋 Table des Matières

1. [Contexte](#contexte)
2. [Avant de Commencer](#avant-de-commencer)
3. [Étape 1: Modifier le Schema Prisma](#étape-1-modifier-le-schema-prisma)
4. [Étape 2: Créer la Migration (Sans l'Appliquer)](#étape-2-créer-la-migration-sans-lappliquer)
5. [Étape 3: Personnaliser le SQL](#étape-3-personnaliser-le-sql)
6. [Étape 4: Appliquer la Migration](#étape-4-appliquer-la-migration)
7. [Étape 5: Vérifier](#étape-5-vérifier)
8. [Troubleshooting](#troubleshooting)

---

## Contexte

### Avant (Schema Simple):
```prisma
model Expense {
  id          Int      @id @default(autoincrement())
  description String
  amount      Float
  date        DateTime @default(now())
  payer       String   // ❌ Juste un nom ("Alice", "Bob")
}
```

### Après (Schema Relationnel):
```prisma
model User {
  id       Int       @id @default(autoincrement())
  name     String
  email    String    @unique
  paidExpenses         Expense[]  @relation("PayerExpenses")
  participatedExpenses Expense[]  @relation("ParticipantExpenses")
  transfersOut         Transfer[] @relation("UserTransfersSource")
  transfersIn          Transfer[] @relation("UserTransfersTarget")
}

model Expense {
  id           Int      @id @default(autoincrement())
  description  String
  amount       Float
  date         DateTime @default(now())
  payer        User     @relation("PayerExpenses", fields: [payerId], references: [id])
  payerId      Int      // ✅ Référence à User
  participants User[]   @relation("ParticipantExpenses")
}

model Transfer {
  id       Int      @id @default(autoincrement())
  amount   Float
  date     DateTime @default(now())
  source   User     @relation("UserTransfersSource", fields: [sourceId], references: [id])
  sourceId Int
  target   User     @relation("UserTransfersTarget", fields: [targetId], references: [id])
  targetId Int
}
```

---

## Avant de Commencer

### Prérequis:
- ✅ Prisma 6.x installé (`npm install prisma@6.19.1 --save-dev`)
- ✅ Migration initiale créée et marquée comme appliquée
- ✅ Backup de votre base de données (recommandé!)

### Vérifier votre version Prisma:
```bash
npx prisma --version
# Devrait afficher: prisma : 6.19.1
```

---

## Étape 1: Modifier le Schema Prisma

Ouvrez `prisma/schema.prisma` et **remplacez tout** par:

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id               Int        @id @default(autoincrement())
  name             String
  email            String     @unique
  bankAccount      String?    // Optionnel
  
  // Relations
  paidExpenses             Expense[]  @relation("PayerExpenses")
  participatedExpenses     Expense[]  @relation("ParticipantExpenses")
  transfersOut             Transfer[] @relation("UserTransfersSource")
  transfersIn              Transfer[] @relation("UserTransfersTarget")
}

model Expense {
  id           Int      @id @default(autoincrement())
  description  String
  amount       Float
  date         DateTime @default(now())
  
  // Relations
  payer        User     @relation("PayerExpenses", fields: [payerId], references: [id])
  payerId      Int
  participants User[]   @relation("ParticipantExpenses")
}

model Transfer {
  id        Int      @id @default(autoincrement())
  amount    Float
  date      DateTime @default(now())
  
  source    User     @relation("UserTransfersSource", fields: [sourceId], references: [id])
  sourceId  Int
  
  target    User     @relation("UserTransfersTarget", fields: [targetId], references: [id])
  targetId  Int
}

model Message {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  author    String
  content   String
}
```

---

## Étape 2: Créer la Migration (Sans l'Appliquer)

Exécutez cette commande:

```bash
npx prisma migrate dev --name add-users-and-transfers --create-only
```

### Que fait cette commande?
- `migrate dev` : Crée une migration pour le développement
- `--name add-users-and-transfers` : Nom de la migration
- `--create-only` : ⚠️ **Important!** Ne l'applique PAS encore

### Vous verrez des warnings:
```
⚠️ We found changes that cannot be executed:
  • Added required column `payerId` without default value
  • You are about to drop column `payer` which contains 5 non-null values
```

**C'est NORMAL!** ✅

### Confirmez:
```
? Are you sure you want to create this migration? › (y/N)
```

**Tapez `y` puis Enter**

---

## Étape 3: Personnaliser le SQL

### 3.1 - Trouvez le fichier créé:

```bash
ls prisma/migrations/
```

Vous devriez voir un nouveau dossier: `<timestamp>_add_users_and_transfers/`

### 3.2 - Ouvrez le fichier SQL:

```bash
# Avec VS Code:
code prisma/migrations/<timestamp>_add_users_and_transfers/migration.sql

# Ou avec n'importe quel éditeur:
nano prisma/migrations/<timestamp>_add_users_and_transfers/migration.sql
```

### 3.3 - Remplacez TOUT le contenu par ce SQL intelligent:

```sql
/*
  Warnings:

  - You are about to drop the column `payer` on the `Expense` table. All the data in the column will be lost.
  - Added the required column `payerId` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable: User
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "bankAccount" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Transfer
CREATE TABLE "Transfer" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sourceId" INTEGER NOT NULL,
    "targetId" INTEGER NOT NULL,

    CONSTRAINT "Transfer_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Join table for participants
CREATE TABLE "_ParticipantExpenses" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ParticipantExpenses_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE INDEX "_ParticipantExpenses_B_index" ON "_ParticipantExpenses"("B");

-- 1. Créer des Users à partir des payers existants
INSERT INTO "User" ("name", "email")
SELECT DISTINCT 
    "payer" as "name",
    LOWER(REGEXP_REPLACE("payer", '[^a-zA-Z0-9]', '.', 'g')) || '@expenso.dev' as "email"
FROM "Expense"
WHERE "payer" IS NOT NULL;

-- 2. Ajouter payerId comme NULLABLE d'abord
ALTER TABLE "Expense" ADD COLUMN "payerId" INTEGER;

-- 3. Remplir payerId avec les IDs correspondants
UPDATE "Expense" 
SET "payerId" = "User"."id"
FROM "User"
WHERE "User"."email" = LOWER(REGEXP_REPLACE("Expense"."payer", '[^a-zA-Z0-9]', '.', 'g')) || '@expenso.dev';

-- 4. Maintenant rendre payerId NOT NULL
ALTER TABLE "Expense" ALTER COLUMN "payerId" SET NOT NULL;

-- 5. Supprimer l'ancienne colonne payer
ALTER TABLE "Expense" DROP COLUMN "payer";

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_payerId_fkey" 
    FOREIGN KEY ("payerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_sourceId_fkey" 
    FOREIGN KEY ("sourceId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_targetId_fkey" 
    FOREIGN KEY ("targetId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "_ParticipantExpenses" ADD CONSTRAINT "_ParticipantExpenses_A_fkey" 
    FOREIGN KEY ("A") REFERENCES "Expense"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "_ParticipantExpenses" ADD CONSTRAINT "_ParticipantExpenses_B_fkey" 
    FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
```

### 3.4 - Sauvegardez le fichier

---

## Étape 4: Appliquer la Migration

Maintenant que le SQL est personnalisé, appliquez-le:

```bash
npx prisma migrate dev
```

### Que va-t-il se passer?

1. ✅ Prisma voit qu'il y a une migration non appliquée
2. ✅ Il exécute le SQL personnalisé (pas celui généré!)
3. ✅ Les données sont migrées intelligemment:
   - "Alice" → User avec email "alice@expenso.dev"
   - "Bob" → User avec email "bob@expenso.dev"
   - Expenses liées aux bons Users

### Résultat attendu:

```
Applying migration `<timestamp>_add_users_and_transfers`
✔ Generated Prisma Client (v6.19.1) to ./generated/prisma
```

---

## Étape 5: Vérifier

### 5.1 - Avec Prisma Studio:

```bash
npx prisma studio
```

Ouvrez http://localhost:5555 et vérifiez:

- ✅ Table **User** existe avec vos utilisateurs (Alice, Bob, etc.)
- ✅ Table **Expense** a maintenant `payerId` (nombre) au lieu de `payer` (texte)
- ✅ Table **Transfer** existe (vide pour l'instant)
- ✅ Table **_ParticipantExpenses** existe (join table)

### 5.2 - Avec un script de test:

Créez `backend/test-migration.js`:

```javascript
const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();

async function main() {
  console.log('📊 Checking migration...\n');
  
  // Check Users
  const users = await prisma.user.findMany();
  console.log(`✅ Users (${users.length}):`);
  users.forEach(u => console.log(`   - ${u.name} (${u.email})`));
  
  // Check Expenses with relations
  const expenses = await prisma.expense.findMany({
    include: { payer: true }
  });
  console.log(`\n✅ Expenses (${expenses.length}):`);
  expenses.forEach(e => console.log(`   - ${e.description} paid by ${e.payer.name}`));
  
  console.log('\n🎉 Migration successful!');
}

main()
  .finally(() => prisma.$disconnect())
  .catch(console.error);
```

Exécutez:
```bash
node test-migration.js
```

---

## Troubleshooting

### Erreur: "Prisma schema validation error"

**Problème:** Vous utilisez Prisma 7 au lieu de Prisma 6.

**Solution:**
```bash
npm uninstall prisma @prisma/client
npm install prisma@6.19.1 --save-dev
npm install @prisma/client@6.19.1
```

---

### Erreur: "Cannot add required column payerId"

**Problème:** Vous avez essayé d'appliquer la migration sans la personnaliser.

**Solution:** Recommencez depuis l'étape 2 avec le flag `--create-only`.

---

### Erreur: "Migration already applied"

**Problème:** La migration a déjà été appliquée.

**Solution:** Si elle a été mal appliquée, vous devez rollback:

```bash
# ATTENTION: Ceci va perdre des données!
npx prisma migrate reset
```

Puis recommencez depuis le début.

---

### Les données ne sont pas migrées correctement

**Vérifiez:**

1. **Les noms de payers sont corrects:**
   ```sql
   SELECT DISTINCT payer FROM "Expense";
   ```

2. **Les Users ont été créés:**
   ```sql
   SELECT * FROM "User";
   ```

3. **Les payerId sont remplis:**
   ```sql
   SELECT id, description, "payerId" FROM "Expense";
   ```

---

## 📚 Comprendre le SQL Personnalisé

### Pourquoi cette approche?

Le SQL généré par Prisma ferait:
```sql
-- ❌ Ceci échoue car il y a déjà des données!
ALTER TABLE "Expense" ADD COLUMN "payerId" INTEGER NOT NULL;
```

Notre SQL intelligent fait:
```sql
-- 1. Crée les Users d'abord
INSERT INTO "User" ...

-- 2. Ajoute payerId comme NULLABLE
ALTER TABLE "Expense" ADD COLUMN "payerId" INTEGER;  -- ✅ Pas NOT NULL!

-- 3. Remplit payerId
UPDATE "Expense" SET "payerId" = ...

-- 4. Maintenant rend NOT NULL
ALTER TABLE "Expense" ALTER COLUMN "payerId" SET NOT NULL;  -- ✅ Maintenant possible!
```

### Génération des emails:

```sql
LOWER(REGEXP_REPLACE("payer", '[^a-zA-Z0-9]', '.', 'g')) || '@expenso.dev'
```

**Transforme:**
- "Alice" → "alice@expenso.dev"
- "Bob Smith" → "bob.smith@expenso.dev"
- "Jean-Paul" → "jean.paul@expenso.dev"

---

## 🎯 Points Clés à Retenir

1. ✅ Toujours utiliser `--create-only` pour les migrations complexes
2. ✅ Personnaliser le SQL pour gérer les données existantes
3. ✅ Ajouter les colonnes obligatoires comme NULLABLE d'abord
4. ✅ Remplir les données, puis rendre NOT NULL
5. ✅ Toujours vérifier avec Prisma Studio après migration

---

## 📖 Ressources

- [Prisma Migrate Docs](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- [Prisma Relations](https://www.prisma.io/docs/concepts/components/prisma-schema/relations)
- [PostgreSQL ALTER TABLE](https://www.postgresql.org/docs/current/sql-altertable.html)

---

**🎉 Félicitations! Votre migration est complète!**
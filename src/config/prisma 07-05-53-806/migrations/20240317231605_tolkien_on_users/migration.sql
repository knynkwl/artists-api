/*
  Warnings:

  - Made the column `roleId` on table `api_users` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "api_userTolkiens" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "tolkien" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_api_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "api_users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "api_roles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_api_users" ("createdAt", "email", "id", "name", "password", "roleId") SELECT "createdAt", "email", "id", "name", "password", "roleId" FROM "api_users";
DROP TABLE "api_users";
ALTER TABLE "new_api_users" RENAME TO "api_users";
CREATE UNIQUE INDEX "api_users_email_key" ON "api_users"("email");
CREATE UNIQUE INDEX "api_users_id_email_key" ON "api_users"("id", "email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "api_userTolkiens_tolkien_key" ON "api_userTolkiens"("tolkien");

-- CreateIndex
CREATE UNIQUE INDEX "api_userTolkiens_id_tolkien_key" ON "api_userTolkiens"("id", "tolkien");

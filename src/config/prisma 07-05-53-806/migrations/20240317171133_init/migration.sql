/*
  Warnings:

  - A unique constraint covering the columns `[id,name]` on the table `scf_artists` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,url]` on the table `scf_images` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,name]` on the table `scf_techniques` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "scf_artists_id_createdBy_name_key";

-- DropIndex
DROP INDEX "scf_images_id_createdBy_url_key";

-- DropIndex
DROP INDEX "scf_techniques_id_createdBy_name_key";

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_api_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roleId" TEXT NOT NULL DEFAULT 'User',
    CONSTRAINT "api_users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "api_roles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_api_users" ("createdAt", "email", "id", "name", "password", "roleId") SELECT "createdAt", "email", "id", "name", "password", "roleId" FROM "api_users";
DROP TABLE "api_users";
ALTER TABLE "new_api_users" RENAME TO "api_users";
CREATE UNIQUE INDEX "api_users_name_key" ON "api_users"("name");
CREATE UNIQUE INDEX "api_users_email_key" ON "api_users"("email");
CREATE UNIQUE INDEX "api_users_id_name_email_key" ON "api_users"("id", "name", "email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "scf_artists_id_name_key" ON "scf_artists"("id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "scf_images_id_url_key" ON "scf_images"("id", "url");

-- CreateIndex
CREATE UNIQUE INDEX "scf_techniques_id_name_key" ON "scf_techniques"("id", "name");

/*
  Warnings:

  - You are about to drop the column `createBy` on the `scf_artists` table. All the data in the column will be lost.
  - Added the required column `createdBy` to the `scf_artists` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_scf_artists" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    CONSTRAINT "scf_artists_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "api_users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_scf_artists" ("createdAt", "id", "name") SELECT "createdAt", "id", "name" FROM "scf_artists";
DROP TABLE "scf_artists";
ALTER TABLE "new_scf_artists" RENAME TO "scf_artists";
CREATE UNIQUE INDEX "scf_artists_name_key" ON "scf_artists"("name");
CREATE UNIQUE INDEX "scf_artists_id_createdBy_name_key" ON "scf_artists"("id", "createdBy", "name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

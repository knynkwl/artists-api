/*
  Warnings:

  - You are about to drop the `scf_artists_images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `languages` on the `scf_artists` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "scf_artists_images_id_createdBy_url_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "scf_artists_images";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "scf_images" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "title" TEXT,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    CONSTRAINT "scf_images_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "scf_artists" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_scf_artists" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT,
    "country" TEXT,
    "email" TEXT,
    "website" TEXT,
    CONSTRAINT "scf_artists_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "api_users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_scf_artists" ("bio", "country", "createdAt", "createdBy", "email", "id", "name", "website") SELECT "bio", "country", "createdAt", "createdBy", "email", "id", "name", "website" FROM "scf_artists";
DROP TABLE "scf_artists";
ALTER TABLE "new_scf_artists" RENAME TO "scf_artists";
CREATE UNIQUE INDEX "scf_artists_name_key" ON "scf_artists"("name");
CREATE UNIQUE INDEX "scf_artists_id_createdBy_name_key" ON "scf_artists"("id", "createdBy", "name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "scf_images_id_createdBy_url_key" ON "scf_images"("id", "createdBy", "url");

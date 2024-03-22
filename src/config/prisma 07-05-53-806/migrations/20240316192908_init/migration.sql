/*
  Warnings:

  - You are about to drop the `_scf_artist_techiniquesToscf_artists` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `scf_artist_techiniques` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_scf_artist_techiniquesToscf_artists";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "scf_artist_techiniques";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "scf_artist_techniques" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_scf_artist_techniquesToscf_artists" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_scf_artist_techniquesToscf_artists_A_fkey" FOREIGN KEY ("A") REFERENCES "scf_artist_techniques" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_scf_artist_techniquesToscf_artists_B_fkey" FOREIGN KEY ("B") REFERENCES "scf_artists" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "scf_artist_techniques_name_key" ON "scf_artist_techniques"("name");

-- CreateIndex
CREATE UNIQUE INDEX "scf_artist_techniques_id_createdBy_name_key" ON "scf_artist_techniques"("id", "createdBy", "name");

-- CreateIndex
CREATE UNIQUE INDEX "_scf_artist_techniquesToscf_artists_AB_unique" ON "_scf_artist_techniquesToscf_artists"("A", "B");

-- CreateIndex
CREATE INDEX "_scf_artist_techniquesToscf_artists_B_index" ON "_scf_artist_techniquesToscf_artists"("B");

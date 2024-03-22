-- CreateTable
CREATE TABLE "scf_artist_techiniques" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_scf_artist_techiniquesToscf_artists" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_scf_artist_techiniquesToscf_artists_A_fkey" FOREIGN KEY ("A") REFERENCES "scf_artist_techiniques" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_scf_artist_techiniquesToscf_artists_B_fkey" FOREIGN KEY ("B") REFERENCES "scf_artists" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "scf_artist_techiniques_name_key" ON "scf_artist_techiniques"("name");

-- CreateIndex
CREATE UNIQUE INDEX "scf_artist_techiniques_id_createdBy_name_key" ON "scf_artist_techiniques"("id", "createdBy", "name");

-- CreateIndex
CREATE UNIQUE INDEX "_scf_artist_techiniquesToscf_artists_AB_unique" ON "_scf_artist_techiniquesToscf_artists"("A", "B");

-- CreateIndex
CREATE INDEX "_scf_artist_techiniquesToscf_artists_B_index" ON "_scf_artist_techiniquesToscf_artists"("B");

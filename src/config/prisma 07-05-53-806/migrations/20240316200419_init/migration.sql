-- AlterTable
ALTER TABLE "scf_artists" ADD COLUMN "bio" TEXT;
ALTER TABLE "scf_artists" ADD COLUMN "country" TEXT;
ALTER TABLE "scf_artists" ADD COLUMN "email" TEXT;
ALTER TABLE "scf_artists" ADD COLUMN "languages" TEXT;
ALTER TABLE "scf_artists" ADD COLUMN "website" TEXT;

-- CreateTable
CREATE TABLE "scf_artists_images" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "title" TEXT,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    CONSTRAINT "scf_artists_images_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "scf_artists" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "scf_artists_images_id_createdBy_url_key" ON "scf_artists_images"("id", "createdBy", "url");

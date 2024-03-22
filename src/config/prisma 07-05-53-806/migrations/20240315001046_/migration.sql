/*
  Warnings:

  - Added the required column `belongsToId` to the `Artist` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Artist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "belongsToId" TEXT NOT NULL,
    CONSTRAINT "Artist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Artist" ("id", "name", "userId") SELECT "id", "name", "userId" FROM "Artist";
DROP TABLE "Artist";
ALTER TABLE "new_Artist" RENAME TO "Artist";
CREATE UNIQUE INDEX "Artist_id_belongsToId_key" ON "Artist"("id", "belongsToId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

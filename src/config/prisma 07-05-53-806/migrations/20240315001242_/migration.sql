/*
  Warnings:

  - You are about to alter the column `belongsToId` on the `Artist` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Artist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "belongsToId" INTEGER NOT NULL,
    CONSTRAINT "Artist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Artist" ("belongsToId", "id", "name", "userId") SELECT "belongsToId", "id", "name", "userId" FROM "Artist";
DROP TABLE "Artist";
ALTER TABLE "new_Artist" RENAME TO "Artist";
CREATE UNIQUE INDEX "Artist_id_belongsToId_key" ON "Artist"("id", "belongsToId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

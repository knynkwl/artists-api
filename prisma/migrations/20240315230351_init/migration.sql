/*
  Warnings:

  - You are about to drop the column `userId` on the `Artist` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Artist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "belongsToId" TEXT NOT NULL,
    CONSTRAINT "Artist_belongsToId_fkey" FOREIGN KEY ("belongsToId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Artist" ("belongsToId", "createdAt", "id", "name") SELECT "belongsToId", "createdAt", "id", "name" FROM "Artist";
DROP TABLE "Artist";
ALTER TABLE "new_Artist" RENAME TO "Artist";
CREATE UNIQUE INDEX "Artist_id_belongsToId_key" ON "Artist"("id", "belongsToId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

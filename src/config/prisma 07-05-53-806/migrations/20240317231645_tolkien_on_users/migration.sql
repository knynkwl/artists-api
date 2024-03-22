-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_api_userTolkiens" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "tolkien" TEXT NOT NULL,
    CONSTRAINT "api_userTolkiens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "api_users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_api_userTolkiens" ("createdAt", "id", "tolkien", "userId") SELECT "createdAt", "id", "tolkien", "userId" FROM "api_userTolkiens";
DROP TABLE "api_userTolkiens";
ALTER TABLE "new_api_userTolkiens" RENAME TO "api_userTolkiens";
CREATE UNIQUE INDEX "api_userTolkiens_tolkien_key" ON "api_userTolkiens"("tolkien");
CREATE UNIQUE INDEX "api_userTolkiens_id_tolkien_key" ON "api_userTolkiens"("id", "tolkien");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

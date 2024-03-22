-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_api_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roleId" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "api_users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "api_roles" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_api_users" ("createdAt", "email", "id", "name", "password", "roleId", "verified") SELECT "createdAt", "email", "id", "name", "password", "roleId", "verified" FROM "api_users";
DROP TABLE "api_users";
ALTER TABLE "new_api_users" RENAME TO "api_users";
CREATE UNIQUE INDEX "api_users_email_key" ON "api_users"("email");
CREATE UNIQUE INDEX "api_users_id_email_key" ON "api_users"("id", "email");
CREATE TABLE "new_api_userTolkiens" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "tolkien" TEXT NOT NULL
);
INSERT INTO "new_api_userTolkiens" ("createdAt", "id", "tolkien", "userId") SELECT "createdAt", "id", "tolkien", "userId" FROM "api_userTolkiens";
DROP TABLE "api_userTolkiens";
ALTER TABLE "new_api_userTolkiens" RENAME TO "api_userTolkiens";
CREATE UNIQUE INDEX "api_userTolkiens_tolkien_key" ON "api_userTolkiens"("tolkien");
CREATE UNIQUE INDEX "api_userTolkiens_id_tolkien_key" ON "api_userTolkiens"("id", "tolkien");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

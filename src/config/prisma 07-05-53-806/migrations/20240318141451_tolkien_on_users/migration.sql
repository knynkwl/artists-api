-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_api_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roleId" TEXT,
    "invited" BOOLEAN NOT NULL DEFAULT false,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "verifyTolkien" TEXT,
    CONSTRAINT "api_users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "api_roles" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_api_users" ("createdAt", "email", "id", "name", "password", "roleId", "verified", "verifyTolkien") SELECT "createdAt", "email", "id", "name", "password", "roleId", "verified", "verifyTolkien" FROM "api_users";
DROP TABLE "api_users";
ALTER TABLE "new_api_users" RENAME TO "api_users";
CREATE UNIQUE INDEX "api_users_email_key" ON "api_users"("email");
CREATE UNIQUE INDEX "api_users_id_email_key" ON "api_users"("id", "email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

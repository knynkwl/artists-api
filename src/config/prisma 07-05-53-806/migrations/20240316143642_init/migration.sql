/*
  Warnings:

  - You are about to drop the `artists` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "artists";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "users";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "scf_artists" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "belongsToId" TEXT NOT NULL,
    CONSTRAINT "scf_artists_belongsToId_fkey" FOREIGN KEY ("belongsToId") REFERENCES "api_users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "api_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "scf_artists_name_key" ON "scf_artists"("name");

-- CreateIndex
CREATE UNIQUE INDEX "scf_artists_id_belongsToId_name_key" ON "scf_artists"("id", "belongsToId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "api_users_name_key" ON "api_users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "api_users_email_key" ON "api_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "api_users_id_name_email_key" ON "api_users"("id", "name", "email");

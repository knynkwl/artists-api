/*
  Warnings:

  - You are about to drop the `api_userTolkiens` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "api_users" ADD COLUMN "verifyTolkien" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "api_userTolkiens";
PRAGMA foreign_keys=on;

/*
  Warnings:

  - A unique constraint covering the columns `[id,email]` on the table `api_users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "api_users_id_name_email_key";

-- DropIndex
DROP INDEX "api_users_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "api_users_id_email_key" ON "api_users"("id", "email");

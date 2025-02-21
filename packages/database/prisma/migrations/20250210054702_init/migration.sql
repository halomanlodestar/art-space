-- CreateEnum
CREATE TYPE "CredentialProvider" AS ENUM ('EMAIL', 'GOOGLE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "provider" "CredentialProvider" NOT NULL DEFAULT 'EMAIL';

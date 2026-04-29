/*
  Warnings:

  - You are about to drop the column `message` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `subject` on the `Contact` table. All the data in the column will be lost.
  - Added the required column `auditType` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyName` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactName` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "message",
DROP COLUMN "name",
DROP COLUMN "subject",
ADD COLUMN     "auditType" TEXT NOT NULL,
ADD COLUMN     "companyName" TEXT NOT NULL,
ADD COLUMN     "contactName" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT;

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "dueDiligenceRequestId" TEXT;

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "features" TEXT[],
    "deliverables" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DueDiligenceRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "diligenceType" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "priority" TEXT NOT NULL DEFAULT 'medium',
    "organizationName" TEXT,
    "kraPin" TEXT,
    "businessPermit" TEXT,
    "cr12IssueDate" TIMESTAMP(3),
    "directorCount" INTEGER,
    "budget" DOUBLE PRECISION,
    "phase" INTEGER NOT NULL DEFAULT 1,
    "requestedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startDate" TIMESTAMP(3),
    "completedDate" TIMESTAMP(3),
    "documents" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "riskRating" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DueDiligenceRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DueDiligenceReport" (
    "id" TEXT NOT NULL,
    "dueDiligenceRequestId" TEXT NOT NULL,
    "executiveSummary" TEXT,
    "legalCompliance" TEXT,
    "governance" TEXT,
    "sanctionsScreening" TEXT,
    "reputationalRisk" TEXT,
    "recommendations" TEXT[],
    "riskRating" TEXT,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DueDiligenceReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DueDiligenceFinding" (
    "id" TEXT NOT NULL,
    "dueDiligenceRequestId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "riskLevel" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "evidence" TEXT,
    "recommendation" TEXT,
    "status" TEXT NOT NULL DEFAULT 'open',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DueDiligenceFinding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DueDiligenceDocument" (
    "id" TEXT NOT NULL,
    "dueDiligenceRequestId" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DueDiligenceDocument_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Service_isActive_idx" ON "Service"("isActive");

-- CreateIndex
CREATE INDEX "Service_order_idx" ON "Service"("order");

-- CreateIndex
CREATE INDEX "DueDiligenceRequest_userId_idx" ON "DueDiligenceRequest"("userId");

-- CreateIndex
CREATE INDEX "DueDiligenceRequest_status_idx" ON "DueDiligenceRequest"("status");

-- CreateIndex
CREATE INDEX "DueDiligenceRequest_diligenceType_idx" ON "DueDiligenceRequest"("diligenceType");

-- CreateIndex
CREATE INDEX "DueDiligenceRequest_requestedDate_idx" ON "DueDiligenceRequest"("requestedDate");

-- CreateIndex
CREATE UNIQUE INDEX "DueDiligenceReport_dueDiligenceRequestId_key" ON "DueDiligenceReport"("dueDiligenceRequestId");

-- CreateIndex
CREATE INDEX "DueDiligenceReport_dueDiligenceRequestId_idx" ON "DueDiligenceReport"("dueDiligenceRequestId");

-- CreateIndex
CREATE INDEX "DueDiligenceFinding_dueDiligenceRequestId_idx" ON "DueDiligenceFinding"("dueDiligenceRequestId");

-- CreateIndex
CREATE INDEX "DueDiligenceFinding_riskLevel_idx" ON "DueDiligenceFinding"("riskLevel");

-- CreateIndex
CREATE INDEX "DueDiligenceFinding_status_idx" ON "DueDiligenceFinding"("status");

-- CreateIndex
CREATE INDEX "DueDiligenceDocument_dueDiligenceRequestId_idx" ON "DueDiligenceDocument"("dueDiligenceRequestId");

-- CreateIndex
CREATE INDEX "DueDiligenceDocument_documentType_idx" ON "DueDiligenceDocument"("documentType");

-- CreateIndex
CREATE INDEX "Contact_auditType_idx" ON "Contact"("auditType");

-- AddForeignKey
ALTER TABLE "DueDiligenceRequest" ADD CONSTRAINT "DueDiligenceRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DueDiligenceReport" ADD CONSTRAINT "DueDiligenceReport_dueDiligenceRequestId_fkey" FOREIGN KEY ("dueDiligenceRequestId") REFERENCES "DueDiligenceRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DueDiligenceFinding" ADD CONSTRAINT "DueDiligenceFinding_dueDiligenceRequestId_fkey" FOREIGN KEY ("dueDiligenceRequestId") REFERENCES "DueDiligenceRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DueDiligenceDocument" ADD CONSTRAINT "DueDiligenceDocument_dueDiligenceRequestId_fkey" FOREIGN KEY ("dueDiligenceRequestId") REFERENCES "DueDiligenceRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

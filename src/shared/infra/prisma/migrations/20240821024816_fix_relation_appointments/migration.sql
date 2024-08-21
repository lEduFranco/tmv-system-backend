-- DropForeignKey
ALTER TABLE "Appointments" DROP CONSTRAINT "Appointments_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Appointments" DROP CONSTRAINT "Appointments_providerId_fkey";

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "users"("providerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "users"("clientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Add recordatoriosSilenciados flag to allow muting reminders per quote
ALTER TABLE "Cotizacion" ADD COLUMN "recordatoriosSilenciados" BOOLEAN NOT NULL DEFAULT false;

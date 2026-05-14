-- Categorías per user/team (multi-tenancy fix)
-- Previously Categoria had no ownership and was a global pool, leaking
-- categories across user accounts. Now scoped by usuarioId/equipoId.

-- 1) Add ownership columns (nullable to allow backfill)
ALTER TABLE "Categoria" ADD COLUMN "usuarioId" TEXT;
ALTER TABLE "Categoria" ADD COLUMN "equipoId" TEXT;
ALTER TABLE "Categoria" ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- 2) Backfill: assign each existing Categoria to the usuarioId/equipoId of
--    its most common Producto. If multiple users had the same Categoria,
--    duplicate the row per user so each gets their own scoped copy.

-- 2a) For each (categoria, usuario) pair from Producto, ensure a scoped Categoria exists
DO $$
DECLARE
    rec RECORD;
    new_cat_id TEXT;
BEGIN
    -- For each distinct (categoriaId, usuarioId, equipoId) combo in Producto
    FOR rec IN
        SELECT DISTINCT p."categoriaId", p."usuarioId", p."equipoId", c."nombre"
        FROM "Producto" p
        JOIN "Categoria" c ON c."id" = p."categoriaId"
        WHERE p."categoriaId" IS NOT NULL
    LOOP
        -- Check if the canonical Categoria still has no owner
        IF (SELECT "usuarioId" FROM "Categoria" WHERE "id" = rec."categoriaId") IS NULL THEN
            -- Claim it for this user
            UPDATE "Categoria"
            SET "usuarioId" = rec."usuarioId", "equipoId" = rec."equipoId"
            WHERE "id" = rec."categoriaId";
        ELSIF (SELECT "usuarioId" FROM "Categoria" WHERE "id" = rec."categoriaId") <> rec."usuarioId" THEN
            -- A different user already owns this Categoria. Create a duplicate
            -- scoped to this user and re-point their Productos to it.
            new_cat_id := 'c' || md5(random()::text || clock_timestamp()::text);
            INSERT INTO "Categoria" ("id", "nombre", "usuarioId", "equipoId", "createdAt")
            VALUES (new_cat_id, rec."nombre", rec."usuarioId", rec."equipoId", CURRENT_TIMESTAMP);

            UPDATE "Producto"
            SET "categoriaId" = new_cat_id
            WHERE "categoriaId" = rec."categoriaId" AND "usuarioId" = rec."usuarioId";
        END IF;
    END LOOP;
END $$;

-- 3) Drop the old global-unique on nombre, replace with composite unique per user
ALTER TABLE "Categoria" DROP CONSTRAINT IF EXISTS "Categoria_nombre_key";
CREATE UNIQUE INDEX "Categoria_nombre_usuarioId_key" ON "Categoria"("nombre", "usuarioId");

-- 4) Add indexes
CREATE INDEX "Categoria_usuarioId_idx" ON "Categoria"("usuarioId");
CREATE INDEX "Categoria_equipoId_idx" ON "Categoria"("equipoId");

-- 5) Add FKs
ALTER TABLE "Categoria"
    ADD CONSTRAINT "Categoria_usuarioId_fkey"
    FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Categoria"
    ADD CONSTRAINT "Categoria_equipoId_fkey"
    FOREIGN KEY ("equipoId") REFERENCES "Empresa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

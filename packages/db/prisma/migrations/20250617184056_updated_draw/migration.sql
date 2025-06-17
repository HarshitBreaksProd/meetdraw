/*
  Warnings:

  - The values [freehand] on the enum `Shape` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Shape_new" AS ENUM ('rectangle', 'diamond', 'circle', 'line', 'arrow', 'text', 'freeHand');
ALTER TABLE "Draw" ALTER COLUMN "shape" TYPE "Shape_new" USING ("shape"::text::"Shape_new");
ALTER TYPE "Shape" RENAME TO "Shape_old";
ALTER TYPE "Shape_new" RENAME TO "Shape";
DROP TYPE "Shape_old";
COMMIT;

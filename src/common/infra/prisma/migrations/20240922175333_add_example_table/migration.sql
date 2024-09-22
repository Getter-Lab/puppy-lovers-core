-- CreateTable
CREATE TABLE "examples" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "examples_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "examples_id_key" ON "examples"("id");

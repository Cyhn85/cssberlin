#!/usr/bin/env node

/**
 * Database Setup Script
 * Creates all tables in Neon PostgreSQL database
 */

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Read connection string from .env
require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ ERROR: DATABASE_URL not found in .env file');
  process.exit(1);
}

console.log('🔄 Connecting to Neon PostgreSQL...');

const client = new Client({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const SQL_SCRIPT = `
-- 1. Drop existing tables (clean slate)
DROP TABLE IF EXISTS "Product" CASCADE;
DROP TABLE IF EXISTS "Category" CASCADE;
DROP TABLE IF EXISTS "Color" CASCADE;
DROP TABLE IF EXISTS "Size" CASCADE;
DROP TABLE IF EXISTS "Brand" CASCADE;
DROP TABLE IF EXISTS "Material" CASCADE;

-- 2. Create Category table
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "parentId" TEXT,
    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- 3. Create Color table
CREATE TABLE "Color" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "hexCode" TEXT,
    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- 4. Create Size table
CREATE TABLE "Size" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "Size_pkey" PRIMARY KEY ("id")
);

-- 5. Create Brand table
CREATE TABLE "Brand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- 6. Create Material table
CREATE TABLE "Material" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- 7. Create Product table
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "condition" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "newPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "carbonSaved" DOUBLE PRECISION NOT NULL,
    "tier" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "sale" BOOLEAN NOT NULL DEFAULT false,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "categoryId" TEXT,
    "brandId" TEXT,
    "sizeId" TEXT,
    "colorId" TEXT,
    "materialId" TEXT,
    "gender" TEXT,
    "vintedId" TEXT,
    "vintedUrl" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0,
    "wishlistCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- 8. Create Unique Indexes
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");
CREATE UNIQUE INDEX "Color_name_key" ON "Color"("name");
CREATE UNIQUE INDEX "Size_name_key" ON "Size"("name");
CREATE UNIQUE INDEX "Brand_name_key" ON "Brand"("name");
CREATE UNIQUE INDEX "Material_name_key" ON "Material"("name");
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
CREATE UNIQUE INDEX "Product_vintedId_key" ON "Product"("vintedId");

-- 9. Create Foreign Key Relationships
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey"
    FOREIGN KEY ("parentId") REFERENCES "Category"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey"
    FOREIGN KEY ("categoryId") REFERENCES "Category"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "Product" ADD CONSTRAINT "Product_brandId_fkey"
    FOREIGN KEY ("brandId") REFERENCES "Brand"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "Product" ADD CONSTRAINT "Product_sizeId_fkey"
    FOREIGN KEY ("sizeId") REFERENCES "Size"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "Product" ADD CONSTRAINT "Product_colorId_fkey"
    FOREIGN KEY ("colorId") REFERENCES "Color"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "Product" ADD CONSTRAINT "Product_materialId_fkey"
    FOREIGN KEY ("materialId") REFERENCES "Material"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;
`;

async function setupDatabase() {
  try {
    await client.connect();
    console.log('✅ Connected to database!');

    console.log('🔄 Creating tables...');
    await client.query(SQL_SCRIPT);

    console.log('✅ All tables created successfully!');

    // Verify tables
    console.log('\n📋 Verifying tables...');
    const result = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);

    console.log('✅ Tables in database:');
    result.rows.forEach(row => {
      console.log(`   - ${row.table_name}`);
    });

    console.log('\n🎉 Database setup complete!');
    console.log('👉 Now refresh DBeaver to see the tables!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\nFull error:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

setupDatabase();

# Database Migrations Guide

This project uses TypeORM migrations for database schema management. This ensures consistent database changes across all environments and prevents schema corruption.

## Overview

- **Migration files**: `src/database/migrations/`
- **Data source**: `src/database/data-source.ts`
- **Synchronize**: Disabled (`DB_SYNCHRONIZE=false` in `.env`)

## Available Commands

### Generate a new migration from entity changes

When you modify an entity (add/remove/change columns), generate a migration:

```bash
npm run migration:generate --name=DescriptiveName
```

Example:
```bash
npm run migration:generate --name=AddPhoneToUser
```

This compares your entities with the current database schema and creates a migration with the differences.

### Create an empty migration

For custom SQL or data migrations:

```bash
npm run migration:create --name=DescriptiveName
```

Example:
```bash
npm run migration:create --name=SeedInitialData
```

### Run pending migrations

Apply all pending migrations to the database:

```bash
npm run migration:run
```

This is required after:
- Pulling new code with migrations
- Generating a new migration
- Resetting the database

### Revert the last migration

Undo the most recently applied migration:

```bash
npm run migration:revert
```

Run multiple times to revert multiple migrations.

### Show migration status

See which migrations are pending vs executed:

```bash
npm run migration:show
```

## Workflow

### 1. Modifying an existing entity

```bash
# 1. Make changes to your entity file (e.g., user.entity.ts)
# 2. Generate migration
npm run migration:generate --name=UpdateUserEntity

# 3. Review the generated migration file
# 4. Run the migration
npm run migration:run

# 5. Restart your application
```

### 2. Creating a new entity

```bash
# 1. Create your new entity file
# 2. Import it in your module
# 3. Generate migration
npm run migration:generate --name=CreatePropertyTable

# 4. Run the migration
npm run migration:run
```

### 3. Resetting the database

If your database is corrupted or you want to start fresh:

```bash
# Using Docker
docker exec pg psql -U user -d postgres -c "DROP DATABASE agrodiario;"
docker exec pg psql -U user -d postgres -c "CREATE DATABASE agrodiario;"

# Or using psql directly
psql -U user -d postgres -c "DROP DATABASE agrodiario; CREATE DATABASE agrodiario;"

# Then run all migrations
npm run migration:run
```

### 4. Rolling back changes

If you need to undo a migration:

```bash
# Revert the last migration
npm run migration:revert

# Make changes to your entity
# Generate new migration
npm run migration:generate --name=FixedVersion

# Run the new migration
npm run migration:run
```

## Best Practices

### DO:
- ✅ Generate migrations after every entity change
- ✅ Review generated migration files before running them
- ✅ Use descriptive migration names
- ✅ Run migrations before starting the application
- ✅ Commit migration files to version control
- ✅ Test migrations in development before production

### DON'T:
- ❌ Edit entity files and start the app without generating/running migrations
- ❌ Manually edit the database schema
- ❌ Enable `synchronize: true` in production
- ❌ Delete migration files that have been run
- ❌ Edit migration files after they've been committed

## Troubleshooting

### Error: "Entity was not found"

Make sure your entity is imported in the TypeORM configuration (app.module.ts) and in the data source file.

### Error: "No changes in database schema were found"

This means your entities match the current database schema. If you expected changes:
- Verify your entity changes were saved
- Check if you're modifying the correct entity file
- Ensure decorators are correct

### Error: "QueryFailedError: relation already exists"

The table already exists in the database. Options:
1. Drop and recreate the database, then run all migrations
2. Revert the migration and fix it
3. Manually drop the conflicting table (not recommended)

### Database schema is out of sync

If your database schema doesn't match your entities:

```bash
# Option 1: Reset and rerun all migrations (loses data)
# Drop database, create database, run migrations

# Option 2: Generate a new migration to fix differences
npm run migration:generate --name=SyncSchema
npm run migration:run
```

## Migration File Structure

A generated migration looks like this:

```typescript
import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPhoneToUser1234567890 implements MigrationInterface {
    name = 'AddPhoneToUser1234567890'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // SQL to apply the changes
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" varchar(20)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // SQL to revert the changes
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }
}
```

- `up()`: Applies the migration
- `down()`: Reverts the migration

## Environment Configuration

The `.env` file controls migration behavior:

```env
DB_SYNCHRONIZE=false  # MUST be false when using migrations
```

**Important**: Never use `DB_SYNCHRONIZE=true` in production or when using migrations. This can cause data loss and schema corruption.

## Additional Resources

- [TypeORM Migrations Documentation](https://typeorm.io/migrations)
- [TypeORM CLI Documentation](https://typeorm.io/using-cli)

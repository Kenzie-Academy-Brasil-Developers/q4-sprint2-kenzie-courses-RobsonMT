import { MigrationInterface, QueryRunner } from "typeorm";
import * as dotenv from 'dotenv'
import * as bcrypt from "bcrypt"

dotenv.config()

export class updateDateColumnsInUser1654454601653 implements MigrationInterface {
    name = 'updateDateColumnsInUser1654454601653'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "createdAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updatedAt" SET DEFAULT now()`);
        await queryRunner.query(
          `
            INSERT INTO "users" ("firstName","lastName", "email", "password", "isAdm")
            VALUES ('${process.env.ADMIN_FIRSTNAME}', '${process.env.ADMIN_LASTNAME}','${process.env.ADMIN_EMAIL}','${bcrypt.hashSync(process.env.ADMIN_PASSWORD,10)}',true)
          `
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updatedAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "createdAt" DROP DEFAULT`);
    }

}

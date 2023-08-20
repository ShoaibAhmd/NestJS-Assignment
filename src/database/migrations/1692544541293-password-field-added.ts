import { MigrationInterface, QueryRunner } from "typeorm";

export class PasswordFieldAdded1692544541293 implements MigrationInterface {
    name = 'PasswordFieldAdded1692544541293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    }

}

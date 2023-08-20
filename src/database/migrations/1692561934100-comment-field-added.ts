import { MigrationInterface, QueryRunner } from "typeorm";

export class CommentFieldAdded1692561934100 implements MigrationInterface {
    name = 'CommentFieldAdded1692561934100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie_rating" ADD "comment" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie_rating" DROP COLUMN "comment"`);
    }

}

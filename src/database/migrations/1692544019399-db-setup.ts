import { MigrationInterface, QueryRunner } from "typeorm";

export class DbSetup1692544019399 implements MigrationInterface {
    name = 'DbSetup1692544019399'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movie" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" character varying NOT NULL, "releaseDate" TIMESTAMP NOT NULL, "ticketPrice" integer NOT NULL, "country" character varying NOT NULL, "genre" character varying NOT NULL, "photo" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_cee7125f3cbad047d34a6e13539" UNIQUE ("name"), CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movie_rating" ("id" SERIAL NOT NULL, "rating" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "movieId" integer, "userId" integer, CONSTRAINT "PK_9216464becaaeb296e108c09bea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "movie_rating" ADD CONSTRAINT "FK_b59c9106646945548e81095aa4e" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_rating" ADD CONSTRAINT "FK_b1ec57d8d35a3195dff6224fb83" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie_rating" DROP CONSTRAINT "FK_b1ec57d8d35a3195dff6224fb83"`);
        await queryRunner.query(`ALTER TABLE "movie_rating" DROP CONSTRAINT "FK_b59c9106646945548e81095aa4e"`);
        await queryRunner.query(`DROP TABLE "movie_rating"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "movie"`);
    }

}

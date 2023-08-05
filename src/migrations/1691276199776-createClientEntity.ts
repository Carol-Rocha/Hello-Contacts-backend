import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateClientEntity1691276199776 implements MigrationInterface {
    name = 'CreateClientEntity1691276199776'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "full_name" character varying(120) NOT NULL, "user_name" character varying(50) NOT NULL, "password" character varying(100) NOT NULL, "telephone" character varying NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "deletedAt" date, CONSTRAINT "UQ_93115dc5d326d8930781cc3e0ad" UNIQUE ("user_name"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "clients"`);
    }

}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUser1659654928222 implements MigrationInterface {
  name = 'UpdateUser1659654928222';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "firstName" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "lastName" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "age" integer NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "registerDate" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "lastLoginDate" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "passwordHash" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "passwordHash"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastLoginDate"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "registerDate"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "age"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "password" character varying NOT NULL`,
    );
  }
}

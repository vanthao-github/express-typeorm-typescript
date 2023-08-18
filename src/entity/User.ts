import { IsEmail, IsNotEmpty, IsOptional } from "class-validator"
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'varchar', nullable: false, length: 255, unique: true})
	@IsEmail()
	@IsNotEmpty({message: "email is required"})
	email!: string

	@Column({type: 'varchar', nullable: true, length: 255})
	@IsOptional()
	firstName!: string

	@Column({type: 'varchar', nullable: true, length: 255})
	@IsOptional()
	lastName!: string

	@Column({type: 'varchar', nullable: true, length: 255})
	@IsNotEmpty({message: "role is required" })
	role!: string

	@Column({type: 'varchar', nullable: true, length: 255})
	@IsOptional()
	password: string
}

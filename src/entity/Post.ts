import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'varchar', length: 255, nullable: false })
	title: string

	@Column({ type: 'varchar', nullable: true})
	description: string

	@Column({ type: 'text', nullable: true })
	content: string

	@Column({ type: 'boolean', default: true})
	published: boolean
}

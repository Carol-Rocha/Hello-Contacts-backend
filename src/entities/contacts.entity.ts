import { Client } from "./clients.entity"
import { 
  Column, 
  PrimaryGeneratedColumn, 
  Entity,  
  CreateDateColumn, 
  UpdateDateColumn, 
  ManyToOne } from "typeorm"


@Entity("contacts")
export class Contact {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "varchar", length: 120 })
  full_name: string

  @Column({ type: "varchar", length: 120})
  email: string

  @Column({ type: "varchar" })
  telephone: string

  @CreateDateColumn({ type: "date" })
  createdAt: string

  @UpdateDateColumn({ type: "date" })
  updatedAt: string

  @ManyToOne(() => Client)
  client: Client 
}
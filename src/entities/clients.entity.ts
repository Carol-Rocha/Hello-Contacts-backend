import { getRounds, hashSync } from "bcryptjs"
import {
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn, 
  DeleteDateColumn, 
  BeforeInsert, 
  BeforeUpdate} from "typeorm"

@Entity("clients")
export class Client {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "varchar", length: 120})
    full_name: string

    @Column({ type: "varchar", length: 50, unique: true })
    user_name: string

    @Column({ type: "varchar", length: 100})
    password: string

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
      const isEncrypted: number = getRounds(this.password)

      if (!isEncrypted){
        this.password = hashSync(this.password, 10)
      }
    }

    @Column({ type: "varchar", length: 120, unique: true})
    email: string

    @Column({ type: "varchar" })
    telephone: string

    @CreateDateColumn({ type: "date" })
    createdAt: string

    @UpdateDateColumn({ type: "date" })
    updatedAt: string

    @DeleteDateColumn({ type: "date" })
    deletedAt: string
}
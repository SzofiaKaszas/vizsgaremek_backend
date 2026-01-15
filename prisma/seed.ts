/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { PrismaClient} from "../generated/prisma/client"
import { faker } from '@faker-js/faker'
import dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

async function main() {
  await prisma.$transaction(async tx =>{
    for (let i = 0; i <10 ; i++){
      await tx.user.create({
        data:{
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          connectionEmail: faker.internet.email(),
          phoneNumber: faker.phone.number(),
          
          password: faker.internet.password(),
          email:faker.internet.email(),

          hasHouse: faker.datatype.boolean(),
          lookingForPeople: faker.datatype.boolean(),

          //optional
          userBio: faker.person.bio(),
          //age: faker.number.bigInt({min:16,max: 80})
          gender: faker.person.gender()
        }
      })
    }
})
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

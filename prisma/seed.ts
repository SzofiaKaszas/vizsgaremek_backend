/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { PrismaClient} from "../generated/prisma/client"
import { faker } from '@faker-js/faker'
import dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

//TODO: added new tables seeding
async function main() {
  await prisma.$transaction(async tx =>{
    
    const userIds: number [] = []


    //User
    for (let i = 0; i <10 ; i++){
      const xUser = await tx.user.create({
        data:{
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          
          phoneNumber: faker.phone.number(),
          
          password: faker.internet.password(),
          email:faker.internet.email(),
          
          hasHouse: faker.datatype.boolean(),
          lookingForPeople: faker.datatype.boolean(),
          lookingForHouse: faker.datatype.boolean(),

          role: "user",

          //optional
          userBio: faker.person.bio(),
          age: faker.number.int({min:18, max:80}),
          gender: faker.person.gender(),
          language: faker.location.language().name,
          occupation: faker.person.jobTitle(),
          connectionEmail:faker.internet.email()

        }
      })
      userIds.push(xUser.idUser)
    }
    
    //UserToken
    for (let i = 0; i <userIds.length ; i++){
      const xToken = await tx.userToken.create({
        data:{
          userIdToken: faker.helpers.arrayElement(userIds),
          token: faker.string.uuid(),
        }
      })
    }
    //RoommatesPrefrences
   /* for (let i = 0 ;i<10; i++){
      const xRoommatesPrefrences=await ts.rommates.create({
        data:{
          minAge:faker.number.int({min:16, max:25 }),
          maxAng:faker.number.imt({min:25, max:99 }),
          gender:faker.person.gender(),
          language:faker.location.language().name

        }
          
      
      })
    }*/
    //HouseListing
    /*for(let i= 0;i<20;i++){
      const xHouseListing=await tx.houseListing.create({
        data:{
          //description
          //location:faker.location.con
          city:faker.location.city(),
          rent:faker.number.int({min:10000, max:500000}),
          //propertyType
          whichFloor:faker.number.int({min:0, max:30}),
          numberOfRooms:faker.number.int({min:1, max:30}),
          squareMeter:faker.number.float({ min: 10, max: 100, fractionDigits: 2 }),
          //heatingType 
          //furnishingLevel
          //kitchenLevel
          bathrooms:faker.number.int({min:0,max:3 }),
          airConditioner:faker.datatype.boolean()
          }
          
        })
         
      
      }
      //HouseSearchPrefrences*/



    
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

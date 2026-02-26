/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { PrismaClient} from "../generated/prisma/client"
import { faker } from '@faker-js/faker'
import dotenv from 'dotenv'
import * as argon2 from 'argon2';

import { FurnishingLevel,HeatingType,KitchenLevel,PropertyType } from "../generated/prisma/enums"

dotenv.config()
const prisma = new PrismaClient()

//TODO: added new tables seeding
async function main() {

  const generateUserCount = 10
  const generateHouseListingCount = 20
  



  await prisma.$transaction(async tx =>{
    
    const userIds: number [] = []
    const houseListingIds: number [] = []
    const houseCitys: string [] = []

    //Admin
    const xAdmin = await tx.user.create({
      data:{
        firstName: "admin",
        lastName: "admin",
        phoneNumber: "00000000000",
        password: await argon2.hash("admin"),
        email: "admin@admin.admin",
        hasHouse: false,
        lookingForPeople: false,
        lookingForHouse: false,
        role: "admin"

      }
    })

    //Test Users for testing the matching algorithm, they have fixed preferences and attributes to ensure matches
    const testUser1 = await tx.user.create({
      data:{
        firstName: "test01",
        lastName: "test01",
        phoneNumber: "00000000001",
        password: await argon2.hash("test01"),
        email: "t01@t01.t01",
        hasHouse: false,
        lookingForPeople: true,
        lookingForHouse: false,
        role: "user",
        userBio: "I am test user 1, looking for roommates.",
        age: 25,
        gender: "male",
        language: "English"
      }
    });
    const testUser1Token = await tx.userToken.create({
      data:{
        user: {connect: {idUser: testUser1.idUser} },
        token: "test01token",
      }
    })
    const testUser1Preferences = await tx.roommatesPrefrences.create({
      data:{
        user: {connect: {idUser: testUser1.idUser} },
        minAge: 20,
        maxAge: 30,
        gender: "male",
        language: "English"
      }
    })
    const testUser1HousePreferences = await tx.houseSearchPrefrences.create({
      data:{
        user: {connect:{idUser: testUser1.idUser}},
        city: "Budapest",
        furnishingLevel: "full",
        heatingType: "radiator",
        kitchenLevel: "full",
        maxRent: 100000,
        minBathrooms: 1,
        minRooms: 3,
        minSquareMeters: 100,
        propertyType: "flat"
      }
    })
    const testUser2 = await tx.user.create({
      data:{
        firstName: "test02",
        lastName: "test02",
        phoneNumber: "00000000002",
        password: await argon2.hash("test02"),
        email: "t02@t02.t02",
        hasHouse: false,
        lookingForPeople: true,
        lookingForHouse: false,
        role: "user",
        userBio: "I am test user 2, looking for roommates.",
        age: 24,
        gender: "male",
        language: "English"
      }
    });
    const testUser2Token = await tx.userToken.create({
      data:{
        user: {connect: {idUser: testUser2.idUser} },
        token: "test02token",
      }
    })
    const testUser2Preferences = await tx.roommatesPrefrences.create({
      data:{
        user: {connect: {idUser: testUser2.idUser} },
        minAge: 20,
        maxAge: 30,
        gender: "male",
        language: "English"
      }
    })
    const testUser2HouseListing = await tx.houseListing.create({
      data:{
        user: {connect: {idUser: testUser2.idUser}},
        airConditioner: false,
        city: "Budapest",
        furnishingLevel: "full",
        heatingType: "radiator",
        kitchenLevel: "full",
        rent: 90000,
        bathrooms: 2,
        numberOfRooms: 5,
        squareMeter: 120,
        propertyType: "flat",
        description: "",
        location:"",
      }
    })


    //User
    for (let i = 0; i < generateUserCount ; i++){
      const xUser = await tx.user.create({
        data:{
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          
          phoneNumber: faker.phone.number(),
          
          password: await argon2.hash(faker.internet.password()),
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
          user: {connect: {idUser: faker.helpers.arrayElement(userIds)} },
          token: faker.string.uuid(),
        }
      })
    }

    //LikedRoommate
    const likedRoommateSet = new Set<string>();
    for (let i = 0 ;i<userIds.length; i++){
      const likerId= faker.helpers.arrayElement(userIds)
      const likedId= faker.helpers.arrayElement(userIds.filter(id=>id!==likerId)) //cannot like oneself

      const pairKey = `${likerId}-${likedId}`;
      if (likedRoommateSet.has(pairKey)) {continue;} //skip if already exists
      likedRoommateSet.add(pairKey);
      const xLikedRoommate=await tx.likedRoommate.create({
        data:{
          liker: {connect: {idUser: likerId} },
          liked: {connect: {idUser: likedId} },
        }
      })
    }


    //RoommatesPrefrences
   for (let i = 0 ;i<userIds.length; i++){
      const xRoommatesPrefrences=await tx.roommatesPrefrences.create({
        data:{
          user: {connect: {idUser: userIds[i]} },
          minAge:faker.number.int({min:16, max:25 }),
          maxAge:faker.number.int({min:25, max:99 }),
          gender:faker.person.gender(),
          language:faker.location.language().name

        }
      })
    }
    //HouseListing
    for(let i= 0;i<generateHouseListingCount;i++){
      const xHouseListing=await tx.houseListing.create({
        data:{
          
          user: {connect: {idUser: faker.helpers.arrayElement(userIds)} },

          description: faker.person.bio(), //Not the best fake data, but couldnt find better
          location: faker.location.streetAddress(true),
          city:faker.location.city(),
          rent:faker.number.int({min:10000, max:500000}),

          propertyType: faker.helpers.arrayElement(Object.values(PropertyType).filter(v => typeof v === 'string')),
          whichFloor:faker.number.int({min:0, max:30}),
          numberOfRooms:faker.number.int({min:1, max:30}),
          squareMeter:faker.number.float({ min: 10, max: 100, fractionDigits: 2 }),

          heatingType: faker.helpers.arrayElement(Object.values(HeatingType).filter(v => typeof v === 'string')),
          furnishingLevel: faker.helpers.arrayElement(Object.values(FurnishingLevel).filter(v => typeof v === 'string')),
          kitchenLevel: faker.helpers.arrayElement(Object.values(KitchenLevel).filter(v => typeof v === 'string')),

          bathrooms:faker.number.int({min:0,max:3 }),
          airConditioner:faker.datatype.boolean()
          }
          
        })
        houseListingIds.push(xHouseListing.idHouse)
        houseCitys.push(xHouseListing.city)
         
      
      }
    //HouseSearchPrefrences*/
    for (let i = 0 ;i<userIds.length; i++){
      const xHouseSearchPrefrences=await tx.houseSearchPrefrences.create({
        data:{

          user: {connect: {idUser: userIds[i]} },

          maxRent:faker.number.int({min:100000, max:500000 }),
          minSquareMeters :faker.number.int({min:10, max:80 }),
          minRooms:faker.number.int({min:1, max:10 }),
          city:faker.helpers.arrayElement(houseCitys),
          propertyType: faker.helpers.arrayElement(Object.values(PropertyType).filter(v => typeof v === 'string')),
          heatingType: faker.helpers.arrayElement(Object.values(HeatingType).filter(v => typeof v === 'string')),
          furnishingLevel: faker.helpers.arrayElement(Object.values(FurnishingLevel).filter(v => typeof v === 'string')),
          kitchenLevel: faker.helpers.arrayElement(Object.values(KitchenLevel).filter(v => typeof v === 'string')),
          minBathrooms:faker.number.int({min:1, max:3 }),
            
        }
      })
    }

    //LikedHouse
    const likedHouseSet = new Set<string>();
    for (let i = 0 ;i<userIds.length; i++){
      const likerId= faker.helpers.arrayElement(userIds)
      const likedHouseId= faker.helpers.arrayElement(houseListingIds)
      const pairKey = `${likerId}-${likedHouseId}`;
      if (likedHouseSet.has(pairKey)) {continue;} //skip if already exists
      likedHouseSet.add(pairKey);
      const xLikedHouse=await tx.likedHouse.create({
        data:{
          user: {connect: {idUser: likerId} },
          house : {connect: {idHouse: likedHouseId} },
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

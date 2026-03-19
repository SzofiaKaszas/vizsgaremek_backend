const userAllowedFields = [
  'firstName',
  'lastName',
  'phoneNumber',
  'password',
  'email',
  'userBio',
  'birthDay',
  'gender',
  'language',
  'occupation',
  'connectionEmail',
  'hasHouse',
  'lookingForPeople',
  'lookingForHouse',
]

const houseListingAllowedFields = [
  'description',
  'location',
  'city',
  'rent',
  'propertyType',
  'whichFloor',
  'numberOfRooms',
  'squareMeter',
  'heatingType',
  'furnishingLevel',
  'kitchenLevel',
  'bathrooms',
  'airConditioner',
]

const housePrefrencAllowedFields = [
  'maxRent',
  'minSquareMeters',
  'minRooms',
  'city',
  'propertyType',
  'heatingType',
  'furnishingLevel',
  'kitchenLevel',
  'minBathrooms',
]

const roommatePrefrencAllowedFields = [
  'minAge',
  'maxAge',
  'gender',
  'language'
]

const ratingAllowedFields = [
  'ratingScore',
  'ratingMessage'
]

export {userAllowedFields,houseListingAllowedFields,housePrefrencAllowedFields,roommatePrefrencAllowedFields,ratingAllowedFields}

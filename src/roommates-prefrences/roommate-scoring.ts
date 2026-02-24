import { User, RoommatesPrefrences } from 'generated/prisma/client';

interface UserPlusPrefrenc extends User {
  roommatesPrefrences: RoommatesPrefrences;
}

/**
 * Scores potentialMatch acording to prefrenc's defined prefrences
 *
 * @param preferences A User type extended with RoommatesPrefrences
 * @param potentialMatch A User type extended with RoommatesPrefrences
 * @returns The scored matching in percentage
 */
function roommateScoringPercentige(
  preferences: UserPlusPrefrenc,
  potentialMatch: UserPlusPrefrenc,
): number {
  let score = 0;
  let max = 0;

  //wheight for each criterion (tunable)
  //ADD UP TO 100
  const W_LANGUAGE = 50;
  const W_AGE = 35;
  const W_GENDER = 15;

  //Langeuge Penalty Constants
  const unknownLanguageMultiplier = 0.5; //penalty multiplier for not specifying a language preference
  const notMatchingLanguagePenalty = 0.1; //penalty multiplier for language mismatch

  //Age Penalty Constants
  const unknownAgeMultiplier = 0.5; //penalty multiplier for not specifying an age preference
  const ageDifferencePenalty = 0.1; //penalty multiplier for each year of age difference beyond the preferred range

  //Gender Penalty Constants
  const unknownGenderMultiplier = 0.5; //penalty multiplier for not specifying a gender
  const notMatchingGenderPenalty = 0.1; //penalty multiplier for gender mismatch

  //Language scoring
  max += W_LANGUAGE;
  console.log('Scoring language: ');
  console.log(
    'Preference language: ' + preferences.roommatesPrefrences.language,
  );
  console.log('Candidate language: ' + potentialMatch.language);
  if (!preferences.roommatesPrefrences.language) {
    console.log('No language preference, giving full points');
    score += W_LANGUAGE; //if user has no language preference
  } else if (!potentialMatch.language) {
    console.log('Candidate has no language specified, giving partial points');
    score += W_LANGUAGE * unknownLanguageMultiplier; //if potential match has no language specified
  } else if (preferences.roommatesPrefrences.language?.trim() === potentialMatch.language?.trim()) {
    console.log('Language match, giving full points');
    score += W_LANGUAGE; // points for language match
  } else {
    console.log('Language mismatch, giving penalty');
    score += W_LANGUAGE * notMatchingLanguagePenalty; // points for language mismatch
  }
  console.log('Score after language: ' + score + '/' + max);
  console.log('-----------------------------');
    //Age scoring
    max += W_AGE;
    console.log('Scoring age: ');
    console.log('Preference min age: ' + preferences.roommatesPrefrences.minAge);
    console.log('Preference max age: ' + preferences.roommatesPrefrences.maxAge);
    console.log('Candidate age: ' + potentialMatch.age);
    if (!preferences.roommatesPrefrences.minAge && !preferences.roommatesPrefrences.maxAge) {
      console.log('No age preference, giving full points');
        score += W_AGE; //if no age preference
    }
    else if (!potentialMatch.age) {
      console.log('Candidate has no age specified, giving partial points');
        score += W_AGE * unknownAgeMultiplier; //if potential match has no age
    }
    //TODO: consider giving more points for being close to the preferred age range, and less points the further away they are
    else if (preferences.roommatesPrefrences.minAge && potentialMatch.age < preferences.roommatesPrefrences.minAge || preferences.roommatesPrefrences.maxAge && potentialMatch.age > preferences.roommatesPrefrences.maxAge) {
      console.log('Age mismatch, giving penalty');  
      score += W_AGE * ageDifferencePenalty 
    }
    else {
      console.log('Age match, giving full points');
        score += W_AGE; // points for age match
    }
    console.log('Score after age: ' + score + '/' + max);
    console.log('-----------------------------');
    //Gender scoring
    max += W_GENDER;
    console.log('Scoring gender: ');
    console.log('Preference gender: ' + preferences.roommatesPrefrences.gender);
    console.log('Candidate gender: ' + potentialMatch.gender);
    if (!preferences.roommatesPrefrences.gender || preferences.roommatesPrefrences.gender.trim() === 'any') {
      console.log('No gender preference, giving full points');
        score += W_GENDER; //if no gender preference
    }
    else if (!potentialMatch.gender) {
      console.log('Candidate has no gender specified, giving partial points'); 
        score += W_GENDER * unknownGenderMultiplier; //if potential match has no gender specified
    }
    else if (!(preferences.roommatesPrefrences.gender === potentialMatch.gender)) {
      console.log('Gender mismatch, giving penalty');
        score += W_GENDER * notMatchingGenderPenalty; // points for gender mismatch
    }
    else{
      console.log('Gender match, giving full points');
        score += W_GENDER // points for gender match
    }
    console.log('Score after gender: ' + score + '/' + max);
    console.log('-----------------------------');

  //Calculate and return the final score as a percentage
  if (!max || max == 0 || !score) {
    return 0;
  }
  return Math.round((score / max) * 100);
}

export { roommateScoringPercentige, type UserPlusPrefrenc };

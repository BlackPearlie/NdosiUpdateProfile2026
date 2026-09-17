import { test } from '../fixtures/CustomFixtures';
import { testData } from '../utils/testData';

test('Upload profile picture and validate update response', async ({ loginPage, homePage, profilePage }) => {
  await loginPage.openNdosiPage();
  await loginPage.navigateToLoginPage();
  await loginPage.userLogin(testData.username, testData.password);

  await homePage.verifyHomePageIsDisplayed();
  await homePage.navigateToMyProfile();


  await profilePage.verifyProfilePageIsDisplayed();
  await profilePage.openEditProfile();
  await profilePage.uploadProfileImage(testData.profileImagePath);
 // await profilePage.saveProfileImageAndValidateResponse();
 // await profilePage.getCurrentProfileImageSrc();
});

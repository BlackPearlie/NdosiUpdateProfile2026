const selectors = {
  login: {
    username: '#username',
    password: '#password',
    submit: 'button[type="submit"]'
  },
  menu: '#menu',
  myProfile: 'text=My Profile',
  editProfile: 'text=Edit Profile',
  fileInput: 'input[type="file"]',
  saveButton: 'button:has-text("Save")',
  profileImage: '.profile-picture img'
};

export default selectors;

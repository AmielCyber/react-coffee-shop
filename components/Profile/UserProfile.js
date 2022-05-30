import React from 'react';
// My import.
import ProfileForm from './ProfileForm';
// CSS import.
import styles from './UserProfile.module.css';

/**
 * Calls our change-password api to change user's password.
 * @param {string} passwordData
 */
async function changePasswordHandler(passwordData) {
  const response = await fetch('/api/user/change-password', {
    method: 'PATCH',
    body: JSON.stringify(passwordData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  return data;
}

export default function UserProfile(props) {
  const userName = props.session.user.name;

  const handlePasswordChange = async (passwordData) => {
    try {
      const result = changePasswordHandler(passwordData);
    } catch (error) {
      // TODO: UPDATE TO PROVIDE USER FEEDBACK.
      console.log(error);
    }
  };

  return (
    <section className={styles.profile}>
      <h1>{userName} Profile</h1>
      <ProfileForm onChangedPassword={handlePasswordChange} />
    </section>
  );
}

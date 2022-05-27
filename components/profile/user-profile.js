import ProfileForm from './profile-form';
import styles from './user-profile.module.css';

export default function UserProfile() {
  const changePasswordHandler = async (passwordData) => {
    // api/user
    const response = await fetch('/api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify(passwordData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    console.log(data); // Do something else for user feedback
  };

  return (
    <section className={styles.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangedPassword={changePasswordHandler} />
    </section>
  );
}

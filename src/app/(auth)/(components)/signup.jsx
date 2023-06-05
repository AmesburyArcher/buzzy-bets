import styles from "./AuthComponents.module.css";

export default function SignUp({
  handleForm,
  handleEmailChange,
  handlePassOneChange,
  handlePassTwoChange,
  submitText,
  error,
  loading,
}) {
  return (
    <form onSubmit={handleForm} className={styles.form}>
      {error && <h1>{error}</h1>}
      <div className={styles.input_container}>
        <label htmlFor="email">Email</label>
        <input
          onChange={(e) => handleEmailChange(e.target.value)}
          required
          type="email"
          name="email"
          id="email"
          placeholder="example@mail.com"
          autoComplete="new-username"
        />
      </div>
      <div className={styles.input_container}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
        />
      </div>
      <div className={styles.input_container}>
        <label htmlFor="password">Password</label>
        <input
          onChange={(e) => handlePassOneChange(e.target.value)}
          required
          type="password"
          name="password"
          id="password"
          placeholder="password"
          autoComplete="new-password"
        />
      </div>
      <div className={styles.input_container}>
        <label htmlFor="confirm__password">Confirm Password</label>
        <input
          onChange={(e) => handlePassTwoChange(e.target.value)}
          required
          type="password"
          name="confirm_password"
          id="confirm_password"
          placeholder="confirm password"
        />
      </div>
      <button type="submit" disabled={loading}>
        {submitText}
      </button>
    </form>
  );
}

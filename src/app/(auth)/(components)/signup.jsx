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
    <form onSubmit={handleForm} className="signup__form">
      {error && <h1>{error}</h1>}
      <label htmlFor="email">
        Email
        <input
          onChange={(e) => handleEmailChange(e.target.value)}
          required
          type="email"
          name="email"
          id="email"
          placeholder="example@mail.com"
          autoComplete="new-username"
        />
      </label>
      <label htmlFor="password">
        Password
        <input
          onChange={(e) => handlePassOneChange(e.target.value)}
          required
          type="password"
          name="password"
          id="password"
          placeholder="password"
          autoComplete="new-password"
        />
      </label>
      <label htmlFor="confirm__password">
        Confirm Password
        <input
          onChange={(e) => handlePassTwoChange(e.target.value)}
          required
          type="password"
          name="confirm_password"
          id="confirm_password"
          placeholder="confirm password"
        />
      </label>
      <button type="submit" disabled={loading}>
        {submitText}
      </button>
    </form>
  );
}

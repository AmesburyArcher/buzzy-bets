export default function Email({
  handleForm,
  handleEmailChange,
  loading,
  submitText,
  currentUser,
  success,
  error,
}) {
  return (
    <form onSubmit={handleForm} className="signup__form">
      <h2>Update Profile</h2>
      {error && <h1>{error}</h1>}
      {success && <h1>{success}</h1>}
      <label htmlFor="email">
        Email
        <input
          onChange={(e) => handleEmailChange(e.target.value)}
          required
          defaultValue={currentUser.email}
          type="email"
          name="email"
          id="email"
          placeholder="example@mail.com"
          autoComplete="new-username"
        />
      </label>
      <button type="submit" disabled={loading}>
        {submitText}
      </button>
    </form>
  );
}

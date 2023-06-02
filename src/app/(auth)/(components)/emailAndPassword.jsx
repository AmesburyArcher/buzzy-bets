export default function EmailAndPassword({
  handleForm,
  handleEmailChange,
  handlePasswordChange,
  loading,
  error,
  submitText,
}) {
  return (
    <form onSubmit={handleForm} className="login__form">
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
          onChange={(e) => handlePasswordChange(e.target.value)}
          required
          type="password"
          name="password"
          id="password"
          placeholder="password"
          autoComplete="new-password"
        />
      </label>
      <button type="submit" disabled={loading}>
        {submitText}
      </button>
    </form>
  );
}

export default function MultiPassword({
  handleForm,
  handlePassOneChange,
  handlePassTwoChange,
  loading,
  submitText,
}) {
  return (
    <form
      onSubmit={function () {
        handleForm;
      }}
      className="update__password__form"
    >
      <label htmlFor="password">
        Password
        <input
          onChange={(e) => handlePassOneChange(e.target.value)}
          type="password"
          name="password"
          id="password"
          placeholder="password"
          autoComplete="new-password"
        />
      </label>
      <label htmlFor="confirm_password">
        Confirm Password
        <input
          onChange={(e) => handlePassTwoChange(e.target.value)}
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

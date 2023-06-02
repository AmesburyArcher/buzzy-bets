export default function SinglePassword({
  handleForm,
  handlePasswordChange,
  loading,
  submitText,
  pass,
  error,
  success,
}) {
  return (
    <form onSubmit={handleForm} className="flex flex-col">
      <label htmlFor="password_current" className="flex gap-2">
        Current Password:
        <input
          onChange={(e) => handlePasswordChange(e.target.value)}
          value={pass}
          type="password"
          name="password_current"
          id="password_current"
          placeholder="current password"
          autoComplete="new-password"
          className="border-b-2"
        />
      </label>
      <button disabled={loading}>{submitText}</button>
    </form>
  );
}

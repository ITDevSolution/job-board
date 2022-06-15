import BtnLogin from "./BtnLogin"

function OAuth({ providers, csrfToken }) {
  return (
    <div>
      <BtnLogin
        provider={providers.google}
        bgColor="#f2573f"
        csrfToken={csrfToken}
      />
    </div>
  )
}

export default OAuth

import { useState } from "react"
import BtnLogin from "./BtnLogin"

function Email({ providers, csrfToken }) {
  const [email, setEmail] = useState("")

  const handleInputEmail = (e) => {
    setEmail(e.target.value)
  }

  return (
    <BtnLogin
      provider={providers.email}
      bgColor="#22b05b"
      csrfToken={csrfToken}
      options={{ email }}
    >
      <div className="flex flex-col mt-2 mb-4">
        <label className="font-bold mt-5" htmlFor="email">
          Email address
        </label>
        <input
          className="mt-5 outline-none rounded-full py-2 px-8 border "
          onChange={handleInputEmail}
          placeholder="Enter email address"
          value={email}
          type="email"
          id="email"
          name="email"
          required
        />
      </div>
    </BtnLogin>
  )
}

export default Email

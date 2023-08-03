import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from 'react-google-recaptcha-v3'

const CaptchaButton = ({ onVerifyCaptcha, label }) => {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const clickHandler = async () => {
    if (!executeRecaptcha) {
      return
    }

    const token = await executeRecaptcha('contact')

    onVerifyCaptcha(token)
  }

  return (
    <button
      className="rounded-md  bg-accent-500 px-8 py-2 font-semibold uppercase text-white disabled:opacity-50"
      onClick={clickHandler}
    >
      <span>{label}</span>
    </button>
  )
}

export const ReCaptcha = ({ onVerifyCaptcha, label }) => (
  <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}>
    <CaptchaButton
      onVerifyCaptcha={onVerifyCaptcha}
      label={label ?? 'Enviar'}
    />
  </GoogleReCaptchaProvider>
)

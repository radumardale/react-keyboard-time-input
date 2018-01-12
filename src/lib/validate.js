export default function validate (val) { // ಠ_ಠ
  return /^[0-2][0-9]:[0-5][0-9](:[0-5][0-9](:[0-9][0-9][0-9])?)?(\s+[ap]m)?$/i.test(val)
}

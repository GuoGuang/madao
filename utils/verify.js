
export function isMobile(mobile) {
  if (!mobile) {
    return false
  }
  return /^(((13[0-9]{1})|(14[5,7,9])|(15[0-9]{1})|(17[0,1,3,5,6,7,8])|(18[0-9]{1}))+\d{8})$/.test(mobile)
}

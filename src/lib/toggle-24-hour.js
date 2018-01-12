export default function toggle24Hr (groups) {
  var m = groups[groups.length - 1].toUpperCase()
  groups[groups.length - 1] = m === 'AM' ? 'PM' : 'AM'
  return groups
}

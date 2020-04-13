export function isComplexType (type) {
  return ['input-object', 'input-array', 'input-map', 'GroupingSelect'].includes(type)
}

/**
 * get font length of string
 * @param {String} str
 */
export function getStringLength (str) {
  if (!str) {
    return 4;
  }
  let len = 0
  for (let i = 0; i < str.length; i++) {
    str.charCodeAt(i) > 255 ? len += 2 : len++
  }
  return Math.round(len / 2)
}

/**
 * get longest key's font length of object
 * @param {Object} object
 */
export function getLabelWidth (descriptors, fontSize) {
  let maxLen = 0
  if (descriptors instanceof Array) {
    for (const i in descriptors) {
      const typeDescriptor = findTypeDescriptor(descriptors[i])
      maxLen = Math.max(maxLen, getStringLength(typeDescriptor.label || descriptors[i].prop))
    }
  }else {
    for (const key in descriptors) {
      if (descriptors[key]) {
        const typeDescriptor = findTypeDescriptor(descriptors[key])
        maxLen = Math.max(maxLen, getStringLength(typeDescriptor.label || key))
      } else {
        maxLen = Math.max(maxLen, getStringLength(key))
      }
    }
  }
  return `${maxLen * fontSize + 30}px` // add 30px for required char '*'
}

/**
 * darken color with offset
 * @param {String} color // HEX color
 * @param {Integer} offset // offset to darken, offset should >= 0
 */
const DARKEST_COLOR = 150
export function darkenColor (color, offset) {
  if (offset === 0) return color
  if (color[0] === '#') color = color.slice(1)
  offset = parseInt(offset)
  if (isNaN(offset)) return color

  offset = 0 - offset
  if (offset >= 0) return color

  const num = parseInt(color, 16)
  let r = (num >> 16) + offset
  let b = ((num >> 8) & 0x00FF) + offset
  let g = (num & 0x0000FF) + offset

  r = Math.max(DARKEST_COLOR, r)
  b = Math.max(DARKEST_COLOR, b)
  g = Math.max(DARKEST_COLOR, g)

  const newColor = g | (b << 8) | (r << 16)
  return `#${newColor.toString(16)}`
}

export function findTypeDescriptor (descriptor) {
  return descriptor instanceof Array ? descriptor.find(item => !!item.component) : descriptor
}

export function parseDescriptor (_descriptor) {
  let descriptor = findTypeDescriptor(_descriptor)
  if (['input-object', 'input-array', 'input-map'].includes(descriptor.component)) {
      // object
      if (descriptor.component === 'input-object') {
        const data = {}
        for (const index in descriptor.fields) {
          data[descriptor.fields[index].prop] = parseDescriptor(descriptor.fields[index])
        }
        return data
      } else if (descriptor.component === 'input-map') {
        // object is a hashmap
        return {}
      }else {
      // array
      return []
    }
  } else {
    return null
  }
}

export function getSubGroup(subGroups, value){
  for (const e of subGroups) {
    if (e.value === value) {
      return e;
    }
  }
  return {};
}

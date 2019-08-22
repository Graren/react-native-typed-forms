// @flow
type ValueElement = {
  _id: string,
  _model: any,
  [x: string]: {
    value: any,
    key: string,
  },
}

export const stripKeys = (val: ValueElement) => {
  const metaKeys = ['_id', '_model']
  return Object.keys(val).reduce((prev, key) => {
    if (metaKeys.find(k => k === key)) return prev
    return {
      ...prev,
      [key]: val[key],
    }
  }, {})
}

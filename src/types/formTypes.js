// @flow

type SimpleFormTypes =
  | 'form'
  | 'string'
  | 'select'
  | 'label'
  | 'switch'
  | 'button'
  | 'multipleSelect'
  | 'slider'
type ComplexFormTypes =
  | 'repeatableForm'
  | 'list'
  | 'struct'
  | 'connected'
  | 'set'
  | 'formElements'
type SubTypes = 'set.slider'

export type FormType = SimpleFormTypes | ComplexFormTypes

export type ItemType = {
  value: string,
  text: string,
}

export type Content = {
  text: string,
  smallKey?: string,
  listText?: string,
  items?: Array<ItemType>,
}

type Constraints = {
  min?: number,
  max?: number,
  errors?: {
    min?: string,
    max?: string,
  },
}

export type Styles = {
  textStyles?: any,
}

export type TextStyle = Styles & {
  textInputContainerStyle?: any,
  textInputStyle?: any,
}

export type SelectStyle = Styles & {
  selectContainerStyle?: any,
  pickerContainerStyle?: any, //Android only
  itemStyle?: any, //Android only
}

export type MultiSelectStyle = Styles & {
  selectContainerStyle?: any,
  pickerContainerStyle?: any,
}

export type ButtonStyle = Styles & {
  buttonStyle?: any,
}

export type Style = Styles | TextStyle | SelectStyle

export type Options = {
  default: any,
  required?: boolean,
  constraints?: Constraints,
  style?: Style,
  childTypes: {
    [x: number]: Child,
  },
}

export type TextOptions = Options & {
  multiline?: true,
  numberOfLines?: 4,
}

export type ConnectedOptions = Options & {
  connect: ConnectFieldType,
}

export type SetOptions = Options & {
  subtype: {
    type: SubTypes,
  },
  subtypeOptions: {
    min?: number,
    max?: number,
    data?: string,
    step?: number,
    suffixOfValue?: 'hrs',
  },
}

export type ConnectFieldType = {
  withElements: {
    text: string,
    key: string,
    childrenKeys: string,
  },
  using: Field,
}

export type Field = {
  type: FormType,
  key: string,
  content: Content,
  options: Options | TextOptions | ConnectedOptions | SetOptions,
}

export type Child = Field

export type Form = {
  type: FormType,
  answer: string,
  field: {
    [x: number]: Field,
  },
}

export type Value = string | boolean | number | Array<FormValue> | FormValue

export type FormValue = {
  _id: string,
  key: string,
  type: string,
  index: number,
  timestamp: string,
  value: Value
}

export type BaseValue = {
  [x: string]: {
    value: any,
  },
}

export type FormProps = {
  model: any,
  value: Array<any>,
  onFinish: (any) => void,
  disableAnswers?: boolean,
  CloseButton: () => React.node,
  editionId: string,
  textAndButtonColor: string,
  disableProgress?: false,
  baseValues?: BaseValue,
  log: LogAction => void,
  textAndButtonColor?: any,
  formStyles: {
    headerTextStyle: any,
    textStyle: any,
    elementContainerStyle: any,
    buttonContainerStyle: any,
    buttonTextStyle: any,
    accentColor: string,
  },
  extra: {
    step: string,
  },
  customProps?: {
    [x: string]: any
  }
}

export type LogAction = {
  type: CREATE | UPDATE | FINISHED,
  data: any,
}
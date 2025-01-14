export type LoginData = {
  email: string
  password: string
}

export interface User {
  name: string
  email: string
}

export type UserData = {
  id?: string
  name: string
  email: string
  role: string
}

export type UsersTableProps = {
  users?: UserData[]
  handleDeleteUser(id: string | undefined): Promise<void>
}

export type ContractData = {
  id?: string
  name: string
  email: string
  price: number
  user?: UserData
  userId?: string
}

export type ContractFormData = {
  name: string
  email: string
  price: string
  userId: string
}

export type ContractsTableProps = {
  contracts?: ContractData[]
}

export interface DecisionEvent {
  message: string
  id: string
  callback: (data: any) => void
}
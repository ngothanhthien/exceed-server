interface Cost {
  value: number
  pay(): void
  undo(): void
}
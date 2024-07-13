export class BaseModel {
  constructor() {
  }
  toJson() {
    return {
      ...this,
    }
  }
}
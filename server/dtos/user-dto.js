export class UserDto {
  email
  id
  username
  constructor(model) {
    this.id = model.userId
    this.email = model.email
    this.username = model.username
  }
}

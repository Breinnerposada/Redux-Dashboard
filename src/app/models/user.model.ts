
export class User {
static fromFirebase( { uid, email, name } ) {
  return new User(uid,name,email)
}

  constructor(
    public uid: string,
    public name: string,
    public email: string,
  ){

  }
}




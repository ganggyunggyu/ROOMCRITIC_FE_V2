export * as HOOK from './hooks/index';
type TUser = {
  name: string;
  email: string;
  password: string;
  displayName: string;
};

export class User {
  name: string;
  email: string;
  password: string;
  displayName: string;

  constructor(user: TUser) {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.displayName = user.displayName;
  }
  changeName(name: string) {
    this.name = name;
  }
}

const aa = new User({
  name: 'asd',
  email: 'example@example.com',
  password: 'password123',
  displayName: 'John Doe',
});

console.log([
  new User({
    name: 'asd',
    email: 'example@example.com',
    password: 'password123',
    displayName: 'John Doe',
  }),
  aa,
]);

aa.changeName('호날두');

console.log(aa);

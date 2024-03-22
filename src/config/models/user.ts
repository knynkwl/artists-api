import db from '../db';


// model scf_artists {
//   id          String           @id @default(uuid())
//   createdAt   DateTime         @default(now())
//   createdBy   String
//   updatedAt   DateTime?
//   belongsToId api_users        @relation(fields: [createdBy], references: [id])
//   name        String           @unique
//   bio         String?
//   country     String?
//   email       String?
//   website     String?
//   images      scf_images[]
//   techniques  scf_techniques[]

//   @@unique([id, name])
// }

// model scf_images {
//   id        String       @id @default(uuid())
//   createdAt DateTime     @default(now())
//   createdBy String
//   belongsTo scf_artists? @relation(fields: [createdBy], references: [id])
//   url       String
//   alt       String?
//   title     String?
//   width     Int
//   height    Int

//   @@unique([id, url])
// }

// model scf_techniques {
//   id          String        @id @default(uuid())
//   createdAt   DateTime      @default(now())
//   createdBy   String
//   name        String        @unique
//   description String
//   artists     scf_artists[]

//   @@unique([id, name])
// }

// model api_roles {
//   id        String      @id @default(uuid())
//   createdAt DateTime    @default(now())
//   name      String      @unique
//   users     api_users[]

//   @@unique([id, name])
// }

// model api_users {
//   id        String        @id @default(uuid())
//   createdAt DateTime      @default(now())
//   name      String?
//   email     String        @unique
//   password  String?
//   tmpPassword String?
//   roleId    String?
//   role      api_roles?     @relation(fields: [roleId], references: [id])
//   artists   scf_artists[]
//   invited   Boolean       @default(false)
//   verified  Boolean       @default(false)
//   verifyTolkien String?

//   @@unique([id, email])
// }


const User = db.define('api_users', {
  id: {
    type: db.STRING,
    primaryKey: true,
    defaultValue: db.UUIDV4
  },
  createdAt: {
    type: db.DATE,
    defaultValue: db.NOW
  },
  name: db.STRING,
  email: {
    type: db.STRING,
    unique: true
  },
  password: db.STRING,
  tmpPassword: db.STRING,
  roleId: db.STRING,
  invited: {
    type: db.BOOLEAN,
    defaultValue: false
  },
  verified: {
    type: db.BOOLEAN,
    defaultValue: false
  },
  verifyTolkien: db.STRING
});
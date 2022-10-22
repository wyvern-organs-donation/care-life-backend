import { PrismaClient } from '@prisma/client'
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient()

const USER_TYPES = [
    "Administrador",
    "Doador",
    "Receptor",
    "Instituições"
]

const ORGAN_TYPES = [
    "Coração",
    "Fígado",
    "Rim",
    "Pulmão",
    "Medula ossea",
    "Pâncreas",
    "Córnea",
    "Pele",
]

/**
 * For each type_name, create a type name record in the DB
 */
function seedUser_types() {
  Promise.all(USER_TYPES.map(n => prisma.user_types.create({ data: { name: n } })))
    .then(() => console.info('[SEED] Succussfully create user_types records'))
    .catch(e => console.error('[SEED] Failed to create user_types records', e))
}

function seedOrgan_type() {
  Promise.all(ORGAN_TYPES.map(n => prisma.organ_types.create({ data: { name: n } })))
    .then(() => console.info('[SEED] Succussfully create organ_types records'))
    .catch(e => console.error('[SEED] Failed to create organ_types records', e))
}

seedUser_types();
seedOrgan_type();

const seedAdmin = async () => {
  const salt = await bcrypt.genSalt(10);
  // Hash the password
  const password = await bcrypt.hash("admin", salt);
  prisma.users.create({ 
    data: {
      name: "admin",
      email: "admin@carelife.com",
      password: password,
      type: 1,
      birth_date: new Date(),
      cpf: "",
      phone_number: "",
      adress: "",
      city: "",
      state: "",
      zip: ""
    } 
  });
  console.info('[SEED] Succussfully create organ_types records');
}
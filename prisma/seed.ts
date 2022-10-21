import { PrismaClient } from '@prisma/client'

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
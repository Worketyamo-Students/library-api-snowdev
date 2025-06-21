import bcrypt from 'bcryptjs';
import prisma from '../prismaClient';
export const registerUser = async (nom: string,email: string, motDePasse: string) => {

    const userExist= await prisma.user.findUnique({where: {email}});
    if (userExist) {
     throw new Error("L\'utilisateur existe deja. ");
    }
    if (!nom || !email || !motDePasse) {
      throw new Error('Tous les champs sont obligatoires : nom, email, motDePasse');
    }
    
    const hashedPassword = await bcrypt.hash(motDePasse,10);
    const newUser = await prisma.user.create({
    data: {
      nom,
      email,
      motDePasse: hashedPassword,
    },
  });
  return newUser
  
}
import prismaClient from './prismaClient';

async function main() {
  try {
    const predefinedRoles = [
      { name: 'Admin' },
      { name: 'User' }
    ];

    // Create roles in the database
    for (const role of predefinedRoles) {

      // look up role first
      const existingRole = await prismaClient.api_roles.findUnique({
        where: {
          name: role.name
        }
      });

      if (existingRole) {
        console.log('Role already exists:', existingRole);
        continue;
      }

      const roleToAdd = await prismaClient.api_roles.create({
        data: role
      });

      // role Lookup
      console.log('Added role:', roleToAdd);
    }

    console.log('Predefined roles added successfully.');
  } catch (error) {
    console.error('Error adding predefined roles:', error);
  } finally {
    await prismaClient.$disconnect();
  }
}

main();

// Import prisma client class from generated code this is the tool that lets you talk to the database 
const { PrismaClient } = require('./generated/prisma');

// create an instanc eof Prisma Client -> it's the open door connection to our Database (This tool let us talk to the database)
const prisma = new PrismaClient();

//define an async function becauase databse operation take time (they are asynchronous) we use aync so we can use await inside . 
async function main() {
    // await = wait for the database response before continuing 
  const expenses = await prisma.expense.findMany();//FIND MANY = get. all records (Like => Select * from Expense )
  console.log(expenses);
}
//Call the function to actually execute it.
main()
  .finally(async () => {
    await prisma.$disconnect(); 
  })
  .catch(async (e) => {
    console.error(e); // catch the erreor if existing 
    process.exit(1); // means exit(1) "error happend"
  });
// import { requireAdminRole } from "@/lib/auth"
// import { prisma } from "@/lib/prisma"
// import { redirect } from "next/navigation"

// export async function GET(){
//   await requireAdminRole()

//     const user= await prisma.user.findMany({
// select:{
//     id:true,
//     email:true,
//     role:true,
//     createdAt:true,
// }
//     })
//     return new Response(JSON.stringify(user))
// }
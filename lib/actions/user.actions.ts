'use server';
import { ID } from "node-appwrite";
import {createSessionClient , createAdminClient} from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async({email, password} : signInProps) =>{
    try{
     // Mutation / Database / Make Fetch 
     const { account } = await createAdminClient();
     const response = await account.createEmailPasswordSession(email, password);

     return parseStringify(response);
    }catch(error){
        console.error('Error' , error);
    }
}

export const signUp = async(userData : SignUpParams) =>{

    const {email , password , firstName , lastName }  = userData;

    try{
     // Create a user account
     const { account } = await createAdminClient();

     const newUserAccount = await account.create(
      ID.unique(), 
      userData.email,
      userData.password,
      `${firstName} ${lastName}`
    );

    const session = await account.
    createEmailPasswordSession(email, password);
   
     cookies().set("appwrite-session", session.secret, {
       path: "/",
       httpOnly: true,
       sameSite: "strict",
       secure: true,
     });

     return parseStringify(newUserAccount);
   
    }catch(error){
        console.error('Error' , error);
    }
}   


export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      const user =  await account.get();
      return parseStringify(user);
    } catch (error) {
      return null;
    }
  }


export const loggoutAccount = async () =>{
  try{

    const {account} = await createSessionClient();
    cookies().delete('appwrite-session');

    await account.deleteSession('current');

  }catch(error){
     return null;
  }
}   
  
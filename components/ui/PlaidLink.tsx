import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './button'
import { useRouter } from 'next/router'
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions';

const PlaidLink = ({user , variant} : PlaidLinkProps) => {

    const router = useRouter();

    const [token , setToken ] = useState('')

     useEffect(() =>{
       const getLinkToken = async () =>{
         const data = await createLinkToken(user);

         setToken(data?.linkToken);

       }

       getLinkToken();

     } , []) 

   const onSuccess  = useCallback<PlaidLinkOnSuccess>  ( async ( public_token : string )=>{
    await exchangePublicToken({
        publicToken  : public_token ,  
        user, 
    })  

    router.push('/')

   } , [user]  )

   const config : PlaidLinkOptions = {
    token  , 
    onSuccess
   }

   const {open , ready } =  usePlaidLink(config);

  return (
     <>
     {
        variant === 'primary' ? (
            <Button onClick={ () => open()}
                disabled={!ready    }
                className='plaidlink-primary' >
                connect bank 
            </Button>
        ) : variant === 'ghost' ? (
            <Button>
            connect bank 
            </Button>
        ) : (
            <Button>
            connect bank 
            </Button>
        )
     
     
     
     
     
     }
     </>
  )
}

export default PlaidLink

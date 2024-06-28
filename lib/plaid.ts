import { headers } from "next/headers";
import { Configuration, PlaidApi  , PlaidEnvironments} from "plaid";

const configuration = new Configuration({
    basePath : PlaidEnvironments.sandbox,
     baseOptions :{
        headers :{
            'PlAID-CLIENT-ID' : process.env.PLAID_CLIENT_ID,
            'PlAID-SECRET' : process.env.PLAID_SECRET,
        }
     }
})

export const plaidClient = new PlaidApi(Configuration);  

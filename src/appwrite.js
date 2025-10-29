import {Client, Databases, ID, Query} from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID;

//First need to set up appwrite client
const client = new Client()
    .setEndpoint('https://nyc.cloud.appwrite.io/v1')                        //My API Endpoint
    .setProject(PROJECT_ID)                                                 //My project ID

//Second connect the client to DB
const database = new Databases(client)

//Third implement functionality
export const updateSearchCount = async (searchTerm, movie) => {
    //1. Use Appwrite SDK (API) to check if the search term exists in the database
    try {
        const result = await database.listDocuments(DATABASE_ID, TABLE_ID, [        //plural
            Query.equal('searchTerm', searchTerm)
        ])

        //2. If it does, update the count
        if (result.documents.length > 0) {                                                                              //documents/rows as plural
            const doc = result.documents[0];                                                              //select 1st document/row

            await database.updateDocument(DATABASE_ID, TABLE_ID,  doc.$id, {                                       //Singular
                count: doc.count + 1,                                       //incrementing only 1 row attribute (column value0
            })
        //3. If it doesn't exist, create a new document (row) with the search term and count as 1
        } else {
            await database.createDocument(DATABASE_ID, TABLE_ID, ID.unique(), {                                    //Singular
                searchTerm,
                count: 1,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            })
        }
    } catch (error) {
        console.error(error);
    }
}

/*
NOTE: The tutorial lesson uses >> listDocuments(), updateDocuments() and createDocuments() methods but the code editor crossed them out as DEPRECATED methods.
I'm using appwrite 23.3.0 and created TableDB instead of Collection in appwrite.io
Copilot recommendation >> use listRows(), updateRows() and createRows() instead!!
Replaced all reference ro documents with rows and doc with row
--------------------------------------------------------------------------------------------------------------------------------------------------------------
NOTE: I disregarded copilot recommendations and reverted back to listDocuments(), updateDocuments() and createDocuments() << search worked and captured in DB
*/
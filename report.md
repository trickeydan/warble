# COMP3207 Coursework 1

**Dan Trickey - `dgt1g17`**

## Azure Services

My application uses the following services provided by the Azure Cloud:

- Azure Function App
    - Azure Functions lets us easily create API endpoints for our application, which are then called by the frontend.
- Azure Tables
    - This was used for persistent storage of users, following relationships and tweets.
- Azure Blob Storage
    - This was used to host the statically generated JavaScript and HTML for the frontend application.

To be able to use these features, I also created an App Service, Resource Group and Storage Account.

## Application Features

My application allows users to compose and post text-based status updates. Users can then use the "Explore" option to discover other users that have posted status updates and "follow" them such that the other users updates appear in their feed.

Feature list:

- Register a user account
- Log in as the user account (just username, no password authentication)
- View your feed, which contains all tweets that you and users that you follow have posted. This feed is sorted by most recently posted.
- Explore a feed of all users on the platform, so that other users can be discovered.
- View the profile page / timeline of a specific user, which includes all of the updates that they have posted.
- Follow a user, and see if you are following them
- View all users that are following you, and that you are following.
- Post text-based status updates.

I have partially implemented sharing images with status updates, but this is non-functional at the time of submission. The causes for this are detailed in the challenges section.

## Challenges

Whilst I have made use of other cloud platforms before, this was the first time that I have made use of Microsoft Azure, or function-based applications in a big project. 

The first major problem that I encountered was during my first use of the Azure CLI. The CLI is used to deploy both functions and static content to the Azure platform. Unfortunately whilst my operating system is listed as supported, and the CLI tools did install successfully, the CLI crashed with obscure errors on almost every command. I resolved this by developing my functions in the Azure cloud console, and uploading the compiled JavaScript for my frontend using the Storage Explorer. As part of this, I had to upload every file individually and specify the path that it needed to be at.

Whilst using the Azure cloud console to develop my application, I kept encountering issues where I would change settings and the changes would not persist. This would happen some, but not all of time. It would also only occur when changing a pre-existing setting, and not when adding a new setting (such as a function input binding). This is not an issue that I have been able to resolve, as I believe it is caused by consistency synchronisation within Azure. I managed to work around this by only having one tab open on the Azure portal at a time, and deleting and recreating settings if necessary.

For my project, I used function bindings to interact with Azure Tables. I discovered later in the project that this is a more limited API than the Tables SDK. I was unable to use Tables to delete records when I attempted to implement unfollowing users.

When the Function App has not been accessed for some time, I have found that it takes up to thirty seconds to respond to each endpoint for the first time. I added a loading message into my application so that it is clear to the user that something is happening.

Cross-Origin Resource Sharing is a security mechanism that is used to restrict which websites access resource data. When building my Function App, I added the URL for my application to the CORS settings. However, this did not work from Firefox, the web browser that I was using at the time, and requests from the application to my function app were blocked. Having tried clearing the browser cache to prevent this, I found that the application works fine when I use a different browser (Chromium). 

Much of the information on using Azure Functions, especially from Microsoft, uses C# .NET as the programming language. As I was using NodeJS (required for this coursework), this often made it difficult to find resources on how to use Functions. This was especially the case for information from a reputable source (i.e Microsoft). 

My submission contains partially implemented, broken function that would have enabled users to post images and videos in their status updates. The obvious way to store this multimedia data is in blob storage. However, I could not find a way when searching to securely upload a file into Azure blob storage when using Azure Functions with NodeJS. I thus looked for alternative methods to store this data, settling on encoding it into base64 and uploading it into Azure Tables. I was unable to get this to work in time to submit this coursework on time.


## Time Taken

During this assessment, I recorded a total of 54 hours working on the tasks given. This includes some, but not all of the time that I spent researching how to the Azure platform.

During this coursework, I have learnt a lot about using serverless applications and Azure. It has also been an opportunity for me to learn more about writing frontend applications in JavaScript and making use of state libraries.
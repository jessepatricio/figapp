# figapp
Simple solution for consuming web api and displaying contacts with search, pagination, and filtering capabilities.

The application was developed and build using Microsoft dotnet core 2.2 web api and latest React library version 16.8.6 as of this writing.

additional tools/libraries: 
  * [csvjson converter] sample data csv is converted to json file using csvjson.com for data seeding in web api.
  * [axios] for fetching web api
  * [semantic ui] for styling
  * [entity framework core] code-first approach
  * [rc-pagination] component for pagination display

preparation: 2 hrs
coding: 6 hrs
styling: 30 minutes
building and testing: 1 hr

Deployment:
  1. Create wwwroot folder to figAPI working folder
  2. Build react app "npm run-script build" in figapp projectfolder.
  2. Copy published folder to wwwroot directory of figAPI project folder
  4. Run "dotnet watch run" in figAPi folder
  5. browse "http://localhost:5000" or "https://localhost:5001/" to the launch the web api that also hosting the client app.

Remarks:
  the solution can be enhance by adding the following features:
   - Security (Authentication/ Role permission)
   - CRUD operation to create and modify contacts
   - Form validations for preserving data integrity
   - User activity logger
   - Use robust and scalable production server such as Postgrest, MSSQL Server, etc.
   - Deploy to a Cloud or onPremise infrastructure.
   - Enhance search capabilities by adding more fields in filtering methods.

<p align="center">
  <img alt="figapp" src="https://github.com/jessepatricio/content/blob/master/figapp.png">
</p>



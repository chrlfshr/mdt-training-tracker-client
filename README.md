### Project Title: 
  MDT-Training-Tracker

### Authored By: 
  Rebels

### Overview: 
  A Single-Page Application built with React on the front end, and knex/express on the backend. The application is designed for Mission Defense Teams (MDTs) across the Space Force (USSF) to aid them in accurately tracking operator training.

### Table Of Contents:
  * Sign-In
  * Operator
  * Crews 
    * Create Crew
  * Trainer 
    * Assign Tasks
  * Back-shop
    * Manage Users
      * Create User
    * Manage Modules
      * Create Module
    * Manage Crews
      * Create Crew
* Approval Authority


### Description:
  USSF MDTs currently require their operators to complete various training modules across a long span of time. The continuous training effort is necessary for operators to stay up-to-date on the latest technologies, techniques, and tactics our adversaries use to steal safeguarded information. Additionally, it provides them with the skills they need in order to accomplish the mission: Defending our networks.

  With all of this training, comes the difficulty to manage personnel records on which modules and tasks they have accomplished and/or have yet to accomplish. Our MDT-Training-Tracker app aims to solve this frustration! Inside, you'll find a basic user sign-in page. Here, operators will authenticate with the system to gain access to their specific training data, and the program will apply higher-level permissions to the account (if applicable). Operators each have their own modules overview in which they can view all of the modules and tasks assigned to them. If an operator also happens to be identified as a trainer, they will have access to a page that allows them to assign tasks to their trainees. This same case is true for those operators who happen to be members of the training back-shop. These operators will have access to edit the list of users, modules, tasks, and crews in the system. Above this permission level, is the approval authority. This individual will have the sole permissions to approve new training modules being added into or removed from the database. Lastly, application users will have access to the crews page in which they will find a list of the crews that currently exist within that Mission Defense Team. Each user is assigned to a crew upon having a profile creation.

### Dependencies:
  * Front-End:
    * React
    * React Router
    * MUI: Box, Button, TextField, DataGrid, FormControl, FormControlLabel
  * Back-End:
    * Knex
    * Express
  * Dev-Dependencies:
    * React Testing Library
    * Jest
    * Cypress
    * SuperTest

    *** run npm install ***

### Usage: 

  Our training app is designed for MDTs. Thus, proper usage will primarily revolve around the specific unit's MDT. Ideally, operators will be assigned permissions similar to the outdated, hard-to-use TBA program. An approval authority (ie. Director of Operations) will need to be designated. Similarly, members of the training back-shop (ie. Unit Training Manager) will need to be allocated those permissions to enable those individuals to act as the system administrators. Trainers (ie. Supervisors) will also be designated in the system. 
  
    * Operators - View/Complete all required modules/tasks
    * Trainers - View/Assign tasks to trainee operators
    * Back-shop - Manage modules, users, and crews.
    * Approval Authority - Approve or deny changes to the training modules.
  
  Once all permission-levels are properly assigned, units and their Mission Defense Teams will be capable of managing their training data -- in a better way.

### Related Projects:
  https://github.com/chrlfshr/mdt-training-tracker-server <br>
  https://github.com/chrlfshr/mdt-training-tracker-client

### Team Members:
  * Charles Fisher - Team Leader
  * Nathan Johnston - Architecture Owner
  * Andrew Gorospe - Dev Team Member
  * Kyle Horne - Dev Team Member


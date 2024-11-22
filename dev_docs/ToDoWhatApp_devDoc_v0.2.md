# ToDoWhat App - DB & API Doc

# **General Information**

- **Base URL**: `http://localhost:3030/api`
- **Content-Type**: `application/json`
- **Authentication**: Use JWT Token in the request header: `Authorization: Bearer <token>`.

# BD

- `Users` Table :

| Field | Type | Constraints | Description |
| --- | --- | --- | --- |
| `id` | INTEGER | PK, Auto Increment |  |
| `userName` | TEXT | NOT NULL, UNIQUE |  |
| `email` | TEXT | NOT NULL, UNIQUE |  |
| `password` | TEXT | NOT NULL |  |
| `created_time` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Account creation timestamp |
| `update_time` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Last update timestamp |
- `Groups` Table:

| Field | Type | Constraints | Description |
| --- | --- | --- | --- |
| `id` | INTEGER | PK, Auto Increment |  |
| `groupName` | TEXT | NOT NULL, UNIQUE |  |
| `owner_id` | INTEGER | FK ([`U](http://users.id/)sers.id`) | ID of the group owner |
| `created_time` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Group creation timestamp |
- `GroupMembers` Table: (each pair of record is an association)

| Field | Type | Constraints | Description |
| --- | --- | --- | --- |
| `id` | INTEGER | PK, Auto Increment |  |
| `group_id` | INTEGER | FK (`Groups.id`) |  |
| `user_id` | INTEGER | FK (`Users.id`) |  |
| `role` | TEXT | DEFAULT “member” | Role in the group (member, admin, or owner) |
| `join_time` | DATETIME | DEFAULT CURRENT_TIMESTAMP |  |
- `Todos` Table:

| Field | Type | Constraints | Description |
| --- | --- | --- | --- |
| `id` | INTEGER | PK, Auto Increment |  |
| `task` | TEXT | NOT NULL |  |
| `text` | TEXT |  |  |
| `category` | TEXT |  |  |
| `deadline` | DATETIME |  |  |
| `status` | TEXT | DEFAULT “To Do” |  |
| `if_private` | BOOLEAN | NOT NULL DEFAULT 1 | 1 for private task, 0 for group task |
| `owner_id` | INTERGER | FK (`Users.id`), NULLABLE | Owner of a private task |
| `group_id` | INTEGER | FK (`Group.id`), NULLABLE | Associated group (if group task) |
| `created_time` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Task creation timestamp |
| `update_time` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Last update timestamp |
- `Assignees` Table:

| Field | Type | Constraints | Description |
| --- | --- | --- | --- |
| `id` | INTEGER | PK, Auto Increment |  |
| `to_id` | INTEGER | FK (`Users.id`), NULLABLE | Associated group ID |
| `user_id` | INTEGER | FK (`Group.id`), NULLABLE | Associated user ID |

Junli’s personal suggestion to use triggers in table `Todos` which validates the task type and ensures that the relevant fields are non-null based on the value of `is_private`.

```sql
CREATE TRIGGER validate_todo_constraints
BEFORE INSERT OR UPDATE ON Todos
FOR EACH ROW
BEGIN
  -- Private task: owner_user_id must be provided, group_id must be NULL
  IF NEW.is_private = 1 THEN
    IF NEW.owner_user_id IS NULL THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Private tasks must have an owner_user_id.';
    END IF;
    IF NEW.group_id IS NOT NULL THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Private tasks cannot have a group_id.';
    END IF;
  -- Group task: group_id must be provided, owner_user_id must be NULL
  ELSE
    IF NEW.group_id IS NULL THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Group tasks must have a group_id.';
    END IF;
    IF NEW.owner_user_id IS NOT NULL THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Group tasks cannot have an owner_user_id.';
    END IF;
  END IF;
END;
```

# API

## User management

### User registration

- URL: `/users/register`
- Method: `POST`
- Request body:
    
    ```json
    {
      "username": "example_user",
      "email": "user@example.com",
      "password": "password123"
    }
    ```
    
- Response
    
    ```json
    {
      "message": "User registered successfully",
      "user": {
        "id": 1,
        "username": "example_user",
        "email": "user@example.com"
      }
    }
    
    // Error message
    {
      "message": "Registration denied: User with this email already exists."
    }
    ```
    

### User login

- URL: `/users/login`
- Method: `POST`
- Request body:
    
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```
    
- Response
    
    ```json
    {
      "message": "Login successful",
      "token": "JWT_TOKEN"
    }
    
    // Error message
    {
      "message": "Invalid email or password."
    }
    ```
    

### Get current user information

- URL: `/users/me`
- Method: `GET`
- Headers:

```json
Authorization: Bearer <token>
```

- Response:

```json
{
  "id": 1,
  "username": "example_user",
  "email": "user@example.com"
}
```

### User change password (Todo)

- URL: `/users/reset`
- Method: `POST`
- Request body:
    
    ```json
    {
      "email": "user@example.com",
      "old_password": "password123" ,
    	"new_password": "password123"
    }
    ```
    
- Response
    
    ```json
    {
      "message": "Password changed successful",
      "token": "JWT_TOKEN"
    }
    ```
    

## ToDo Management

### Get private todo list

- URL: `\todos`
- Method: `GET`
- Headers:

```json
Authorization: Bearer <token>
```

- Response:

```json
[
  {
    "task": "Complete the API design",
		"text": "Text",
    "category": "Work",
    "deadline": "2024-12-01T12:00:00Z",
    "status": "In Progress",
  }
]
```

### Get one’s assigned todo list

- URL: `\assignedTodos`
- Method: `GET`
- Headers:

```json
Authorization: Bearer <token>
```

- Response:

```json
[
  {
    "groupId" :  1,
    "task": "Complete the API design",
		"text": "Text",
    "category": "Work",
    "deadline": "2024-12-01T12:00:00Z",
    "status": "In Progress"
  }
]
```

### Create a new ToDo

- URL: `/todos`
- Method: `POST`
- Headers:

```json
Authorization: Bearer <token>
```

- Request boby:

```json
{
  "task": "Complete the API design",
  "text": "Text",
  "category": "Work",
  "deadline": "2024-12-01T12:00:00Z",
  "status": "To Do",
  "is_private": true,
  "groupId": // could be null, must fill if is_private=false
}
```

- Response

```json
{
  "message": "Todo created successfully",
  "todo": {
    "id": 1,
    "task": "Complete the API design"
    "is_private" : true,
    "groupId": // must fill if is_private=false, else must be empty
  }
}
```

### Update a To

- URL: `/todos/:id`
- Method: `put`
- Headers:

```json
Authorization: Bearer <token>
```

- Request boby:

```json
{
  "status": "Completed"
  // possible 
}
```

- Respons

```json
{
  "message": "Todo updated successfully",
  "id": 1,
  "status": "Completed"
}
```

### Delete ToDo

### Update a ToDo

- URL: `/todos/:id`
- Method: `DELETE`
- Headers:

```json
Authorization: Bearer <token>
```

- Respons

```json
{
  "message": "Todo deleted successfully"
}
```

## Collaboration

### Create a group

- URL: `/groups`
- Method: `POST`
- Headers:

```json
Authorization: Bearer <token>
```

- Request boby:

```json
{
  "TeamName": "Project Team A"
}
```

- Respons

```json
{
  "message": "Group created successfully",
  "group": {
    "id": 1,
    "TeamName": "Project Team A"
  }
}
```

### Add new group member

- URL: `/groups/:groupId/invite`
- Method: `POST`
- Headers:

```json
Authorization: Bearer <token>
```

- Request boby:

```json
{
  "userId": 2
}
```

- Respons

```json
{
  "message": "User invited successfully"
}

// Error message
{
  "message": "User is already a member of the group."
}
```

### Remove a member from group

### Get group ToDos

- URL: `/groups/:groupId/todos`
- Method: `GET`
- Headers:

```json
Authorization: Bearer <token>
```

- Response:

```json
[
  {
    "id": 1,
    "task": "Complete group tasks",
		"text": "Text",
    "category": "Teamwork",
    "deadline": "2024-12-10T12:00:00Z",
    "status": "To Do",
    "assignedUser": "example_user"
  }
]
```
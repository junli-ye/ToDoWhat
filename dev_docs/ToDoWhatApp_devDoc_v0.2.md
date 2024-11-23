# ToDoWhat App - Spec Doc v0.2

# Func Spec

- 本程序允许用户管理个人待办事项、创建合作小组并管理小组的待办事项。
- 用户可以使用邮箱注册账户，使用邮箱和密码进行登录。如果忘记密码，用户可以在输入邮箱后点击”忘记密码“，系统自动重置随机密码并发送到用户邮箱。
- 用户拥有“个人清单”，“即将到期”，“分配给我我清单”和（多个）小组清单。“个人清单”是用户自己创建的待办事项，“分配给我我清单”是所有被他人分配给用户的待办事项，“今日到期”是上述两个清单中已逾期或今日和明日到期的事件。
- 用户可以创建小组清单，小组清单的创建者自动成为“拥有者”。“拥有者”可以通过邮箱邀请其他用户加入小组清单，管理所有小组成员的权限并移除任意成员。“管理员”也可以邀请用户加入并移除普通成员。任意用户都可以将小组内的任意一条待办事项指定给一个或多个小组成员完成，小组成员被指定后会收到电子邮件提醒。
- 对于某一条待办事项，用户可以修改其名称、描述内容、类别、状态、到期时间或者直接删除。
- This program allows users to manage personal to-do lists, create collaborative groups, and manage group to-do items.
- Users can register accounts using their email and log in with their email and password. If they forget their password, they can click “Forgot Password” after entering their email, and the system will automatically reset a random password and send it to their email.
- Users have access to “Personal List,” “Upcoming Deadlines,” “Assigned to Me List,” and one or more group lists. The “Personal List” contains tasks created by the user, the “Assigned to Me List” includes tasks assigned to the user by others, and “Upcoming Deadlines” shows overdue tasks or tasks due today or tomorrow from both the personal and assigned lists.
- Users can create group lists, and the creator of the group list automatically becomes the “Owner.” The “Owner” can invite other users to join the group list via email, manage permissions for all group members, and remove any member. “Admins” can also invite users and remove regular members. Any user can assign any task within the group to one or more group members, and assigned group members will receive email notifications.
- For any to-do item, users can edit its name, description, category, status, or due date, or delete it directly.

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

# API Spec

- **Base URL**: `http://localhost:3030/api`
- **Content-Type**: `application/json`
- **Authentication**: Use JWT Token in the request header: `Authorization: Bearer <token>`.

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
      "success": true,
      "message": "User registered successfully",
      "user": {
        "id": 1,
        "username": "example_user",
        "email": "user@example.com"
      }
    }
    
    // Error message
    {
      "success": false,
      "error": {
        "code": "VALIDATION_ERROR",
        "message": "Invalid request data",
        "details": {
          // depends on actual case
          "username": "Username is required",
          "email": "Invalid email format",
          "password": "Password must be at least 8 characters long"
        }
      }
    }
    
    {
      "success": false,
      "error": {
        "code": "DUPLICATE",
        "message": "Registration denied: User with this email already exists."
      }
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
      "success": true,
      "message": "Login successful",
      "token": "JWT_TOKEN",
      "user": {
        "id": 1,
        "username": "example_user",
        "email": "user@example.com"
      }
    }
    
    // Error message
    {
      "success": false,
      "error": {
        "code": "VALIDATION_ERROR",
        "message": "Invalid request data",
        "details": {
          // depends on actual case
          "email": "Invalid email format",
          "password": "Password is required"
        }
      }
    }
    
    {
      "success": false,
      "error": {
        "code": "INVALID_CREDENTIALS",
        "message": "Invalid email or password."
      }
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
  "success": true,
  "message": "User information retrieved successfully",
  "user": {
    "id": 1,
    "username": "example_user",
    "email": "user@example.com"
  }
}

// Error messages
{
  "success": false,
  "error": {
    "code": "MISSING_TOKEN",
    "message": "Authorization token is required."
  }
}

{
  "success": false,
  "error": {
    "code": "INVALID_TOKEN",
    "message": "The provided token is invalid or expired."
  }
}
```

### Logged-in user change password

- URL: `/users/changePwd`
- Method: `POST`
- Headers:

```json
Authorization: Bearer <token>
```

- Request body:

    ```json
    {
      "old_password": "password123",
      "new_password": "newpassword456"
    }
    ```

- Response

    ```json
    {
      "success": true,
      "message": "Password changed successfully",
      "token": "NEW_JWT_TOKEN"
    }
    
    // Error massage
    {
      "success": false,
      "error": {
        "code": "INCORRECT_PASSWORD",
        "message": "The old password is incorrect."
      }
    }
    
    {
      "success": false,
      "error": {
        "code": "VALIDATION_ERROR",
        "message": "Invalid request data",
        "details": {
          "new_password": "Password must be at least 8 characters long"
        }
      }
    }
    ```


### Reset password

- URL: `/users/reset`
- Method: `POST`

- Request body:

  ```json
  {
    "email": "user@example.com"
  }
  ```

- Response

  ```json
  {
    "success": true,
    "message": "A temporary password has been sent to your email address."
  }
  
  // Error message
  {
    "success": false,
    "error": {
      "code": "EMAIL_NOT_FOUND",
      "message": "The provided email address is not registered."
    }
  }
  ```

## ToDo Management

### Get private todo list

- URL: `/todos`
- Method: `GET`
- Headers:

```json
Authorization: Bearer <token>
```

- Response:

```json
{
  "success": true,
  "message": "Todos retrieved successfully",
  "todos": [
    {
      "id": 1,
      "task": "Complete the API design",
      "text": "Text",
      "category": "Work",
      "deadline": "2024-12-01T12:00:00Z",
      "status": "In Progress",
      "is_private": true,
      "created_time": "2024-11-20T08:00:00Z",
      "updated_time": "2024-11-21T10:00:00Z"
    },
    {
      "id": 2,
      "task": "Fix backend bug",
      "text": "Debugging the API response issue",
      "category": "Work",
      "deadline": "2024-11-30T18:00:00Z",
      "status": "To Do",
      "is_private": true,
      "created_time": "2024-11-15T10:00:00Z",
      "updated_time": "2024-11-16T12:00:00Z"
    }
  ]
}

{
  "success": true,
  "message": "No private todos found",
  "todos": []
}

// Error messages
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authorization token is required or invalid."
  }
}
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

{
  "success": true,
  "message": "Assigned todos retrieved successfully",
  "todos": [
    {
      "groupId": 1,
      "task": "Complete the API design",
      "text": "Text",
      "category": "Work",
      "deadline": "2024-12-01T12:00:00Z",
      "status": "In Progress",
      "assigned_time": "2024-11-15T08:00:00Z",
      "created_time": "2024-11-10T10:00:00Z",
      "updated_time": "2024-11-11T12:00:00Z"
    },
    {
      "groupId": 2,
      "task": "Prepare presentation",
      "text": "Complete the slides for the meeting",
      "category": "Teamwork",
      "deadline": "2024-11-25T18:00:00Z",
      "status": "To Do",
      "assigned_time": "2024-11-20T10:00:00Z",
      "created_time": "2024-11-18T12:00:00Z",
      "updated_time": "2024-11-19T14:00:00Z"
    }
  ]
}

{
  "success": true,
  "message": "No assigned todos found",
  "todos": []
}

// Error messages
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authorization token is required or invalid."
  }
}
```

### Get due todo list

// todo

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
  "groupId": null // could be null, must fill if is_private=false
}
```

- Response

```json
{
  "success": true,
  "message": "Todo created successfully",
  "todo": {
    "id": 1,
    "task": "Complete the API design",
    "is_private": true,
    "groupId": null
  }
}

// Error messgae
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": {
      // depends on real case
      "groupId": "Group ID is required when is_private is false",
      "task": "Task is required"
    }
  }
}

{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authorization token is required or invalid."
  }
}

{
  "success": false,
  "error": {
    "code": "GROUP_NOT_FOUND",
    "message": "The specified group does not exist."
  }
}
```

### Update a Todo

- URL: `/todos/:id`
- Method: `PUT`
- Headers:

```json
Authorization: Bearer <token>
```

- Request boby:

```json
{
  "status": "Completed"
  // possible values
}
```

- Respons

```json
{
  "success": true,
  "message": "Todo updated successfully",
  "todo": {
    "id": 1,
    "task": "Update the database schema",
    "status": "Completed"
  }
}

// Error message
{
  "success": false,
  "error": {
    "code": "TODO_NOT_FOUND",
    "message": "The specified todo does not exist."
  }
}

{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authorization token is required or invalid."
  }
}
```

### Delete ToDo

- URL: `/todos/:id`
- Method: `DELETE`
- Headers:

```json
Authorization: Bearer <token>
```

- Respons

```json
{
  "success": true,
  "message": "Todo deleted successfully",
  "todo": {
    "id": 1,
    "task": "Complete the API design"
  }
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
  "GroupName": "Project Team A"
}
```

- Respons

```json
{
  "success": true,
  "message": "Group created successfully",
  "group": {
    "id": 1,
    "GroupName": "Project Team A",
    "owner_id": 1
  }
}

// Error message
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": {
      "GroupName": "Group name is required and must be unique."
    }
  }
}

{
  "success": false,
  "error": {
    "code": "DUPLICATE_GROUP_NAME",
    "message": "A group with this name already exists."
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
  "email": “exemple@junliye.fr”
}
```

- Respons

```json
{
  "success": true,
  "message": "User invited successfully",
  "group": {
    "id": 1,
    "GroupName": "Project Team A"
  },
  "member": {
    "userId": 2,
    "role": "member"
  }
}

// Error message
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": {
      "userId": "User ID is required and must be valid."
    }
  }
}

{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authorization token is required or invalid."
  }
}

{
  "success": false,
  "error": {
    "code": "GROUP_NOT_FOUND",
    "message": "The specified group does not exist."
  }
}

{
  "success": false,
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "The specified user does not exist."
  }
}

{
  "success": false,
  "error": {
    "code": "ALREADY_MEMBER",
    "message": "User is already a member of the group."
  }
}

{
  "success": false,
  "error": {
    "code": "PERMISSION_DENIED",
    "message": "You do not have permission to invite users to this group."
  }
}
```

### Update a member's role in a group

- Only the owner or admin role of a group has permission to perform this action (but only the owner can change someone else's role to owner).

- URL: `/groups/:groupId/role/:userId`
- Method: `PATCH`
- Headers:

```
Authorization: Bearer <token>
```

- Request body:

```json
{
  "newRole": "admin"
}
```

- Response

```json
{
  "success": true,
  "message": "User role updated successfully."
}

// Error messages
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "You do not have permission to update roles in this group."
  }
}

{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "User is not a member of this group."
  }
}

{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "Only the group owner can assign the 'owner' role."
  }
}
```

### Remove a member from group

- Only owner and admin has right to do this operation, only owner can remove an admin

- URL: `/groups/:groupId/remove/:userId`
- Method: `DELETE`
- Headers:

```json
Authorization: Bearer <token>
```

- Response:

```json
{
  "success": true,
  "message": "User removed from the group successfully."
}


//Error
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "You do not have permission to remove members from this group."
  }
}

{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "User is not a member of this group."
  }
}

{
  "success": false,
  "error": {
    "code": "GROUP_NOT_FOUND",
    "message": "The specified group does not exist."
  }
}

{
  "success": false,
  "error": {
    "code": "CANNOT_REMOVE_OWNER",
    "message": "The group owner cannot be removed from the group."
  }
}
```

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
    "task": "Complete group tasks",
		"text": "Text",
    "category": "Work",
    "deadline": "2024-12-10T12:00:00Z",
    "status": "To Do",
    "assignedUser": "example_user"
  }
]
```
### **POST /api/events/create**

- **Request Body**:

  ```json
  {
    "title": "Tree Plantation Drive",
    "description": "Help us plant trees in the community park.",
    "category": "Environmental",
    "date": "2025-06-15T10:00:00Z",
    "time": "10:00 AM - 2:00 PM",
    "location": "Greenwood Park, Chicago",
    "createdBy": "67db9876cd44131fa79bac23"
  }
  ```

- **Response**:
  ```json
  {
    "_id": "67d98765ab22131fa798512c",
    "title": "Tree Plantation Drive",
    "description": "Help us plant trees in the community park.",
    "category": "Environmental",
    "date": "2025-06-15T10:00:00.000Z",
    "time": "10:00 AM - 2:00 PM",
    "location": "Greenwood Park, Chicago",
    "createdBy": {
      "_id": "67db9876cd44131fa79bac23",
      "name": "Alice Johnson"
    },
    "attendees": [],
    "createdAt": "2025-03-20T14:00:00.000Z",
    "updatedAt": "2025-03-20T14:00:00.000Z",
    "__v": 0
  }
  ```

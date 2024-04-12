# Django Notes Application

## Overview

This Django Notes Application provides a simple backend for creating, retrieving, updating, and deleting notes. It is built with Django and provides basic CRUD functionalities via both a web interface and an API.

## Features

- Create, update, and delete notes.
- View a list of all notes.
- Access notes details.
- JSON API endpoints for interacting with notes programmatically.

## Installation

### Prerequisites

- Python 3.7 or newer
- Django 3.2 or newer
- Conda or Miniconda

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/notes-app.git
   cd notes-app
   ```

2. **Set up a virtual environment** (optional but recommended)

   ```bash
   conda env create
   ```

3. **Run migrations**

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

4. **Create a superuser (for accessing the Django admin)**

   ```bash
   python manage.py createsuperuser
   ```

5. **Start the development server**

   ```bash
   python manage.py runserver
   ```

   Visit `http://127.0.0.1:8000` in your web browser.

## Usage

### Web Interface

- Access the Django admin panel at `http://127.0.0.1:8000/admin` to manage notes.
- Navigate to `http://127.0.0.1:8000/notes/` to view, add, edit, or delete notes through the web interface.

### API Endpoints

#### GET `/api/note/`

- **Description**: Get single note.
- **Method**: `GET`
- **Data Required**: JSON object containing the `id` of the requested note.
- **Example**:
  ```bash
  curl http://127.0.0.1:8000/api/notes/ \
      -H "Content-Type: application/json" \
      -d '{"id": <note id>, "content": "This is a sample note."}'
  ```

#### GET `/api/note/`

- **Description**: List all notes.
- **Method**: `GET`
- **Data Required**: None
- **Example**:
  ```bash
  curl http://127.0.0.1:8000/api/notes/
  ```

#### POST `/api/note/`

- **Description**: Create a new note.
- **Method**: `POST`
- **Data Required**: JSON object containing the `title` and `content` of the note.
- **Example**:
  ```bash
  curl -X POST http://127.0.0.1:8000/api/note/ \
       -H "Content-Type: application/json" \
       -d '{"title": "Sample Note", "content": "This is a sample note."}'
  ```

#### PUT `/api/note/`

- **Description**: Update an existing note by ID.
- **Method**: `PUT`
- **Data Required**: JSON object containing the `title` and/or `content` of the note that needs updating.
- **Example**:
  ```bash
  curl -X PUT http://127.0.0.1:8000/api/note/ \
       -H "Content-Type: application/json" \
       -d '{"id": <note id>, "title": "Updated Title", "content": "Updated content of the note."}'
  ```

#### DELETE `/api/note/`

- **Description**: Delete a note by ID.
- **Method**: `DELETE`
- **Data Required**: None directly in the body; the ID should be specified in the URL.
- **Example**:
  ```bash
  curl -X DELETE http://127.0.0.1:8000/note/ \
       -H "Content-Type: application/json" \
       -d '{"id": <note id>}'
  ```

## License

This project is licensed under the MIT License.

## Contact

- Your Name - lukas.kaibel@etu.u-paris.fr
- Project Link: https://github.com/yourusername/django-notes-app

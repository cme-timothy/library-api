# Library API

This is a simple library API for my second node.js web server assignment.

## Pre-requisites

In order to start this web server you will need to install:

- [Node.js](https://nodejs.org/en/)

## How to start the web server

Type in the following command;

```
node index.js
```

# API route list

## Library router

- http://localhost:4000/books
- http://localhost:4000/books/:id

## Users router

- http://localhost:4000/auth/register
- http://localhost:4000/auth/login
- http://localhost:4000/users/lend
- http://localhost:4000/users/return
- http://localhost:4000/me

# Klient side request examples

## Get all books

```
fetch('http://localhost:4000/books')
            .then(res=>res.json())
            .then(json=>console.log(json))
```

Output example:

```
[
    {
        id: 'unique identifier',
        title: 'book name',
        author: 'authors name',
        about: 'brief summary',
        quantity: 'number'
    },
    {
        id: 'unique identifier',
        title: 'book name',
        author: 'authors name',
        about: 'brief summary',
        quantity: 'number'
    }
]
```

## Get book

```
fetch('http://localhost:4000/books/:id')
            .then(res=>res.json())
            .then(json=>console.log(json))
```

Output example:

```
[
    {
        id: 'unique identifier',
        title: 'book name',
        author: 'authors name',
        about: 'brief summary',
        quantity: 'number'
    }
]
```

## Add new book

```
fetch('http://localhost:4000/books',{
            method:"POST",
            body:JSON.stringify(
                {
                    title: 'book name',
                    author: 'authors name',
                    about: 'brief summary',
                    quantity: 'number'
                }
            )
        })
```

If request succeded then you will recieve status code 201 with the following message: POST request for book succeeded, and is added to the server

## Change book

```
fetch('http://localhost:4000/books/:id',{
            method:"PUT",
            body:JSON.stringify(
                {
                    title: 'book name',
                    author: 'authors name',
                    about: 'brief summary',
                    quantity: 'number'
                }
            )
        })
```

If request succeded then you will recieve status code 204 with the following message: PUT request for book succeeded, and is updated on the server

## Change only book quantity

```
fetch('http://localhost:4000/books/:id',{
            method:"PATCH",
            body:JSON.stringify(
                {
                    quantity: 'number'
                }
            )
        })
```

If request succeded then you will recieve status code 204 with the following message: PATCH request for book succeeded, and is updated on the server

## Delete book

```
fetch('http://localhost:4000/books/:id',{
            method:"DELETE"
        })
```

If request succeded then you will recieve status code 204 with status message: DELETE request for book succeeded, and is deleted from the server

## Register

```
fetch('http://localhost:4000/auth/register',{
            method:"POST",
            body:JSON.stringify(
                {
	                username: 'newuser',
	                email: 'newuser@something.something',
	                password: 'secretpassword'
                }
            )
        })
```

If request succeded then you will recieve status code 201 with the following message: POST request to register a user succeeded, and is added to the server

## Login

```
fetch('http://localhost:4000/auth/login',{
            method:"POST",
            body:JSON.stringify(
                {
	                email: 'newuser@something.something',
	                password: 'secretpassword'
                }
            )
        })
```

If request succeded then you will recieve a token

Output example:

```
"token //my token appears here"
```

## Lend a book

```
fetch('http://localhost:4000/users/lend',{
            method:"POST",
            headers: {
            authorization: "bearer //my token goes here"
            },
            body:JSON.stringify(
                {
	                "id": 'unique identifier',
                }
            )
        })
```

If request succeded then you will recieve status code 200 with the following message: POST request to loan book succeeded

## Return a book

```
fetch('http://localhost:4000/users/return',{
            method:"POST",
            headers: {
            authorization: "bearer //my token goes here"
            },
            body:JSON.stringify(
                {
	                "id": 'unique identifier',
                }
            )
        })
```

If request succeded then you will recieve status code 200 with the following message: POST request to return book succeeded

## Get user info

```
fetch('http://localhost:4000/me')
            headers: {
            authorization: "bearer //my token goes here"
            },
            .then(res=>res.json())
            .then(json=>console.log(json))
```

Output example:

```
[
    {
        id: 'unique identifier',
        username: 'newuser',
        email: 'newuser@something.something',
        booksLoaned: [
            {
                bookId: 'unique identifier',
                title: 'book name',
                author: 'authors name'
            }
        ]
    }
]
```

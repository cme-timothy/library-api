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

- http://localhost:4000/books
- http://localhost:4000/books/:id

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
        author: 'authors name'
        about: 'brief summary'
        quantity: 'number'
    },
    {
        id: 'unique identifier',
        title: 'book name',
        author: 'authors name'
        about: 'brief summary'
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
        author: 'authors name'
        about: 'brief summary'
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
                    author: 'authors name'
                    about: 'brief summary'
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
                    author: 'authors name'
                    about: 'brief summary'
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

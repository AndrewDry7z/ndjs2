import {IBook} from "./interfaces/IBook";

let fakeDB: any[] = []

export class BookRepository implements IBook {

  id: string;
  title: string;
  description: string;

  static async createBook(book: IBook) {
    const newBook: object = book
    try {
      return await fakeDB.push(newBook)
    } catch (e) {
      console.error(e)
    }
  }

  static async getBooks() {
    try {
      return fakeDB;
    } catch (e) {
      console.error(e)
    }
  }

  static async getBook(id: string) {
    try {
      const bookIndex: number = fakeDB.findIndex(book => book.id === id)
      return await fakeDB[bookIndex]
    } catch (e) {
      console.error(e)
    }
  }

  static async deleteBook(id: string) {
    try {
      const bookIndex: number = fakeDB.findIndex(book => book.id === id)

      if (bookIndex > -1) {
        fakeDB.splice(bookIndex, 1)
        return `Book ${id} deleted`
      } else {
        return '404'
      }

    } catch (e) {
      console.error(e)
    }
  }

  static async updateBook(book: IBook) {
    try {
      const bookIndex: number = fakeDB.findIndex(item => item.id === book.id)

      const {title, description} = book

      if (bookIndex > -1) {
        fakeDB[bookIndex] = {
          ...fakeDB[bookIndex],
          title,
          description
        }
        return `Book ${book.id} updated`
      } else {
        return '404'
      }

    } catch (e) {
      console.error(e)
    }
  }
}

for (let id of ["1", "2", "3"]) {
  const newBook: any = BookRepository.createBook(
      {
        id: id,
        title: `New book ${id}`,
        description: `Sample text ${id}`
      }
  );
}

BookRepository.deleteBook("2").then(res => {
  console.log(res)
})

BookRepository.updateBook({id: "3", title: "New title for 3", description: "New description for 3"}).then(res => {
  console.log(res)
})

BookRepository.getBooks().then(res => {
  console.log(res)
})







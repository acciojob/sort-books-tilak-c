import React,{useState,useEffect} from "react";
import '../styles/App.css';
import {setBooks} from './Books/bookSlice'
import { useDispatch, useSelector } from "react-redux";
const App = () => {
  const dispatch=useDispatch();
  const books=useSelector((state)=>state.book.books);
  // const [books,setBooks]=useState([]);
   const [sortOrderAuthor, setSortOrderAuthor] = useState("asc"); 
   const [sortOrderTitle, setSortOrderTitle] = useState("asc"); 
   const [sortOrderPublisher, setSortOrderPublisher] = useState("asc"); 

   useEffect(() => {
    fetch(
      "https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=jDBaEY4WWsyAEvqXqe5YrpKUCqFrBGPU"
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK") {
          const allBooks = data.results.lists.flatMap((list) => list.books);
          allBooks.forEach((book)=>{
            console.log([book.title,book.author,book.publisher,book.isbns[0].isbn13])
          })
          dispatch(setBooks(allBooks));
          // console.log(allBooks);
        }
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, []);
  const sortByTitle = () => {
    const sortedBooks = [...books].sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (sortOrderTitle === "asc") {
        return titleA.localeCompare(titleB);
      } else {
        return titleB.localeCompare(titleA);
      }
    });

    dispatch(setBooks(sortedBooks));
    setSortOrderTitle(sortOrderTitle === "asc" ? "desc" : "asc"); // toggle order
  };
const sortByAuthor = () => {
    const sortedBooks = [...books].sort((a, b) => {
      const authorA = a.author.toLowerCase();
      const authorB = b.author.toLowerCase();
      if (sortOrderAuthor === "asc") {
        return authorA.localeCompare(authorB);
      } else {
        return authorB.localeCompare(authorA);
      }
    });

    dispatch(setBooks(sortedBooks));
    setSortOrderAuthor(sortOrderAuthor === "asc" ? "desc" : "asc"); // toggle order
  };

  const sortByPublisher=()=>{
    const sortedBooks=[...books].sort((a,b)=>{
      const publisherA=a.publisher.toLowerCase();
      const publisherB=b.publisher.toLowerCase();
      if(sortOrderPublisher==="asc"){
        return publisherA.localeCompare(publisherB)
      }else{
        return publisherB.localeCompare(publisherA)
      }
    })
    dispatch(setBooks(sortedBooks));
      setSortOrderPublisher(sortOrderPublisher === "asc" ? "desc" : "asc"); 
  }
  return (
    <div>
      <h2>New York Times Books</h2>
      <button onClick={sortByTitle}>
        Sort by Title ({sortOrderTitle === "asc" ? "A → Z" : "Z → A"})
      </button>
      <button onClick={sortByAuthor}>
        Sort by Author ({sortOrderAuthor === "asc" ? "A → Z" : "Z → A"})
      </button>
      <button onClick={sortByPublisher}>
        Sort by Publisher ({sortOrderPublisher==="asc"?"A -> Z": "Z -> A"})
      </button>
            <table border="1">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Publisher</th>
                  <th>ISBN</th>
                </tr>
              </thead>
              <tbody>

        {books.map((book,index)=>(
                <tr key={index}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.isbns[0].isbn13}</td>
              </tr>
        ))}
              </tbody>
            </table>

    </div>
  )
}

export default App

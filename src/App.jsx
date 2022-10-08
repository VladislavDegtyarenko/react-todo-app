import React, {useState, useEffect} from "react";

// import layout components
import Header from "./layout/Header";
import Main from "./layout/Main";
import Footer from "./layout/Footer";

function App() {
   const [darkTheme, setDarkTheme] = useState(JSON.parse(localStorage.getItem('darkTheme')));

   useEffect(() => {
      localStorage.setItem('darkTheme', JSON.stringify(darkTheme))

      if (darkTheme) {
         document.body.classList.remove('light-theme');
         document.body.classList.add('dark-theme');
      } else {
         document.body.classList.add('light-theme');
         document.body.classList.remove('dark-theme');
      }
   }, [darkTheme])

   const toggleDarkTheme = () => {
      setDarkTheme(t => !t)
   }

   return (
      <>
         <Header toggleDarkTheme={toggleDarkTheme} darkTheme={darkTheme}/>
         <Main />
         <Footer />
      </>
   );
}

export default App;

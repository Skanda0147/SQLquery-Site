import { useState } from 'react'
import styles from './index.module.css'
import sqlLogo from './assets/sql-logo.png'





function App() {
  const [userPrompt, setUserPrompt] = useState("");
  
  const [sqlQuery, setSqlQuery ] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    const query = await generateQuery();
    setSqlQuery(query);
  };

  const generateQuery = async () => {
    const response = await fetch("http://localhost:3005/generate", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ queryDescription: userPrompt }),
      

    });

    const data = await response.json()
    return data.sqlQuery.trim();

  }
  

 

  return (
    <main className = {styles.main}>
      <img src = {sqlLogo} alt="" className={styles.icon} />
      <h3>Generate SQL with AI</h3>
      <form onSubmit={onSubmit}>
        <input
          type = "text"
          name="query-description"
          placeholder="Desribe your query"
          onChange={(e) => setUserPrompt(e.target.value)}
        />
        <input type="submit" value ="Generate your desired query"/>
        <pre>{sqlQuery}</pre>
      </form>
    </main>
  )
}

export default App

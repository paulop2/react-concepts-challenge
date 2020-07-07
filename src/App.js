import React, {useState, useEffect} from "react"; //ok
import api from './services/api'; //ok


import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState ([])

  
  useEffect(() => {
    async function loadData() {
      const response = await api.get('/repositories')

      const loadedRepositories = response.data;

      setRepositories(loadedRepositories);
    }
    loadData()
  },[])
  
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo projeto ${Date.now()}`,
      url: "localhost:3333",
      techs: ["NodeJS", "React"]
    });

    const repository = response.data;
    

    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    /* Funcionou, mas não passou no teste automatizado */
    // const response = await api.delete(`repositories/${id}`,)
    // const repository = repositories.splice(id,1)
    // setRepositories([...repositories, ])

    const response = await api.delete(`repositories/${id}`);

    if (response.status == 204) {
      const currentRepositories = repositories.filter(repository => repository.id != id);

      setRepositories(currentRepositories)
    }
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id} >
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

import './App.css';
import { useEffect, useState, Suspense } from 'react'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import { createResource as fetchData } from './helper'
import Spinner from './components/Spinner';


function App() {
  let [searchTerm, setSearchTerm] = useState('')
  let [data, setData] = useState(null)
  let [message] = useState('Search for Music!')

  useEffect(() => {
    if (searchTerm) {
      setData(fetchData(searchTerm))
    }
  }, [searchTerm])

  const renderGallery = () => {
    if(data){
        return (
            <Suspense fallback={<Spinner/>} >
                <Gallery data={data} />
            </Suspense>
        )
    }
}


  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearchTerm(term)
  }

  return (
    <div className="App">
        <SearchBar handleSearch={handleSearch} />
        {message}
        {renderGallery()}
    </div>
);
}

export default App;
import React, {useEffect, useState} from 'react';
import './App.css';
import {IPhotos} from "./models/IPhotos";
import {getPhotos} from "./services/PhotosService";

function App() {
  const [photos, setPhotos] = useState<IPhotos[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [fetching, setFetching] = useState<boolean>(true)
  const [totalCount, setTotalCount] = useState<number>(0)

  useEffect(() => {
    if (fetching) {
      getPhotos(10, currentPage)
        .then(response => {
          setPhotos([...photos, ...response.data])
          setCurrentPage(prevState => prevState + 1)
          setTotalCount(Number(response.headers["x-total-count"]))
        })
        .finally(() => setFetching(false))
    }
  }, [fetching, currentPage, photos])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  })

  const scrollHandler = (e: Event) => {
    if (e.target instanceof Document) {
      if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && photos.length < totalCount) {
        setFetching(true)
      }
    }
  }

  return (
    <div className="App">
      {photos.map(photo =>
        <div className={"photo"} key={photo.id}>
          <div className="title">{photo.id}. {photo.title}</div>
          <img src={photo.thumbnailUrl} alt={photo.title} loading={"lazy"}/>
        </div>
      )}
      {fetching && <p>Loading...</p>}
    </div>
  );
}

export default App;

import { useEffect } from "react"
import Hero from "../components/Hero"
import { useDispatch, useSelector } from "react-redux";
import { getPopular, setGenres } from "../redux/actions/movieActions";
import { actionTypes } from "../redux/reducers/actionTypes";
import Loading from "../components/Loading";
import MovieList from "../components/MovieList";

const MainPage = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store);

  useEffect(() => {
    // Filmlerin yüklenme esnasında olan aksiyon
    dispatch({ type: actionTypes.SET_MOVIES_LOADING });
    // Filmleri Apı'den al
    dispatch(getPopular());

    // Film kategorilerini alma 
    dispatch({ type: actionTypes.SET_GENRES_LOADING });
    dispatch(setGenres());
  }, []);

  return (
    <div>
      {/* Karşılama comp. */}
      <Hero />
      {/* Kategoriler */}

      {state.isGenresLoading ? (<Loading/>) : state.isGenresError? (<p>Üzgünüz Hata Oluştu</p>) : (state.genres.map((genre)=> (<MovieList key={genre.id} genre={genre}/>))) }
    </div>
  )
};

export default MainPage;
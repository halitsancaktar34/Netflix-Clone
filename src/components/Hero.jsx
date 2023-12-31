import { useSelector } from "react-redux";
import { baseImageURL } from "../constants/costants";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const Hero = () => {

    const state = useSelector((store) => store);

    // random sayı üretme
    const randomIndex = Math.round(Math.random() * 19);
    // random sayıya göre bir filme erişme
    const randomMovie = !state.isMoviesLoading && state.popularMovies[randomIndex];

    console.log(randomMovie)
    return (
        <div className="hero row p-4">
        {/* yüklenme devam ediyorsa veya rastgele film bulunmadıysa yükleniyor basar */}
        {state.isMovieLoading || !randomMovie ? (
          <Loading/>
        ) : (
          <>
            <div className="col-md-6 d-flex flex-column gap-3 align-items-center justify-content-center">
              <h1>{randomMovie.title}</h1>
              <p className="text-start">{randomMovie.overview}</p>
              <p>
                IMDB:{' '}
                <span className="text-warning">
                  {randomMovie.vote_average.toFixed(1)}
                </span>
              </p>
              <div className="d-flex gap-3">
                <Link className="btn btn-danger" to={'/detay'}>
                  Filmi İzle
                </Link>
                <Link className="btn btn-info" to={'#'}>
                  Listeye Ekle
                </Link>
              </div>
            </div>
  
            <div className="col-md-6">
              <img
                className="img-fluid rounded shadow my-4"
                src={baseImageURL.concat(randomMovie.backdrop_path)}
              />
            </div>
          </>
        )}
      </div>
    )
}

export default Hero
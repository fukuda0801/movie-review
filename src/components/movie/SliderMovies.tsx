import styles from "@/styles/components/movie/SliderMovies.module.css";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderMovies = ({ movies, title }: any) => {
  const settings = {
    dots: true, // ページネーションのドットを表示
    infinite: true, // 無限ループ
    speed: 800, // スライドのスピード
    slidesToShow: 2, // 一度に表示するスライドの数
    slidesToScroll: 1, // 一度にスクロールするスライドの数
    swipe: true, // スワイプ操作を有効化
    touchMove: true, // タッチによるスライド移動を許可
    swipeToSlide: true, // スワイプ時にスライドを動かす
    autoplay: true, // 自動再生
    autoplaySpeed: 5000, // 5秒ごとにスライドが切り替わる
    centerMode: true, // 中央に配置する
    centerPadding: "40px", // 左右に余白を持たせる
  };

  return (
    <div className={styles.sliderMovieContent}>
      <h2>{title}</h2>
      <div className={styles.sliderMovieGroup}>
        <Slider {...settings}>
          {movies.map((movie: any) => {
            return (
              <div key={movie.id} className={styles.sliderArea}>
                <Image
                  src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`}
                  alt="映画ポスター"
                  width={140}
                  height={210}
                  priority
                  className={styles.sliderMovieImg}
                />
                <p>{movie.title}</p>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default SliderMovies;

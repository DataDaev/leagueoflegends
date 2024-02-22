import backgroundvideoWebm from "./assets/animated-kindred.webm";
import videoPoster from "./assets/Kindred.jpg";

export default function BackgroundVideo() {
  return (
    <div className="background-video">
      <video autoPlay loop muted className="video" poster={videoPoster}>
        <source src={backgroundvideoWebm} type="video/webm" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay"></div>
    </div>
  );
}

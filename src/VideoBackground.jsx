import backgroundvideoWebm from "./assets/animated-kindred.webm";
import backgroundvideoMP4 from "./assets/animated-kindred.mp4";

export default function BackgroundVideo() {
  return (
    <div className="background-video">
      <video autoPlay loop muted className="video">
        <source src={backgroundvideoMP4} type="video/mp4" />
        <source src={backgroundvideoWebm} type="video/webm" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay"></div>
    </div>
  );
}

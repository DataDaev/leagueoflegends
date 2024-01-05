import backgroundvideo from "./assets/animated-kindred.webm";

export default function BackgroundVideo() {
  return (
    <div className="background-video">
      <video autoPlay loop muted src={backgroundvideo} className="video">
        {/* <source type="video/webm" />
        Your browser does not support the video tag. */}
      </video>
      <div className="overlay"></div>
    </div>
  );
}
